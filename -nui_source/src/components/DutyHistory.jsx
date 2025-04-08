import React, { useState } from 'react';

function DutyHistory({ history, onClearHistory }) {
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const getFilteredHistory = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    return history.filter(entry => {
      const entryDate = new Date(entry.startTime);
      
      switch(filter) {
        case 'today':
          return entryDate >= today;
        case 'week':
          return entryDate >= weekAgo;
        case 'month':
          return entryDate >= monthAgo;
        default:
          return true;
      }
    });
  };
  
  const filteredHistory = getFilteredHistory();
  
  // Calculate total duty time
  const calculateTotalTime = () => {
    let totalSeconds = 0;
    
    filteredHistory.forEach(entry => {
      const [hours, minutes, seconds] = entry.duration.split(':').map(Number);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });
    
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  const handleClearHistory = () => {
    // Show confirmation dialog first
    setShowConfirmation(true);
  };
  
  const confirmClear = () => {
    // Call the parent component's clear function (we'll pass this as a prop)
    onClearHistory(filter); // Pass current filter to clear only filtered items if needed
    setShowConfirmation(false);
  };
  
  const cancelClear = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Tjänstgöringshistorik</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <select 
              className="bg-gray-600 text-white text-sm rounded px-2 py-1 appearance-none cursor-pointer pr-6"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Visa alla</option>
              <option value="today">Idag</option>
              <option value="week">Senaste veckan</option>
              <option value="month">Senaste månaden</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="h-4 w-4 fill-current text-white" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
          <button 
            className="bg-red-600 hover:bg-red-700 text-white text-sm rounded px-2 py-1"
            onClick={handleClearHistory}
            disabled={filteredHistory.length === 0}
          >
            Rensa
          </button>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-4 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium mb-2">Bekräfta rensning</h3>
            <p className="mb-4">
              {filter === 'all' 
                ? 'Är du säker på att du vill rensa all historik?' 
                : `Är du säker på att du vill rensa historik för ${
                    filter === 'today' ? 'idag' : 
                    filter === 'week' ? 'senaste veckan' : 
                    'senaste månaden'
                  }?`
              }
            </p>
            <div className="flex justify-end space-x-2">
              <button 
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                onClick={cancelClear}
              >
                Avbryt
              </button>
              <button 
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                onClick={confirmClear}
              >
                Rensa
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Scrollable container with fixed height */}
      <div className="bg-gray-700 rounded-lg divide-y divide-gray-600 mb-3 max-h-80 overflow-y-auto">
        {filteredHistory.length > 0 ? (
          filteredHistory.map(entry => (
            <div key={entry.id} className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{entry.name}</h3>
                  <p className="text-sm text-gray-400">{entry.job}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{entry.duration}</p>
                  <p className="text-sm text-gray-400">Tjänstetid</p>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-400">
                <p>Start: {entry.startTime}</p>
                <p>Slut: {entry.endTime}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-gray-400">
            Ingen historik att visa för valda filter
          </div>
        )}
      </div>
      
      {filteredHistory.length > 0 && (
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <p className="text-sm">Total tjänstetid:</p>
            <p className="font-medium">{calculateTotalTime()}</p>
          </div>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm">Antal pass:</p>
            <p className="font-medium">{filteredHistory.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DutyHistory;