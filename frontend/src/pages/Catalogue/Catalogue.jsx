import React, { useEffect, useState } from 'react';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import './Catalogue.css';
import { Link } from 'react-router-dom';

export default function Catalogue() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = 'Каталог';
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const response = await fetch("http://localhost:8080/main/services");
      if (!response.ok) {
        throw new Error('Ошибка загрузки услуг');
      }
      const data = await response.json();
      setServices(data.services || []); // Предполагаем, что данные приходят в поле services
    } catch (error) {
      console.error("Ошибка: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (services.length === 0) return <div className="no-services">Услуги не найдены</div>;

  return (
    <main className="catalogue-main">
      <div className="catalogue">
        {services.map((service, index) => (
          <Link 
            to={`/services/${service.name.toLowerCase()}`} 
            key={service.id || index}
            className="service-link"
          >
            <ServiceCard 
              title={service.name} 
              count={service.services ? service.services.length : 0} 
              src={service.image}
            />
          </Link>
        ))}
      </div>
    </main>     
  );
}