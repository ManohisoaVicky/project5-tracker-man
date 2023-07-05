import React from 'react'
import { Link } from 'react-router-dom'
import MangaList from '../../components/MangasList/MangasList.jsx'

import "./DashboardPage.css"

function DashboardPage() {
  return (
    <div id='dashboardPage'>
      <div>dashboard</div>
      <Link to="/track" id='track-btn'>Track</Link>
      <MangaList />
    </div>
  )
}

export default DashboardPage