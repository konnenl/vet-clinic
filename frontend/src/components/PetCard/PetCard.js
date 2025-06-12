import React, { useEffect } from 'react';
import './PetCard.css';

export default function PetCard({ pet }) {
  useEffect(()=>{
    console.log(pet)
  })
  return (
    <div className="pet-card">
      <div className="pet-card__header">
        <h3>{pet.name}</h3>
        <span className="pet-gender">{pet.gender === 'м' ? '♂' : '♀'}</span>
      </div>
      <div className="pet-card__details">
        <div className="pet-detail">
          <span className="detail-label">Порода:</span>
          <span className="detail-value">{pet.breed || 'Не указана'}</span>
        </div>
        <div className="pet-detail">
          <span className="detail-label">Вид:</span>
          <span className="detail-value">{pet.type || 'Не указан'}</span>
        </div>
        <div className="pet-detail">
          <span className="detail-label">Цвет:</span>
          <span className="detail-value">{pet.color || 'Не указан'}</span>
        </div>
        <div className="pet-detail">
          <span className="detail-label">Вес:</span>
          <span className="detail-value">{pet.weight ? `${pet.weight} кг` : 'Не указан'}</span>
        </div>
        <div className="pet-detail">
          <span className="detail-label">Дата регистрации:</span>
          <span className="detail-value">{pet.registration_date}</span>
        </div>
      </div>
    </div>
  );
}