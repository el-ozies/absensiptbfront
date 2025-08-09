// src/pages/admin/ValidasiIzin.jsx
import React, { useState, useEffect } from "react";
import LayoutWrapper from "../../components/common/LayoutWrapper";
import { getSemuaIzin, validasiIzin } from "../../api/izin";
import { Check, XCircle } from "lucide-react";

const ValidasiIzin = () => {
  const [izinList, setIzinList] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await getSemuaIzin();
      setIzinList(res.data || []);
    } catch (err) {
      console.error("Gagal memuat izin menunggu", err);
    }
    setLoading(false);
  };

  const handleValidasi = async (id, status) => {
    const confirmText =
      status === "disetujui" ? "Setujui izin ini?" : "Tolak izin ini?";
    if (!window.confirm(confirmText)) return;

    try {
      await validasiIzin(id, status);
      alert(`Izin berhasil ${status}`);
      loadData();
    } catch (err) {
      console.error(`Gagal memproses izin ${status}`, err);
      alert("Gagal memproses izin");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatTanggal = (tgl) =>
    new Date(tgl).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <LayoutWrapper title="Validasi Izin">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Validasi Izin Pegawai</h1>
            </div>

      {loading ? (
        <p className="text-gray-600">Memuat data...</p>
      ) : izinList.length === 0 ? (
        <div className="text-center text-gray-500 py-10">Tidak ada izin menunggu validasi.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-200 shadow-sm rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 border">Nama Pegawai</th>
                <th className="p-3 border">Tanggal Mulai</th>
                <th className="p-3 border">Tanggal Selesai</th>
                <th className="p-3 border">Keterangan</th>
                <th className="p-3 border text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {izinList.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3">{item.nama}</td>
                  <td className="p-3">{formatTanggal(item.tanggal_mulai)}</td>
                  <td className="p-3">{formatTanggal(item.tanggal_selesai)}</td>
                  <td className="p-3">{item.keterangan}</td>
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleValidasi(item.id, "disetujui")}
                      className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg shadow text-sm transition"
                    >
                      <Check className="w-4 h-4" /> Setujui
                    </button>
                    <button
                      onClick={() => handleValidasi(item.id, "ditolak")}
                      className="inline-flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow text-sm transition"
                    >
                      <XCircle className="w-4 h-4" /> Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </LayoutWrapper>
  );
};

export default ValidasiIzin;
