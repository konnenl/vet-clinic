// AuthPage.js
import { useContext, useState } from 'react';
import { AuthContext } from '../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
        e.preventDefault();
        setError('');

        try{
            const response =  await fetch('http://localhost:8080/auth/signin',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            })
            const data = await response.json();
            console.log(data )
            if (!response.ok){
                throw new Error(data.message);
            }
            navigate.push('/');
        }catch(error){
            setError(error.message);
            console.error(error)
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