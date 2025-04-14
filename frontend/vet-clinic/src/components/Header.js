import React from 'react'
import OrangeButton from './OrangeButton'


export default function Header() {
  return (
    <header>
      <span className="logo">Dogtor</span>
      <ul className="nav">
        <li>ИСТОРИЯ</li>
        <li>УСЛУГИ</li>
        <li>ЗАПИСИ</li>
        <li>ВОПРОСЫ</li>
      </ul>
      <OrangeButton buttonText='РЕГИСТРАЦИЯ'></OrangeButton>
    </header>
  )
}

