// AuthPage.js
import { useContext, useState } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',  
                },
                credentials: 'include',
                body: JSON.stringify({ email, password })
            })
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                throw new Error(data.error || 'Аутентификация провалена');
            }    
            router.push('/');
            login(data)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}