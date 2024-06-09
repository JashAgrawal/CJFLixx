// apiService.js
import { TMDB_TOKEN } from "@/lib/utils";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"; // Replace with your API base URL

const TMDB_Api_Service = axios.create({
  baseURL: BASE_URL,
  //   timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + TMDB_TOKEN
  },
});

// Interceptors (optional): You can use interceptors to handle requests or responses globally.

// Request interceptor
TMDB_Api_Service.interceptors.request.use(
  async (config: any) => {
  
    // You can modify the request config here (e.g., add headers)
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
TMDB_Api_Service.interceptors.response.use(
  (response: any) => {
    // You can modify the response data here
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default TMDB_Api_Service;