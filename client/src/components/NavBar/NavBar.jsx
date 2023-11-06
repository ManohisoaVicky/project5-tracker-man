import React from 'react'
import { NavLink, Link }  from "react-router-dom"

import useUser from '../../hooks/useUser'
import trackerManLogo from "../../images/trackerman_logo.png"
import trackerManLightLogo from "../../images/trackerman_logo_light.png"
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
    <>
      <div id="navbar-container">
        <NavLink to="/" id="nav-title-cont">
          <div className="logo-container">
            <img
              src={trackerManLogo}
              alt="TrackerMan Logo"
              className="logo front"
            />
            <img
              src={trackerManLightLogo}
              alt="TrackerMan Light Logo"
              className="logo back"
            />
          </div>
          <span id="nav-title">TRACKER MAN</span>
        </NavLink>
        {navLeft}
      </div>
      <div id='nav-menu'>
        <div id='nav-menu-list'>
          <Link to="/">Home</Link>
          <Link to="/browse">Browse</Link>
        </div>
        <Link to="/track">Track</Link>
      </div>
    </>
  );
}

export default NavBar