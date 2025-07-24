import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import StatBox from '../../components/admin/StatBox';
import ChartKehadiran from '../../components/admin/ChartKehadiran';
import { getDashboardStatistik } from '../../api/axios';

const DashboardAdmin = () => {
  const [stat, setStat] = useState({
    hadir: 0,
    alpha: 0,
    terlambat: 0,
  });

  useEffect(() => {
    const fetchStat = async () => {
      try {
        const data = await getDashboardStatistik(); // langsung data, bukan res.data
        setStat({
          hadir: data.hadir || 0,
          alpha: data.alpha || 0,
          terlambat: data.terlambat || 0,
        });
      } catch (err) {
        console.error('Gagal ambil statistik:', err);
      }
    };

    fetchStat();
  }, []);

  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang kembali, Admin!</p>

        {/* Stat Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatBox label="Total Hadir" value={stat.hadir} type="hadir" />
          <StatBox label="Alpha" value={stat.alpha} type="alpha" />
          <StatBox label="Terlambat" value={stat.terlambat} type="terlambat" />
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-md p-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">Grafik Kehadiran Harian</h2>
          <ChartKehadiran />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default DashboardAdmin;
