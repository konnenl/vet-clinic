import React from 'react'
import Input from '../Input/Input'
import GreenButton from '../GreenButton/GreenButton'
import OrangeButton from '../OrangeButton/OrangeButton'
import './AuthModal.css'

export default function AuthModal(isModalOpen, onClose) {

  const [authForm, setForm] = React.useState(0)
  if (!isModalOpen) return  null;

  if (authForm === 0)
  return (
    <div className="modal-overlay">
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
              <OrangeButton text='РЕГИСТРАЦИЯ' onClick={()=>setForm(1)}/>
            </div>
          </form>
      </div>
    </div>
  )
  if (authForm === 1)
    return (
      <div className="modal-overlay">
        <div className="modal">
            <span className="logo">Dogtor</span>
            <h4 className="modal__tittle">Регистрация</h4>
            <form className="modal__form">

              <div className="modal__form-group">
                <Input type="text" placeholder="Имя:"/>
                <p className="error-message">Неверный email</p>
              </div>

              <div className="modal__form-group">
                <Input type="text" placeholder="Фамилия:"/>
                <p className="error-message">Неверный email</p>
              </div>
              
              <div className="modal__form-group">
                <Input type="email" placeholder="E-mail:"/>
                <p className="error-message">Неверный email</p>
              </div>
              
              <div className="modal__form-group">
                <Input type="password" placeholder="Пароль:"/>
                <p className="error-message">Неверный пароль</p>
              </div>

              <div className="modal__form-group">
              <Input type="password" placeholder="Повторите пароль:"/>
                <p className="error-message">Неверный пароль</p>
              </div>

              <div className="modal__button-area">
                <GreenButton text='ОТПРАВИТЬ ДАННЫЕ'/>
                <OrangeButton text='ВХОД В ПРОФИЛЬ' onClick={()=>setForm(0)}/>
              </div>

            </form>
        </div>
      </div>
    )
}
