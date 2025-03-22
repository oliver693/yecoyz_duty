import React from 'react';
import AvatarCircle from './AvatarCircle';

function YourStatusCard({ isOnDuty, dutyTime, yourJob, yourRank, userName, getInitial, toggleDuty }) {
  // Get random color for avatar based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-red-500', 'bg-yellow-500', 'bg-pink-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <div className="flex items-center mb-3">
        <AvatarCircle 
          initial={getInitial(userName)} 
          colorClass={getAvatarColor(userName)} 
          size="large" 
        />
        <div className="ml-3">
          <h2 className="text-lg font-semibold">{userName}</h2>
          <p className="text-gray-400 text-sm">{yourJob} - {yourRank}</p>
        </div>
      </div>
      <div className="mb-3">
        <p className="text-gray-400 text-sm">Tjänstetid</p>
        <p className="font-medium text-lg">{dutyTime}</p>
      </div>
      <button
        onClick={toggleDuty}
        className={`w-full py-2 rounded font-medium transition duration-200 ${
          isOnDuty 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {isOnDuty ? 'Gå ur tjänst' : 'Gå i tjänst'}
      </button>
    </div>
  );
}

export default YourStatusCard;