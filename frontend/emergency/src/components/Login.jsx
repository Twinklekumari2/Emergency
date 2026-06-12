import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup ? "/admin/signup" : "/admin/login";
    const payload = isSignup
      ? {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }
      : {
          email: formData.email,
          password: formData.password,
        };

    try {
      const res = await api.post(url, payload);
      setMessage(isSignup ? "Signup successful!" : "Login successful!");
      
      const token = res.data.token;
      localStorage.setItem("admin", token);

      navigate('/admin');
      toast.success('System Authorization Granted');
      setFormData({ name: "", email: "", password: "", role: "" });
    } catch (err) {
      console.error(err);
      setMessage("System validation protocol timeout.");
      toast.error("Authorization Denied");
    }
  };

  // Reusable core structural utility classes
  const labelStyles = "block font-mono text-[10px] tracking-widest text-stone-500 uppercase font-bold mb-1.5";
  const inputStyles = "w-full bg-[#000000] border border-stone-800 focus:border-red-600 rounded-sm p-3 text-sm text-stone-200 placeholder-stone-700 outline-none transition-all duration-200 focus:ring-1 focus:ring-red-600";

  return (
    <div className="min-h-screen w-full bg-[#000000] text-stone-200 antialiased flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 selection:bg-red-600 selection:text-white">
      
      {/* ----------- COMPACT CENTERED CREDENTIAL BLOCK ----------- */}
      <div className="w-full max-w-md bg-[#111111] border border-stone-900 p-6 sm:p-8 rounded-sm shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Urgent upper system bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600"></div>

        {/* Brand System Identifier */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center cursor-pointer" onClick={() => navigate("/")}>
            <h1 className="text-2xl font-black tracking-tighter text-white font-sans uppercase flex items-center">
              EMER
              <span className="text-3xl text-red-600 font-mono animate-pulse inline-block mx-[1px] -translate-y-[2px]">
                G
              </span>
              ENCY
            </h1>
          </div>
          <p className="font-mono text-[9px] tracking-widest text-stone-500 uppercase">
            {isSignup ? "Initialize Admin Node" : "Secure Gate Authorization"}
          </p>
        </div>

        {/* ----------- AUTHENTICATION FORM ----------- */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* SIGNUP EXTRA PARAMETERS */}
          {isSignup && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label htmlFor="name" className={labelStyles}>Operator Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Twinkle" className={inputStyles} />
              </div>

              <div>
                <label htmlFor="role" className={labelStyles}>Security Role</label>
                <input type="text" name="role" id="role" value={formData.role} onChange={handleChange} placeholder="e.g. System Admin" required className={inputStyles} />
              </div>
            </div>
          )}

          {/* COMMON CORE PARAMETERS */}
          <div>
            <label htmlFor="email" className={labelStyles}>Secure Email Link</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} placeholder="operator@emergencynet.in" required className={inputStyles} />
          </div>

          <div>
            <label htmlFor="password" className={labelStyles}>Access Key Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} placeholder="••••••••••••" required className={inputStyles} />
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full py-3.5 font-mono text-xs font-black tracking-widest uppercase text-white bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 rounded-sm shadow-lg shadow-red-950/40 transform active:scale-[0.99] transition-all"
            >
              {isSignup ? "Commit System Signup" : "Request Authorization"}
            </button>
          </div>
        </form>

        {/* ----------- SWITCH FLOW ACTION FOOTER ----------- */}
        <div className="text-center pt-2 border-t border-stone-950">
          <button 
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage("");
            }} 
            className="font-mono text-[11px] tracking-wide text-stone-500 hover:text-white transition-colors duration-150"
          >
            {isSignup ? (
              <>
                Already keyed into architecture? <span className="text-red-500 font-bold hover:underline">Login</span>
              </>
            ) : (
              <>
                New network node operator? <span className="text-red-500 font-bold hover:underline">Create Account</span>
              </>
            )}
          </button>
        </div>

        {/* Real-time System Message Prompt */}
        {message && (
          <p className="text-center font-mono text-[10px] text-amber-500 uppercase tracking-wider bg-black/40 border border-stone-950 py-2 rounded-sm">
            {message}
          </p>
        )}

      </div>
    </div>
  );
};

export default AuthPage;