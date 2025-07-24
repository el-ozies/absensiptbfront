import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import {
  getDashboardStatistik,
  getRiwayatAbsensi,
} from '../../api/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [ringkasan, setRingkasan] = useState({ hadir: 0, alpha: 0, keterlambatan: 0 });
  const [riwayat, setRiwayat] = useState([]);
  const [absenHariIni, setAbsenHariIni] = useState(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const stat = await getDashboardStatistik();
      setRingkasan(stat);
      const data = await getRiwayatAbsensi();
      setRiwayat(data.slice(0, 3));
      const today = new Date().toISOString().slice(0, 10);
      const absen = data.find((r) => r.tanggal === today);
      setAbsenHariIni(absen || null);
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  const formatStatus = (status) => {
    if (status === 'Hadir') return <span className="text-green-600 font-semibold">Hadir</span>;
    if (status === 'Alpha') return <span className="text-red-500 font-semibold">Alpha</span>;
    return '-';
  };

  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Selamat Datang, {user?.username || 'Pegawai'}</h1>
        <p className="text-gray-500">
          {now.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' })}
        </p>

        {/* Stat Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Waktu Masuk Hari Ini</p>
            <p className="text-xl font-bold">
              {absenHariIni?.jam_masuk ? absenHariIni.jam_masuk : 'Belum Absen Masuk'}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Waktu Pulang Hari Ini</p>
            <p className="text-xl font-bold">
              {absenHariIni?.jam_keluar ? absenHariIni.jam_keluar : 'Belum Absen Pulang'}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Jumlah Masuk Bulan Ini</p>
            <p className="text-xl font-bold">{ringkasan.hadir} Hari</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Total Keterlambatan</p>
            <p className="text-xl font-bold">{ringkasan.keterlambatan} Menit</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Persentase Kehadiran</p>
            <p className="text-xl font-bold">
              {ringkasan.total_hari && ringkasan.hadir
                ? Math.round((ringkasan.hadir / ringkasan.total_hari) * 100) + '%'
                : '0%'}
            </p>
          </div>
        </div>

        {/* Riwayat */}
        <div className="mt-6 bg-white shadow rounded-lg overflow-x-auto">
          <div className="p-4 font-semibold text-gray-700">Riwayat Absensi Terakhir</div>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Jam Masuk</th>
                <th className="px-4 py-2 border">Jam Pulang</th>
                <th className="px-4 py-2 border">Keterlambatan</th>
                <th className="px-4 py-2 border">Persentase</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length > 0 ? (
                riwayat.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{r.tanggal}</td>
                    <td className="px-4 py-2">{r.jam_masuk || '-'}</td>
                    <td className="px-4 py-2">{r.jam_keluar || '-'}</td>
                    <td className="px-4 py-2">{r.keterlambatan || '-'}</td>
                    <td className="px-4 py-2">{r.persentase || '0%'}</td>
                    <td className="px-4 py-2">{formatStatus(r.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-2 text-center text-gray-500" colSpan={6}>Belum ada riwayat absensi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tombol Aksi */}
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={() => navigate('/pegawai/absen-keluar')}
            disabled={!absenHariIni?.jam_masuk || absenHariIni?.jam_keluar}
            className={`flex-1 py-3 rounded transition text-white ${
              absenHariIni?.jam_masuk && !absenHariIni?.jam_keluar ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Absen Pulang
          </button>
          <button
            onClick={() => navigate('/pegawai/riwayat')}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded hover:bg-gray-300 transition"
          >
            Riwayat Absensi
          </button>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Dashboard;
