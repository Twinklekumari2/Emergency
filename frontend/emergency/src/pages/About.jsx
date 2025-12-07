import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './../styles/pages.css'
import WhyItMatters from '../components/WhyItMatters'

const About = () => {
  return (
    <div className='about-page'>
        <Navbar/>
        <WhyItMatters/>
        <Footer/>
    </div>
  )
}

export default About