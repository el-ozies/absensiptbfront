// src/components/izin/AjukanIzinForm.jsx
import React, { useState, useEffect } from "react";
import { ajukanIzin, getDisableDates } from "../../api/izin";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import id from "date-fns/locale/id";
import { format } from "date-fns"; // ✅ format tanggal tanpa UTC

const AjukanIzinForm = ({ isOpen, onClose, onSuccess }) => {
  const [alasan, setAlasan] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState(null);
  const [tanggalSelesai, setTanggalSelesai] = useState(null);
  const [disableDates, setDisableDates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadDisableDates();
    }
  }, [isOpen]);

  const loadDisableDates = async () => {
    try {
      const res = await getDisableDates();
      if (Array.isArray(res.data.disabledDates)) {
        setDisableDates(res.data.disabledDates.map((d) => new Date(d)));
      }
    } catch (err) {
      console.error("Gagal ambil disable dates", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ajukanIzin({
        alasan,
        tanggal_mulai: format(tanggalMulai, "yyyy-MM-dd"), // ✅ aman dari timezone
        tanggal_selesai: format(tanggalSelesai, "yyyy-MM-dd"), // ✅ aman dari timezone
      });
      alert("Izin berhasil diajukan ✅");
      onSuccess();
      onClose();
      setAlasan("");
      setTanggalMulai(null);
      setTanggalSelesai(null);
    } catch (err) {
      if (err.response?.status === 409) {
        alert(err.response.data.message || "Tanggal ini sudah ada absen/izin.");
      } else {
        alert(err.response?.data?.message || "Gagal mengajukan izin ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Ajukan Izin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Alasan izin"
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            required
          />

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm">Tanggal Mulai</label>
              <DatePicker
                selected={tanggalMulai}
                onChange={(date) => setTanggalMulai(date)}
                selectsStart
                startDate={tanggalMulai}
                endDate={tanggalSelesai}
                minDate={new Date()}
                excludeDates={disableDates}
                dateFormat="dd MMMM yyyy"
                locale={id}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 text-sm">Tanggal Selesai</label>
              <DatePicker
                selected={tanggalSelesai}
                onChange={(date) => setTanggalSelesai(date)}
                selectsEnd
                startDate={tanggalMulai}
                endDate={tanggalSelesai}
                minDate={tanggalMulai || new Date()}
                excludeDates={disableDates}
                dateFormat="dd MMMM yyyy"
                locale={id}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Mengirim..." : "Ajukan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AjukanIzinForm;
