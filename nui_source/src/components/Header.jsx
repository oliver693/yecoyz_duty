import React from 'react';
import { X } from 'lucide-react';

function Header({ title, icon, onClose }) {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box', 
        padding: '10px 14px',
        borderBottom: '1px solid #333',
        backgroundColor: '#252525'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {icon && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {icon}
          </div>
        )}
        <h2 style={{ 
          margin: 0, 
          fontSize: '18px', 
          fontWeight: 600,
          color: '#e0e0e0',
          fontFamily: "var(--font)"
        }}>
          {title}
        </h2>
      </div>
      <button 
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          borderRadius: '4px',
          color: '#a0a0a0',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.color = '#e0e0e0'}
        onMouseOut={(e) => e.currentTarget.style.color = '#a0a0a0'}
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default Header;