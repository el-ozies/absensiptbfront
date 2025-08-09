// src/api/auth.js
import axios from 'axios';

// Ganti port sesuai backend kamu (misal: 3000)
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor sebelum request dikirim
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('🔑 TOKEN TERKIRIM:', token); // debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor setelah response diterima
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API ERROR:', error.response?.data || error.message);

    // Auto logout kalau token invalid
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
