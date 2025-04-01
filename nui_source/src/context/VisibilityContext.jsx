import React, { createContext, useContext, useState, useEffect } from "react";

// Skapa context
const VisibilityContext = createContext();

// Hook för att använda context
export const useVisibility = () => useContext(VisibilityContext);

// Provider-komponent
export const VisibilityProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false); // Börjar som false
  const [dutyData, setDutyData] = useState({
    name: '',
    job: '',
    rank: '',
    isOnDuty: false,
    dutyStarted: null,
    activeWorkers: [],
    dutyHistory: []
  });

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev); // Växlar mellan true/false
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;
      
      if (data) {
        if (data.action === "showUI") {
          setIsVisible(true);
          
          if (data.type === "dutyData") {
            setDutyData({
              name: data.name || '',
              job: data.job || '',
              rank: data.rank || '',
              isOnDuty: data.isOnDuty || false,
              dutyStarted: data.dutyStarted || null,
              activeWorkers: data.activeWorkers || [],
              dutyHistory: data.dutyHistory || [],
              isBoss: data.isBoss || "",
              employees: data.employees || [],
              
            });
          }
        } else if (data.action === "hideUI") {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <VisibilityContext.Provider
      value={{ 
        isVisible, 
        toggleVisibility,
        setIsVisible,
        dutyData,
        setDutyData
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};