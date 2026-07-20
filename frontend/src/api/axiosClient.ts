import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Mock Database / In-Memory Mock Data Store for client-side execution
const mockReports = [
  {
    id: 'rpt-101',
    title: 'Deep Pothole on Main Street',
    description: 'A deep pothole is causing vehicles to swerve dangerously near the intersection.',
    category: 'Pothole',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    locationName: '102 Main St, Downtown',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    images: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800'],
    upvotesCount: 24,
    commentsCount: 3,
    reportedBy: { id: 'usr-1', name: 'Alex Johnson' },
    assignedWorker: { id: 'wrk-1', name: 'Marcus Vance' },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'rpt-102',
    title: 'Broken Streetlight Grid #4',
    description: 'Streetlight pole #42 has been completely dark for over three days, creating safety concerns at night.',
    category: 'Streetlight',
    priority: 'MEDIUM',
    status: 'PENDING',
    locationName: '742 Evergreen Terrace',
    coordinates: { lat: 37.7849, lng: -122.4094 },
    images: ['https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800'],
    upvotesCount: 8,
    commentsCount: 1,
    reportedBy: { id: 'usr-4', name: 'Sarah Miller' },
    createdAt: new Date().toISOString(),
  },
];

const mockWorkers = [
  {
    id: 'wrk-1',
    name: 'Marcus Vance',
    specialization: 'Roadway Infrastructure Repair',
    rating: 4.9,
    assignedArea: 'Downtown North',
    activeTasksCount: 3,
    completedTasksCount: 45,
    phone: '+1 (555) 901-2345',
    avatarUrl: '',
  },
  {
    id: 'wrk-2',
    name: 'Sarah Jenkins',
    specialization: 'Electrical Grid Systems',
    rating: 4.8,
    assignedArea: 'Westside Heights',
    activeTasksCount: 1,
    completedTasksCount: 38,
    phone: '+1 (555) 901-6789',
    avatarUrl: '',
  },
];

// Request Interceptor: Simulate Client-side API Responses & Attach Token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('civic_access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Intercept API calls to simulate mock responses locally
    const url = config.url || '';
    
    // Simulate latency (200ms)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock Login
        if (url.includes('/auth/login')) {
          const email = JSON.parse(config.data || '{}').email || 'citizen@civicconnect.org';
          let role = 'citizen';
          let name = 'Alex Johnson';
          if (email.includes('admin')) {
            role = 'admin';
            name = 'Eleanor Vance';
          } else if (email.includes('worker')) {
            role = 'worker';
            name = 'Marcus Vance';
          }
          
          const mockAuthResponse = {
            user: { id: `usr-${role}`, name, email, role },
            accessToken: 'mock_jwt_access_token',
            refreshToken: 'mock_jwt_refresh_token',
          };
          
          resolve(createMockResponse(config, mockAuthResponse));
          return;
        }

        // Mock Reports
        if (url.includes('/reports')) {
          resolve(createMockResponse(config, mockReports));
          return;
        }

        // Mock Workers
        if (url.includes('/workers')) {
          resolve(createMockResponse(config, mockWorkers));
          return;
        }

        // Default: Proceed with original request or return empty success object
        resolve(config);
      }, 200);
    });
  },
  (error) => Promise.reject(error)
);

// Helper to construct a standard Axios success response object
function createMockResponse(config: InternalAxiosRequestConfig, data: any): any {
  const response: AxiosResponse = {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  };
  // To bypass actual network dispatch, we throw a special cancel-like error object
  // that can be caught and handled as a successful response, or we hijack it.
  // Standard Axios adapter interceptor:
  config.adapter = async () => {
    return response;
  };
  return config;
}

// Response Interceptor: Silent Token Refresh & Global Error Handling
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('civic_refresh_token');
        if (refreshToken) {
          // Attempt silent token refresh
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

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
