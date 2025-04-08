import React from 'react';

function AvatarCircle({ initial, colorClass, size }) {
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-md',
    large: 'w-12 h-12 text-lg'
  };

  return (
    <div className={`${colorClass} ${sizeClasses[size]} rounded-full flex items-center justify-center font-semibold text-white`}>
      {initial}
    </div>
  );
}

export default AvatarCircle;