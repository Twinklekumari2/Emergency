import React, { useState } from 'react'
import "./../styles/Navbar.css"
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import getUserLocation from './../script/location.js'


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    
    function handleClick(){
        setOpenMenu(!openMenu);
    }
  return (
    <div className='container'>
        {/* ----------- LEFT SIDE ----------- */}
        <div className='left-side'>
            <h1>EMER<span>G</span>ENCY</h1>
        </div>
        {/* ----------- MIDDLE ----------- */}
        <div className={`middle ${openMenu ? "showMenu" : ""} `}>
            <h3  
            className={location.pathname === "/" ? "active" : ""} 
            onClick={() => navigate('/')}>Home</h3>
            <h3 
            className={location.pathname === "/near-by" ? "active" : ""} 
            onClick={() => navigate('/near-by')}>NearBy</h3>
            <h3 
            className={location.pathname === "/hospital" ? "active" : ""} 
            onClick={() => navigate('/hospital')}>Hospital</h3>

            <h3
             className={location.pathname === "/ambulance" ? "active" : ""}  
             onClick={() => navigate('/ambulance')}>Ambulance</h3>
            <h3 
            className={location.pathname === "/about-us" ? "active" : ""} 
            onClick={() => navigate('/about-us')}>About</h3>
        </div>

        {/* ----------- RIGHT SIDE ----------- */}
        <div className='right-side'>
            <h3 
            className={location.pathname === "/login/hospital" ? "active" : ""} 
            onClick={() => navigate('/login/hospital')}>Login[Hospital]</h3>
            <h3
  onClick={() => {
    if (location.pathname === "/admin") {
      // LOGOUT
      localStorage.removeItem("admin");
      navigate("/login"); // or /admin/login
    } else {
      // LOGIN
      navigate("/login");
    }
  }}
>
  {location.pathname === "/admin" ? "Logout" : "Login [Admin]"}
</h3>

            {/* --------- HAMBURGER ----------- */}
        <div className='hamburger'>
            <div className='icon-hamburger' onClick={handleClick}>
               <FontAwesomeIcon icon={faList} size="2xl" style={{ color: "#f50000" }} />
            </div>
        </div>
 
        </div>

        

    </div>
  )
}

export default Navbar