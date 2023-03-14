import React, { useState } from 'react'

import Input from '../../components/Input/Input.jsx'
import Button from '../../components/Button/Button.jsx'
import Label from '../../components/Label/Label.jsx'
import "./LoginPage.css"

function LoginPage() {

  const [state, setState] = useState({
    email: "",
    password: ""
  })

  return (
    <div id='login-pg-cont'>
      <form id="login-form">
        <div className="login-input-container"> 
          <Label label="Email"/>
          <Input 
          name="username" 
          type="email"
          value={state.email}
          />
        </div>
        <div className="login-input-container">
          <Label label="Password"/>
          <Input
          name="password"
          type="password"
          value={state.password}
          />
        </div>
        <Button text="LOGIN"/>
      </form>
    </div>
  )
}

export default LoginPage