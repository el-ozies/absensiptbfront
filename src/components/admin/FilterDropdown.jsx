// src/components/admin/FilterDropdown.jsx
import React from 'react';
import { CalendarIcon } from 'lucide-react';

const bulanList = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

const FilterDropdown = ({ bulan, tahun, onChange }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Bulan */}
      <div className="relative">
        <label className="block text-sm text-gray-600 mb-1">Bulan</label>
        <select
          value={bulan}
          onChange={(e) => onChange("bulan", e.target.value)}
          className="appearance-none px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {bulanList.map((b, i) => (
            <option key={i} value={i + 1}>{b}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-9 text-gray-400">
          <CalendarIcon size={16} />
        </div>
      </div>

      {/* Tahun */}
      <div className="relative">
        <label className="block text-sm text-gray-600 mb-1">Tahun</label>
        <select
          value={tahun}
          onChange={(e) => onChange("tahun", e.target.value)}
          className="appearance-none px-4 py-2 pr-10 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {[2025, 2026, 2027].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-9 text-gray-400">
          <CalendarIcon size={16} />
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
