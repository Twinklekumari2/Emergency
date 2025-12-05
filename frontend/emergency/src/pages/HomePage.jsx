import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import './../styles/pages.css'
import About from '../components/About'
import Mission from '../components/Mission'
import Vision from '../components/Vision'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className='home-page'>
        <Navbar/>
        <HeroSection/>
        <About/>
        <Mission/>
        <Vision/>
        <Footer/>
    </div>
  )
}

export default HomePage