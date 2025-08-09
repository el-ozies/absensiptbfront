// src/pages/admin/RekapAbsensi.jsx
import React, { useEffect, useState } from "react";
import LayoutWrapper from "../../components/common/LayoutWrapper";
import { getRekapAbsensi } from "../../api/absensi";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ExportButton from "../../components/admin/ExportButton";
import RekapTable from "../../components/admin/RekapTable";

const RekapAbsensi = () => {
  const [rekap, setRekap] = useState([]);
  const [tanggal, setTanggal] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setTanggal(today);
  }, []);

  useEffect(() => {
    if (tanggal) fetchRekap();
  }, [tanggal]);

  const fetchRekap = async () => {
    setLoading(true);
    try {
      const res = await getRekapAbsensi(tanggal);
      const filtered = (res.data || []).filter(row => new Date(row.tanggal).getDay() !== 0);
      setRekap(filtered);
    } catch (err) {
      console.error("❌ Gagal mengambil rekap:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    const today = new Date().toISOString().split("T")[0];
    setTanggal(today);
    setSearchTerm("");
    fetchRekap();
  };

  const formatTanggalID = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const filteredData = rekap.filter((item) =>
    item.nama?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nip?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportExcel = () => {
    const exportData = filteredData.map((row) => ({
      Nama: row.nama,
      NIP: row.nip,
      Tanggal: formatTanggalID(row.tanggal),
      "Jam Wajib": row.jam_wajib,
      "Jam Masuk": row.jam_masuk || "-",
      "Jam Pulang": row.jam_keluar || "-",
      "Jam Aktual": row.jam_aktual || "-",
      Keterlambatan: row.keterlambatan || "-",
      Status: row.status,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Rekap");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), `rekap-${tanggal}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Rekap Absensi - ${formatTanggalID(tanggal)}`, 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [["Nama", "NIP", "Tanggal", "Jam Wajib", "Jam Masuk", "Jam Pulang", "Jam Aktual", "Keterlambatan", "Status"]],
      body: filteredData.map((row) => [
        row.nama,
        row.nip,
        formatTanggalID(row.tanggal),
        row.jam_wajib,
        row.jam_masuk || "-",
        row.jam_keluar || "-",
        row.jam_aktual || "-",
        row.keterlambatan || "-",
        row.status,
      ]),
    });
    doc.save(`rekap-${tanggal}.pdf`);
  };

  return (
    <LayoutWrapper>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Rekap Absensi</h1>

        {/* Filter dan Export */}
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Tanggal</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-600 mb-1">Cari Nama / NIP</label>
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Reset
            </button>
            <ExportButton
              onExportExcel={handleExportExcel}
              onExportPDF={handleExportPDF}
            />
          </div>
        </div>

        {/* Tabel */}
        {loading ? (
          <p className="text-gray-500">Memuat data...</p>
        ) : (
          <RekapTable data={filteredData} />
        )}
      </div>
    </LayoutWrapper>
  );
};

export default RekapAbsensi;
