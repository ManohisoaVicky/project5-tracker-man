import React from 'react'
import { NavLink, Link }  from "react-router-dom"

import useUser from '../../hooks/useUser'
import Button from '../Button/Button'

import "./NavBar.css"

function NavBar() {

  const { handleLogOut, user } = useUser()

  let navLeft = user ? (
    <div id='nav-user-cont'>
      <Button text="LOG OUT" handleLogOut={handleLogOut} />
      <p id="navUsername">{user.username.toUpperCase()}</p>
    </div>
  ) : (
    <div id="auth-btn-container">
      <Link to="/login" className="auth-btn" id="login-btn">
        LOGIN
      </Link>
      <Link to="/signup" className="auth-btn" id="signup-btn">
        SIGN UP
      </Link>
    </div>
  );

  return (
    <div id='navbar-container'>
      <NavLink to="/" id='navbar-title'>MERAKI SCANS</NavLink>
        {navLeft}
    </div>
  )
}

export default NavBar