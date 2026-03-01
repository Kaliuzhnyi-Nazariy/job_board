import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3001/api",
  baseURL: "https://job-board-backend-ny7k.onrender.com/api",
  withCredentials: true,
});

export default api;
