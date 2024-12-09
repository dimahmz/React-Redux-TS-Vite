import axios from "axios";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_BACK_END_API;

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add authentication token if exists

    const token = Cookies.get("token");

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
