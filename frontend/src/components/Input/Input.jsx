import React from 'react'
import './Input.css'

export default function Input(props) {
  return (
    <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} name={props.name} value={props.value}/>
  )
}
