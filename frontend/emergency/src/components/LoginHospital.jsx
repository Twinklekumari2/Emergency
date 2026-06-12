import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../api';

const LoginHospital = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    registrationNo: "",
    adminPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "/hospital/login";
      const res = await api.post(url, formData);
      
      const token = res.data.token;
      localStorage.setItem("hospital", token);
      
      toast.success("Secure Portal Access Granted");
      window.location.href = '/hospital';
    } catch (err) {
      console.error(err);
      toast.error("Authentication check failed. Invalid keys.");
    }
  };

  // Reusable core structural utility classes
  const labelStyles = "block font-mono text-[10px] tracking-widest text-stone-500 uppercase font-bold mb-1.5";
  const inputStyles = "w-full bg-[#000000] border border-stone-800 focus:border-red-600 rounded-sm p-3 text-sm text-stone-200 placeholder-stone-700 outline-none transition-all duration-200 focus:ring-1 focus:ring-red-600";

  return (
    <div className="min-h-screen w-full bg-[#000000] text-stone-200 antialiased flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 selection:bg-red-600 selection:text-white">
      
      {/* ----------- COHESIVE CENTERED CREDENTIAL BLOCK (Expanded Width) ----------- */}
      <div className="w-full max-w-xl bg-[#111111] border border-stone-900 p-8 sm:p-10 rounded-sm shadow-2xl space-y-8 relative overflow-hidden">
        
        {/* Urgent upper system bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600"></div>

        {/* Brand System Identifier */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-white font-sans uppercase flex items-center">
              EMER
              <span className="text-3xl sm:text-4xl text-red-600 font-mono animate-pulse inline-block mx-[1px] -translate-y-[2px]">
                G
              </span>
              ENCY
            </h1>
          </div>
          <p className="font-mono text-[9px] tracking-widest text-stone-500 uppercase">
            Hospital Portal Access Gate
          </p>
        </div>

        {/* ----------- CREDENTIAL ACCESS FORM ----------- */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="regno" className={labelStyles}>Facility Registration Number</label>
            <input 
              type="text" 
              name="registrationNo" 
              id="regno" 
              placeholder="e.g. REG-982374"
              value={formData.registrationNo} 
              onChange={handleChange} 
              className={inputStyles}
              required 
            />
          </div>

          <div>
            <label htmlFor="password" className={labelStyles}>Portal Access Password</label>
            <input 
              type="password" 
              name="adminPassword" 
              id="password" 
              placeholder="••••••••••••"
              value={formData.adminPassword} 
              onChange={handleChange} 
              className={inputStyles}
              required 
                />
              </div>

              {/* Action Commit Trigger */}
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-4 font-mono text-xs font-black tracking-widest uppercase text-white bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 rounded-sm shadow-xl shadow-red-950/40 transform active:scale-[0.99] transition-all duration-200"
                >
                  Authorize Node Connection
                </button>
              </div>
            </form>

            {/* Registration Direct Prompt Call */}
            <div className="text-center pt-2 border-t border-stone-950">
              <button 
                onClick={() => navigate('/hospital')}
                className="font-mono text-[11px] tracking-wide text-stone-500 hover:text-white transition-colors duration-150"
              >
                Do not have account?{' '}
                <span className="text-red-500 font-bold hover:underline">Create Here</span>
              </button>
            </div>

          </div>
    </div>
  );
};

export default LoginHospital;