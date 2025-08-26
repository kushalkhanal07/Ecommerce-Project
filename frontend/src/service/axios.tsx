import { toast } from "@/hooks/use-toast";
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    // Show error toast notification
    toast({
      title: "Error",
      description: message,
    });

    // Handle specific HTTP status codes
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      // Forbidden - user doesn't have permission
      console.error("Forbidden:", message);
    } else if (error.response?.status === 404) {
      // Not Found - resource doesn't exist
      console.error("Not Found:", message);
    } else if (error.response?.status >= 500) {
      // Server error
      console.error("Server Error:", message);
    }

    return Promise.reject(error);
  }
);

export default api;
