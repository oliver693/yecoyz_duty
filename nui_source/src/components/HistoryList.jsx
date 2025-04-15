import React, { useState } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from "../contexts/TranslationProvider";

function HistoryList({ shifts }) {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  
  // Sort shifts array by date (newest first)
  const sortedShifts = [...shifts].sort((a, b) => {
    const dateA = new Date(a.startTimeFormatted);
    const dateB = new Date(b.startTimeFormatted);
    return dateB - dateA; // Newest first
  });
  
  const totalPages = Math.ceil(sortedShifts.length / itemsPerPage);
  
  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  
  // Updated to handle seconds instead of minutes
  const formatDuration = (seconds) => {
    // Convert seconds to minutes and hours
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };
  
  // State to track if scrollbar should be visible
  const [showScrollbar, setShowScrollbar] = useState(false);
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedShifts.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next or previous page
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Generate pagination items
  const generatePaginationItems = () => {
    const items = [];
    
    // Always show first page
    items.push(
      <div 
        key="first"
        style={currentPage === 1 ? {...styles.paginationButton, ...styles.paginationButtonActive} : styles.paginationButton}
        onClick={() => paginate(1)}
      >
        1
      </div>
    );
    
    // Start ellipsis
    if (currentPage > 3) {
      items.push(
        <div key="ellipsis-start" style={styles.paginationEllipsis}>...</div>
      );
    }
    
    // Middle pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= 1 || i >= totalPages) continue;
      items.push(
        <div 
          key={i}
          style={currentPage === i ? {...styles.paginationButton, ...styles.paginationButtonActive} : styles.paginationButton}
          onClick={() => paginate(i)}
        >
          {i}
        </div>
      );
    }
    
    // End ellipsis
    if (currentPage < totalPages - 2) {
      items.push(
        <div key="ellipsis-end" style={styles.paginationEllipsis}>...</div>
      );
    }
    
    // Always show last page if more than 1 page
    if (totalPages > 1) {
      items.push(
        <div 
          key="last"
          style={currentPage === totalPages ? {...styles.paginationButton, ...styles.paginationButtonActive} : styles.paginationButton}
          onClick={() => paginate(totalPages)}
        >
          {totalPages}
        </div>
      );
    }
    
    return items;
  };
  
  const styles = {
    section: {
      backgroundColor: '#252525',
      borderRadius: '8px',
      border: '1px solid #333',
      padding: '16px',
      flex: 1,
      maxHeight: '355px',
      display: 'flex',
      flexDirection: 'column'
    },
    sectionHeader: {
      fontSize: '16px',
      fontWeight: '500',
      fontFamily: "var(--font)",
      marginBottom: '12px'
    },
    shiftsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      overflowY: 'auto',
      flex: 1
    },
    shiftCard: {
      backgroundColor: '#2a2a2a',
      borderRadius: '8px',
      border: '1px solid #3a3a3a',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    shiftDate: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    shiftTime: {
      color: '#a0a0a0',
      fontFamily: "var(--font)",
      fontSize: '13px'
    },
    shiftStartTime: {
      fontFamily: "var(--font)",
      fontSize: '16px'
    },
    shiftDuration: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      backgroundColor: '#333',
      padding: '3px 8px',
      borderRadius: '6px',
      color: '#4dabf7',
      fontFamily: "var(--font)",
      fontSize: '13px'
    },
    emptyState: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 16px',
      color: '#a0a0a0',
      textAlign: 'center',
      flex: 1
    },
    emptyStateIcon: {
      marginBottom: '12px',
      opacity: 0.5
    },
    emptyStateText: {
      fontSize: '15px',
      fontFamily: "var(--font)",
    },
    paginationContainer: {
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '4px'
    },
    paginationButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '6px',
      border: '1px solid #444',
      backgroundColor: '#252525',
      color: '#a0a0a0',
      cursor: 'pointer',
      fontFamily: "var(--font)",
      fontSize: '14px',
      userSelect: 'none',
      transition: 'background-color 0.15s ease'
    },
    paginationButtonActive: {
      backgroundColor: '#4dabf7',
      color: '#fff',
      border: '1px solid #4dabf7'
    },
    paginationButtonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed'
    },
    paginationEllipsis: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '32px',
      height: '32px',
      color: '#a0a0a0',
      fontFamily: "var(--font)",
      fontSize: '14px',
      userSelect: 'none'
    }
  };
  
  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <span>{t("ui_shiftsHistory")}</span>
      </div>
      {shifts.length > 0 ? (
        <>
          <div 
            className="shifts-list" 
            style={styles.shiftsList}
            onMouseEnter={() => setShowScrollbar(true)}
            onMouseLeave={() => setShowScrollbar(false)}
          >
            <style>
              {`
                .shifts-list::-webkit-scrollbar {
                  width: 6px;
                  ${showScrollbar ? '' : 'display: none;'}
                }
                .shifts-list::-webkit-scrollbar-track {
                  background: #1e1e1e;
                  border-radius: 3px;
                }
                .shifts-list::-webkit-scrollbar-thumb {
                  background: #444;
                  border-radius: 3px;
                }
                .shifts-list::-webkit-scrollbar-thumb:hover {
                  background: #555;
                }
              `}
            </style>
            {currentItems.map((shift, index) => (
              <div key={index} style={styles.shiftCard}>
                <div style={styles.shiftDate}>
                  <Calendar size={16} color="#a0a0a0" />
                  <div>
                    <div style={styles.shiftStartTime}>{formatDateTime(shift.startTimeFormatted)}</div>
                    <div style={styles.shiftTime}>to {formatDateTime(shift.endTimeFormatted)}</div>
                  </div>
                </div>
                <div style={styles.shiftDuration}>
                  <Clock size={14} />
                  {formatDuration(shift.duration)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div style={styles.paginationContainer}>
              {/* Previous button */}
              <div 
                style={currentPage === 1 ? {...styles.paginationButton, ...styles.paginationButtonDisabled} : styles.paginationButton}
                onClick={currentPage !== 1 ? prevPage : undefined}
              >
                <ChevronLeft size={16} />
              </div>
              
              {/* Page numbers */}
              {generatePaginationItems()}
              
              {/* Next button */}
              <div 
                style={currentPage === totalPages ? {...styles.paginationButton, ...styles.paginationButtonDisabled} : styles.paginationButton}
                onClick={currentPage !== totalPages ? nextPage : undefined}
              >
                <ChevronRight size={16} />
              </div>
            </div>
          )}
        </>
      ) : (
        <div style={styles.emptyState}>
          <Calendar size={40} color="#666" style={styles.emptyStateIcon} />
          <div style={styles.emptyStateText}>{t("ui_shiftsNoRecord")}</div>
        </div>
      )}
    </div>
  );
}

export default HistoryList;