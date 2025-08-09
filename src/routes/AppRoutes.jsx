// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

import DashboardPegawai from '../pages/Pegawai/Dashboard';
import Absen from '../pages/Pegawai/Absen';
import Riwayat from '../pages/Pegawai/Riwayat';
import IzinPage from '../pages/Pegawai/IzinPage';

import DashboardAdmin from '../pages/Admin/Dashboard';
import RekapAbsensi from '../pages/Admin/RekapAbsensi';
import ValidasiIzin from '../pages/Admin/ValidasiIzin';
import RiwayatIzinAdmin from '../pages/Admin/RiwayatIzinAdmin';
import ManajemenPegawai from '../pages/Admin/ManajemenPegawai';

import PrivateRoute from './PrivateRoute';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Pegawai */}
      <Route
        path="/pegawai/dashboard"
        element={
          <PrivateRoute role="pegawai">
            <DashboardPegawai />
          </PrivateRoute>
        }
      />
      <Route
        path="/pegawai/absen"
        element={
          <PrivateRoute role="pegawai">
            <Absen />
          </PrivateRoute>
        }
      />
      <Route
        path="/pegawai/riwayat"
        element={
          <PrivateRoute role="pegawai">
            <Riwayat />
          </PrivateRoute>
        }
      />
      <Route
        path="/pegawai/izin"
        element={
          <PrivateRoute role="pegawai">
            <IzinPage />
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute role="admin">
            <DashboardAdmin />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/rekap"
        element={
          <PrivateRoute role="admin">
            <RekapAbsensi />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/pegawai"
        element={
          <PrivateRoute role="admin">
            <ManajemenPegawai />
          </PrivateRoute>
        }
      />
      <Route
        path="/izin/validasi"
        element={
          <PrivateRoute role="admin">
            <ValidasiIzin />
          </PrivateRoute>
        }
      />
      <Route
        path="/izin/riwayat"
        element={
          <PrivateRoute role="admin">
            <RiwayatIzinAdmin />
          </PrivateRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
