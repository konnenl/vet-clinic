import React, { useState } from 'react';
import Input from '../Input/Input';
import OrangeButton from '../OrangeButton/OrangeButton';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [authForm, setForm] = useState(0);
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
  });
  const [signUp, setSignUp] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignIn(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUp(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateSignIn = () => {
    const newErrors = {};
    if (!signIn.email) newErrors.email = 'Email обязателен';
    if (!signIn.password) newErrors.password = 'Пароль обязателен';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = () => {
    const newErrors = {};
    if (!signUp.name) newErrors.name = 'Имя обязательно';
    if (!signUp.surname) newErrors.surname = 'Фамилия обязательна';
    if (!signUp.email) newErrors.email = 'Email обязателен';
    if (!signUp.password) newErrors.password = 'Пароль обязателен';
    if (signUp.password !== signUp.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const makeRequest = async (url, method, body) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw { response, data };
      }

      return data;
    } catch (error) {
      if (error.response) {
        throw error;
      }
      throw {
        response: { status: 0 },
        data: { error: 'Ошибка сети' }
      };
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    try {
      const data = await makeRequest('/auth/signup', 'POST', {
        name: signUp.name,
        surname: signUp.surname,
        email: signUp.email,
        password: signUp.password
      });

      onAuthSuccess(data.id);
      onClose();
    } catch (error) {
      const { status, data } = error.response || {};
      
      if (status === 400) {
        setErrors(data.fields || {});
      } else if (status === 409) {
        setErrors({ email: data.error });
      } else {
        setErrors({ general: data?.error || 'Произошла ошибка' });
      }
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn()) return;

    try {
      const data = await makeRequest('/auth/signin', 'POST', {
        email: signIn.email,
        password: signIn.password
      });

      onAuthSuccess(data.id);
      onClose();
    } catch (error) {
      const { status, data } = error.response || {};
      
      if (status === 400) {
        setErrors(data.fields || {});
      } else if (status === 401) {
        setErrors({ general: data.error });
      } else {
        setErrors({ general: data?.error || 'Произошла ошибка' });
      }
    }
  };

  if (!isOpen) return null;

  if (authForm === 0) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal__container">
            <span className="logo">Dogtor</span>
            <h4 className="modal__tittle">Вход в профиль</h4>
          </div>
          <form className="modal__form" onSubmit={handleSignIn}>
            <div className="modal__form-group">
              <Input 
                type="email" 
                name="email"
                placeholder="E-mail:"
                value={signIn.email}
                onChange={handleSignInChange}
                error={!!errors.email}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div className="modal__form-group">
              <Input 
                type="password" 
                name="password"
                placeholder="Пароль"
                value={signIn.password}
                onChange={handleSignInChange}
                error={!!errors.password}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            {errors.general && <p className="error-message">{errors.general}</p>}
            <div className="modal__button-area">
              <OrangeButton 
                type="submit" 
                text={isLoading ? 'Загрузка...' : 'ВОЙТИ'}
                disabled={isLoading}
              />
            </div>
          </form>
          <a href="#" onClick={() => setForm(1)}>Создать учетную запись</a>
        </div>
      </div>
    );
  }

  if (authForm === 1) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close" onClick={onClose}>×</button>
          <div className="modal__container">
            <span className="logo">Dogtor</span>
            <h4 className="modal__tittle">Регистрация</h4>
          </div>
          <form className="modal__form" onSubmit={handleSignUp}>
            <div className="modal__form-group">
              <Input 
                type="text" 
                name="name"
                placeholder="Имя:"
                value={signUp.name}
                onChange={handleSignUpChange}
                error={!!errors.name}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}
            </div>

            <div className="modal__form-group">
              <Input 
                type="text" 
                name="surname"
                placeholder="Фамилия:"
                value={signUp.surname}
                onChange={handleSignUpChange}
                error={!!errors.surname}
              />
              {errors.surname && <p className="error-message">{errors.surname}</p>}
            </div>
            
            <div className="modal__form-group">
              <Input 
                type="email" 
                name="email"
                placeholder="E-mail:"
                value={signUp.email}
                onChange={handleSignUpChange}
                error={!!errors.email}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            
            <div className="modal__form-group">
              <Input 
                type="password" 
                name="password"
                placeholder="Пароль:"
                value={signUp.password}
                onChange={handleSignUpChange}
                error={!!errors.password}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <div className="modal__form-group">
              <Input 
                type="password" 
                name="confirmPassword"
                placeholder="Повторите пароль:"
                value={signUp.confirmPassword}
                onChange={handleSignUpChange}
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            </div>

            {errors.general && <p className="error-message">{errors.general}</p>}

            <div className="modal__button-area">
              <OrangeButton 
                type="submit" 
                text={isLoading ? 'Регистрация...' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
                disabled={isLoading}
              />
            </div>
          </form>
          <a href="#" onClick={() => setForm(0)}>Уже есть аккаунт?</a>
        </div>
      </div>
    );
  }
}