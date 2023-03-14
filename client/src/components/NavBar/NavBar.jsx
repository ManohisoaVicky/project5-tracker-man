import React from 'react'

import { NavLink, Link }  from "react-router-dom"

import "./NavBar.css"

function NavBar() {
  return (
    <div id='navbar-container'>
      <NavLink to="/" id='navbar-title'>MERAKI SCANS</NavLink>
      <div id='auth-btn-container'>
        <Link to="/login" className='auth-btn' id='login-btn'>LOGIN</Link>
        <Link to="/signup" className='auth-btn' id='signup-btn'>SIGN UP</Link>
      </div>
    </div>
  )
}

export default NavBar