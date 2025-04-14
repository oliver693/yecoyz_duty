import React, { useState, useEffect } from 'react';
import Statistics from '../components/Statistics';
import HistoryList from '../components/HistoryList';
import { useVisibility } from '../contexts/VisibilityContext';
import { useTranslation } from "../contexts/TranslationProvider";

function History() {
  const { shiftsData } = useVisibility();
  const { t } = useTranslation();

  const defaultShifts = [
    {"endTimeFormatted":"2025-04-05 18:30:47","startTimeFormatted":"2025-04-05 10:15:41","duration":498, "endTime":1743357047,"startTime":1743324941},
    {"endTimeFormatted":"2025-04-04 16:43:47","startTimeFormatted":"2025-04-04 09:30:41","duration":433, "endTime":1743276227,"startTime":1743250241},
    {"endTimeFormatted":"2025-04-03 17:15:12","startTimeFormatted":"2025-04-03 08:45:31","duration":510, "endTime":1743191712,"startTime":1743161131},
    {"endTimeFormatted":"2025-04-01 21:43:47","startTimeFormatted":"2025-04-01 14:20:41","duration":443, "endTime":1743036227,"startTime":1743012041},
    {"endTimeFormatted":"2025-03-31 21:43:47","startTimeFormatted":"2025-03-31 21:43:41","duration":6, "endTime":1742949827,"startTime":1742949821}
  ];
  
  const [shifts, setShifts] = useState(defaultShifts);
  
  useEffect(() => {
    if (shiftsData) {
      setShifts(shiftsData);
    }
  }, [shiftsData]);

  const [activeFilter, setActiveFilter] = useState('all');
  const filters = ['all', 'day', 'week', 'month'];

  const styles = {
    container: {
      padding: '16px',
      height: '100%',
      maxHeight: '526px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1a1a1a',
      color: '#e0e0e0',
      overflow: 'hidden'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px'
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#e0e0e0',
      fontFamily: "var(--font)"
    },
    sectionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      flex: 1,
      overflow: 'hidden'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>{t("ui_history")}</div>
      </div>

      <div style={styles.sectionsContainer}>
        <Statistics 
          shifts={shifts} 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter}
          filters={filters}
        />
        <HistoryList shifts={shifts} />
      </div>
    </div>
  );
}

export default History;