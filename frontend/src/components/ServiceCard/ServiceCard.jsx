import React from 'react';
import './ServiceCard.css';
import GreenButton from '../GreenButton/GreenButton';
export default function ServiceCard(props) {
  return (
    <div className="service-card">
        <div className="service-card__photo">
            <img src="https://cdn.fishki.net/upload/post/2017/01/05/2183399/14-1.jpg" alt="продукт" />
        </div>
          <div className="service-card__action">
          <h5>{props.name}</h5>
          <p>{props.description}</p>  
          <GreenButton text='Подробнее'/>
        </div>
    </div>
  )
}
