import React from 'react'

import "./Label.css"

function Label(props) {

    let label = 
    ((props.label === "Email") || (props.label === "Password") || (props.label === "Username") || (props.label === "Password Confirmation")) && (
        <label className='auth-label'>{props.label}</label>
    )

  return (
    <>
        {label}
    </>
  )
}

export default Label