import { createContext, useContext, useState } from 'react';

export const TabContext = createContext();

export const TabProvider = ({ children, canManage = false }) => {
  const [activeTab, setActiveTab] = useState('activeworkers');

  const switchTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <TabContext.Provider value={{ activeTab, switchTab, canManage }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('useTab must be used within a TabProvider');
  }
  return context;
};