import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan baseURL backend kamu jika berbeda
});

// Tambahkan token ke setiap request secara otomatis
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
