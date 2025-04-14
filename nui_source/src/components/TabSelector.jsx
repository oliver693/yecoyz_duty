import { useState } from 'react';
import { useTab } from '../contexts/TabContext';
import ActiveWorkers from '../pages/ActiveWorkers';
import History from '../pages/History';
import ManageWorkers from '../pages/ManageWorkers';
import { Users, Clock, Settings } from 'lucide-react';
import { useTranslation } from "../contexts/TranslationProvider";

const TabSelector = () => {
  const { t } = useTranslation();
  const { activeTab, switchTab, canManage } = useTab();
  const [displayStyle, setDisplayStyle] = useState('segment'); // Only segment style

  const tabStyle = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      flex: 1,
    },
    // Segment Control Styles
    segmentContainer: {
      display: 'flex',
      padding: '12px 16px',
      backgroundColor: '#252525',
      borderBottom: '1px solid #333',
    },
    segmentControl: {
      display: 'flex',
      width: '100%',
      backgroundColor: '#333',
      borderRadius: '6px',
      padding: '4px',
      position: 'relative',
      overflow: 'hidden',
    },
    segmentButton: {
      flex: 1,
      padding: '8px 0',
      fontSize: '14px',
      fontWeight: 500,
      color: '#a0a0a0',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      zIndex: 2,
      transition: 'color 0.2s ease',
      textAlign: 'center',
      fontFamily: "var(--font)",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '6px',
    },
    activeSegment: {
      color: '#1a1a1a',
    },
    segmentIndicator: {
      position: 'absolute',
      height: 'calc(100% - 8px)',
      backgroundColor: '#4dabf7',
      top: '4px',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
      zIndex: 1,
    },
    tabPanel: {
      padding: '0',
      flex: 1,
      overflow: 'auto',
      backgroundColor: '#1a1a1a',
    },
    icon: {
      width: '16px',
      height: '16px',
    }
  };

  const getSegmentIndicatorStyle = () => {
    const options = canManage ? ['activeworkers', 'history', 'manageworkers'] : ['activeworkers', 'history'];
    const index = options.indexOf(activeTab);
    const width = 100 / options.length;
    
    return {
      ...tabStyle.segmentIndicator,
      width: `calc(${width}% - 8px)`,
      left: `calc(${index * width}% + 4px)`,
    };
  };

  return (
    <div style={tabStyle.container}>
      <div style={tabStyle.segmentContainer}>
        <div style={tabStyle.segmentControl}>
          <div style={getSegmentIndicatorStyle()}></div>
          <button 
            style={activeTab === 'activeworkers' ? {...tabStyle.segmentButton, ...tabStyle.activeSegment} : tabStyle.segmentButton}
            onClick={() => switchTab('activeworkers')}
          >
            <Users style={tabStyle.icon} />
            {t("ui_tabWorkers")}
          </button>
          <button 
            style={activeTab === 'history' ? {...tabStyle.segmentButton, ...tabStyle.activeSegment} : tabStyle.segmentButton}
            onClick={() => switchTab('history')}
          >
            <Clock style={tabStyle.icon} />
            {t("ui_tabHistory")}
          </button>
          {canManage && (
            <button 
              style={activeTab === 'manageworkers' ? {...tabStyle.segmentButton, ...tabStyle.activeSegment} : tabStyle.segmentButton}
              onClick={() => switchTab('manageworkers')}
            >
              <Settings style={tabStyle.icon} />
              {t("ui_tabManageWorkers")}
            </button>
          )}
        </div>
      </div>
      
      <div style={tabStyle.tabPanel}>
        {activeTab === 'activeworkers' && <ActiveWorkers />}
        {activeTab === 'history' && <History />}
        {activeTab === 'manageworkers' && canManage && <ManageWorkers />}
      </div>
    </div>
  );
};

export default TabSelector;