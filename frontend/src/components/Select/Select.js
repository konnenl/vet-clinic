import React from 'react';
import './Select.css';

export default function StyledSelect({ children, ...props }) {
  return (
    <select className="styled-select" {...props}>
      {children}
    </select>
  );
}