import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import StatBox from '../../components/admin/StatBox';
import ChartKehadiran from '../../components/admin/ChartKehadiran';
import { getDashboardStatistik, getChartKehadiran } from '../../api/axios';

const DashboardAdmin = () => {
  const [stat, setStat] = useState({
    hadir: 0,
    izin_menunggu: 0,
    terlambat: 0,
    total_pegawai: 0,
    hari_kerja: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStatistik = async () => {
      try {
        const res = await getDashboardStatistik();
        if (res) {
          setStat(res);
        }
      } catch (err) {
        console.error('Gagal ambil data statistik:', err);
      }
    };

    const fetchChartData = async () => {
      try {
        const data = await getChartKehadiran();
        setChartData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Gagal ambil data chart:', error);
        setChartData([]);
      }
    };

    fetchStatistik();
    fetchChartData();
  }, []);

  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
        <p className="text-gray-600">Selamat datang kembali, Admin!</p>

        {/* Statistik Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox label="Total Hadir" value={stat.hadir} type="hadir" />
          <StatBox label="Izin Menunggu Validasi" value={stat.izin_menunggu} type="alpha" />
          <StatBox label="Terlambat" value={stat.terlambat} type="terlambat" />
          <StatBox label="Pegawai Aktif" value={stat.total_pegawai} type="hadir" />
          <StatBox label="Hari Kerja Bulan Ini" value={stat.hari_kerja} type="terlambat" />
        </div>

        {/* Chart Kehadiran */}
        <div className="bg-white rounded-xl shadow-md p-4 mt-6">
          <h2 className="text-lg font-semibold mb-4">Grafik Kehadiran Harian</h2>
          <ChartKehadiran data={chartData} />
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default DashboardAdmin;
