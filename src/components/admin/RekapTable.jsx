import React from 'react';
import StatusBadge from './StatusBadge';

const RekapTable = ({ data = [] }) => {
  if (!data.length) {
    return (
      <p className="text-center text-sm text-gray-500 py-4">
        Tidak ada data absensi ditemukan.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded-md">
      <table className="min-w-full text-sm border">
        <thead className="bg-gray-100 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-2">Tanggal</th>
            <th className="px-4 py-2">Nama</th>
            <th className="px-4 py-2">Jam Masuk</th>
            <th className="px-4 py-2">Jam Keluar</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2">{item.tanggal}</td>
              <td className="px-4 py-2">{item.nama}</td>
              <td className="px-4 py-2">{item.jam_masuk || '-'}</td>
              <td className="px-4 py-2">{item.jam_keluar || '-'}</td>
              <td className="px-4 py-2">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RekapTable;
