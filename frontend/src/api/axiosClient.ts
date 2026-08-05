import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import {
  MOCK_REPORTS,
  MOCK_USERS,
  MOCK_CATEGORIES,
  MOCK_LOCATIONS,
  MOCK_ASSIGNMENTS,
  MOCK_PROGRESS_UPDATES,
  MOCK_COMMENTS,
} from '@/mocks/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Intercept requests to serve schema-aligned mock responses
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('civic_access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const url = config.url || '';
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Auth Mock
        if (url.includes('/auth/login')) {
          const email = JSON.parse(config.data || '{}').email || 'citizen@civicconnect.org';
          const matchedUser = MOCK_USERS.find((u) => u.email === email) || MOCK_USERS[0];
          
          const mockAuthResponse = {
            user: matchedUser,
            accessToken: 'mock_jwt_access_token',
            refreshToken: 'mock_jwt_refresh_token',
          };
          
          resolve(createMockResponse(config, mockAuthResponse));
          return;
        }

        // Reports Mock
        if (url.includes('/reports')) {
          resolve(createMockResponse(config, MOCK_REPORTS));
          return;
        }

        // Workers Mock
        if (url.includes('/workers')) {
          const workers = MOCK_USERS.filter((u) => u.role === 'worker');
          resolve(createMockResponse(config, workers));
          return;
        }

        // Categories Mock
        if (url.includes('/categories')) {
          resolve(createMockResponse(config, MOCK_CATEGORIES));
          return;
        }

        // Locations Mock
        if (url.includes('/locations')) {
          resolve(createMockResponse(config, MOCK_LOCATIONS));
          return;
        }

        // Assignments Mock
        if (url.includes('/assignments')) {
          resolve(createMockResponse(config, MOCK_ASSIGNMENTS));
          return;
        }

        // Progress Updates Mock
        if (url.includes('/progress-updates')) {
          resolve(createMockResponse(config, MOCK_PROGRESS_UPDATES));
          return;
        }

        // Comments Mock
        if (url.includes('/comments')) {
          resolve(createMockResponse(config, MOCK_COMMENTS));
          return;
        }

        resolve(config);
      }, 150);
    });
  },
  (error) => Promise.reject(error)
);

function createMockResponse(config: InternalAxiosRequestConfig, data: any): any {
  const response: AxiosResponse = {
    data: { success: true, data },
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  };
  config.adapter = async () => response;
  return config;
}

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('civic_refresh_token');
        if (refreshToken) {
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, { refreshToken });
          const { accessToken } = refreshResponse.data;
          localStorage.setItem('civic_access_token', accessToken);
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return axiosClient(originalRequest);
        }
      } catch (refreshErr) {
        localStorage.removeItem('civic_access_token');
        localStorage.removeItem('civic_refresh_token');
        window.location.href = '/login?expired=true';
      }
    }

    return Promise.reject(error);
  }
);
