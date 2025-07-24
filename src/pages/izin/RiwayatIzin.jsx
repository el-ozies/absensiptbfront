// src/pages/izin/RiwayatIzin.jsx
import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { getRiwayatIzin } from '../../services/izinService';

export default function RiwayatIzin() {
  const [riwayat, setRiwayat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pegawai_id = localStorage.getItem('pegawai_id');
      if (!pegawai_id) return;
      try {
        const data = await getRiwayatIzin(pegawai_id);
        setRiwayat(data);
      } catch (err) {
        console.error('Gagal mengambil riwayat izin', err);
      }
    };

    fetchData();
  }, []);

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Riwayat Izin</h2>
        <table className="w-full text-left border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Tanggal Mulai</th>
              <th className="p-2 border">Tanggal Selesai</th>
              <th className="p-2 border">Keterangan</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {riwayat.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">Belum ada data izin.</td>
              </tr>
            ) : (
              riwayat.map((item, i) => (
                <tr key={i}>
                  <td className="p-2 border">{item.tanggal_mulai}</td>
                  <td className="p-2 border">{item.tanggal_selesai}</td>
                  <td className="p-2 border">{item.keterangan}</td>
                  <td className="p-2 border capitalize">{item.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </LayoutWrapper>
  );
}
