import React from 'react'

import { Link } from 'react-router-dom'

import "./DefaultPage.css"

function DefaultPage() {
  return (
    <div className='defaultPage'>
      <div id="default-section">
        <h1 id='default-title'>TRACKER SCANS</h1>
        <p id='default-slogan'>Keep track of all your collections. Browse, sort, and filter through your collections.</p>
        <Link to="/login" id='default-btn'>START TRACKING</Link>
      </div>
    </div>
  )
}

export default DefaultPage