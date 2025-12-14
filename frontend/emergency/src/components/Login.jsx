import React, { useState } from "react";
import axios from 'axios'
import './../styles/login.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    const url = isSignup
      ? "http://localhost:4000/user/signup"
      : "http://localhost:4000/user/login";

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
      const res = await axios.post(url , payload);

      setMessage(isSignup ? "Signup successful!" : "Login successful!");
      
      const token = res.data.token;
      localStorage.setItem("admin", token);

      navigate('/admin');
      toast.success('Login Successfully');
      setFormData({
        name:"",
        email:"",
        password:"",
        role:"",
      }
      )

    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="login">
      {/* <h2>{isSignup ? "Signup" : "Login"}</h2> */}
      <div className="login-box">
      <h1 className="login-heading">EMER<span>G</span>ENCY</h1>

      <form onSubmit={handleSubmit} className="form-login">

        {/* SIGNUP EXTRA FIELDS */}
        {isSignup && (
          <>
            <div className="login-details">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g Twinkle"
              />
            </div>

            <div className="login-details">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="admin only"
                required
              />
            </div>
          </>
        )}

        {/* COMMON FIELDS */}
        <div className="login-details">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g example@gmail.com"
            required
          />
        </div>

        <div className="login-details">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-btn">
        <button type="submit" className="login-submit">
          {isSignup ? "Signup" : "Login"}
        </button>

        </div>
      </form>

      <button onClick={() => setIsSignup(!isSignup)} className="login-login">
  {isSignup ? (
    <>
      Already have an account?{" "}
      <span style={{ color: "red" }}>Login</span>
    </>
  ) : (
    "Create an account"
  )}
</button>

      <p>{message}</p>
      </div>
    </div>
  );
};

export default AuthPage;
