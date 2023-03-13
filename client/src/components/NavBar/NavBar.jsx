import React from 'react'

import "./NavBar.css"

function NavBar() {
  return (
    <div id='navbar-container'>
      <p id='navbar-title'>MERAKI SCANS</p>
      <div id='auth-btn-container'>
        <button className='auth-btn' id='login-btn'>LOGIN</button>
        <button className='auth-btn' id='signup-btn'>SIGN UP</button>
      </div>
    </div>
  )
}

export default NavBar