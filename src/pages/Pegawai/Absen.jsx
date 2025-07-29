// src/pages/absensi/Absen.jsx
import React, { useEffect, useState } from 'react';
import LayoutWrapper from '../../components/LayoutWrapper';
import api from '../../api/axios';
import { CheckCircle, XCircle, MapPin, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import MapView from '../../components/MapView';

const Absen = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hariIni, setHariIni] = useState(null);
  const [isWithinRadius, setIsWithinRadius] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const lokasiKantor = { latitude: -7.120436, longitude: 112.600460 };
  const RADIUS_METER = 20000;

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const rad = (deg) => (deg * Math.PI) / 180;
    const dLat = rad(lat2 - lat1);
    const dLon = rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const masukStart = 7;
  const masukEnd = day === 6 ? 14 : 16;
  const pulangStart = masukEnd;
  const pulangEnd = 18;

  const isAbsenMasukAllowed = (!hariIni || !hariIni.jam_masuk) && hour >= masukStart && hour < masukEnd;
  const isAbsenKeluarAllowed = hariIni && !hariIni.jam_keluar && hour >= pulangStart && hour <= pulangEnd;
  const [loadingHariIni, setLoadingHariIni] = useState(true);
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        const jarak = getDistance(lat, lng, lokasiKantor.latitude, lokasiKantor.longitude);
        setIsWithinRadius(jarak <= RADIUS_METER);
      },
      (err) => {
        console.error(err);
        setStatus('error');
        setMessage('Gagal mengambil lokasi.');
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    getAbsenHariIni();
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

 const getAbsenHariIni = async () => {
  try {
    const res = await api.get('/absensi/riwayat');
    const today = new Date().toLocaleDateString('id-ID');
    const absen = res.data.find(
      (r) => new Date(r.tanggal).toLocaleDateString('id-ID') === today
    );
    setHariIni(absen || null);
  } catch (err) {
    console.error('Gagal ambil riwayat absen hari ini');
  } finally {
    setLoadingHariIni(false);
  }
};


  const handleAbsen = async () => {
    if (!latitude || !longitude) {
      setStatus('error');
      setMessage('Lokasi belum tersedia.');
      return;
    }

    setLoading(true);
    try {
      let res;
      if (isAbsenMasukAllowed) {
        res = await api.post('/absensi/masuk', { latitude, longitude });
      } else if (isAbsenKeluarAllowed) {
        res = await api.post('/absensi/keluar', { latitude, longitude });
      } else {
        setStatus('error');
        setMessage('Tidak dalam waktu absen yang diizinkan.');
        return;
      }

      setStatus('success');
      setMessage(res.data.message);
      await getAbsenHariIni();
    } catch (err) {
      const response = err.response?.data;
      if (response?.absen) {
        setHariIni(response.absen);
      }
      setStatus('error');
      setMessage(response?.message || 'Gagal melakukan absensi.');
    } finally {
      setLoading(false);
    }
  };

  const tombolLabel = !hariIni
    ? 'Absen Masuk'
    : !hariIni.jam_keluar
    ? 'Absen Pulang'
    : 'Sudah Absen Hari Ini';

  const tombolDisabled =
    isWithinRadius === false ||
    loading ||
    (!hariIni && !isAbsenMasukAllowed) ||
    (hariIni && hariIni.jam_keluar) ||
    (hariIni && !hariIni.jam_keluar && !isAbsenKeluarAllowed);

  const keterangan =
    !hariIni && isAbsenMasukAllowed
      ? 'Anda bisa absen masuk sekarang.'
      : hariIni && !hariIni.jam_keluar && !isAbsenKeluarAllowed
      ? 'Anda sudah absen masuk. Tunggu jam pulang untuk absen keluar.'
      : hariIni && hariIni.jam_keluar
      ? 'Anda sudah menyelesaikan absen hari ini.'
      : 'Di luar jam absen.';

  const waktuSekarang = now.toLocaleString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <LayoutWrapper>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Absensi</h1>
        <p className="text-sm text-gray-500 mb-6">{waktuSekarang}</p>

        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center">
          {isWithinRadius === null ? (
            <p className="text-gray-500 text-sm">Mendeteksi lokasi...</p>
          ) : isWithinRadius ? (
            <>
              <CheckCircle size={48} className="text-green-500 mb-4" />
              <p className="text-lg font-semibold text-gray-700">
                Anda berada dalam radius lokasi kantor
              </p>
            </>
          ) : (
            <>
              <XCircle size={48} className="text-red-500 mb-4" />
              <p className="text-lg font-semibold text-red-700">
                Anda berada di luar radius lokasi
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Silakan menuju lokasi kantor untuk melakukan absensi
              </p>
            </>
          )}
{loadingHariIni ? (
  <p className="mt-6 text-gray-500 text-sm">Memuat status absen...</p>
) : (
  <button
    onClick={handleAbsen}
    disabled={tombolDisabled}
    className={`mt-6 px-6 py-3 rounded-md text-white font-semibold transition ${
      tombolDisabled
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700'
    }`}
  >
    {loading ? 'Mengirim...' : tombolLabel}
  </button>
)}

          <div className="flex items-center gap-2 mt-6 text-gray-600 text-sm">
            <MapPin size={16} />
            <p><strong>Radius:</strong> Kantor PTB Manyar – 2 KM</p>
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-blue-800">
            <Clock size={16} />
            <p>{keterangan}</p>
          </div>
        </div>

        <MapView
          userLocation={latitude && longitude ? { latitude, longitude } : null}
          lokasiKantor={lokasiKantor}
          radius={RADIUS_METER}
        />

        {message && (
          <div
            className={`mt-4 p-3 rounded-md text-sm ${
              status === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
};

export default Absen;
