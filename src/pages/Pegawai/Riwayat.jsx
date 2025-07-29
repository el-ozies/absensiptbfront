import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { getRiwayatLengkap } from '../../api/axios';

const bulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const Riwayat = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [bulan, setBulan] = useState(new Date().getMonth());
  const [tahun, setTahun] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchRiwayat(bulan, tahun);
  }, [bulan, tahun]);

  const fetchRiwayat = async (b = bulan, t = tahun) => {
    try {
      const res = await getRiwayatLengkap(b, t);
      setData(res);
    } catch (err) {
      console.error('Gagal ambil riwayat:', err);
    }
  };

  const parseTanggal = (tanggalStr) => {
    const [tgl, namaBulan, tahun] = tanggalStr.split(' ');
    const indexBulan = bulanList.findIndex(b => b.toLowerCase() === namaBulan.toLowerCase());
    return {
      tanggal: parseInt(tgl),
      bulan: indexBulan,
      tahun: parseInt(tahun)
    };
  };

  const getJamWajib = (tanggalStr) => {
    const { tanggal, bulan, tahun } = parseTanggal(tanggalStr);
    const tgl = new Date(tahun, bulan, tanggal);
    const hari = tgl.getDay();
    if (hari === 6) return 5; // Sabtu
    if (hari === 5) return 6; // Jumat
    if (hari >= 1 && hari <= 4) return 7; // Senin–Kamis
    return 0; // Minggu
  };

  const formatKeterlambatan = (menit) => {
    if (!menit || menit <= 0) return '-';
    const jam = Math.floor(menit / 60);
    const sisaMenit = menit % 60;
    if (jam > 0 && sisaMenit > 0) return `${jam} jam ${sisaMenit} menit`;
    if (jam > 0) return `${jam} jam`;
    return `${sisaMenit} menit`;
  };

  const hitungPresentase = (item) => {
    const jamWajib = getJamWajib(item.tanggal);
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
      const { tanggal, bulan, tahun } = parseTanggal(item.tanggal);
      const tgl = new Date(tahun, bulan, tanggal);
      const hari = tgl.getDay();
      const now = new Date();
      if (tgl < now) return 0;
    }
    return 0;
  };

  const formatStatus = (item) => {
    const { tanggal, bulan: bln, tahun: thn } = parseTanggal(item.tanggal);
    const tanggalItem = new Date(thn, bln, tanggal);
    const sekarang = new Date();
    const isToday = tanggalItem.toDateString() === sekarang.toDateString();

    if (item.status === 'Izin') return <span className="text-blue-600 font-semibold">Izin</span>;
    if (item.jam_masuk && item.jam_keluar) return <span className="text-green-600 font-semibold">Hadir</span>;
    if (item.jam_masuk && !item.jam_keluar) {
      const jamPulang = tanggalItem.getDay() === 6 ? 14 : (tanggalItem.getDay() === 5 ? 18 : 16);
      const totalMenitNow = sekarang.getHours() * 60 + sekarang.getMinutes();
      const batasMenit = jamPulang * 60;

      if (isToday && totalMenitNow < batasMenit) {
        return <span className="text-yellow-600 font-semibold">Belum Pulang</span>;
      }

      return <span className="text-green-600 font-semibold">Hadir</span>;
    }
    return <span className="text-red-600 font-semibold">Alpha</span>;
  };

  const dataFiltered = data
    .filter((item) => item.tanggal.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => getJamWajib(item.tanggal) > 0)



  const totalHari = dataFiltered.length;
  const totalIzin = dataFiltered.filter(d => d.status === 'Izin').length;
  const totalHadir = dataFiltered.filter(d => d.jam_masuk && d.jam_keluar).length;
  const totalAlpha = dataFiltered.filter(d => !d.jam_masuk && d.status !== 'Izin').length;
  const totalPersen = Math.round(
    dataFiltered.reduce((acc, curr) => acc + hitungPresentase(curr), 0) / (dataFiltered.length || 1)
  );

  return (
    <LayoutWrapper>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Riwayat Absensi</h1>

        <div className="flex flex-wrap gap-4 items-center mb-4">
          <select className="border px-3 py-2 rounded" value={bulan} onChange={(e) => setBulan(parseInt(e.target.value))}>
            {bulanList.map((b, i) => (
              <option key={i} value={i}>{b}</option>
            ))}
          </select>
          <select className="border px-3 py-2 rounded" value={tahun} onChange={(e) => setTahun(parseInt(e.target.value))}>
            {Array.from({ length: 5 }, (_, i) => 2023 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Cari di sini..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded shadow-sm"
          />
        </div>

        <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm font-medium text-gray-700">
          <div>✅ Jumlah Kehadiran: <span className="font-bold text-green-700">{totalHadir}</span></div>
          <div>📘 Jumlah Izin: <span className="font-bold text-blue-700">{totalIzin}</span></div>
          <div>❌ Jumlah Alpha: <span className="font-bold text-red-700">{totalAlpha}</span></div>
          <div>📅 Jumlah Total: <span className="font-bold">{totalHari}</span></div>
          <div className="col-span-2 md:col-span-1">📊 Persentase Bulan Ini: <span className="font-bold">{totalPersen}%</span></div>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Tanggal</th>
                <th className="px-4 py-2 border">Jam Wajib</th>
                <th className="px-4 py-2 border">Jam Masuk</th>
                <th className="px-4 py-2 border">Jam Pulang</th>
                <th className="px-4 py-2 border">Keterlambatan</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">% Kehadiran</th>
              </tr>
            </thead>
            <tbody>
              {dataFiltered.length > 0 ? (
                dataFiltered.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{item.tanggal}</td>
                    <td className="px-4 py-2">{item.jam_wajib}</td>
                    <td className="px-4 py-2">{item.jam_masuk || '-'}</td>
                    <td className="px-4 py-2">{item.jam_keluar || '-'}</td>
                    <td className="px-4 py-2">{formatKeterlambatan(item.keterlambatan)}</td>
                    <td className="px-4 py-2">{formatStatus(item)}</td>
                    <td className="px-4 py-2 text-center font-semibold">{hitungPresentase(item)}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">Belum ada data absensi.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Riwayat;
