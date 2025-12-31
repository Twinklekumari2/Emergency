import axios from "axios";

export const api = axios.create({
  // baseURL: "https://emergency-y32u.onrender.com",
  baseURL:"http://localhost:4000/",
  withCredentials: true, // 🔥 important
  headers: {
    "Content-Type": "application/json"
  }
});
