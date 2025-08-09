// src/components/absensipegawai/AbsenStatus.jsx
import StatusBadge from './StatusBadge';

const AbsenStatus = ({ status = 'Belum Absen', waktuMasuk }) => {
  return (
    <div className="bg-white p-4 rounded shadow text-sm w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-1">
        <span>Status Hari Ini:</span>
        <StatusBadge status={status} />
      </div>
      {waktuMasuk && (
        <div className="text-gray-500 text-xs">
          Waktu Masuk: <strong>{waktuMasuk}</strong>
        </div>
      )}
    </div>
  );
};

export default AbsenStatus;
