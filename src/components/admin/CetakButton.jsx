// src/components/admin/CetakButton.jsx
import React from 'react';
const CetakButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
    >
      Cetak PDF
    </button>
  );
};

export default CetakButton;
