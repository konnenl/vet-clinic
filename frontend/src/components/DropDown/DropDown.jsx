import React from 'react';
import './DropDown.css'

export default function DropDown(props) {
  return (
    <select 
      className='drop-down' 
      value={props.value} 
      onChange={(e) => props.onValueChange(e.target.value)}
    >
      {Object.entries(props.options).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}