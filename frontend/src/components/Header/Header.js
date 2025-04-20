import React from 'react'
import GreenButton from '../GreenButton/GreenButton'
import './Header.css'

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
            <GreenButton buttonText='ВОЙТИ'/>
    </header>
  )
}

