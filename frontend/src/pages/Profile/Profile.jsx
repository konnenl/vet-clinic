import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ProfileLabel from '../../components/ProfileLabel/ProfileLabel';
import ava from '../../img/ava.svg';
import './Profile.css';
import OrangeButton from './../../components/OrangeButton/OrangeButton';

export default function Profile() {
    return (
        <div className="wrapper">
            <Header />
            <div className='main'>
                <div className="profile-container">
                    <div className="profile-container__avatar">
                        <img src={ava} alt='User avatar' />
                    </div>
                    <div className="profile-container__data">
                        <h className='data-header'>Владелец</h>
                        <ProfileLabel label_text="Камиль" label_header="Имя" />
                        <ProfileLabel label_text="Бахтияров" label_header="Фамилия" />
                        <ProfileLabel label_text="+7 967 877 85 09" label_header="Телефон" />
                        <ProfileLabel label_text="kamabaxaxd@gmail.com" label_header="E-mail" />
                    </div>
                </div>
                <div>
                    <OrangeButton text="Добавить питомца" />
                </div>
            </div>

        </div>
    )
}
