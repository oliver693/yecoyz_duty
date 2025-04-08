import React from 'react';
import { UserCircle, Phone, Clock } from 'lucide-react';

function WorkerCard({ worker, isOffline = false }) {
  const styles = {
    workerCard: {
      backgroundColor: '#252525',
      borderRadius: '8px',
      border: '1px solid #333',
      padding: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      opacity: isOffline ? 0.7 : 1
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
      backgroundColor: isOffline ? '#F44336' : '#4CAF50'
    },
    workerInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    workerName: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#e0e0e0',
      marginBottom: '2px',
      fontFamily: "var(--font)"
    },
    jobInfo: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginBottom: '6px',
      fontFamily: "var(--font)"
    },
    grade: {
      fontSize: '12px',
      color: '#4dabf7',
      fontFamily: "var(--font)",
      backgroundColor: '#333',
      padding: '2px 6px',
      borderRadius: '4px'
    },
    contactRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#a0a0a0',
      fontSize: '12px',
      fontFamily: "var(--font)"
    },
    dutyTime: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      color: '#a0a0a0',
      fontSize: '12px',
      fontFamily: "var(--font)"
    }
  };

  return (
    <div style={styles.workerCard}>
      <div style={styles.avatar}>
        <UserCircle size={32} color="#666" />
        <div style={styles.statusIndicator}></div>
      </div>
      
      <div style={styles.workerInfo}>
        <div style={styles.workerName}>{worker.name}</div>
        <div style={styles.jobInfo}>
          <span style={styles.grade}>{worker.grade}</span>
        </div>
        
        <div style={styles.contactRow}>
          <div style={styles.contactInfo}>
            <Phone size={14} />
            {worker.phone}
          </div>
          
          <div style={styles.dutyTime}>
            <Clock size={14} />
            {worker.dutyTime}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkerCard;
