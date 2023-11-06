import React from 'react'
import { Link } from 'react-router-dom'

import "./AcessDenied.css"

function AccessDenied() {
  return (
    <div id="access-denied-cont">
      <h1>ACCESS DENIED</h1>
        <p>This feature is for authenticated users only!</p>
      <div>
        <Link to="/login">LOG IN</Link>
        <span>OR</span>
        <Link to="/signup">SIGN UP</Link>
      </div>
    </div>
  );
}

export default AccessDenied