import React from 'react'

import "./Button.css"

function Button(props) {

    let button = 
    props.text === "LOGIN" && (
        <button className='login-btn'>LOGIN</button>
    )

  return (
    <>
    {button}
    </>
  )
}

export default Button