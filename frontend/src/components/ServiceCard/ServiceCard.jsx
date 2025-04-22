import React from 'react';
import './ServiceCard.css';
import GreenButton from '../GreenButton/GreenButton';
export default function ServiceCard(props) {
  return (
    <div className="service-card">
        <div className="service-card__photo">
            <img src={props.src} alt="продукт" />
        </div>
          <div className="service-card__action">
          <h5>{props.name}</h5>
          <p>{props.description}</p>  
          <GreenButton text='Подробнее'/>
        </div>
    </div>
  )
}
