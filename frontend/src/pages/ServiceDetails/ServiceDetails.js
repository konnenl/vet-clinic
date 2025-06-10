import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ServiceDetails.css';

export default function ServiceDetails() {
  const { serviceName } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/main/services');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        const selectedService = data.services.find(
          s => s.name.toLowerCase() === serviceName.toLowerCase()
        );
        
        if (selectedService) {
          setServices(selectedService.services);
        } else {
          setError('Услуга не найдена');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [serviceName]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="service-details">
      <h2>{serviceName}</h2>
      <ul className="services-list">
        {services.map(service => (
          <li key={service.id} className="service-item">
            <h5 className='service-item__title'>{service.name}</h5>
            <p>Цена: {service.price} руб.</p>
          </li>
        ))}
      </ul>
    </div>
  );
}