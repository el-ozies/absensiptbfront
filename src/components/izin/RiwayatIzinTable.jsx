// src/components/izin/RiwayatIzinTable.jsx
import React, { useState, useEffect } from 'react';
import { getRiwayatIzin } from '../../api/izin';

const bulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const RiwayatIzinTable = ({ refreshKey }) => {
  const [riwayat, setRiwayat] = useState([]);
  const [bulan, setBulan] = useState(new Date().getMonth());
  const [tahun, setTahun] = useState(new Date().getFullYear());

  useEffect(() => {
    loadData();
  }, [refreshKey]);

  const loadData = async () => {
    try {
      const res = await getRiwayatIzin();
      setRiwayat(res.data || []);
    } catch (err) {
      console.error('Gagal ambil riwayat izin', err);
    }
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return '-';
    const [year, month, day] = dateStr.split('-');
    return `${parseInt(day)} ${bulanList[parseInt(month) - 1]} ${year}`;
  };

  const filtered = riwayat.filter(item => {
    const [y, m] = item.tanggal_mulai.split('-');
    return parseInt(m) - 1 === bulan && parseInt(y) === tahun;
  });

  return (
    <div className="bg-white rounded shadow p-4 mt-4">
      <div className="flex gap-2 mb-4">
        <select value={bulan} onChange={(e) => setBulan(parseInt(e.target.value))} className="border rounded px-2 py-1">
          {bulanList.map((b, i) => <option key={i} value={i}>{b}</option>)}
        </select>
        <select value={tahun} onChange={(e) => setTahun(parseInt(e.target.value))} className="border rounded px-2 py-1">
          {Array.from({ length: 5 }, (_, i) => 2023 + i).map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Mulai</th>
            <th className="p-2 border">Selesai</th>
            <th className="p-2 border">Keterangan</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4 text-gray-500">Belum ada data izin.</td>
            </tr>
          ) : (
            filtered.map((item, i) => (
              <tr key={i}>
                <td className="p-2 border">{formatTanggal(item.tanggal_mulai)}</td>
                <td className="p-2 border">{formatTanggal(item.tanggal_selesai)}</td>
                <td className="p-2 border">{item.keterangan}</td>
                <td className="p-2 border capitalize font-semibold">
                  {item.status === 'disetujui'
                    ? <span className="text-green-600">{item.status}</span>
                    : item.status === 'ditolak'
                      ? <span className="text-red-600">{item.status}</span>
                      : <span className="text-yellow-600">{item.status}</span>
                  }
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RiwayatIzinTable;
