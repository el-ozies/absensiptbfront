// src/components/admin/TanggalFilter.jsx
import React from 'react';
const TanggalFilter = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1">Filter Tanggal</label>
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="border px-3 py-2 rounded w-full sm:w-60"
      />
    </div>
  );
};

export default TanggalFilter;
