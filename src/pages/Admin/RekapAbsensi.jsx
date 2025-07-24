import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import api from '../../api/axios';

const RekapAbsensi = () => {
  const [rekap, setRekap] = useState([]);
  const [tanggal, setTanggal] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchRekap = async () => {
    setLoading(true);
    try {
      const response = await api.get('/absensi/rekap', {
        params: tanggal ? { tanggal } : {},
      });
      setRekap(response.data);
    } catch (err) {
      alert('Gagal mengambil data rekap');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRekap();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchRekap();
  };

  const handleReset = () => {
    setTanggal('');
    fetchRekap();
  };

  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-800">Rekap Absensi</h1>

        {/* Filter */}
        <form onSubmit={handleFilter} className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filter Tanggal:
            </label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-2 mt-5">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Terapkan
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          {loading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : (
            <table className="min-w-full text-sm text-left border border-gray-300">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Tanggal</th>
                  <th className="px-4 py-2 border">Nama</th>
                  <th className="px-4 py-2 border">NIP</th>
                  <th className="px-4 py-2 border">Masuk</th>
                  <th className="px-4 py-2 border">Keluar</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {rekap.length > 0 ? (
                  rekap.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-2 border">{row.tanggal}</td>
                      <td className="px-4 py-2 border">{row.nama}</td>
                      <td className="px-4 py-2 border">{row.nip}</td>
                      <td className="px-4 py-2 border">{row.jam_masuk || '-'}</td>
                      <td className="px-4 py-2 border">{row.jam_keluar || '-'}</td>
                      <td className="px-4 py-2 border">{row.status || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-3 text-center text-gray-500">
                      Tidak ada data absensi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default RekapAbsensi;
