import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState('')

    const router = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setLoading(true);
    try {
        const response = await fetch('http://localhost:8080/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify({ name, surname, email, password })
        })
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Аутентификация провалена');
        }
        
        // Здесь data.token должен быть доступен
        console.log("ID:", data.id);
        console.log("Token:", data.token);
        
        // Сохраните токен в localStorage или куках
        localStorage.setItem('token', data.token);
        
        router.push('/');
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" name='surname' value={surname} onChange={(e)=>setSurname(e.target.value)}/>
            <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit'>Создать</button>
        </form>
    </div>
  )
}
