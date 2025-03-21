import React from 'react';

function AvatarCircle({ initial, colorClass, size }) {
  // Size classes
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-14 h-14 text-xl'
  };

  const sizeClass = sizeClasses[size] || sizeClasses.medium;

  return (
    <div className={`${colorClass} ${sizeClass} rounded-full flex items-center justify-center font-bold text-white`}>
      {initial}
    </div>
  );
}

export default AvatarCircle;