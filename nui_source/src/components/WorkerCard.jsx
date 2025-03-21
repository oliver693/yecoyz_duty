import React from 'react';
import AvatarCircle from './AvatarCircle';

function WorkerCard({ worker, getInitial }) {
  // Get color based on worker job
  const getColorByJob = (job) => {
    const jobColors = {
      'Police': 'bg-blue-500',
      'EMS': 'bg-red-500',
      'Mechanic': 'bg-yellow-500',
      'Taxi': 'bg-green-500',
      'Civilian': 'bg-gray-500'
    };
    
    return jobColors[job] || 'bg-purple-500';
  };

  return (
    <div className="p-3 flex items-center">
      <AvatarCircle 
        initial={getInitial(worker.name)} 
        colorClass={getColorByJob(worker.job)} 
        size="medium" 
      />
      
      <div className="ml-3 flex-grow">
        <h3 className="font-medium">{worker.name}</h3>
        <div className="flex space-x-2 text-sm text-gray-400">
          <span>{worker.job}</span>
          <span>•</span>
          <span>{worker.rank}</span>
          <span>•</span>
          <span>{worker.dutyTime}</span>
        </div>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm bg-gray-600 px-2 py-1 rounded">
          {worker.phone}
        </span>
      </div>
    </div>
  );
}

export default WorkerCard;