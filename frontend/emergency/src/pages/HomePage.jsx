import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import './../styles/pages.css'
import About from '../components/About'
import Mission from '../components/Mission'

const HomePage = () => {
  return (
    <div className='home-page'>
        <Navbar/>
        <HeroSection/>
        <About/>
        <Mission/>
    </div>
  )
}

export default HomePage