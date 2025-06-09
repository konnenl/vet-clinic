import React, { useEffect, useState } from 'react';
import ProfileLabel from '../../components/ProfileLabel/ProfileLabel';
import ava from '../../img/ava.svg';
import './Profile.css';
import OrangeButton from './../../components/OrangeButton/OrangeButton';
import StyledInput from '../../components/Input/Input';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [edit, setEdit] = useState(false);
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
    } catch (err) {
      setError(err.message);
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  }

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
            {/* {edit ? (<ProfileLabel label_text={profileData.name} label_header="Имя" />):(<StyledInput value={profileData.name} label_header="Имя" />)} */}
            <ProfileLabel label_text={profileData.name} label_header="Имя" />
            <ProfileLabel label_text={profileData.surname} label_header="Фамилия" />
            <ProfileLabel label_text={profileData.patronymic || '...'} label_header="Отчество" />
            <ProfileLabel label_text={profileData.phone_number || '...'} label_header="Телефон" />
            <ProfileLabel label_text={profileData.email} label_header="E-mail" />
            {/* <div className="profile-container__button-area">
                <OrangeButton text="Редактировать" onClick = {()=>{edit?setEdit(false):setEdit(true)}}/>
            </div> */}
          </div>
        </div>
        <div className='pet-container'>
            <OrangeButton text="Добавить питомца"/>
        </div>
      </div>
    </div>
  );
}