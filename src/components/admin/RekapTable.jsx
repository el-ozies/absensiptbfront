// src/components/admin/RekapTable.jsx
import React from "react";

const formatTanggalID = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getStatusColor = (status) => {
  switch (status) {
    case "Hadir": return "bg-green-100 text-green-700";
    case "Izin": return "bg-blue-100 text-blue-700";
    case "Alpha": return "bg-red-100 text-red-700";
    case "Sedang Bekerja": return "bg-yellow-100 text-yellow-700";
    case "Belum Pulang": return "bg-orange-100 text-orange-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const RekapTable = ({ data = [] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-4 py-2 border">Nama</th>
            <th className="px-4 py-2 border">NIP</th>
            <th className="px-4 py-2 border">Tanggal</th>
            <th className="px-4 py-2 border">Jam Wajib</th>
            <th className="px-4 py-2 border">Jam Masuk</th>
            <th className="px-4 py-2 border">Jam Pulang</th>
            <th className="px-4 py-2 border">Jam Aktual</th>
            <th className="px-4 py-2 border">Keterlambatan</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={`${row.pegawai_id}-${row.tanggal}`} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{row.nama}</td>
                <td className="px-4 py-2 border">{row.nip}</td>
                <td className="px-4 py-2 border">{formatTanggalID(row.tanggal)}</td>
                <td className="px-4 py-2 border">{row.jam_wajib}</td>
                <td className="px-4 py-2 border">{row.jam_masuk || "-"}</td>
                <td className="px-4 py-2 border">{row.jam_keluar || "-"}</td>
                <td className="px-4 py-2 border">{row.jam_aktual || "-"}</td>
                <td className="px-4 py-2 border">{row.keterlambatan || "-"}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="px-4 py-3 text-center text-gray-500">
                Tidak ada data absensi.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RekapTable;
