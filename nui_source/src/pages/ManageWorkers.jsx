import React, { useState, useEffect } from 'react';
import { Users, Search, X, ChevronLeft, UserCircle } from 'lucide-react';
import Statistics from '../components/Statistics';
import HistoryList from '../components/HistoryList';
import { useVisibility } from '../contexts/VisibilityContext';
import { callback } from '../utilites/callback';
import { useTranslation } from "../contexts/TranslationProvider";

function ManageWorkers() {
  const { workerData, shiftsData } = useVisibility();
  const { t } = useTranslation();
  const defaultWorkers = [
    { id: 1, name: 'John Doe', identifier: 'ABCD123', online: true, job: 'Mechanic', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Jane Smith', identifier: 'EFGH456', online: true, job: 'Mechanic', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Alex Johnson', identifier: 'IJKL789', online: false, job: 'Mechanic', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Sam Wilson', identifier: 'MNOP012', online: false, job: 'Mechanic', avatar: 'https://i.pravatar.cc/150?img=4' }
  ];
  
  const defaultShifts = [
    {
      startTimeFormatted: '2025-04-03T09:30:00',
      endTimeFormatted: '2025-04-03T17:30:00',
      duration: 480
    },
    {
      startTimeFormatted: '2025-04-02T08:15:00',
      endTimeFormatted: '2025-04-02T16:45:00',
      duration: 510
    },
    {
      startTimeFormatted: '2025-04-02T08:15:00',
      endTimeFormatted: '2025-04-02T16:45:00',
      duration: 510
    },
    {
      startTimeFormatted: '2025-04-02T08:15:00',
      endTimeFormatted: '2025-04-02T16:45:00',
      duration: 510
    },
    {
      startTimeFormatted: '2025-04-02T08:15:00',
      endTimeFormatted: '2025-04-02T16:45:00',
      duration: 510
    },
    {
      startTimeFormatted: '2025-04-01T09:00:00',
      endTimeFormatted: '2025-04-01T15:00:00',
      duration: 360
    }
  ];
  
  const [workers, setWorkers] = useState(defaultWorkers);
  const [sampleShifts, setSampleShifts] = useState(defaultShifts);
  
  useEffect(() => {
    if (workerData) {
      setWorkers(workerData);
    }
    
    if (shiftsData) {
      setSampleShifts(shiftsData);
    }
  }, [workerData, shiftsData]);
  
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  const handleSelectWorker = (worker) => {
    callback("getEmployeeHistory", worker.identifier).then((res) => {
      setSelectedWorker(worker);
      setSampleShifts(res);
    })
  };
  
  const handleCloseWorkerDetails = () => {
    setSelectedWorker(null);
  };
  
  const filteredWorkers = workers.filter(worker => 
    worker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const onlineWorkers = filteredWorkers.filter(worker => worker.online);
  const offlineWorkers = filteredWorkers.filter(worker => !worker.online);
  
  const styles = {
    container: {
      width: '100%',
      height: '560px',
      maxHeight: '560px',
      backgroundColor: '#1e1e1e',
      color: '#fff',
      fontFamily: 'var(--font)',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    },
    header: {
      padding: '16px',
      borderBottom: '1px solid #333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    headerTitle: {
      fontSize: '18px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    searchContainer: {
      position: 'relative',
      width: '220px'
    },
    searchInput: {
      width: '77%',
      padding: '8px 12px 8px 36px',
      backgroundColor: '#252525',
      border: '1px solid #333',
      borderRadius: '6px',
      color: '#fff',
      fontSize: '14px',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#777'
    },
    content: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px'
    },
    workersListContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    sectionDivider: {
      fontSize: '14px',
      color: '#777',
      padding: '4px 0',
      marginBottom: '6px',
      fontWeight: '500'
    },
    workersGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    workerCard: {
      backgroundColor: '#252525',
      borderRadius: '8px',
      border: '1px solid #333',
      padding: '10px 12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease'
    },
    workerCardHover: {
      backgroundColor: '#2a2a2a'
    },
    avatar: {
      width: '50px',
      height: '50px',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: '#333',
      border: '1px solid #444',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 0,
      position: 'relative'
    },
    statusIndicator: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      position: 'absolute',
      bottom: '5px',
      right: '5px',
      border: '1px solid #252525',
    },
    statusIndicatorOffline: {
      backgroundColor: '#F44336'
    },
    workerInfo: {
      flex: 1
    },
    workerName: {
      fontSize: '15px',
      fontWeight: '500',
      marginBottom: '2px'
    },
    workerJob: {
      fontSize: '13px',
      color: '#a0a0a0'
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#777',
      padding: '20px',
      height: '100%'
    },
    emptyStateIcon: {
      marginBottom: '16px',
      opacity: 0.5
    },
    emptyStateText: {
      fontSize: '16px',
      textAlign: 'center'
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#1e1e1e',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column'
    },
    modalHeader: {
      padding: '16px',
      borderBottom: '1px solid #333',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '4px',
      transition: 'background-color 0.15s ease'
    },
    closeButton: {
      width: '32px',
      height: '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.15s ease'
    },
    modalContent: {
      flex: 1,
      padding: '16px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    workerHeaderInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '0 0 8px 0'
    },
    workerHeaderName: {
      fontSize: '16px',
      fontWeight: '500'
    },
    workerHeaderJob: {
      fontSize: '14px',
      color: '#a0a0a0'
    }
  };
  
  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <Users size={20} />
          {t("ui_manageWorkers")}
        </div>
        <div style={styles.searchContainer}>
          <Search size={16} style={styles.searchIcon} />
          <input 
            type="text" 
            placeholder={t("ui_searchWorkers")} 
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div 
        className="workers-list-scroll" 
        style={styles.content}
        onMouseEnter={() => setShowScrollbar(true)}
        onMouseLeave={() => setShowScrollbar(false)}
      >
        <style>
          {`
            .workers-list-scroll::-webkit-scrollbar {
              width: 6px;
              ${showScrollbar ? '' : 'display: none;'}
            }
            .workers-list-scroll::-webkit-scrollbar-track {
              background: #1e1e1e;
              border-radius: 3px;
            }
            .workers-list-scroll::-webkit-scrollbar-thumb {
              background: #444;
              border-radius: 3px;
            }
            .workers-list-scroll::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
            .worker-card:hover {
              background-color: #2a2a2a;
            }
          `}
        </style>
        <div style={styles.workersListContainer}>
          {/* Online workers section */}
          {onlineWorkers.length > 0 && (
            <div>
              <div style={styles.sectionDivider}>{t("ui_onlineWorkers")}</div>
              <div style={styles.workersGroup}>
                {onlineWorkers.map(worker => (
                  <div 
                    key={worker.identifier} 
                    className="worker-card"
                    style={styles.workerCard}
                    onClick={() => handleSelectWorker(worker)}
                  >
                    <div style={styles.avatar}>
                      <UserCircle size={32} color="#666" />
                      <div style={{...styles.statusIndicator, backgroundColor: worker.online ? '#4CAF50' : '#F44336'}}></div>
                    </div>
                    <div style={styles.workerInfo}>
                      <div style={styles.workerName}>{worker.name}</div>
                      <div style={styles.workerJob}>{worker.job}</div>
                    </div>
                  </div>
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
                  <div 
                    key={worker.identifier} 
                    className="worker-card"
                    style={styles.workerCard}
                    onClick={() => handleSelectWorker(worker)}
                  >
                    <div style={styles.avatar}>
                      <UserCircle size={32} color="#666" />
                      <div style={{...styles.statusIndicator, backgroundColor: worker.online ? '#4CAF50' : '#F44336'}}></div>
                    </div>
                    <div style={styles.workerInfo}>
                      <div style={styles.workerName}>{worker.name}</div>
                      <div style={styles.workerJob}>{worker.job}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Empty state for when no workers match search */}
          {filteredWorkers.length === 0 && (
            <div style={styles.emptyState}>
              <Users size={32} style={styles.emptyStateIcon} />
              <div style={styles.emptyStateText}>{t("ui_noWorkersFound")}</div>
            </div>
          )}
        </div>
      </div>
      {/* Modal/popup for worker details */}
      {selectedWorker && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalHeader}>
            <div 
              style={styles.backButton}
              onClick={handleCloseWorkerDetails}
            >
              <ChevronLeft size={18} />
              <span>{t("ui_backToWorkers")}</span>
            </div>
            <div 
              style={styles.closeButton}
              onClick={handleCloseWorkerDetails}
            >
              <X size={18} />
            </div>
          </div>
          <div 
            className="modal-content-scroll" 
            style={styles.modalContent}
            onMouseEnter={() => setShowScrollbar(true)}
            onMouseLeave={() => setShowScrollbar(false)}
          >
            <style>
              {`
                .modal-content-scroll::-webkit-scrollbar {
                  width: 6px;
                  ${showScrollbar ? '' : 'display: none;'}
                }
                .modal-content-scroll::-webkit-scrollbar-track {
                  background: #1e1e1e;
                  border-radius: 3px;
                }
                .modal-content-scroll::-webkit-scrollbar-thumb {
                  background: #444;
                  border-radius: 3px;
                }
                .modal-content-scroll::-webkit-scrollbar-thumb:hover {
                  background: #555;
                }
              `}
            </style>
            <div style={styles.workerHeaderInfo}>
              <div style={styles.avatar}>
                <UserCircle size={32} color="#666" />
                <div style={{...styles.statusIndicator, backgroundColor: selectedWorker.online ? '#4CAF50' : '#F44336'}}></div>
              </div>
              <div>
                <div style={styles.workerHeaderName}>{selectedWorker.name}</div>
                <div style={styles.workerHeaderJob}>{selectedWorker.job}</div>
              </div>
            </div>
            <Statistics 
              shifts={sampleShifts} 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
              filters={['all', 'day', 'week', 'month']} 
            />
            
            <HistoryList shifts={sampleShifts} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageWorkers;