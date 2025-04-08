import React from 'react';

function Base({ width = "100%", height = "100%", children, className = "", style = {} }) {
  return (
    <div 
      className={`base-container ${className}`}
      style={{
        width,
        height,
        backgroundColor: "#1a1a1a",
        color: "#e0e0e0",
        borderRadius: "1px",
        border: "1px solid #333",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default Base;