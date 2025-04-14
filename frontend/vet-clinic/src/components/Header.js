import React from 'react'

export default function Header() {
  return (
    <header>
            <span className="logo">Dogtor</span>
            <ul className="nav">
              <li>ИСТОРИЯ</li>
              <li>УСЛУГИ</li>
              <li>ЗАПИСИ</li>
              <li>ВОПРОСЫ</li>
              <li>
                <a href="#">
                  <img src="./img/" alt="" className="avatar" />
                </a>
              </li>
            </ul>
    </header>
  )
}

