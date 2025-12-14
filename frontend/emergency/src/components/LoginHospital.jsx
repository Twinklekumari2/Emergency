import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import './../styles/loginHospital.css'

const LoginHospital = () => {
    const [formData, setFormData] = useState({
        registrationNo : "",
        adminPassword : "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }
    async function handleSubmit(e){
        e.preventDefault();
         try{
            const url = "http://localhost:4000/hospital/login"
            const res = await axios.post(url,formData);
            
            const token = res.data.token;
            localStorage.setItem("hospital", token)
            console.log(res);
            toast.success("Login Succesffully");

         }catch(err){
            console.log(err);
         }
    }
  return (
    <div className='login-hospital'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="regno">Registration Number</label>
            <input 
            type="text"
            name="registrationNo"
            id="regno"
            required
            value={formData.registrationNo}
            onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input 
            type="password"
            name="adminPassword"
            id="password"
            required
            value={formData.adminPassword}
            onChange={handleChange}
            />
          </div>
          <input type="submit"/>
        </form>
    </div>
  )
}

export default LoginHospital