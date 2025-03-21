import React, { useState, useEffect } from 'react';
import DutyStatusBadge from './DutyStatusBadge';
import YourStatusCard from './YourStatusCard';
import ActiveWorkersList from './ActiveWorkersList';

function DutyContainer() {
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [dutyTimeStarted, setDutyTimeStarted] = useState(null);
  const [dutyTime, setDutyTime] = useState('00:00:00');
  const [yourJob, setYourJob] = useState('Mechanic');
  const [yourRank, setYourRank] = useState('Senior');
  const [userName, setUserName] = useState('John Doe');
  const [activeWorkers, setActiveWorkers] = useState([
    { id: 1, name: 'Alex Johnson', job: 'Police', rank: 'Chief', phone: '555-0123', dutyTime: '02:45:10' },
    { id: 2, name: 'Maria Garcia', job: 'EMS', rank: 'Paramedic', phone: '555-0456', dutyTime: '01:20:30' },
    { id: 3, name: 'James Smith', job: 'Mechanic', rank: 'Manager', phone: '555-0789', dutyTime: '03:15:45' },
    { id: 4, name: 'Emma Wilson', job: 'Taxi', rank: 'Driver', phone: '555-1234', dutyTime: '00:45:22' }
  ]);

  const toggleDuty = () => {
    callback("toggleDuty")(() => {
      if (!isOnDuty) {
        setIsOnDuty(true);
        setDutyTimeStarted(new Date());
      } else {
        setIsOnDuty(false);
        setDutyTimeStarted(null);
        setDutyTime('00:00:00');
      }
    });
  };
  

  useEffect(() => {

    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };

    let interval;
    if (isOnDuty && dutyTimeStarted) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = now - dutyTimeStarted;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        setDutyTime(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOnDuty, dutyTimeStarted]);

  const handleMessage = (event) => {
    const data = event.data;

    if (data.type === "dutyData") {
      setIsOnDuty(data.isOnDuty)
      setYourJob(data.job)
      setYourRank(data.rank)
    }
  }

  // Get first letter of name for avatar
  const getInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg max-w-md w-full shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Duty Management</h1>
        <DutyStatusBadge isOnDuty={isOnDuty} />
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
      
      <ActiveWorkersList workers={activeWorkers} getInitial={getInitial} />
    </div>
  );
}

export default DutyContainer;