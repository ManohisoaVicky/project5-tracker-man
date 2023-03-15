import React, { useState, } from 'react'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Label from '../../components/Label/Label'
import "./SignUpPage.css"

function SignUpPage() {

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: ""
  })

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]: [e.target.value]
    })
  }

  return (
    <div id="signup-pg-cont">
      <form id="signup-form">
        <div className="signup-input-container">
          <Label label="Username" />
          <Input
            name="username"
            type="username"
            value={state.username}
            handleChange={handleChange}
          />
        </div>
        <div className="signup-input-container">
          <Label label="Email" />
          <Input
            name="email"
            type="email"
            value={state.email}
            handleChange={handleChange}
          />
        </div>
        <div className="signup-input-container">
          <Label label="Password" />
          <Input
            name="password"
            type="password"
            value={state.password}
            handleChange={handleChange}
          />
        </div>
        <div className="signup-input-container">
          <Label label="Password Confirmation" />
          <Input
            name="passwordConf"
            type="password"
            value={state.passwordConf}
            handleChange={handleChange}
          />
        </div>
        <Button text="SIGN UP" />
      </form>
    </div>
  );
}

export default SignUpPage