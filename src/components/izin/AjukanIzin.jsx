//src/components/izin/AjukanIzin.jsx
import React, { useState, useEffect } from "react";
import { getDisableDates, ajukanIzin } from "../../api/izin";

const AjukanIzin = () => {
  const [formData, setFormData] = useState({
    tanggal_mulai: "",
    tanggal_selesai: "",
    keterangan: "",
  });
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const fetchDisabledDates = async () => {
      try {
        const res = await getDisableDates();
        setDisabledDates(res.data.disabledDates || []);
      } catch (err) {
        console.error("Gagal ambil disable dates:", err);
      }
    };

    fetchDisabledDates();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ajukanIzin(formData);
      alert("Izin berhasil diajukan");
      setFormData({ tanggal_mulai: "", tanggal_selesai: "", keterangan: "" });
    } catch (err) {
      console.error(err);
      alert("Gagal mengajukan izin");
    }
  };

  const isDateDisabled = (date) => {
    return disabledDates.includes(date);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Ajukan Izin</h2>
      <form onSubmit={handleSubmit}>
        {/* Tanggal Mulai */}
        <div className="mb-3">
          <label className="block font-medium">Tanggal Mulai</label>
          <input
            type="date"
            name="tanggal_mulai"
            value={formData.tanggal_mulai}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            min={new Date().toISOString().split("T")[0]}
          />
          {isDateDisabled(formData.tanggal_mulai) && (
            <p className="text-red-500 text-sm">Tanggal ini tidak tersedia</p>
          )}
        </div>

        {/* Tanggal Selesai */}
        <div className="mb-3">
          <label className="block font-medium">Tanggal Selesai</label>
          <input
            type="date"
            name="tanggal_selesai"
            value={formData.tanggal_selesai}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
            min={formData.tanggal_mulai || new Date().toISOString().split("T")[0]}
          />
          {isDateDisabled(formData.tanggal_selesai) && (
            <p className="text-red-500 text-sm">Tanggal ini tidak tersedia</p>
          )}
        </div>

        {/* Keterangan */}
        <div className="mb-3">
          <label className="block font-medium">Keterangan</label>
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={
            isDateDisabled(formData.tanggal_mulai) ||
            isDateDisabled(formData.tanggal_selesai)
          }
        >
          Ajukan
        </button>
      </form>
    </div>
  );
};

export default AjukanIzin;
