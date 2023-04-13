import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { login } from "../../utils/userServices"
import useUser from "../../hooks/useUser"

import AuthInput from '../../components/Inputs/AuthInput/AuthInput.jsx'
import Button from '../../components/Button/Button.jsx'
import Label from '../../components/Label/Label.jsx'
import "./LoginPage.css"

function LoginPage() {

  const navigate = useNavigate()

  const { handleAuth } = useUser()

  const [state, setState] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setState({
      ...state, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(state)
      handleAuth()
      navigate("/")
    } catch (error) {
      alert("Invalid credentials!")
    }
  }

  return (
    <div id="login-pg-cont">
      <form id="login-form" onSubmit={handleSubmit}>
        <div className="login-input-container">
          <Label label="Email" />
          <AuthInput
            name="email"
            type="email"
            value={state.email}
            handleChange={handleChange}
          />
        </div>
        <div className="login-input-container">
          <Label label="Password" />
          <AuthInput
            name="password"
            type="password"
            value={state.password}
            handleChange={handleChange}
          />
        </div>
        <Button text="LOGIN" />
      </form>
    </div>
  );
}

export default LoginPage