import React from 'react';
import { Filter } from 'lucide-react';
import { useTranslation } from "../contexts/TranslationProvider";

function Statistics({ shifts, activeFilter, setActiveFilter, filters }) {
  const { t } = useTranslation();
  const calculateStats = () => {
    if (shifts.length === 0) return { count: 0, totalTime: 0, avgTime: 0 };

    const now = new Date();
    let filteredShifts = [...shifts];

    if (activeFilter === 'day') {
      const today = new Date().setHours(0, 0, 0, 0);
      filteredShifts = shifts.filter(shift => {
        const shiftDate = new Date(shift.startTimeFormatted).setHours(0, 0, 0, 0);
        return shiftDate === today;
      });
    } 
    else if (activeFilter === 'week') {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      
      filteredShifts = shifts.filter(shift => {
        const shiftDate = new Date(shift.startTimeFormatted);
        return shiftDate >= weekStart;
      });
    } 
    else if (activeFilter === 'month') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      
      filteredShifts = shifts.filter(shift => {
        const shiftDate = new Date(shift.startTimeFormatted);
        return shiftDate >= monthStart;
      });
    }

    const count = filteredShifts.length;
    const totalTime = filteredShifts.reduce((acc, shift) => acc + shift.duration, 0);
    const avgTime = count > 0 ? totalTime / count : 0;

    return { count, totalTime, avgTime };
  };

  const stats = calculateStats();

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const styles = {
    section: {
      backgroundColor: '#252525',
      borderRadius: '8px',
      border: '1px solid #333',
      padding: '16px',
      minHeight: '125px',
      maxHeight: '140px'
    },
    sectionHeader: {
      fontSize: '16px',
      fontWeight: '500',
      fontFamily: "var(--font)",
      marginBottom: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px'
    },
    statCard: {
      backgroundColor: '#2a2a2a',
      borderRadius: '8px',
      padding: '12px',
      textAlign: 'center',
      border: '1px solid #3a3a3a'
    },
    statValue: {
      fontSize: '22px',
      fontWeight: '600',
      marginBottom: '6px',
      fontFamily: "var(--font)",
      color: '#4dabf7'
    },
    statLabel: {
      color: '#a0a0a0',
      fontFamily: "var(--font)",
      fontSize: '13px'
    },
    filterContainer: {
      display: 'flex',
      gap: '6px'
    },
    filterButton: {
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '13px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#333',
      color: '#a0a0a0',
      fontFamily: "var(--font)"
    },
    filterButtonActive: {
      backgroundColor: '#4dabf7',
      color: '#fff'
    },
    filterIcon: {
      marginRight: '3px'
    }
  };

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <span>{t("ui_statistics")}</span>
        <div style={styles.filterContainer}>
          {filters.map(filter => (
            <button
              key={filter}
              style={{
                ...styles.filterButton,
                ...(activeFilter === filter ? styles.filterButtonActive : {})
              }}
              onClick={() => setActiveFilter(filter)}
            >
              <Filter size={12} style={styles.filterIcon} />
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{stats.count}</div>
          <div style={styles.statLabel}>{t("ui_totalShifts")}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{formatDuration(stats.totalTime)}</div>
          <div style={styles.statLabel}>{t("ui_workingTime")}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statValue}>{formatDuration(Math.round(stats.avgTime))}</div>
          <div style={styles.statLabel}>{t("ui_averageShift")}</div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;