// src/components/absensipegawai/AbsenForm.jsx
import { useEffect, useState } from 'react';
import { absenMasuk } from '../../api/axios';
import ButtonAction from './ButtonAction';

const AbsenForm = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setMessage('Geolocation tidak didukung oleh browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      () => {
        setMessage('Gagal mengambil lokasi. Pastikan GPS aktif.');
      }
    );
  }, []);

  const handleAbsen = async () => {
    if (!latitude || !longitude) {
      setMessage('Lokasi belum tersedia.');
      return;
    }

    setLoading(true);
    try {
      const response = await absenMasuk({
        latitude,
        longitude,
        device_id: 'DEVICE001',
        foto_masuk: 'foto123.jpg',
      });

      setMessage(response.message || 'Absen berhasil!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto w-full">
      <h2 className="text-xl font-bold mb-4 text-center">Absensi Masuk</h2>

      <div className="mb-3">
        <label className="block text-sm text-gray-600">Latitude</label>
        <input
          value={latitude || ''}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100 text-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600">Longitude</label>
        <input
          value={longitude || ''}
          readOnly
          className="w-full border px-3 py-2 rounded bg-gray-100 text-sm"
        />
      </div>

      <ButtonAction
        label={loading ? 'Mengirim...' : 'Absen Sekarang'}
        onClick={handleAbsen}
        disabled={loading}
      />

      {message && (
        <p className="text-sm text-center text-red-600 mt-4">{message}</p>
      )}
    </div>
  );
};

export default AbsenForm;
