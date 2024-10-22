import React from 'react'
import { NavigationBar, SplashView } from '../components'

const SplashPage = () => {
  return (
    <div>
      <NavigationBar hideSearch />
      <SplashView />
    </div>
  )
}

export default SplashPage