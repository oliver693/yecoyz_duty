import React from 'react';

function DutyStatusBadge({ isOnDuty }) {
  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${
      isOnDuty ? 'bg-green-600' : 'bg-red-600'
    }`}>
      {isOnDuty ? 'I TJÄNST' : 'EJ I TJÄNST'}
    </span>
  );
}

export default DutyStatusBadge;