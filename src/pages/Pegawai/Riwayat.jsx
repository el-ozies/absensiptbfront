// src/pages/Pegawai/Riwayat.jsx
import React, { useEffect, useState } from "react";
import LayoutWrapper from "../../components/common/LayoutWrapper";
import { getRiwayatAbsensi } from "../../api/absensi";

const Riwayat = () => {
  const currentDate = new Date();
  const [bulan, setBulan] = useState(currentDate.getMonth() + 1);
  const [tahun, setTahun] = useState(currentDate.getFullYear());
  const [riwayat, setRiwayat] = useState([]);
  const [statistik, setStatistik] = useState({
    hadir: 0,
    alpha: 0,
    izin: 0,
    hariKerja: 0,
  });

  const fetchRiwayat = async () => {
    try {
      const response = await getRiwayatAbsensi(bulan, tahun);
      const data = response.data;
      setRiwayat(data.riwayat || []);
      setStatistik({
        hadir: data.total_hadir || 0,
        alpha: data.total_alpha || 0,
        izin: data.total_izin || 0,
        hariKerja: data.total_hari_kerja || 0,
      });
    } catch (err) {
      console.error("Gagal mengambil riwayat absensi:", err);
    }
  };

  useEffect(() => {
    fetchRiwayat();
  }, [bulan, tahun]);

  const bulanOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const tahunOptions = [2024, 2025, 2026];

  const getStatusColor = (status) => {
    switch (status) {
      case "Hadir":
        return "bg-green-200 text-green-800";
      case "Izin":
        return "bg-blue-200 text-blue-800";
      case "Alpha":
        return "bg-red-200 text-red-800";
      case "Sedang Bekerja":
        return "bg-yellow-200 text-yellow-800";
      case "Belum Pulang":
        return "bg-orange-200 text-orange-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <LayoutWrapper>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Riwayat Absensi</h1>

        {/* Filter Bulan dan Tahun */}
        <div className="flex gap-4 mb-4">
          <select
            value={bulan}
            onChange={(e) => setBulan(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {bulanOptions.map((b) => (
              <option key={b} value={b}>
                {new Date(0, b - 1).toLocaleString("id-ID", { month: "long" })}
              </option>
            ))}
          </select>

          <select
            value={tahun}
            onChange={(e) => setTahun(parseInt(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {tahunOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-green-100 text-green-800 p-3 rounded-lg shadow">
            <h2 className="font-semibold">Hadir</h2>
            <p className="text-xl">{statistik.hadir}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 p-3 rounded-lg shadow">
            <h2 className="font-semibold">Izin</h2>
            <p className="text-xl">{statistik.izin}</p>
          </div>
          <div className="bg-red-100 text-red-800 p-3 rounded-lg shadow">
            <h2 className="font-semibold">Alpha</h2>
            <p className="text-xl">{statistik.alpha}</p>
          </div>
          <div className="bg-gray-100 text-gray-800 p-3 rounded-lg shadow">
            <h2 className="font-semibold">Hari Kerja</h2>
            <p className="text-xl">{statistik.hariKerja}</p>
          </div>
        </div>

        {/* Tabel Riwayat */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4">Tanggal</th>
                <th className="py-2 px-4">Jam Wajib</th>
                <th className="py-2 px-4">Jam Masuk</th>
                <th className="py-2 px-4">Jam Pulang</th>
                <th className="py-2 px-4">Jam Aktual</th>
                <th className="py-2 px-4">Keterlambatan</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.length > 0 ? (
                riwayat.map((item, index) => (
                  <tr key={index} className="border-b">
                    {/* Tanggal langsung dari backend */}
                    <td className="py-2 px-4">{item.tanggal || "-"}</td>
                    <td className="py-2 px-4">{item.jam_wajib || "-"}</td>
                    <td className="py-2 px-4">{item.jam_masuk || "-"}</td>
                    <td className="py-2 px-4">{item.jam_pulang || "-"}</td>
                    <td className="py-2 px-4">{item.jam_aktual || "-"}</td>
                    <td className="py-2 px-4">
                      {item.keterlambatan && item.keterlambatan !== "-"
                        ? `${item.keterlambatan}`
                        : "-"}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500 italic"
                  >
                    Tidak ada data absensi.
                  </td>
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
