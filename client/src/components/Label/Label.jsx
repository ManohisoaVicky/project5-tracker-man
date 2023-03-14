import React from 'react'

import "./Label.css"

function Label(props) {

    let label = 
    ((props.label === "Email") || (props.label === "Password")) && (
        <label className='login-label'>{props.label}</label>
    )

  return (
    <>
        {label}
    </>
  )
}

export default Label