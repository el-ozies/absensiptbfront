// src/api/absensi.js
import api from './axios';

export const absenMasuk = (data) => api.post('/absensi/masuk', data);
export const absenKeluar = (data) => api.post('/absensi/keluar', data);
export const getRiwayatAbsensi = async (bulan, tahun) => {
  return api.get(`/absensi/riwayat-lengkap?bulan=${bulan}&tahun=${tahun}`);
};

export const getStatistikPegawai = () => api.get('/absensi/statistik');
export const getDashboardStatistik = () => api.get('/absensi/dashboard');
export const getChartKehadiran = (bulan, tahun) =>
  api.get(`/absensi/chart?bulan=${bulan}&tahun=${tahun}`);
export const getRekapAbsensi = (tanggal) =>
  api.get(`/absensi/rekap?tanggal=${tanggal}`);
export const updateAbsensi = (id, data) => api.put(`/absensi/${id}`, data);


