import React from 'react'
import { HomeView, NavigationBar } from '../components'
import { useLocation } from 'react-router-dom'

const HomePage = () => {
  const currentPage=useLocation();
  return (
    <div>
      <NavigationBar currentPage={currentPage}/>
      <HomeView />
    </div>
  )
}

export default HomePage