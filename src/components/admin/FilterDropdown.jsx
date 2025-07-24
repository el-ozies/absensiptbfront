import React from 'react';
import { useEffect, useState } from 'react';
import { getUsers } from '../../api/axios';

const bulanList = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const FilterDropdown = ({ bulan, tahun, pegawaiId, onChange }) => {
  const [pegawaiList, setPegawaiList] = useState([]);

  useEffect(() => {
    getUsers().then(setPegawaiList);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        value={bulan}
        onChange={(e) => onChange('bulan', e.target.value)}
        className="border px-3 py-2 rounded"
      >
        {bulanList.map((b, i) => (
          <option key={i} value={i + 1}>{b}</option>
        ))}
      </select>

      <select
        value={tahun}
        onChange={(e) => onChange('tahun', e.target.value)}
        className="border px-3 py-2 rounded"
      >
        {[2025, 2024, 2023].map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      <select
        value={pegawaiId}
        onChange={(e) => onChange('pegawaiId', e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">Semua Pegawai</option>
        {pegawaiList.map((p) => (
          <option key={p.id} value={p.id}>{p.nama}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
