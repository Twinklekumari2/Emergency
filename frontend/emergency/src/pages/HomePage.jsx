import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import './../styles/pages.css'
const HomePage = () => {
  return (
    <div className='home-page'>
        <Navbar/>
        <HeroSection/>
    </div>
  )
}

export default HomePage