import React from 'react';

function OfficerCard({ officer }) {
  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <h3 className="font-medium">{officer.name}</h3>
        <div className="flex space-x-2 text-sm text-gray-400">
          <span>{officer.rank}</span>
          <span>•</span>
          <span>{officer.dutyTime}</span>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-sm bg-gray-600 px-2 py-1 rounded">
          {officer.phone}
        </span>
      </div>
    </div>
  );
}

export default OfficerCard;