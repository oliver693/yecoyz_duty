import React, { useState, useEffect } from 'react';
import DutyStatusBadge from './DutyStatusBadge';
import YourStatusCard from './YourStatusCard';
import ActiveWorkersList from './ActiveWorkersList';
import DutyHistory from './DutyHistory';
import { callback } from "../utilites/callback";
import { useVisibility } from '../context/VisibilityContext';

function DutyContainer() {
  // Use data from VisibilityContext
  const { dutyData, setDutyData } = useVisibility();
  
  const [activeTab, setActiveTab] = useState('duty'); // 'duty' or 'history'
  const [dutyTime, setDutyTime] = useState('00:00:00');

  // Use data from context
  const isOnDuty = dutyData.isOnDuty;
  const yourJob = dutyData.job;
  const yourRank = dutyData.rank;
  const userName = dutyData.name;
  const activeWorkers = dutyData.activeWorkers || [];
  const dutyHistory = dutyData.dutyHistory || [];
  const dutyStarted = dutyData.dutyStarted;

  // Calculate current duty time when on duty
  useEffect(() => {
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
    callback("toggleDuty").then((response) => {
      if (response && response.success) {
        // Använd data från backend för att uppdatera status
        setDutyData({
          ...dutyData,
          isOnDuty: response.isOnDuty,
          dutyStarted: response.isOnDuty ? new Date().toISOString() : null
        });
      } else {
        console.error("Failed to toggle duty status");
      }
    }).catch(error => {
      console.error("Error toggling duty status:", error);
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
    id: index, // Använd array-index som unik nyckel
    name: userName,
    job: yourJob,
    startTime: item.startTimeFormatted,
    endTime: item.endTimeFormatted,
    duration: formatDuration(item.duration * 1000)
  }));

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Duty Management</h1>
          <DutyStatusBadge isOnDuty={isOnDuty} />
        </div>
        
        {/* Tab navigation */}
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
        </div>
        
        {/* Your status card is visible in both tabs */}
        <YourStatusCard 
          isOnDuty={isOnDuty} 
          dutyTime={dutyTime} 
          yourJob={yourJob}
          yourRank={yourRank}
          userName={userName}
          getInitial={getInitial} 
          toggleDuty={toggleDuty} 
        />
        
        {/* Content container with fixed height for consistent UI */}
        <div className="h-[450px] relative">
          {/* Tab content with absolute positioning to ensure replacement not stacking */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'duty' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <ActiveWorkersList workers={activeWorkers} getInitial={getInitial} />
          </div>
          
          <div className={`absolute inset-0 transition-opacity duration-300 ${activeTab === 'history' ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
            <DutyHistory history={processedHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DutyContainer;