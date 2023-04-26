import React from 'react'

import "./Button.css"

function Button(props) {

    let button = 
    (props.text === "LOGIN" || props.text === "SIGN UP") ?  (
        <button className='login-btn'>{props.text}</button>
    ) : (props.text === "TRACK") && (
      <button className='track-btn' onClick={props.clickHandler}>{props.text}</button>
    )
  return (
    <>
    {button}
    </>
  )
}

export default Button