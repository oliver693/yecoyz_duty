import React, { useState, useEffect } from 'react';
import { callback } from "../utilites/callback";

function ManageEmployees({ employees }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeHistory, setEmployeeHistory] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [isLoading, setIsLoading] = useState(false);

  // Fetch employee history when an employee is selected
  useEffect(() => {
    if (selectedEmployee) {
      setIsLoading(true);
      callback("getEmployeeHistory", { identifier: selectedEmployee.identifier })
        .then((res) => {
          console.log("Employee history response:", res); // Debugging
          
          // Check if res is directly the array (as shown in your example)
          if (Array.isArray(res)) {
            setEmployeeHistory(res);
          } 
          // Or if it's wrapped in a response object
          else if (res.success && Array.isArray(res.history)) {
            setEmployeeHistory(res.history);
          } else {
            console.error("Unexpected response format:", res);
            setEmployeeHistory([]);
          }
          
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching employee history:", error);
          setEmployeeHistory([]);
          setIsLoading(false);
        });
    }
  }, [selectedEmployee]);

  // Handle going back to employee list
  const handleBackToList = () => {
    setSelectedEmployee(null);
    setEmployeeHistory([]);
  };

  // Get filtered history based on selected time period
  const getFilteredHistory = () => {
    if (!employeeHistory.length) return [];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    
    return employeeHistory.filter(entry => {
      // Parse the date from the formatted string
      const entryDate = new Date(entry.startTimeFormatted);
      
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

  // Format timestamp durations to HH:MM:SS
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calculate total duty time for the filtered history
  const calculateTotalTime = () => {
    let totalSeconds = 0;
    
    filteredHistory.forEach(entry => {
      totalSeconds += entry.duration;
    });
    
    return formatDuration(totalSeconds);
  };

  // If employee is selected, show their history
  if (selectedEmployee) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={handleBackToList}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tillbaka
          </button>
          <h2 className="text-lg font-semibold">{selectedEmployee.firstname} {selectedEmployee.lastname}</h2>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-medium">Tjänstgöringshistorik</h3>
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
        </div>
        
        {isLoading ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-gray-400">Laddar historik...</p>
          </div>
        ) : (
          <>
            {/* Scrollable container with fixed height */}
            <div className="bg-gray-700 rounded-lg divide-y divide-gray-600 mb-3 max-h-80 overflow-y-auto">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((entry, index) => (
                  <div key={index} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Pass #{index + 1}</h3>
                        <p className="text-sm text-gray-400">{selectedEmployee.firstname} {selectedEmployee.lastname}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatDuration(entry.duration)}</p>
                        <p className="text-sm text-gray-400">Tjänstetid</p>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      <p>Start: {entry.startTimeFormatted}</p>
                      <p>Slut: {entry.endTimeFormatted}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 text-center text-gray-400">
                  {employeeHistory.length > 0 ? 
                    'Ingen historik att visa för valda filter' : 
                    'Ingen tjänstgöringshistorik tillgänglig'}
                </div>
              )}
            </div>
            
            {/* Summary section */}
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
            
            {/* Empty state summary section */}
            {filteredHistory.length === 0 && employeeHistory.length > 0 && (
              <div className="bg-gray-700 rounded-lg p-3 text-center text-gray-400">
                Ingen historik att visa för valda filter
              </div>
            )}
            
            {/* No history at all summary section */}
            {filteredHistory.length === 0 && employeeHistory.length === 0 && !isLoading && (
              <div className="bg-gray-700 rounded-lg p-3 text-center text-gray-400">
                Ingen tjänstgöringshistorik tillgänglig
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Otherwise, show the list of employees
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-3">Anställda</h2>
      
      <div className="bg-gray-700 rounded-lg divide-y divide-gray-600 overflow-y-auto flex-grow">
        {employees && employees.length > 0 ? (
          employees.map((employee, index) => (
            <button
              key={index}
              className="w-full text-left p-3 hover:bg-gray-600 transition-colors"
              onClick={() => setSelectedEmployee(employee)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {employee.firstname.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{employee.firstname} {employee.lastname}</h3>
                    <p className="text-sm text-gray-400">ID: {employee.identifier.slice(0, 8)}...</p>
                  </div>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))
        ) : (
          <div className="p-3 text-center text-gray-400 h-32 flex items-center justify-center">
            Inga anställda hittades
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEmployees;