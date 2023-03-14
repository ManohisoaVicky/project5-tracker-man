import React from 'react'

import "./Input.css"

function Input(props) {
    let element = 
    props.name === "username" ? (
        <input
        type={props.type}
        value={props.value}
        name={props.name}
        onChange={(e) => props.handleChange(e)}
        onBlur={props.blurHandler}
        className={props.name}
        label={props.label}
        />
  ) : (props.name === "password" || props.name === "password_confirmation") && (
    <input 
    type={props.type}
    value={props.value}
    name={props.name}
    onChange={(e) => props.handleChange(e)}
    onBlur={props.blurHandler}
    className={props.name}
    autoComplete={props.autoComplete}
    />
  ) 
  return (
    <>{element}</>
  )
}

export default Input