import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OrangeButton from '../../components/OrangeButton/OrangeButton';
import StyledInput from '../../components/Input/Input';
import StyledSelect from '../../components/Select/Select';
import './AddPet.css'

export default function AddPetPage() {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'м',
    type_id: '',
    breed_id: '',
    color: '',
    weight: ''
  });
  const [petTypes, setPetTypes] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPetTypes();
  }, []);

  async function fetchPetTypes() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      const response = await fetch("http://localhost:8080/profile/pet", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке типов питомцев');
      }

      const data = await response.json();
      setPetTypes(data.types);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (e) => {
    const typeId = e.target.value;
    const selectedType = petTypes.find(type => type.name === typeId);
    
    setFormData(prev => ({
      ...prev,
      type_id: typeId,
      breed_id: '' 
    }));

    if (selectedType) {
      setBreeds(selectedType.breeds);
    } else {
      setBreeds([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      // Подготовка данных для отправки
      const payload = {
        name: formData.name,
        gender: formData.gender,
        breed_id: parseInt(formData.breed_id),
        color: formData.color,
        weight: formData.weight ? parseFloat(formData.weight) : null
      };

      const response = await fetch("http://localhost:8080/profile/pet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении питомца');
      }


      navigate('/profile');
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка данных...</div>;
  }

  if (error) {
    return <div className="error">Ошибка: {error}</div>;
  }

  return (
    <div className="add-pet-container">
      <h1 className="add-pet-header">Добавить питомца</h1>
      
      <form onSubmit={handleSubmit} className="add-pet-form">
        <div className="form-group">
          <label htmlFor="name">Имя питомца</label>
          <StyledInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Введите имя питомца"
          />
        </div>

        <div className="form-group">
          <label>Пол</label>
          <div className="gender-options">
            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="м"
                checked={formData.gender === 'м'}
                onChange={handleInputChange}
              />
              <span>Мужской</span>
            </label>
            <label className="gender-option">
              <input
                type="radio"
                name="gender"
                value="ж"
                checked={formData.gender === 'ж'}
                onChange={handleInputChange}
              />
              <span>Женский</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="type_id">Вид животного</label>
          <StyledSelect
            id="type_id"
            name="type_id"
            value={formData.type_id}
            onChange={handleTypeChange}
            required
          >
            <option value="">Выберите вид</option>
            {petTypes.map(type => (
              <option key={type.name} value={type.name}>{type.name}</option>
            ))}
          </StyledSelect>
        </div>

        <div className="form-group">
          <label htmlFor="breed_id">Порода</label>
          <StyledSelect
            id="breed_id"
            name="breed_id"
            value={formData.breed_id}
            onChange={handleInputChange}
            required
            disabled={!formData.type_id}
          >
            <option value="">Выберите породу</option>
            {breeds.map(breed => (
              <option key={breed.ID} value={breed.ID}>{breed.name}</option>
            ))}
          </StyledSelect>
        </div>

        <div className="form-group">
          <label htmlFor="color">Окрас</label>
          <StyledInput
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            required
            placeholder="Введите окрас питомца"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Вес (кг)</label>
          <StyledInput
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            min="0"
            value={formData.weight}
            onChange={handleInputChange}
            placeholder="Введите вес питомца"
          />
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="form-actions">
          <OrangeButton
            type="submit"
            text={isSubmitting ? "Добавление..." : "Добавить питомца"}
            disabled={isSubmitting}
          />
          <OrangeButton
            type="button"
            text="Отмена"
            onClick={() => navigate('/profile')}
            style={{ backgroundColor: 'gray', marginLeft: '10px' }}
          />
        </div>
      </form>
    </div>
  );
}