import React, { createContext, useContext, useState, useEffect } from "react";

const VisibilityContext = createContext();

export const useVisibility = () => useContext(VisibilityContext);

export const VisibilityProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [workerData, setWorkerData] = useState(null);
  const [shiftsData, setShiftsData] = useState(null);
  const [translations, setTranslations] = useState({});
  const [characterData, setCharacterData] = useState({
    name: "Robert Taylor",
    job: "LSPD",
    grade: "Officer",
    isOnDuty: false,
    dutyStarted: null
  });
  
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };
  
  // Function to toggle duty status and send message back to client
  const toggleDuty = () => {
    const newDutyStatus = !characterData.isOnDuty;
    
    setCharacterData({
      ...characterData,
      isOnDuty: newDutyStatus,
      dutyStarted: newDutyStatus ? Math.floor(Date.now() / 1000) : null // Spara tidsstämpel i sekunder
    });
  };
  
  
  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;
      
      if (data) {
        if (data.action === "showUI") {
          setIsVisible(true);
          
          if (data.workers) {
            setWorkerData(data.workers);
          }
          
          if (data.shifts) {
            setShiftsData(data.shifts);
          }

          if (data.character) {
            setCharacterData({
              ...data.character,
              isOnDuty: data.character.isOnDuty !== undefined ? data.character.isOnDuty : false,
              dutyStarted: data.character.dutyStarted ? new Date(data.character.dutyStarted) : null
            });

            if (data.translations) {
              setTranslations(data.translations)
            }

          }
        } else if (data.action === "hideUI") {
          setIsVisible(false);
        } else if (data.action === "updateWorkers") {
          setWorkerData(data.workers);
        } else if (data.action === "updateShifts") {
          setShiftsData(data.shifts);
        } else if (data.action === "updateCharacter") {
          setCharacterData({
            ...data.character,
            isOnDuty: data.character.isOnDuty !== undefined ? data.character.isOnDuty : characterData.isOnDuty,
            dutyStarted: data.character.dutyStarted ? new Date(data.character.dutyStarted) : characterData.dutyStarted
          });
        }
      }
    };
    
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [characterData.isOnDuty, characterData.dutyStarted]);
  
  return (
    <VisibilityContext.Provider
      value={{ 
        isVisible, 
        toggleVisibility,
        setIsVisible,
        workerData,
        shiftsData,
        characterData,
        toggleDuty,
        setWorkerData,
        setShiftsData,
        setCharacterData,
        translations
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};