import React from 'react';
import Statistics from './Statistics';
import HistoryList from './HistoryList';
import { UserCircle, Phone, Mail, CalendarClock } from 'lucide-react';

function WorkerDetails({ worker, activeFilter, setActiveFilter, filters }) {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      height: '100%',
      overflow: 'hidden'
    },
    workerHeader: {
      backgroundColor: '#252525',
      borderRadius: '8px',
      border: '1px solid #333',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    avatar: {
      width: '60px',
      height: '60px',
      borderRadius: '12px',
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
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      position: 'absolute',
      bottom: '5px',
      right: '5px',
      border: '1px solid #252525',
      backgroundColor: worker.isOnline ? '#4CAF50' : '#F44336'
    },
    workerInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    workerName: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#e0e0e0',
      marginBottom: '6px',
      fontFamily: "var(--font)"
    },
    grade: {
      fontSize: '13px',
      color: '#4dabf7',
      fontFamily: "var(--font)",
      backgroundColor: '#333',
      padding: '3px 8px',
      borderRadius: '4px',
      display: 'inline-block',
      marginBottom: '8px'
    },
    contactInfo: {
      display: 'flex',
      gap: '20px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#a0a0a0',
      fontSize: '13px',
      fontFamily: "var(--font)"
    },
    detailsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      flex: 1,
      overflow: 'hidden'
    }
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.workerHeader}>
        <div style={styles.avatar}>
          <UserCircle size={40} color="#666" />
          <div style={styles.statusIndicator}></div>
        </div>
        
        <div style={styles.workerInfo}>
          <div style={styles.workerName}>{worker.name}</div>
          <div style={styles.grade}>{worker.grade}</div>
          
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <Phone size={16} />
              {worker.phone}
            </div>
            <div style={styles.contactItem}>
              <Mail size={16} />
              {worker.name.toLowerCase().replace(' ', '.') + '@company.com'}
            </div>
            <div style={styles.contactItem}>
              <CalendarClock size={16} />
              {worker.dutyTime}
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.detailsContainer}>
        <Statistics 
          shifts={worker.shifts} 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter}
          filters={filters}
        />
        <HistoryList shifts={worker.shifts} />
      </div>
    </div>
  );
}

export default WorkerDetails;