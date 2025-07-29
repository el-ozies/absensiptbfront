import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { useNavigate } from 'react-router-dom';
import { getDashboardStatistik, getRiwayatAbsensi } from '../../api/axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [ringkasan, setRingkasan] = useState({
    hadir: 0,
    keterlambatan: 0,
    persen: 0,
    keterlambatan_formatted: '0 menit'
  });
  const [riwayat, setRiwayat] = useState([]);
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
    } catch (err) {
      console.error('Gagal mengambil data:', err);
    }
  };

  // Tambahkan sebelum getJamWajib
const parseTanggal = (str) => {
  if (!str) return new Date();
  const [tgl, bln, thn] = str.split(' ');
  const bulanMap = {
    Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
    Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11
  };
  return new Date(parseInt(thn), bulanMap[bln], parseInt(tgl));
};

  const getJamWajib = (tanggalStr) => {
  const tgl = parseTanggal(tanggalStr);
  const hari = tgl.getDay();
  if (hari === 6) return 5; // Sabtu
  if (hari === 5) return 6; // Jumat
  if (hari >= 1 && hari <= 4) return 7; // Senin–Kamis
  return 0;
};


  const hitungPresentase = (item) => {
  const jamWajib = item.jam_wajib || 0;
  if (item.status === 'Izin') return 50;
  if (item.jam_masuk && item.jam_keluar) {
    const [jm, mm] = item.jam_masuk.split(":").map(Number);
    const [jk, mk] = item.jam_keluar.split(":").map(Number);
    const masuk = jm * 60 + mm;
    const keluar = jk * 60 + mk;
    const durasi = (keluar - masuk) / 60;
    const persen = Math.round((durasi / jamWajib) * 100);
    return persen > 100 ? 100 : persen;
  }
  if (item.jam_masuk && !item.jam_keluar) {
    const [tgl, bln, thn] = item.tanggal.split(' ');
    const bulanMap = {
      Januari: 0, Februari: 1, Maret: 2, April: 3, Mei: 4, Juni: 5,
      Juli: 6, Agustus: 7, September: 8, Oktober: 9, November: 10, Desember: 11
    };
    const tanggalItem = new Date(parseInt(thn), bulanMap[bln], parseInt(tgl));
    const isToday = tanggalItem.toDateString() === now.toDateString();
    const totalMenit = now.getHours() * 60 + now.getMinutes();
    if (!isToday || totalMenit >= 1080) return 0; // sudah lewat jam 18.00
  }
  return 0;
};


const formatStatus = (item) => {
  const tgl = parseTanggal(item.tanggal);
  const isToday = tgl.toDateString() === now.toDateString();
  const totalMenitNow = now.getHours() * 60 + now.getMinutes();
  const jamPulang = tgl.getDay() === 6 ? 14 : (tgl.getDay() === 5 ? 18 : 16);

  if (item.status === 'Izin') return <span className="text-blue-600 font-semibold">Izin</span>;
  if (item.jam_masuk && item.jam_keluar) return <span className="text-green-600 font-semibold">Hadir</span>;
  if (item.jam_masuk && !item.jam_keluar) {
    if (isToday && totalMenitNow < jamPulang * 60) {
      return <span className="text-yellow-600 font-semibold">Belum Pulang</span>;
    }
    return <span className="text-green-600 font-semibold">Hadir</span>;
  }
  return <span className="text-red-600 font-semibold">Alpha</span>;
};

const formatMenit = (menit) => {
  const j = Math.floor(menit / 60);
  const m = menit % 60;
  if (j > 0 && m > 0) return `${j} jam ${m} menit`;
  if (j > 0) return `${j} jam`;
  if (m > 0) return `${m} menit`;
  return '-';
};



  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Selamat Datang, {user?.username || 'Pegawai'}</h1>
        <p className="text-gray-500">
          {now.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' })}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Jumlah Masuk Bulan Ini</p>
            <p className="text-xl font-bold">{ringkasan.hadir} Hari</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Keterlambatan Bulan ini</p>
            <p className="text-xl font-bold">{ringkasan.keterlambatan_formatted}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Persentase Kehadiran Bulan Ini</p>
            <p className="text-xl font-bold">{ringkasan.persen}%</p>
          </div>
        </div>

        <div className="mt-6 bg-white shadow rounded-lg overflow-x-auto">
          <div className="p-4 font-semibold text-gray-700">Riwayat Absensi Terakhir</div>
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Jam Wajib</th>
                <th className="px-4 py-2 border">Jam Masuk</th>
                <th className="px-4 py-2 border">Jam Pulang</th>
                <th className="px-4 py-2 border">Keterlambatan</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length > 0 ? (
                riwayat.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{item.tanggal}</td>
                    <td className="px-4 py-2">{item.jam_wajib || '-'} jam</td>
                    <td className="px-4 py-2">{item.jam_masuk || '-'}</td>
                    <td className="px-4 py-2">{item.jam_keluar || '-'}</td>
                    <td className="px-4 py-2">{formatMenit(item.keterlambatan)}</td>
                    <td className="px-4 py-2">{formatStatus(item)}</td>
                    <td className="px-4 py-2 font-semibold">{hitungPresentase(item)}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button onClick={() => navigate('/pegawai/absen')} className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Absen</button>
          <button onClick={() => navigate('/pegawai/riwayat')} className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Riwayat Absensi</button>
          <button onClick={() => navigate('/izin/ajukan')} className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Ajukan Izin</button>
          <button onClick={() => navigate('/izin/riwayat')} className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Riwayat Izin</button>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Dashboard;
