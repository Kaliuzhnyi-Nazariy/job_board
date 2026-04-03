import axios from "axios";

const api = axios.create({
  baseURL: "https://job-board-backend-ny7k.onrender.com/api",
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = "";
};

export default api;
