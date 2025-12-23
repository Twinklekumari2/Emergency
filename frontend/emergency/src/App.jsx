import React from 'react'
import Navbar from './components/Navbar'
import { Route,Routes,Navigate, useNavigate} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import { ToastContainer } from 'react-toastify';
import About from './pages/About.jsx';
import Ambulance from './pages/Ambulance.jsx';
import Hospital from './pages/Hospital.jsx';
import Login from './components/Login.jsx'
import Admin from './components/Admin.jsx';
import NearBy from './pages/NearBy.jsx';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAmbulance } from "@fortawesome/free-solid-svg-icons";
import LoginHospital from './components/LoginHospital.jsx';
import AdminProtectedRoute from "./ProtectedRoutes.jsx";
import Request from './pages/Request.jsx';
import Emergency from './pages/Emergency.jsx';

library.add(faAmbulance);


const App = () => {
  return (
    <div>
      <ToastContainer 
      position="top-right"
      autoClose={1000}
      theme="colored"
    />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/hospital' element={<Hospital/>}/>
        <Route path='/near-by' element={<NearBy/>}/>
        <Route path='/ambulance' element={<Ambulance/>}/>
        <Route path='/about-us' element={<About/>}/> 
        <Route path='/login' element={<Login/>}/>
        <Route path='/login/hospital' element={<LoginHospital/>}/>
        <Route path='/requests' element={<Request/>}/>
        <Route path='/emergency/hospital' element={<Emergency/>}/>

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
  )
}

export default App