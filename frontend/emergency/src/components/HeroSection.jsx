import React from 'react'
import './../styles/HeroSection.css'
import getUserLocation from './../script/location.js'
import { useNavigate } from 'react-router-dom'
import indiaImg from "../assets/india22.png";

const HeroSection = () => {
    const navigate = useNavigate();
    function handleSOS(){
        window.location.href = "tel:108";
    };
  return (
    <div className='hero-section'>
        <div className='left-hero-section'>
            <div className='lhs-heading'>
                <h1>Emergency?</h1>
                <h1>GetHelp <span>Near</span> You - Fast.</h1>
            </div>
            

            <div className='lhs-para'>
                <p>Locate Hospital,</p>
                <p>call emergency services,</p>
                <p>get real-time guidance instantly.</p>
            </div>

            <div className='lhs-buttons'>
                <div className='lhs-btn1'>
                    <div className='button btn' onClick={() => navigate('/near-by')}>Nearest Hospital</div>
                    <div className='button btn' onClick={getUserLocation}>Location</div>
                </div>
                <div>
                    <div className='button' onClick={handleSOS}>SOS</div>
                </div>
            </div>

        </div>
        <div className='right-hero-section'>
             <div className='image'>
                <img src={indiaImg} alt="india"/>
                <div className='tagline'>“Every District. Every Emergency. Covered.” </div>
             </div>
        </div>
    </div>
  )
}

export default HeroSection