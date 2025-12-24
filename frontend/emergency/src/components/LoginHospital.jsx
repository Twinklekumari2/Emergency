import { api } from '../api'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import './../styles/loginHospital.css'
import Image from './../assets/india22.png'
import { useNavigate } from 'react-router-dom'

const LoginHospital = () => {
  const navigate = useNavigate()
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
            const url = "/hospital/login"
            const res = await api.post(url,formData);
            
            const token = res.data.token;
            localStorage.setItem("hospital", token)
            console.log(res);
            toast.success("Login Succesffully");
            window.location.href = '/hospital'

         }catch(err){
            console.log(err);
         }
    }
  return (
    <div className='login-hospital'>
      <div>
        <img src={Image} alt="" />
      </div>
      <div className='container-login-hospital'>
         <h1 className="login-heading">EMER<span>G</span>ENCY</h1>
         <br />
         <br />
        <form onSubmit={handleSubmit}>
          <div className='labelwithinput'>
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
          <div className='labelwithinput'>
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
          <div className='profile-btns'>
            <button>Login</button>
          </div>
        </form>
        <p>Do not have account?
           <span 
           className='signupoption' 
           onClick={() => navigate('/hospital')}
        >
           Create Here
          </span>
        </p>
      </div>
        
    </div>
  )
}

export default LoginHospital