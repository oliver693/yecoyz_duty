import { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import Base from "./components/Base";
import Header from './components/Header';
import Profile from './components/Profile';
import { FileIcon } from 'lucide-react';
import TabSelector from './components/TabSelector';
import { TabProvider } from './contexts/TabContext';
import { VisibilityProvider, useVisibility } from './contexts/VisibilityContext';
import { callback } from './utilites/callback';

const AppContent = () => {
  const { isVisible, setIsVisible, characterData } = useVisibility();
  const [canManage, setCanManage] = useState(false);
  
  // Uppdatera canManage när isBoss-värdet ändras
  useEffect(() => {
    // Här antar vi att isBoss-värdet är tillgängligt via characterData
    // Om det finns i ett annat context eller state, justera detta
    if (characterData && characterData.isBoss !== undefined) {
      setCanManage(characterData.isBoss);
    }
  }, [characterData]);
  
  const handleClose = () => {
    callback("closePage").then(() => {
      setIsVisible(false);
    })
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ 
              duration: 0.2, 
              ease: "easeOut",
              type: "spring", 
              stiffness: 200,
              damping: 20
            }}
          >
            <Base width='500px' height='800px'>
              <Header title="Duty Manager" icon={<FileIcon size={20} color="#4dabf7" />} onClose={handleClose} />
              <Profile />
              <TabProvider canManage={canManage}>
                <TabSelector />
              </TabProvider>
            </Base>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function App() {
  return (
    <MantineProvider>
      <VisibilityProvider>
        <AppContent />
      </VisibilityProvider>
    </MantineProvider>
  );
}

export default App;