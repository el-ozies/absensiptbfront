// src/pages/Admin/Dashboard.jsx
import React, { useEffect, useState } from "react";
import LayoutWrapper from "../../components/common/LayoutWrapper";
import StatBox from "../../components/admin/StatBox";
import ChartKehadiran from "../../components/admin/ChartKehadiran";
import { getDashboardStatistik, getChartKehadiran } from "../../api/dashboard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const defaultStat = {
    hadir: 0,
    alpha: 0,
    total_pegawai: 0,
    izin_menunggu: 0,
    total_izin: 0,
    hari_kerja: 0,
  };

  const [stat, setStat] = useState(defaultStat);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistik();
  }, []);

  const fetchStatistik = async () => {
    try {
      setLoading(true);
      const res = await getDashboardStatistik();
      setStat({ ...defaultStat, ...res });
    } catch (err) {
      console.error("❌ Gagal ambil data statistik:", err);
      setStat(defaultStat);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-600">Ringkasan absensi pegawai bulan ini</p>

        {/* Statistik - Baris Atas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatBox label="Izin Menunggu Validasi" value={stat.izin_menunggu} type="warning" />
          <StatBox label="Total Hadir" value={stat.hadir} type="hadir" />
          <StatBox label="Total Alpha" value={stat.alpha} type="alpha" />
        </div>

        {/* Statistik - Baris Bawah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatBox label="Pegawai Aktif" value={stat.total_pegawai} type="info" />
          <StatBox label="Total Izin" value={stat.total_izin} type="info" />
          <StatBox label="Hari Kerja Bulan Ini" value={stat.hari_kerja} type="info" />
        </div>

        {/* Grafik Kehadiran */}
        <ChartKehadiran />
      </div>
    </LayoutWrapper>
  );
};

export default Dashboard;