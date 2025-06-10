import React, { useContext, useEffect, useState } from 'react';
import ProfileLabel from '../../components/ProfileLabel/ProfileLabel';
import ava from '../../img/ava.svg';
import './Profile.css';
import OrangeButton from './../../components/OrangeButton/OrangeButton';
import StyledInput from '../../components/Input/Input';
import { useNavigate } from 'react-router-dom';
import PetCard from '../../components/PetCard/PetCard';
import { AuthContext } from '../../components/AuthContext';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {logout} = useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      const response = await fetch("http://localhost:8080/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке профиля');
      }

      const data = await response.json();
      setProfileData(data);
      setEditData(data);
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/auth');
        return;
      }

      const response = await fetch("http://localhost:8080/profile/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(editData)
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении профиля');
      }
      console.log(response.json());
      fetchProfile();
      setEditMode(false);
    } catch (err) {
      setError(err.message);
      console.log(err);
      console.error('Ошибка:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!profileData) {
    return <div>Нет данных профиля</div>;
  }

  return (
    <div className="wrapper">
      <div className='main'>
        <div className="profile-container">
          <div className="profile-container__avatar">
            <img src={ava} alt='User avatar' />
          </div>
          <div className="profile-container__data">
            <h1 className='data-header'>Владелец</h1>
            
            {editMode ? (
              <>
                <label className="profile-label-header">Имя</label>
                <StyledInput 
                  name="name"
                  value={editData.name || ''}
                  onChange={handleInputChange}
                  label="Имя"
                />
                <label className="profile-label-header">Фамилия</label>
                <StyledInput 
                  name="surname"
                  value={editData.surname || ''}
                  onChange={handleInputChange}
                  label="Фамилия"
                />
                <label className="profile-label-header">Отчество</label>
                <StyledInput 
                  name="patronymic"
                  value={editData.patronymic || ''}
                  onChange={handleInputChange}
                  label="Отчество"
                />
                <label className="profile-label-header">Телефон</label>
                <StyledInput 
                  name="phone_number"
                  value={editData.phone_number || ''}
                  onChange={handleInputChange}
                  label="Телефон"
                />
                <label className="profile-label-header">E-mail</label>
                <StyledInput 
                  name="email"
                  value={editData.email || ''}
                  onChange={handleInputChange}
                  label="E-mail"
                />
                <label className="profile-label-header">Адрес</label>
                <StyledInput 
                  name="address"
                  value={editData.address || ''}
                  onChange={handleInputChange}
                  label="Адрес"
                />
              </>
            ) : (
              <>
                <ProfileLabel label_text={profileData.name} label_header="Имя" />
                <ProfileLabel label_text={profileData.surname} label_header="Фамилия" />
                <ProfileLabel label_text={profileData.patronymic || '...'} label_header="Отчество" />
                <ProfileLabel label_text={profileData.phone_number || '...'} label_header="Телефон" />
                <ProfileLabel label_text={profileData.email} label_header="E-mail" />
                <ProfileLabel label_text={profileData.address || '...'} label_header="Адрес" />
              </>
            )}

            <div className="profile-container__button-area">
              {editMode ? (
                <>
                  <OrangeButton 
                    text={isSaving ? "Сохранение..." : "Сохранить"} 
                    onClick={handleSave}
                    disabled={isSaving}
                  />
                  <OrangeButton 
                    text="Отмена" 
                    onClick={() => setEditMode(false)}
                    style={{ marginLeft: '10px', backgroundColor: 'gray' }}
                  />
                </>
              ) : (
                <OrangeButton 
                  text="Редактировать" 
                  onClick={() => setEditMode(true)}
                />
                
              )}
              <OrangeButton 
                  text="Выйти"
                  style={{backgroundColor: "rgb(255,0,0)"}} 
                  onClick={() => logout()}
                />
            </div>
          </div>
          <div className="pets-section">
              <h2 className="pets-header">Мои питомцы</h2>
                <OrangeButton 
                  text="Добавить питомца" 
                  onClick={() => navigate('/add-pet')}
                  
                />
              {profileData.pets && profileData.pets.length > 0 ? (
                <div className="pets-list">
                  {profileData.pets.map(pet => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              ) : (
                <p className="no-pets-message">У вас пока нет зарегистрированных питомцев</p>
                
              )}
            </div>
        </div>
      </div>
    </div>
  );
}