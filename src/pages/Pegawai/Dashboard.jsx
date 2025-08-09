// src/pages/Pegawai/Dashboard.jsx
import React, { useEffect, useState, useMemo } from 'react';
import LayoutWrapper from '../../components/common/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { UserCheck, CalendarCheck, UserX, Clock } from 'lucide-react';
import axios from '../../api/axios';
import StatBox from '../../components/absensipegawai/StatBox';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  }, []);

  const [statistik, setStatistik] = useState({
    total_hadir: 0,
    total_izin: 0,
    total_alpha: 0,
    rata_keterlambatan: 0
  });
  const [loadingStat, setLoadingStat] = useState(true);
  const [riwayat, setRiwayat] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatMenit = (menit) => {
    if (!menit || menit <= 0) return '-';
    const j = Math.floor(menit / 60);
    const m = menit % 60;
    return j > 0 ? `${j} jam ${m} menit` : `${m} menit`;
  };

  const fetchData = async () => {
    try {
      setLoadingStat(true);
      const bulan = (new Date()).getMonth() + 1;
      const tahun = (new Date()).getFullYear();

      // ✅ Statistik Dashboard Pegawai (endpoint BE yang benar)
      const resStat = await axios.get('/dashboard/pegawai/statistik', {
        params: { bulan, tahun }
      });
      setStatistik(resStat.data);
    } catch (err) {
      console.error('Gagal ambil statistik dashboard pegawai:', err);
    } finally {
      setLoadingStat(false);
    }

    try {
      const bulan = (new Date()).getMonth() + 1;
      const tahun = (new Date()).getFullYear();

      // ✅ Riwayat Absensi Lengkap (ambil 3 terakhir)
      const resRiwayat = await axios.get('/absensi/riwayat-lengkap', {
        params: { bulan, tahun }
      });
      const data = resRiwayat.data?.riwayat || [];
      setRiwayat(data.slice(-3).reverse());
    } catch (err) {
      console.error('Gagal ambil riwayat dashboard:', err);
    }
  };

  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">
            Selamat Datang, {user?.username || 'Pegawai'}
          </h1>
          <p className="text-gray-500">
            {now.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' })}
          </p>
        </div>

        {/* StatBox Ringkasan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox
            title="Total Hadir Bulan Ini"
            value={statistik.total_hadir ?? 0}
            suffix="Hari"
            loading={loadingStat}
            icon={<UserCheck size={28} />}
            gradient="from-emerald-500 to-green-500"
          />
          <StatBox
            title="Total Izin Bulan Ini"
            value={statistik.total_izin ?? 0}
            suffix="Hari"
            loading={loadingStat}
            icon={<CalendarCheck size={28} />}
            gradient="from-sky-500 to-cyan-500"
          />
          <StatBox
            title="Total Alpha Bulan Ini"
            value={statistik.total_alpha ?? 0}
            suffix="Hari"
            loading={loadingStat}
            icon={<UserX size={28} />}
            gradient="from-rose-500 to-pink-500"
          />
          <StatBox
            title="Rata-rata Keterlambatan"
            value={formatMenit(statistik.rata_keterlambatan)}
            loading={loadingStat}
            icon={<Clock size={28} />}
            gradient="from-amber-500 to-orange-500"
          />
        </div>

        {/* Tabel Riwayat 3 Hari Terakhir */}
        <div className="mt-2 bg-white shadow rounded-lg overflow-x-auto">
          <div className="p-4 font-semibold text-gray-700">Riwayat Absensi 3 Hari Terakhir</div>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Jam Wajib</th>
                <th className="px-4 py-2 border">Jam Masuk</th>
                <th className="px-4 py-2 border">Jam Pulang</th>
                <th className="px-4 py-2 border">Keterlambatan</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length > 0 ? (
                riwayat.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{item.tanggal}</td>
                    <td className="px-4 py-2">{item.jam_wajib}</td>
                    <td className="px-4 py-2">{item.jam_masuk || '-'}</td>
                    <td className="px-4 py-2">{item.jam_pulang || '-'}</td>
                    <td className="px-4 py-2">{item.keterlambatan}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${item.status === 'Hadir' ? 'bg-green-100 text-green-700'
                          : item.status === 'Belum Pulang' ? 'bg-yellow-100 text-yellow-700'
                          : item.status?.startsWith('Izin') ? 'bg-blue-100 text-blue-700'
                          : item.status === 'Sedang Bekerja' ? 'bg-purple-100 text-purple-700'
                          : item.status === 'Alpha' ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tombol Navigasi */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button onClick={() => navigate('/pegawai/absen')} className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Absen</button>
          <button onClick={() => navigate('/pegawai/riwayat')} className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Riwayat Absensi</button>
          <button onClick={() => navigate('/pegawai/izin')} className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Izin</button>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Dashboard;
