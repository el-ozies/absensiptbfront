// src/api/izin.js
import api from './axios';

// Ajukan izin baru
export const ajukanIzin = (data) => api.post('/izin', data);

// Ambil riwayat izin pegawai login
export const getRiwayatIzin = () => api.get('/izin/riwayat');

// Ambil izin berdasarkan pegawai_id
export const getIzinByPegawai = (id) => api.get(`/izin/pegawai/${id}`);

// Ambil semua izin yang menunggu validasi
export const getSemuaIzin = () => api.get('/izin/menunggu');

// Validasi izin (admin)
export const validasiIzin = (id, status) => api.put(`/izin/${id}`, { status });

// Ambil semua izin (admin)
export const getAllIzin = () => api.get('/izin/all');

// Ambil tanggal yang tidak bisa dipilih untuk izin
export const getDisableDates = () => api.get('/izin/disable-dates');
