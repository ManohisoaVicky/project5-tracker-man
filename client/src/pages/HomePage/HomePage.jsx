import React from 'react'

import useUser from '../../hooks/useUser'

import DefaultPage from '../DefaultPage/DefaultPage'
import DashboardPage from '../DashboardPage/DashboardPage'
import "./HomePage.css"

function HomePage() {

  const { user } = useUser()

  return (
    <div className='homepage-container'>
      {
        user ? (
          <>
            <DashboardPage />
          </>
        ) : (
          <>
            <DefaultPage />
          </>
        )
      }
    </div>
  )
}

export default HomePage