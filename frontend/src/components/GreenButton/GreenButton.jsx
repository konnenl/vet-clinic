// GreenButton.js
import React from 'react';
import './GreenButton.css';

export default function GreenButton(props){
  return (
    <button className="green-button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}