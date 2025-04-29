import React from 'react';
import './ServiceCard.css';

export default function ServiceCard(props) {
  return (
    <div className="service-card__wrapper">
      <div className="service-card">
        <div className="service-card__content">
          <div className="content__text">
            <p className="content__title">{props.name}</p>
            <p className="content__service-count">{props.count}33 услуг</p>
          </div>
          <div className="content__image">
            <img className="service-image" src={props.src} />
          </div>
        </div>
      </div>
    </div>
  );
}