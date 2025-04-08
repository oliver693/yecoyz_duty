import React from 'react';

function StatusLegend() {
  const styles = {
    statusLegend: {
      display: 'flex',
      gap: '16px',
      marginBottom: '12px',
      marginTop: '-8px'
    },
    statusItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      fontFamily: "var(--font)",
      color: '#a0a0a0'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%'
    }
  };

  return (
    <div style={styles.statusLegend}>
      <div style={styles.statusItem}>
        <div style={{ ...styles.statusDot, backgroundColor: '#4CAF50' }}></div>
        <span>Online</span>
      </div>
      <div style={styles.statusItem}>
        <div style={{ ...styles.statusDot, backgroundColor: '#F44336' }}></div>
        <span>Offline</span>
      </div>
    </div>
  );
}

export default StatusLegend;