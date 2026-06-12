import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Content from '../components/Content';
import Profile from '../components/Profile';
import { api } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Hospital = () => {
  const [loading, setLoading] = useState(true); // Core optimization anchor
  const [isLogged, setIsLogged] = useState(false);
  const [hospitalData, setHospitalData] = useState(null);
  const [approved, setApproved] = useState(false);

useEffect(() => {
  async function checkToken() {
    const token = localStorage.getItem("hospital"); // Tumhara purana login token

    if (!token) {
      setIsLogged(false);
      setLoading(false);
      return;
    }

    // 1. sabse pehle check karo kya refresh hone ke baad data session mei hai?
    const cachedData = sessionStorage.getItem("hospital_profile");
    
    if (cachedData) {
      // Agar haan, toh bina API hit kiye data ko nikaal lo (Fetch)
      const parsedData = JSON.parse(cachedData);
      setHospitalData(parsedData);
      setIsLogged(true);
      if (parsedData.verificationStatus === "Approved") {
        setApproved(true);
      }
      setLoading(false);
      return; // API block ho gayi! Function yahan se wapas chala gaya.
    }

    // 2. Agar session storage khali hai (jaise pehli baar login karne par), toh API chalegi
    try {
      const res = await api.get("/hospital/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data?.response) {
        setHospitalData(res.data.response);
        setIsLogged(true);
        if (res.data.response.verificationStatus === "Approved") {
          setApproved(true);
        }

        // res.data.response ek object hai, isliye stringify karke text banaya aur store kiya
        sessionStorage.setItem("hospital_profile", JSON.stringify(res.data.response));
      }
    } catch (err) {
      console.error(err);
      setIsLogged(false);
    } finally {
      setLoading(false);
    }
  }

  checkToken();
}, []);

  return (
    <div className="min-h-screen bg-[#000000] text-stone-200 flex flex-col justify-between">
      <Navbar />

      {/* RENDER GRID INTERCEPTOR */}
      <main className="flex-grow">
        {loading ? (
          /* Secure Operational Sandbox Loader: Takes zero layout memory */
          <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
            <FontAwesomeIcon icon={faSpinner} className="text-red-600 text-3xl animate-spin" />
            <p className="font-mono text-xs tracking-widest uppercase text-stone-500">
              Verifying Grid Security Protocols...
            </p>
          </div>
        ) : isLogged && approved ? (
          <Profile data={hospitalData} />
        ) : (
          <Content />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Hospital;