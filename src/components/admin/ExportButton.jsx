//src/components/admin/ExportButton.jsx
import React, { useState } from "react";

const ExportButton = ({ onExportExcel, onExportPDF }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
      >
        Export ⌄
      </button>
      {show && (
        <div
          className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-md z-10"
          onMouseLeave={() => setShow(false)}
        >
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => {
              onExportExcel();
              setShow(false);
            }}
          >
            📊 Export Excel
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            onClick={() => {
              onExportPDF();
              setShow(false);
            }}
          >
            📄 Export PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
