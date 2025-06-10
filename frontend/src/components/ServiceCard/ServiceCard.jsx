import React from 'react';
import './ServiceCard.css';

export default function ServiceCard(props) {
  return (
    <div className="service-card__wrapper">
      <div className="service-card">
        <div className="service-card__content">
          <div className="content__text">
            <p className="content__title">{props.title}</p>
            <p className="content__service-count">{props.count} услуг</p>
          </div>
        </div>
      </div>
    </div>
  );
}