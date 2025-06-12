import { useEffect, useState } from 'react';
import GreenButton from '../../components/GreenButton/GreenButton';
import OrangeButton from '../../components/OrangeButton/OrangeButton';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const filteredServices = serviceOptions.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchProfileAndServices();
  }, []);

  const fetchProfileAndServices = async () => {
    try {
      const token = localStorage.getItem('token');

      const profileResponse = await fetch('http://localhost:8080/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!profileResponse.ok) {
        throw new Error('Ошибка при загрузке профиля');
      }
      
      const profileData = await profileResponse.json();
      setPets(profileData.pets || []);
      

      if (profileData.pets && profileData.pets.length > 0) {
        setSelectedPet(profileData.pets[0].id.toString());
      }
      
      await fetchServices();
      
      setLoading(false);
    } catch (error) {
      console.error('Ошибка:', error);
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8080/main/services');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке услуг');
      }
      const data = await response.json();

      const allServices = data.services.flatMap(category => 
        category.services.map(service => ({
          ...service,
          category: category.name
        }))
      );
      
      setServiceOptions(allServices);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };


  const handleAddService = (e) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate) return;
    
    const selectedServiceData = serviceOptions.find(
      service => service.id === parseInt(selectedService)
    );
    
    if (!selectedServiceData) return;
    
    const newService = {
      id: Date.now(),
      name: selectedServiceData.name,
      price: selectedServiceData.price,
      date: formatDate(selectedDate)
    };
    
    setServicesList([...servicesList, newService]);
    resetForm();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const resetForm = () => {
    setSelectedService('');
    setSearchTerm('');
    setSelectedDate('');
    setShowDropdown(false);
  };

  const handleCheckout = async () => {
  if (servicesList.length === 0 || !selectedPet) {
    alert('Пожалуйста, добавьте услуги и выберите питомца');
    return;
  }

  try {
    const token = localStorage.getItem('token');
  
    const formattedDate = servicesList[0].date; 
    const [day, month, year] = formattedDate.split('.');
    const isoDate = new Date(`${year}-${month}-${day}T12:00:00Z`).toISOString();

    const visitData = {
      pet_id: parseInt(selectedPet),
      datetime: isoDate,
      type: "В клинике",
      services: servicesList.map(service => {
        const originalService = serviceOptions.find(s => s.name === service.name);
        return { id: originalService ? originalService.id : service.id };
      })
    };

    const response = await fetch('http://localhost:8080/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(visitData)
    });

      if (!response.ok) {
        throw new Error('Ошибка при оформлении заказа');
      }

      const result = await response.json();
      console.log('Заказ успешно оформлен:', result);
      alert('Заказ успешно оформлен!');
    
      setServicesList([]);
      resetForm();
      navigate('/history');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Произошла ошибка при оформлении заказа: ' + error.message);
    }
  };

  const calculateTotal = () => {
    return servicesList.reduce((total, service) => total + service.price, 0);
  };

  const handleRemoveService = (id) => {
    setServicesList(servicesList.filter(service => service.id !== id));
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service.id.toString());
    setSearchTerm(service.name);
    setShowDropdown(false);
  };

  return (
    <div className="cart-container">
      <div className="cart-card">
        <div className='pet-select-section'>
          <h3 className="section-title">Выберите питомца</h3>
          {pets.length > 0 ? (
            <select 
              className="pet-select"
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
            >
              {pets.map(pet => (
                
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
          ) : (
            <p>У вас нет зарегистрированных питомцев</p>
          )}
        </div>
        
        <div className="services-section">
          <div className="add-service-form">
            <h3 className="section-title">Добавить услугу</h3>
            <form className="service-form" onSubmit={handleAddService}>
              <div className="form-group search-group">
                <label htmlFor="service-search">Услуга:</label>
                <div className="search-container">
                  <input
                    id="service-search"
                    type="text"
                    className="form-input search-input"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    placeholder="Введите услугу"
                    required
                  />
                  <input type="hidden" value={selectedService} name="selectedService" />
                  {showDropdown && searchTerm && (
                    <div className="search-dropdown">
                      {filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                          <div
                            key={service.id}
                            className="dropdown-item"
                            onClick={() => handleServiceSelect(service)}
                          >
                            {service.name} - {service.price} руб.
                          </div>
                        ))
                      ) : (
                        <div className="dropdown-item no-results">Ничего не найдено</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="service-date">Дата:</label>
                <input 
                  type="date" 
                  id="service-date"
                  className="form-input"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
              <GreenButton 
                text="Добавить услугу" 
                className="add-button"
                type="submit"
              />
            </form>
          </div>
          
          <div className="price-summary">
            <h3 className="section-title">Услуги</h3>
            <div className="services-list">
              {servicesList.length > 0 ? (
                servicesList.map((service) => (
                  <div className="service-item" key={service.id}>
                    <div className="service-info">
                      <h4>{service.name}</h4>
                      <p className="service-date">{service.date}</p>
                    </div>
                    <div className="service-actions">
                      <span className="service-price">{service.price} руб.</span>
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveService(service.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-message">Нет добавленных услуг</p>
              )}
            </div>
            
            <div className="total-price">
              <h4>Итого:</h4>
              <span className="total-amount">{calculateTotal()} руб.</span>
            </div>
            
            <OrangeButton 
              text="Перейти к оформлению" 
              className="checkout-button"
              disabled={servicesList.length === 0}
              onClick={handleCheckout} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}