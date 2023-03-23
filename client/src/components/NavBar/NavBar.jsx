import React from 'react'
import { NavLink, Link }  from "react-router-dom"

import useUser from '../../hooks/useUser'

import "./NavBar.css"

function NavBar() {

  const { handleLogOut, user } = useUser()

  let navLeft = user ? (
    <div id='nav-user-cont'>
      <p onClick={handleLogOut} className="logout-btn">LOG OUT</p>
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
      <NavLink to="/" id='navbar-title'>TRACKER SCANS</NavLink>
        {navLeft}
    </div>
  )
}

export default NavBar