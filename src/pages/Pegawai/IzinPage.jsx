// src/pages/Pegawai/IzinPage.jsx
import React, { useState } from "react";
import LayoutWrapper from "../../components/common/LayoutWrapper";
import AjukanIzinForm from "../../components/izin/AjukanIzinForm";
import RiwayatIzinTable from "../../components/izin/RiwayatIzinTable";

const IzinPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <LayoutWrapper title="Pengajuan Izin">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pengajuan Izin</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Ajukan Izin
        </button>
      </div>

      {/* Tabel Riwayat */}
      <RiwayatIzinTable refreshKey={refreshKey} />

      {/* Modal Form */}
      <AjukanIzinForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSuccess={handleSuccess}
      />
    </LayoutWrapper>
  );
};

export default IzinPage;
