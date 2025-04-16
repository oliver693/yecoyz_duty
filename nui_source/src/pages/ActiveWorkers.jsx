import React, { useState, useEffect } from 'react';
import WorkersList from '../components/WorkersList';
import StatusLegend from '../components/StatusLegend';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { useVisibility } from '../contexts/VisibilityContext';
import { useTranslation } from "../contexts/TranslationProvider";

function ActiveWorkers() {
  const { workerData } = useVisibility();
  const { t } = useTranslation();

  const defaultWorkers = [
    {
      "dutyTime": "N/A",
      "source": 1,
      "identifier": "char1:b52fe4b354f8b99ac96ab6469ad8f1c7bf77ef2a",
      "grade": "Captain",
      "name": "Stefan Andersson",
      "phone": "393-459-9251",
      "online": false
    },
    {
      "dutyTime": "2h 15m",
      "source": 2,
      "identifier": "char1:a42fe9b754f8b99ac96ab6469ad8f1c7bf77ef2a",
      "grade": "Officer",
      "name": "John Smith",
      "phone": "555-123-4567",
      "online": false
    },
    {
      "dutyTime": "45m",
      "source": 3,
      "identifier": "char1:c52fe9b754f8b99ac96ab6469ad8f1c7bf77ef2a",
      "grade": "Training Officer",
      "name": "Sarah Johnson",
      "phone": "555-987-6543",
      "online": false
    },
    {
      "dutyTime": "5h 30m",
      "source": 4,
      "identifier": "char1:d52fe9b754f8b99ac96ab6469ad8f1c7bf77ef2a",
      "grade": "Detective",
      "name": "Mike Williams",
      "phone": "555-789-0123",
      "online": false
    },
    {
      "dutyTime": "1h 20m",
      "source": 5,
      "identifier": "char1:e52fe9b754f8b99ac96ab6469ad8f1c7bf77ef2a",
      "grade": "Sergeant",
      "name": "Lisa Brown",
      "phone": "555-456-7890",
      "online": true
    },
    {
      "dutyTime": "3h 40m",
      "source": 6,
      "identifier": "char1:f52fe9b754f8b99ac96ab6469ad8f1c7bf77ef2a",
      "grade": "Officer",
      "name": "Robert Taylor",
      "phone": "555-234-5678",
      "online": true
    },
    {
      "dutyTime": "N/A",
      "source": 7,
      "identifier": "char1:g52fe9b754f8b99ac96ab6469ad8f1c7bf77ef2a",
      "grade": "Dispatcher",
      "name": "Emily Davis",
      "phone": "555-345-6789",
      "online": false
    },
    {
      "dutyTime": "6h 10m",
      "source": 8,
      "identifier": "char1:h52fe9b754f8b99ac96ab6469ad8f1c7bf77ef2a",
      "grade": "Officer",
      "name": "James Wilson",
      "phone": "555-567-8901",
      "online": false
    }
  ];
  
  // Use context data if available, otherwise use default data
  const [workers, setWorkers] = useState(defaultWorkers);
  
  // Update workers state when context data changes
  useEffect(() => {
    if (workerData) {
      setWorkers(workerData);
    }
  }, [workerData]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
  const sortedWorkers = [...workers].sort((a, b) => {
    if (a.online === b.online) return 0;
    return a.online ? -1 : 1;
  });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkers = sortedWorkers.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(workers.length / itemsPerPage);
  const onlineCount = workers.filter(worker => worker.online).length;
  const [showScrollbar, setShowScrollbar] = useState(false);
  const [needsScrollbar, setNeedsScrollbar] = useState(false);
  
  useEffect(() => {
    const checkForScrollbar = () => {
      const container = document.querySelector('.workers-list-container');
      if (container) {
        setNeedsScrollbar(container.scrollHeight > container.clientHeight);
      }
    };
    checkForScrollbar();
    
    const resizeObserver = new ResizeObserver(checkForScrollbar);
    const container = document.querySelector('.workers-list-container');
    if (container) {
      resizeObserver.observe(container);
    }
    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, [currentWorkers]);
  
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const container = document.querySelector('.workers-list-container');
    if (container) {
      container.scrollTop = 0;
    }
  };
  
  const styles = {
    container: {
      padding: '16px',
      height: '100%',
      maxHeight: '526px',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#e0e0e0',
      fontFamily: "var(--font)"
    },
    count: {
      fontSize: '14px',
      color: '#a0a0a0',
      fontFamily: "var(--font)"
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>{t("ui_workersList")}</div>
        <div style={styles.count}>{onlineCount} {t("ui_online")}</div>
      </div>
      
      <StatusLegend />
      
      {workers.length > 0 ? (
        <>
          <WorkersList 
            currentWorkers={currentWorkers}
            showScrollbar={showScrollbar}
            setShowScrollbar={setShowScrollbar}
            needsScrollbar={needsScrollbar}
          />
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default ActiveWorkers;