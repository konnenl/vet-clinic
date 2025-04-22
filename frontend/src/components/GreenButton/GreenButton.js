import React from 'react'
import './GreenButton.css'

export default function GreenButton(props) {
  return (
    <button className='green-button '>
        {props.text}
    </button>
  )
}
