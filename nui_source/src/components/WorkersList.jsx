import React from 'react';
import WorkerCard from './WorkerCard';
import { useTranslation } from "../contexts/TranslationProvider";

function WorkersList({ currentWorkers, showScrollbar, setShowScrollbar, needsScrollbar }) {
  const { t } = useTranslation();
  const styles = {
    workersListContainer: {
      flex: 1,
      overflowY: 'auto',
      marginRight: '-8px',
      paddingRight: '8px',
      height: '100%'
    },
    workersList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    },
    sectionDivider: {
      fontSize: '14px',
      color: '#777',
      padding: '4px 0',
      marginBottom: '2px',
      fontFamily: "var(--font)",
      fontWeight: '500'
    },
    workersGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  };

  const onlineWorkers = currentWorkers.filter(worker => worker.online);
  const offlineWorkers = currentWorkers.filter(worker => !worker.online);

  return (
    <div 
      className="workers-list-container" 
      style={styles.workersListContainer}
      onMouseEnter={() => setShowScrollbar(true)}
      onMouseLeave={() => setShowScrollbar(false)}
    >
      <style>
        {`
          .workers-list-container::-webkit-scrollbar {
            width: 6px;
            ${needsScrollbar && showScrollbar ? '' : 'display: none;'}
          }
          .workers-list-container::-webkit-scrollbar-track {
            background: #1e1e1e;
            border-radius: 3px;
          }
          .workers-list-container::-webkit-scrollbar-thumb {
            background: #444;
            border-radius: 3px;
          }
          .workers-list-container::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
      <div style={styles.workersList}>
        {/* Online workers section */}
        {onlineWorkers.length > 0 && (
          <div>
            <div style={styles.sectionDivider}>{t("ui_onlineWorkers")}</div>
            <div style={styles.workersGroup}>
              {onlineWorkers.map(worker => (
                <WorkerCard key={worker.identifier} worker={worker} />
              ))}
            </div>
          </div>
        )}
        
        {/* Offline workers section */}
        {offlineWorkers.length > 0 && (
          <div>
            <div style={styles.sectionDivider}>{t("ui_offlineWorkers")}</div>
            <div style={styles.workersGroup}>
              {offlineWorkers.map(worker => (
                <WorkerCard key={worker.identifier} worker={worker} isOffline={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkersList;