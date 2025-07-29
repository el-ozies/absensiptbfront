import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { getRiwayatIzin } from '../../api/axios';

const bulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export default function RiwayatIzin() {
  const [riwayat, setRiwayat] = useState([]);
  const [bulan, setBulan] = useState(new Date().getMonth());
  const [tahun, setTahun] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRiwayatIzin();
        setRiwayat(data);
      } catch (err) {
        console.error('Gagal mengambil riwayat izin:', err);
      }
    };
    fetchData();
  }, []);

  const formatTanggal = (dateStr) => {
    const date = new Date(dateStr);
    const tgl = date.getDate();
    const bln = bulanList[date.getMonth()];
    const thn = date.getFullYear();
    return `${tgl} ${bln} ${thn}`;
  };

  const filteredData = riwayat.filter(item => {
    const mulai = new Date(item.tanggal_mulai);
    return mulai.getMonth() === bulan && mulai.getFullYear() === tahun;
  });

  return (
    <LayoutWrapper>
      <div className="max-w-4xl mx-auto mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Riwayat Izin</h2>

        {/* Filter Bulan dan Tahun */}
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <select
            className="border px-3 py-2 rounded"
            value={bulan}
            onChange={(e) => setBulan(parseInt(e.target.value))}
          >
            {bulanList.map((b, i) => (
              <option key={i} value={i}>{b}</option>
            ))}
          </select>
          <select
            className="border px-3 py-2 rounded"
            value={tahun}
            onChange={(e) => setTahun(parseInt(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => 2023 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Tabel Riwayat */}
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
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  Belum ada data izin.
                </td>
              </tr>
            ) : (
              filteredData.map((item, i) => {
                const mulai = new Date(item.tanggal_mulai);
                const selesai = new Date(item.tanggal_selesai);
                // Jika tanggal_mulai > tanggal_selesai, tukar
                const mulaiFix = mulai > selesai ? selesai : mulai;
                const selesaiFix = mulai > selesai ? mulai : selesai;

                return (
                  <tr key={i}>
                    <td className="p-2 border">{formatTanggal(mulaiFix)}</td>
                    <td className="p-2 border">{formatTanggal(selesaiFix)}</td>
                    <td className="p-2 border">{item.keterangan}</td>
                    <td className="p-2 border capitalize">
                      <span
                        className={
                          item.status === 'disetujui'
                            ? 'text-green-600 font-semibold'
                            : item.status === 'ditolak'
                            ? 'text-red-600 font-semibold'
                            : 'text-yellow-600 font-semibold'
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </LayoutWrapper>
  );
}
