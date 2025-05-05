import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
export default function Profile() {
    return (<div className="wrapper">
        <Header />
        <div className="profile-container">
            <div className="profile-container__avatar">
                <img src='https://e7.pngegg.com/pngimages/240/705/png-clipart-golden-retriever-puppy-dog-breed-labrador-retriever-beagle-golden-retriever-animals-carnivoran.png' alt='User avatar' />
            </div>
            <div className="profile-container__data">

            </div>
        </div>
    </div>
    )
}
