import React from 'react'
import GreenButton from '../GreenButton/GreenButton'
import OrangeButton from '../OrangeButton/OrangeButton'
import './Header.css'
import AuthModal from '../AuthModal/AuthModal'

export default function Header() {
  const [isModalOpen,setModal] = React.useState(false);
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
        <GreenButton text="ВОЙТИ" onClick={()=>setModal(true)}/>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={()=>setModal(false)} />
    </header>
  )
}