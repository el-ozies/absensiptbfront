import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { getSemuaIzin, validasiIzin } from '../../api/axios';

const ValidasiIzin = () => {
  const [izin, setIzin] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getSemuaIzin();
      const data = Array.isArray(res) ? res : res.data;
      setIzin(data || []);
    } catch (err) {
      console.error('Gagal mengambil data izin:', err);
      setIzin([]);
    }
  };
  fetchData();
}, []);

// Tambahkan di atas komponen
const formatTanggal = (iso) => {
  if (!iso) return '-';
  return new Date(iso).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};


  const updateStatus = async (id, status) => {
    try {
      await validasiIzin(id, status);
      setIzin(prev => prev.map(i => (i.id === id ? { ...i, status } : i)));
    } catch (err) {
      alert('Gagal memperbarui status');
    }
  };

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4">Validasi Izin Pegawai</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-3 py-2 border">Nama</th>
              <th className="px-3 py-2 border">Mulai</th>
              <th className="px-3 py-2 border">Selesai</th>
              <th className="px-3 py-2 border">Status</th>
              <th className="px-3 py-2 border">Keterangan</th>
              <th className="px-3 py-2 border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {izin.map((i) => (
              <tr key={i.id} className="text-center">
                <td className="border px-2 py-1">{i.nama}</td>
                <td className="border px-2 py-1">{formatTanggal(i.tanggal_mulai)}</td>
                <td className="border px-2 py-1">{formatTanggal(i.tanggal_selesai)}</td>
                <td className={`border px-2 py-1 ${i.status === 'disetujui' ? 'text-green-600' : i.status === 'ditolak' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {i.status}
                </td>
                <td className="border px-2 py-1">{i.keterangan}</td>
                <td className="border px-2 py-1 space-x-1">
                  {i.status === 'menunggu' && (
                    <>
                      <button
                        onClick={() => updateStatus(i.id, 'disetujui')}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() => updateStatus(i.id, 'ditolak')}
                        className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Tolak
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {izin.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-3 text-gray-500">
                  Tidak ada permintaan izin
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </LayoutWrapper>
  );
};

export default ValidasiIzin;
