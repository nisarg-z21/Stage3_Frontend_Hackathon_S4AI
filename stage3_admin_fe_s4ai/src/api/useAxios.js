import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Required to send cookies
});

// Request interceptor to add auth token if needed
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["x-access-token"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Generic GET method
const get = (url, config = {}) => axiosInstance.get(url, config);

// Generic POST method
const post = (url, data, config = {}) => axiosInstance.post(url, data, config);

// Generic PUT method
const put = (url, data, config = {}) => axiosInstance.put(url, data, config);

// Generic DELETE method
const del = (url, config = {}) => axiosInstance.delete(url, config);

// Exporting all methods for easy import
const useAxios = {
  get,
  post,
  put,
  delete: del,
};

export default useAxios;
