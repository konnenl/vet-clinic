import { useState } from 'react';
import GreenButton from '../../components/GreenButton/GreenButton';
import OrangeButton from '../../components/OrangeButton/OrangeButton';
import './Cart.css';

export default function Cart() {
  const [selectedPet, setSelectedPet] = useState('dog_1');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [servicesList, setServicesList] = useState([
    { id: 1, name: 'Гигиенический уход для йорков', price: 5000, date: '22.03.2025' },
    { id: 2, name: 'Стрижка', price: 3000, date: '23.03.2025' }
  ]);

  const serviceOptions = [
    { id: 1, name: 'Гигиенический уход для йорков', price: 5000 },
    { id: 2, name: 'Стрижка', price: 3000 },
    { id: 3, name: 'Мытье', price: 2000 },
    { id: 4, name: 'Чистка зубов', price: 4000 },
    { id: 5, name: 'Обрезание когтей', price: 3500 },
    { id: 6, name: 'Комплексный уход', price: 6000 },
    { id: 7, name: 'Тримминг', price: 4500 },
    { id: 8, name: 'Уход за ушами', price: 1500 }
  ];

  const filteredServices = serviceOptions.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <select 
            className="pet-select"
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
          >
            <option value="dog_1">Хатико</option>
            <option value="dog_2">Кисегач</option>
            <option value="dog_3">Рекс</option>
          </select>
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
            <h3 className="section-title">Ваш заказ</h3>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}