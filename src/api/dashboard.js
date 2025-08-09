// src/api/dashboard.js
import api from './axios';

/**
 * 📊 Statistik Dashboard Pegawai
 */
export const getDashboardPegawai = (bulan, tahun) =>
  api.get('/dashboard/pegawai', { params: { bulan, tahun } })
    .then((res) => res.data);

/**
 * 📊 Statistik Dashboard Admin
 * Total hadir, alpha, pegawai aktif, izin menunggu, hari kerja, belum pulang
 */
export const getDashboardStatistik = async () => {
  try {
    const res = await api.get('/dashboard/statistik');
    return res.data;
  } catch (error) {
    console.error('Gagal mengambil statistik dashboard admin:', error);
    throw error;
  }
};

/**
 * 📋 Daftar pegawai yang belum pulang hari ini
 */
export const getBelumPulang = () =>
  api.get('/dashboard/admin/belum-pulang')
    .then((res) => res.data);

/**
 * 📈 Chart kehadiran harian admin
 */
export const getChartKehadiran = async (bulan, tahun) => {
  try {
    const res = await api.get('/dashboard/chart', { params: { bulan, tahun } });
    return res.data;
  } catch (error) {
    console.error('Gagal mengambil data chart kehadiran:', error);
    throw error;
  }
};
