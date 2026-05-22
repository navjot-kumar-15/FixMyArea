import axios from 'axios';

// Create a centralized Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Update to your backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors here if needed (e.g., for attaching JWT tokens)
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
