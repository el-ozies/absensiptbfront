// src/api/axios.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Tambahkan token JWT ke setiap request jika tersedia
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

// ==============================
// 🔐 AUTH API
// ==============================
export const login = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const register = async (payload) => {
  const res = await api.post('/auth/register', payload);
  return res.data;
};

// ==============================
// 📍 ABSENSI PEGAWAI
// ==============================
export const absenMasuk = async (payload) => {
  const res = await api.post('/absensi/masuk', payload);
  return res.data;
};

export const absenKeluar = async (payload) => {
  const res = await api.post('/absensi/keluar', payload);
  return res.data;
};

export const getRiwayatAbsensi = async () => {
  const res = await api.get('/absensi/riwayat');
  return res.data;
};

export const getRekapAbsensi = async (tanggal = null) => {
  const res = await api.get('/absensi/rekap', {
    params: tanggal ? { tanggal } : {},
  });
  return res.data;
};

export const getDashboardStatistik = async () => {
  const res = await api.get('/absensi/statistik');
  return res.data;
};

export const getChartKehadiran = async () => {
  const res = await api.get('/absensi/chart');
  return res.data;
};

export const getStatistikAbsensi = async () => {
  const res = await api.get('/admin/statistik');
  return res.data;
};

// ==============================
// 📋 IZIN PEGAWAI
// ==============================
export const ajukanIzin = async (payload) => {
  const res = await api.post('/izin', payload);
  return res.data;
};

export const getRiwayatIzin = async () => {
  const res = await api.get('/izin/riwayat'); // ✅ Benar
  return res.data;
};


export const getSemuaIzin = async () => {
  const res = await api.get('/izin');
  return res.data;
};

export const validasiIzin = async (id, status) => {
  const res = await api.put(`/izin/${id}`, { status });
  return res.data;
};


// ==============================
// 🧑‍💼 OPSIONAL: USER (ADMIN)
// ==============================
export const getUsers = async () => {
  const res = await api.get('/users');
  return res.data;
};

export const createUser = async (payload) => {
  const res = await api.post('/users', payload);
  return res.data;
};

// ==============================
// 📊 OPSIONAL: LOG AKTIVITAS (ADMIN)
// ==============================
export const getLogAktivitas = async () => {
  const res = await api.get('/log');
  return res.data;
};

export const getRiwayatLengkap = async (bulan, tahun) => {
  const res = await api.get('/absensi/riwayat', {
    params: { bulan, tahun }
  });
  return res.data;
};

export const getAbsenHariIni = () => API.get('/absensi/riwayat');



