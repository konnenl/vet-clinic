import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css'; // Создайте этот файл для стилей

export default function History() {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getVisits();    
    }, []);

    async function getVisits() {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/auth');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/visits', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }

            const data = await response.json();
            setVisits(data.visits || []);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (visits.length === 0) return <div className="no-visits">Нет данных о визитах</div>;

    return (
        <div className="history-container">
            <h2>История посещений</h2>
            
            {visits.map(pet => (
                <div key={pet.pet_id} className="pet-card">
                    <h3 className="pet-name">Питомец: {pet.name}</h3>
                    
                    <div className="visits-list">
                        {pet.visits.map(visit => (
                            <div key={visit.visit_id} className="visit-card">
                                <div className="visit-header">
                                    <span className="visit-date">
                                        {new Date(visit.datetime).toLocaleDateString('ru-RU', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </span>
                                    <span className={`visit-status ${visit.status.toLowerCase()}`}>
                                        {visit.status}
                                    </span>
                                </div>
                                
                                <div className="visit-services">
                                    <h4>Услуги:</h4>
                                    <ul>
                                        {visit.services.map(service => (
                                            <li key={service.id}>
                                                {service.name} - {service.price} руб.
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="visit-total">
                                    Общая стоимость: {visit.services.reduce((sum, service) => sum + service.price, 0)} руб.
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}