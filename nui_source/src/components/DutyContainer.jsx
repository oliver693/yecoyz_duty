import React, { useState, useEffect } from 'react';
import DutyStatusBadge from './DutyStatusBadge';
import YourStatusCard from './YourStatusCard';
import ActiveWorkersList from './ActiveWorkersList';
import DutyHistory from './DutyHistory';
import ManageEmployees from "./ManageEmployees";
import { callback } from "../utilites/callback";
import { useVisibility } from '../context/VisibilityContext';
import { X } from 'lucide-react';

function DutyContainer() {
  // Use data from VisibilityContext
  const { dutyData, setDutyData, setIsVisible } = useVisibility();

  const [activeTab, setActiveTab] = useState('duty'); // 'duty' or 'history'
  const [dutyTime, setDutyTime] = useState('00:00:00');

  // Use data from context with proper fallbacks
  const isOnDuty = dutyData.isOnDuty || false;
  const yourJob = dutyData.job || '';
  const yourRank = dutyData.rank || '';
  const userName = dutyData.name || '';
  const activeWorkers = dutyData.activeWorkers || [];
  const dutyHistory = dutyData.dutyHistory || [];
  const dutyStarted = dutyData.dutyStarted || null;
  const isBoss = dutyData.isBoss || false; // Added fallback for isBoss

  // Calculate current duty time when on duty
  useEffect(() => {
    console.log(isBoss)
    let interval;
    if (isOnDuty && dutyStarted) {
      // Initial calculation when component mounts or dutyStarted changes
      const startDate = new Date(dutyStarted);
      const now = new Date();
      const diff = now - startDate;
      setDutyTime(formatDuration(diff));
      
      // Set up interval for continuous updates
      interval = setInterval(() => {
        const now = new Date();
        const diff = now - startDate;
        setDutyTime(formatDuration(diff));
      }, 1000);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, [isOnDuty, dutyStarted]);

  const toggleDuty = () => {
    callback("toggleDuty").then((res) => {
      if (res.success) {
        setDutyData({
          ...dutyData,
          isOnDuty: res.isOnDuty,
          dutyStarted: res.isOnDuty ? new Date().toISOString() : null,
          // Preserve other state values from the response if they exist
          ...(res.isBoss !== undefined && { isBoss: res.isBoss }),
          ...(res.activeWorkers !== undefined && { activeWorkers: res.activeWorkers }),
          ...(res.dutyHistory !== undefined && { dutyHistory: res.dutyHistory })
        });
      }
    });
  };

  const closePage = () => {
    callback("closePage").then((res) => {
      if (res.success) {
        setIsVisible(false);
      }
    });
  };

  const formatDuration = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get first letter of name for avatar
  const getInitial = (name) => {
    return name && name.charAt(0) ? name.charAt(0).toUpperCase() : '?';
  };
  
  const processedHistory = dutyHistory.map((item, index) => ({
    id: index,
    name: userName,
    job: yourJob,
    startTime: item.startTimeFormatted,
    endTime: item.endTimeFormatted,
    duration: formatDuration(item.duration * 1000)
  }));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md w-full shadow-xl relative">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Duty Management</h1>
          <div className="flex items-center space-x-2">
            <DutyStatusBadge isOnDuty={isOnDuty} />
            <button 
              onClick={closePage} 
              className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-full p-1 transition-colors duration-200"
              aria-label="Close duty management"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="flex mb-4 bg-gray-700 rounded-lg p-1">
          <button 
            className={`flex-1 py-2 rounded-md transition ${activeTab === 'duty' ? 'bg-gray-600' : 'hover:bg-gray-600/50'}`}
            onClick={() => setActiveTab('duty')}
          >
            Aktiv Personal
          </button>
          <button 
            className={`flex-1 py-2 rounded-md transition ${activeTab === 'history' ? 'bg-gray-600' : 'hover:bg-gray-600/50'}`}
            onClick={() => setActiveTab('history')}
          >
            Historik
          </button>
          {isBoss === true && (
            <button 
              className={`flex-1 py-2 rounded-md transition ${activeTab === 'manage' ? 'bg-gray-600' : 'hover:bg-gray-600/50'}`}
              onClick={() => setActiveTab('manage')}
            >
              Hantera Anställda
            </button>
          )}
        </div>
        
        <YourStatusCard 
          isOnDuty={isOnDuty} 
          dutyTime={dutyTime} 
          yourJob={yourJob}
          yourRank={yourRank}
          userName={userName}
          getInitial={getInitial} 
          toggleDuty={toggleDuty} 
        />
        
        <div className="h-[450px] relative">
          <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'duty' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <ActiveWorkersList workers={activeWorkers} getInitial={getInitial} />
          </div>
          
          <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'history' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <DutyHistory history={processedHistory} />
          </div>

          <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'manage' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            {dutyData.employees ? (
              <ManageEmployees employees={dutyData.employees} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-400">Laddar anställda...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DutyContainer;