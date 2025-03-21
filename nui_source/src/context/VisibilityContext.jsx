import React, { createContext, useContext, useState, useEffect } from "react";

// Skapa context
const VisibilityContext = createContext();

// Hook för att använda context
export const useVisibility = () => useContext(VisibilityContext);

// Provider-komponent
export const VisibilityProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true); // Börjar som false

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev); // Växlar mellan true/false
  };


  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data) {
        if (event.data.action === "showUI") {
          setIsVisible(true);
        } else if (event.data.action === "hideUI") {
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
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};