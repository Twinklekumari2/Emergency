import React, { use, useEffect, useState } from 'react';
import axios from 'axios';
import './../styles/pages.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Content from '../components/Content';
import Profile from '../components/Profile'; // make a profile component

const Hospital = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [hospitalData, setHospitalData] = useState(null);
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const token = localStorage.getItem("hospital");

      if (!token) {
        setIsLogged(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/hospital/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log(res);

        setHospitalData(res.data.response);
        setIsLogged(true);
        if(res.data.response.verificationStatus === "Approved"){
          setApproved(true);
        }
      } catch (err) {
        setIsLogged(false);
      }
    }

    checkToken();
  },[]);

  return (
    <div>
      <Navbar/>

      {isLogged && approved ? (
        <Profile data={hospitalData} />   // SHOW PROFILE PAGE
      ) : (
        <Content/>                        // SHOW SIGNUP/LOGIN FORM
      )}

      <Footer/>
    </div>
  );
}

export default Hospital;
