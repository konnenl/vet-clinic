import React from 'react';
import './GreenInput.css';

export default function GreenInput(props) {
  return (
    <div className="green-input-container">
      {props.label && <label className="green-input-label">{props.label}</label>}
      <input
        className='green-input'
        type={props.type || 'text'}
        placeholder={props.placeholder || ''}  // Добавляем placeholder
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      />
    </div>
  );
}