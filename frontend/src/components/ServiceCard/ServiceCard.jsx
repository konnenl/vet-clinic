import React from 'react';
import './ServiceCard.css';
import GreenButton from '../GreenButton/GreenButton';
export default function ServiceCard(props) {
  return (
    <div className="service-card">
        <div className="service-card__photo">
            <img src="props" alt="продукт" />
        </div>
        <h5>{props.name}</h5>
        <p>{props.description}</p>  
        <GreenButton text='Подрбнее'/>
    </div>
  )
}
