// src/components/absensipegawai/AbsenCard.jsx
import StatusBadge from './StatusBadge';

const AbsenCard = ({ tanggal, jamMasuk, jamKeluar, status }) => {
  return (
    <div className="bg-white p-4 shadow rounded-md text-sm w-full">
      <h3 className="font-semibold text-gray-800 mb-2">Ringkasan Hari Ini</h3>
      <p className="text-gray-500 mb-1">Tanggal: {tanggal}</p>
      <p className="text-gray-500 mb-1">Masuk: {jamMasuk || '-'}</p>
      <p className="text-gray-500 mb-1">Keluar: {jamKeluar || '-'}</p>
      <div className="mt-2">
        <StatusBadge status={status} />
      </div>
    </div>
  );
};

export default AbsenCard;
