import React, { useState } from 'react';
import WorkerCard from './WorkerCard';

function ActiveWorkersList({ workers, getInitial }) {
  const [jobFilter, setJobFilter] = useState('All');

  // Get unique job types from workers
  const jobTypes = ['All', ...new Set(workers.map(worker => worker.job))];

  // Filter workers by job type
  const filteredWorkers = jobFilter === 'All' 
    ? workers 
    : workers.filter(worker => worker.job === jobFilter);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Aktiv Personal ({filteredWorkers.length})</h2>
        <div className="relative">
          <select 
            className="bg-gray-600 text-white text-sm rounded px-2 py-1 appearance-none cursor-pointer pr-6"
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
          >
            {jobTypes.map(job => (
              <option key={job} value={job}>{job}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-700 rounded-lg divide-y divide-gray-600">
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map(worker => (
            <WorkerCard 
              key={worker.id} 
              worker={worker} 
              getInitial={getInitial}
            />
          ))
        ) : (
          <div className="p-3 text-center text-gray-400">
            Ingen personal är i tjänst för detta filter
          </div>
        )}
      </div>
    </div>
  );
}

export default ActiveWorkersList;