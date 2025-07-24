import axios from './axios'; // sudah include token interceptor

export const ajukanIzin = (data) => axios.post('/izin', data);

export const getRiwayatIzin = (pegawai_id) =>
  axios.get(`/izin/pegawai/${pegawai_id}`);

export const getSemuaIzin = () => axios.get('/izin'); // untuk admin

export const validasiIzin = (id, status) =>
  axios.put(`/izin/${id}`, { status });
