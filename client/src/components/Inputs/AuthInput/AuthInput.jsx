import React from 'react'

import "./AuthInput.css"

function AuthInput(props) {
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
    required
        />
    ) : (props.name === "email") ? (
    <input
    type={props.type}
    value={props.value}
    name={props.name}
    onChange={(e) => props.handleChange(e)}
    onBlur={props.blurHandler}
    className={props.name}
    label={props.label}
    required
        />
  ) : (props.name === "password" || props.name === "passwordConf") && (
    <input 
    type={props.type}
    value={props.value}
    name={props.name}
    onChange={(e) => props.handleChange(e)}
    onBlur={props.blurHandler}
    className={props.name}
    autoComplete={props.autoComplete}
    required
    />
  ) 
  return (
    <>{element}</>
  )
}

export default AuthInput