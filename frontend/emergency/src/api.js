import axios from "axios";

const api = axios.create({
  baseURL: "https://emergency-y32u.onrender.com",
  withCredentials: true, // 🔥 important
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;