import React from 'react';
import './../styles/footer.css';

const Footer = () => {
  return (
    <div className="footer">
       <div className='footer-left'>
      <div className="footer-logo">
        <h1>EMER<span>G</span>ENCY</h1>
        <p>Your Instant Emergency & <br />Ambulance Help Platform</p>
      </div>

      <div className="footer-sections">

        <div className="footer-box">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Nearby Hospitals</li>
            <li>Ambulance Services</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-box">
          <h3>Emergency Helplines</h3>
          <ul>
            <li>Ambulance: 108</li>
            <li>Police: 100</li>
            <li>Fire: 101</li>
            <li>Women Helpline: 1091</li>
            <li>Disaster Mgmt: 112</li>
          </ul>
        </div>

        <div className="footer-box">
          <h3>Services</h3>
          <ul>
            <li>Location Detection</li>
            <li>Nearest Hospital Locator</li>
            <li>Instant Ambulance Call</li>
            <li>Emergency Guidance</li>
            <li>One-Tap SOS</li>
          </ul>
        </div>

        <div className="footer-box">
          <h3>About</h3>
          <ul>
            <li>Our Mission</li>
            <li>Our Vision</li>
            <li>Why We Exist</li>
            <li>How We Save Lives</li>
            <li>India’s 1st Emergency Platform</li>
          </ul>
        </div>

      </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Emergency India — Bringing Help Faster.</p>
      </div>

    </div>
  );
};

export default Footer;
