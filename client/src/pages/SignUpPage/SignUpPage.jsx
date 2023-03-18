import React, { useState, } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp } from '../../utils/userServices'
import useUser from '../../hooks/useUser'

import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import Label from '../../components/Label/Label'
import "./SignUpPage.css"

function SignUpPage() {

  const navigate = useNavigate()

  const { handleAuth } = useUser()

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: ""
  })

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
  }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signUp(state);
        handleAuth();
        navigate("/");
      } catch (error) {
        alert("Invalid credentials!");
      }
    };

  return (
    <div id="signup-pg-cont">
      <form id="signup-form" onSubmit={handleSubmit}>
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