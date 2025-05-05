import React from 'react'
import './ProfileLabel.css';
import '../../pages/Profile/Profile.css';
export default function ProfileLabel(props) {
    return (
        <div className='profile-container__data'>
            <label className="profile-label-header">{props.label_header}</label>
            <label className="profile-label">{props.label_text}</label>
        </div>

    )
}
