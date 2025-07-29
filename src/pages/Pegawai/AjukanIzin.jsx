import React, { useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import { ajukanIzin as ajukanIzinAPI } from '../../api/axios';

export default function AjukanIzin() {
  const [form, setForm] = useState({
    tanggal_mulai: '',
    tanggal_selesai: '',
    keterangan: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi: tanggal_selesai harus >= tanggal_mulai
    const mulai = new Date(form.tanggal_mulai);
    const selesai = new Date(form.tanggal_selesai);
    if (selesai < mulai) {
      alert('Tanggal selesai tidak boleh lebih awal dari tanggal mulai.');
      return;
    }

    try {
      await ajukanIzinAPI(form);
      alert('Izin berhasil diajukan.');
      setForm({ tanggal_mulai: '', tanggal_selesai: '', keterangan: '' });
    } catch (error) {
      alert('Gagal mengajukan izin.');
      console.error(error);
    }
  };

  return (
    <LayoutWrapper>
      <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Ajukan Izin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={form.tanggal_mulai}
              onChange={e => setForm({ ...form, tanggal_mulai: e.target.value })}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Tanggal Selesai</label>
            <input
              type="date"
              value={form.tanggal_selesai}
              onChange={e => setForm({ ...form, tanggal_selesai: e.target.value })}
              required
              className="w-full border px-3 py-2 rounded"
              min={form.tanggal_mulai} // ⬅️ Validasi di sisi input agar tidak bisa pilih mundur
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Keterangan</label>
            <textarea
              value={form.keterangan}
              onChange={e => setForm({ ...form, keterangan: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              rows={3}
              required
            />
          </div>
          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
            Ajukan Izin
          </button>
        </form>
      </div>
    </LayoutWrapper>
  );
}
