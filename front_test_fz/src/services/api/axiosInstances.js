import {enviroments} from "./enviroments";
import axios from "axios";

const { API_URL } = enviroments.development;    

const axiosInstance = axios.create({
  baseURL: `${API_URL}`,
});

// Interceptor para agregar token automáticamente
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
