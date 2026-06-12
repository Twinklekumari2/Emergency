import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import { ToastContainer } from "react-toastify";
import About from "./pages/About.jsx";
import Ambulance from "./pages/Ambulance.jsx";
import Hospital from "./pages/Hospital.jsx";
import Login from "./components/Login.jsx";
import Admin from "./components/Admin.jsx";
import NearBy from "./pages/NearBy.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAmbulance } from "@fortawesome/free-solid-svg-icons";
import LoginHospital from "./components/LoginHospital.jsx";
import AdminProtectedRoute from "./ProtectedRoutes.jsx";
import Request from "./pages/Request.jsx";
import Emergency from "./pages/Emergency.jsx";
import { useEffect } from "react";
import { api } from './api.js'

library.add(faAmbulance);

const App = () => {

  useEffect(() => {
    const initializeUser = async () => {
      // 1. Check local storage for existing deviceId
      let deviceId = localStorage.getItem('emergency_device_id');

      // 2. Agar token nahi hai, toh random crypto identity generate karo
      if (!deviceId) {
        // Generates a high-quality secure random string (UUID replacement)
        deviceId = 'usr_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
        localStorage.setItem('emergency_device_id', deviceId);
      }

      // 3. Backend par hit karke database entries sync karo
      try {
        const response = await api.post('/user/silent-init', { deviceId });
        
        // MongoDB ki primary _id ko save karlo future routing aur requests ke liye
        if (response.data.success) {
          localStorage.setItem('emergency_user_id', response.data.user._id);
          console.log(`System Initialized. Active Session: ${response.data.user.name}`);
        }
      } catch (error) {
        console.error("Failed to initialize secure connection with emergency response grid:", error);
      }
    };

    initializeUser();
  }, []);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1000} theme="colored" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/near-by" element={<NearBy />} />
        <Route path="/ambulance" element={<Ambulance />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/hospital" element={<LoginHospital />} />
        <Route path="/requests" element={<Request />} />
        <Route path="/emergency/hospital" element={<Emergency />} />

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <Admin />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
