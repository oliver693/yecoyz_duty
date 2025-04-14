import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, handlePageChange }) {
  const styles = {
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

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) {
        endPage = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 1) {
        startPage = Math.max(2, totalPages - 3);
      }
      
      if (startPage > 2) {
        pageNumbers.push('...');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div style={styles.paginationContainer}>
      <style>
        {`
          .pagination-button:hover:not(:disabled) {
            background-color: #333;
          }
        `}
      </style>
      <button
        className="pagination-button"
        style={{
          ...styles.paginationButton,
          ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
        }}
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        aria-label="First page"
      >
        <ChevronsLeft size={16} />
      </button>
      
      <button
        className="pagination-button"
        style={{
          ...styles.paginationButton,
          ...(currentPage === 1 ? styles.paginationButtonDisabled : {})
        }}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      
      {getPageNumbers().map((pageNumber, index) => (
        typeof pageNumber === 'number' ? (
          <button
            key={index}
            className="pagination-button"
            style={{
              ...styles.paginationButton,
              ...(pageNumber === currentPage ? styles.paginationButtonActive : {})
            }}
            onClick={() => handlePageChange(pageNumber)}
            aria-label={`Page ${pageNumber}`}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        ) : (
          <div key={index} style={styles.paginationEllipsis}>
            {pageNumber}
          </div>
        )
      ))}
      
      <button
        className="pagination-button"
        style={{
          ...styles.paginationButton,
          ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
        }}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
      
      <button
        className="pagination-button"
        style={{
          ...styles.paginationButton,
          ...(currentPage === totalPages ? styles.paginationButtonDisabled : {})
        }}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Last page"
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;