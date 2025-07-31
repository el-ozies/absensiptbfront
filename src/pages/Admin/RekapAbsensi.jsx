import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import StatusBadge from '../../components/StatusBadge';
import api from '../../api/axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



const RekapAbsensi = () => {
  const [rekap, setRekap] = useState([]);
  const [tanggal, setTanggal] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Atur tanggal default ke hari ini saat pertama kali render
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    setTanggal(today);
  }, []);

  // Ambil data rekap jika tanggal sudah dipilih
  useEffect(() => {
    if (tanggal) {
      fetchRekap();
    }
  }, [tanggal]);

  const fetchRekap = async () => {
    if (!tanggal) return;
    setLoading(true);
    try {
      const response = await api.get('/absensi/rekap', {
        params: { tanggal },
      });
      setRekap(response.data || []);
    } catch (err) {
      alert('Gagal mengambil data rekap');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (tanggal) fetchRekap();
  };

  const handleReset = () => {
    const today = new Date().toISOString().split('T')[0];
    setTanggal(today);
    setSearchTerm('');
  };

  const filteredData = rekap.filter((item) => {
    const matchSearch =
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nip.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  const handleExportExcel = () => {
    const exportData = filteredData.map(row => ({
      Tanggal: row.tanggal,
      Nama: row.nama,
      NIP: row.nip,
      Masuk: row.jam_masuk || '-',
      Keluar: row.jam_keluar || '-',
      Status: row.status,
      Kehadiran: row.kehadiran,
    }));
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, `rekap-${tanggal}.xlsx`);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Rekap Absensi - ${tanggal}`, 14, 10);
    autoTable(doc, {
      startY: 20,
      head: [['Tanggal', 'Nama', 'NIP', 'Masuk', 'Keluar', 'Status', 'Kehadiran']],
      body: filteredData.map(row => [
        row.tanggal,
        row.nama,
        row.nip,
        row.jam_masuk || '-',
        row.jam_keluar || '-',
        row.status,
        row.kehadiran
      ])
    });
    doc.save(`rekap-${tanggal}.pdf`);
  };

  return (
    <LayoutWrapper>
      <div className="p-6 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-gray-800">Rekap Absensi</h1>

        {/* Filter & Search */}
        <form onSubmit={handleFilter} className="flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="px-3 py-2 border rounded-md w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cari Nama / NIP</label>
            <input
              type="text"
              placeholder="Cari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border rounded-md w-full"
            />
          </div>
          <div className="flex gap-2">
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
            <button
              type="button"
              onClick={handleExportExcel}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Export Excel
            </button>
            <button
              type="button"
              onClick={handleExportPDF}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export PDF
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto mt-4">
          {loading ? (
            <p className="text-gray-500">Memuat data...</p>
          ) : (
            <table className="min-w-full text-sm border border-gray-300 rounded-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 border">Tanggal</th>
                  <th className="px-4 py-2 border">Nama</th>
                  <th className="px-4 py-2 border">NIP</th>
                  <th className="px-4 py-2 border">Masuk</th>
                  <th className="px-4 py-2 border">Keluar</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{row.tanggal}</td>
                      <td className="px-4 py-2 border">{row.nama}</td>
                      <td className="px-4 py-2 border">{row.nip}</td>
                      <td className="px-4 py-2 border">{row.jam_masuk || '-'}</td>
                      <td className="px-4 py-2 border">{row.jam_keluar || '-'}</td>
                      <td className="px-4 py-2 border"><StatusBadge status={row.status} /></td>
                      <td className="px-4 py-2 border font-medium">{row.kehadiran || '0%'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-4 py-3 text-center text-gray-500">
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
