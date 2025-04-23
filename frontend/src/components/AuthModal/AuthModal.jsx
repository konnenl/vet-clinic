import React from 'react'
import Input from '../Input/Input'
import GreenButton from '../GreenButton/GreenButton'
import OrangeButton from '../OrangeButton/OrangeButton'
import './AuthModal.css'

export default function AuthModal() {
  return (
    <div className="modal">
        <span className="logo">Dogtor</span>
        <h4 className="modal__tittle">Вход в профиль</h4>
        <form className="modal__form">
          <div className="modal__form-group">
            <Input type="email" placeholder="E-mail:"/>
            <p className="error-message">Неверный email</p>
          </div>
          <div className="modal__form-group">
          <Input type="password" placeholder="Пароль"/>
            <p className="error-message">Неверный пароль</p>
          </div>
          <div className="modal__button-area">
            <GreenButton text='ВОЙТИ'/>
            <OrangeButton text='ЗАРЕГИСТРИРОВАТЬСЯ'/>
          </div>
        </form>
    </div>
  )
}
