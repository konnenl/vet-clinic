import React from 'react'
import GreenButton from '../GreenButton/GreenButton'
import OrangeButton from '../OrangeButton/OrangeButton'
import './Header.css'

export default function Header() {
  return (
    <header>
      <span className="logo">Dogtor</span>
      <ul className="nav">
        <li>ИСТОРИЯ</li>
        <li>УСЛУГИ</li>
        <li>ВОПРОСЫ</li>
      </ul>
      <div className="button_area">
        <OrangeButton text="ЗАПИСАТЬСЯ" />
        <GreenButton text="ВОЙТИ" />
      </div>
    </header>
  )
}