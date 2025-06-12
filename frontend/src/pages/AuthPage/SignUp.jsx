import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/AuthContext';
import './AuthPage.css';
import GreenButton from '../../components/GreenButton/GreenButton';
import { Link } from 'react-router-dom';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, surname, email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Регистрация провалена');
      }
      
      navigate('/');
      login(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Регистрация</h2>
      {error && <div className="auth-error">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          className="auth-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
          required
        />
        <input
          className="auth-input"
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Фамилия"
          required
        />
        <input
          className="auth-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
        />
        <GreenButton 
                  className="auth-button" 
                  type="submit"
                  disabled={loading}
                  text={loading ? 'Загрузка...' : 'Создать'}
                >
                </GreenButton>
      </form>
      <div className="auth-link">
        Уже есть аккаунт? <Link to="/auth">Войти</Link>
      </div>
    </div>
  );
}