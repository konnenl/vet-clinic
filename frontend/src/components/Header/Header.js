import React from 'react'
import GreenButton from '../GreenButton/GreenButton'
import OrangeButton from '../OrangeButton/OrangeButton'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <Link to="/">
        <span className="logo">Dogtor</span>
      </Link>
      <ul className="nav">
        <Link >ИСТОРИЯ</Link>
        <Link to='/catalogue'>УСЛУГИ</Link>
        <li>ВОПРОСЫ</li>
      </ul>
      <div className="button_area">
        <OrangeButton text="ЗАПИСАТЬСЯ" onClick={()=>navigate('/cart')}/>
        <GreenButton text="ВОЙТИ" onClick={()=>navigate('/auth')}/>
      </div>
    </header>
  )
}