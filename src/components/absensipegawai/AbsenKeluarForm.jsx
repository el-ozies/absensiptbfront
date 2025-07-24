import { useEffect, useState } from 'react';
import { absenKeluar } from '../../api/axios';
import ButtonAction from './ButtonAction';

const AbsenKeluarForm = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
      },
      () => setMessage('Gagal mengambil lokasi. Pastikan GPS aktif.')
    );
  }, []);

  const handleAbsenKeluar = async () => {
    setLoading(true);
    try {
      const res = await absenKeluar({
        latitude,
        longitude,
        device_id: 'DEVICE001',
        foto_keluar: 'foto_keluar.jpg',
      });
      setMessage(res.message || 'Berhasil absen keluar!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Gagal absen keluar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto w-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Absensi Keluar</h2>

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
        label={loading ? 'Mengirim...' : 'Absen Keluar'}
        onClick={handleAbsenKeluar}
        disabled={loading}
        type="warning"
      />

      {message && <p className="text-sm text-center text-red-600 mt-4">{message}</p>}
    </div>
  );
};

export default AbsenKeluarForm;
