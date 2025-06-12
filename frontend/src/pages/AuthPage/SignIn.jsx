import { useContext, useState } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import GreenButton from '../../components/GreenButton/GreenButton';
import "./AuthPage.css"

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Аутентификация провалена');
      }
      
      router('/');
      login(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <h2 className="auth-title">Вход</h2>
      {error && <div className="auth-error">{error}</div>}
      <form className="auth-form" onSubmit={handleSubmit}>
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
          text={loading ? 'Загрузка...' : 'Войти'}
        >
        </GreenButton>
      </form>
      <div className="auth-link">
        Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
      </div>
    </div>
  );
}