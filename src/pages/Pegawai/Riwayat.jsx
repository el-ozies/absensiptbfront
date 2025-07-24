import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import api from '../../api/axios';

const months = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const formatTanggal = (tanggalStr) => {
  const date = new Date(tanggalStr);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

const formatKeterlambatan = (menit) => {
  const m = parseInt(menit);
  if (isNaN(m) || m <= 0) return '-';
  const jam = Math.floor(m / 60);
  const sisamenit = m % 60;
  return `${jam > 0 ? `${jam} jam ` : ''}${sisamenit} menit`;
};

const Riwayat = () => {
  const today = new Date();
  const [bulan, setBulan] = useState(today.getMonth() + 1);
  const [tahun, setTahun] = useState(today.getFullYear());
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const [statistik, setStatistik] = useState({
    hadir: 0,
    alpha: 0,
    keterlambatan: 0,
    persen: 0
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/absensi/riwayat');
      const rawData = res.data;

      const filtered = rawData.filter((d) => {
        const tanggal = new Date(d.tanggal);
        return (
          tanggal.getMonth() + 1 === parseInt(bulan) &&
          tanggal.getFullYear() === parseInt(tahun)
        );
      });

      setData(filtered);
      setFiltered(filtered);
      hitungStatistik(filtered);
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const hitungStatistik = (list) => {
    let hadir = 0, alpha = 0, keterlambatan = 0;

    list.forEach(item => {
      if (item.status === 'Hadir' || item.status === 'Terlambat') hadir++;
      else if (item.status === 'Alpha' || item.status === 'Tidak Hadir') alpha++;

      keterlambatan += parseInt(item.keterlambatan) || 0;
    });

    const total = hadir + alpha;
    const persen = total ? Math.round((hadir / total) * 100) : 0;

    setStatistik({ hadir, alpha, keterlambatan, persen });
  };

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setSearch(q);
    const f = data.filter(
      (d) =>
        d.tanggal.includes(q) ||
        d.status.toLowerCase().includes(q) ||
        (d.keterlambatan || '').toString().toLowerCase().includes(q)
    );
    setFiltered(f);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Riwayat Absensi</h1>

        {/* Filter */}
        <div className="flex gap-3 items-end">
          <div>
            <label className="text-sm text-gray-600">Bulan</label>
            <select
              className="border rounded px-3 py-2"
              value={bulan}
              onChange={(e) => setBulan(e.target.value)}
            >
              {months.map((b, i) => (
                <option value={i + 1} key={i}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-600">Tahun</label>
            <input
              type="number"
              className="border rounded px-3 py-2"
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
            />
          </div>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Lihat
          </button>
        </div>

        {/* Statistik */}
        <div className="bg-white rounded-xl shadow p-4 text-sm text-gray-700">
          <p><strong>Total Kehadiran:</strong> {statistik.hadir} Hari</p>
          <p><strong>Total Alpha:</strong> {statistik.alpha} Hari</p>
          <p><strong>Total Keterlambatan:</strong> {formatKeterlambatan(statistik.keterlambatan)}</p>
          <p><strong>Persentase Kehadiran:</strong> {statistik.persen}%</p>
        </div>

        {/* Search */}
        <div className="mt-4 flex items-center gap-2">
          <label className="text-sm text-gray-600">Cari:</label>
          <input
            type="text"
            className="border px-3 py-2 rounded"
            placeholder="Cari..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto mt-4">
          {loading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : (
            <table className="min-w-full border text-sm text-left">
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
                {filtered.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-2">{formatTanggal(item.tanggal)}</td>
                    <td className="px-4 py-2">{item.jam_masuk || '-'}</td>
                    <td className="px-4 py-2">{item.jam_keluar || '-'}</td>
                    <td className="px-4 py-2">{formatKeterlambatan(item.keterlambatan)}</td>
                    <td className="px-4 py-2">-</td>
                    <td className="px-4 py-2">
                      {item.status === 'Hadir' && (
                        <span className="text-green-600 font-semibold">Hadir</span>
                      )}
                      {item.status === 'Terlambat' && (
                        <span className="text-yellow-600 font-semibold">Terlambat</span>
                      )}
                      {item.status === 'Alpha' || item.status === 'Tidak Hadir' ? (
                        <span className="text-red-500 font-semibold">Alpha</span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Riwayat;
