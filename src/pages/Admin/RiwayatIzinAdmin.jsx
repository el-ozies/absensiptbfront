// src/pages/Admin/RiwayatIzinAdmin.jsx
import React, { useState, useEffect } from "react";
import LayoutWrapper from "../../components/common/LayoutWrapper";
import { getAllIzin } from "../../api/izin";

const bulanList = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const RiwayatIzinAdmin = () => {
  const [data, setData] = useState([]);
  const [bulan, setBulan] = useState(new Date().getMonth());
  const [tahun, setTahun] = useState(new Date().getFullYear());

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getAllIzin();
      setData(res.data || []);
    } catch (err) {
      console.error("Gagal ambil data izin admin", err);
    }
  };

  const formatTanggal = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const filtered = data.filter((item) => {
    if (!item.tanggal_mulai || !item.tanggal_selesai) return false;
    const mulai = new Date(item.tanggal_mulai);
    const selesai = new Date(item.tanggal_selesai);
    const bulanFilter = bulan;
    const tahunFilter = tahun;

    // Cek jika rentang izin mencakup bulan & tahun filter
    return (
      (mulai.getMonth() <= bulanFilter && selesai.getMonth() >= bulanFilter) &&
      (mulai.getFullYear() <= tahunFilter && selesai.getFullYear() >= tahunFilter)
    );
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "disetujui":
        return <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{status}</span>;
      case "ditolak":
        return <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs">{status}</span>;
      default:
        return <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">{status}</span>;
    }
  };

  return (
    <LayoutWrapper title="Riwayat Izin Pegawai (Admin)">
      <div className="flex gap-2 mb-4">
        <select
          value={bulan}
          onChange={(e) => setBulan(parseInt(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {bulanList.map((b, i) => (
            <option key={i} value={i}>
              {b}
            </option>
          ))}
        </select>
        <select
          value={tahun}
          onChange={(e) => setTahun(parseInt(e.target.value))}
          className="border rounded px-2 py-1"
        >
          {Array.from({ length: 5 }, (_, i) => 2025 + i).map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 rounded-md">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 border">Nama Pegawai</th>
              <th className="p-2 border">Mulai</th>
              <th className="p-2 border">Selesai</th>
              <th className="p-2 border">Keterangan</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-gray-500">
                  Belum ada data izin.
                </td>
              </tr>
            ) : (
              filtered.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="p-2 border">{item.nama}</td>
                  <td className="p-2 border">{formatTanggal(item.tanggal_mulai)}</td>
                  <td className="p-2 border">{formatTanggal(item.tanggal_selesai)}</td>
                  <td className="p-2 border">{item.keterangan || "-"}</td>
                  <td className="p-2 border font-semibold">{getStatusBadge(item.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </LayoutWrapper>
  );
};

export default RiwayatIzinAdmin;
