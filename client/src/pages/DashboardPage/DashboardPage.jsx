import React from 'react'
import { Link } from 'react-router-dom'

import "./DashboardPage.css"

function DashboardPage() {
  return (
    <div id='dashboardPage'>
      <div>dashboard</div>
      <Link to="/track" id='track-btn'>Track</Link>
    </div>
  )
}

export default DashboardPage