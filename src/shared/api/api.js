import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';

/* ── Axios instances ── */
const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

/* ── Request interceptor: attach JWT ── */
const requestInterceptor = (config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosAuth.interceptors.request.use(requestInterceptor);
axiosClient.interceptors.request.use(requestInterceptor);

/* ── Response interceptor: handle 401 ── */
const handleUnauthorized = (error) => {
  if (error.response?.status === 401) {
    useAuthStore.getState().logout();
  }
  return Promise.reject(error);
};

axiosAuth.interceptors.response.use((res) => res, handleUnauthorized);
axiosClient.interceptors.response.use((res) => res, handleUnauthorized);

export { axiosAuth, axiosClient };
