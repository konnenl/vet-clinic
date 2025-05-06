import React from 'react'
import './OrangeButton.css'

export default function OrangeButton(props) {
    return (
        <button className="orange-button" onClick={props.onClick}>
            {props.text}
        </button>
    )
}