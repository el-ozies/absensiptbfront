import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

import DashboardPegawai from '../pages/Pegawai/Dashboard';
import Absen from '../pages/Pegawai/Absen';
import Riwayat from '../pages/Pegawai/Riwayat';
import AjukanIzin from '../pages/Pegawai/AjukanIzin';
import RiwayatIzin from '../pages/Pegawai/RiwayatIzin';

import DashboardAdmin from '../pages/Admin/Dashboard';
import RekapAbsensi from '../pages/Admin/RekapAbsensi';
import ValidasiIzin from '../pages/Admin/ValidasiIzin';
import ManajemenPegawai from '../pages/Admin/ManajemenPegawai';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Pegawai */}
      <Route path="/pegawai/dashboard" element={<PrivateRoute><DashboardPegawai /></PrivateRoute>} />
      <Route path="/pegawai/absen" element={<PrivateRoute><Absen /></PrivateRoute>} />
      <Route path="/pegawai/riwayat" element={<PrivateRoute><Riwayat /></PrivateRoute>} />

      {/* Admin */}
      <Route path="/admin/dashboard" element={<PrivateRoute><DashboardAdmin /></PrivateRoute>} />
      <Route path="/admin/rekap" element={<PrivateRoute><RekapAbsensi /></PrivateRoute>} />
      <Route path="/admin/pegawai" element={<PrivateRoute><ManajemenPegawai /></PrivateRoute>} />

      {/* Izin */}
      <Route path="/izin/ajukan" element={<PrivateRoute><AjukanIzin /></PrivateRoute>} />
      <Route path="/izin/riwayat" element={<PrivateRoute><RiwayatIzin /></PrivateRoute>} />
      <Route path="/izin/validasi" element={<PrivateRoute><ValidasiIzin /></PrivateRoute>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
