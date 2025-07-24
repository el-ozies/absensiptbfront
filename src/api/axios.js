import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Tambahkan token ke setiap request jika tersedia
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
  return res.data; // ✅ sudah langsung return objek dengan .hadir, .alpha, .terlambat
};


export const getChartKehadiran = async () => {
  const res = await api.get('/absensi/chart'); // opsional, jika ada
  return res.data;
};

export const getStatistikAbsensi = () => {
  return api.get('/admin/statistik');
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
// 📋 OPSIONAL: LOG AKTIVITAS (ADMIN)
// ==============================
export const getLogAktivitas = async () => {
  const res = await api.get('/log');
  return res.data;
};
