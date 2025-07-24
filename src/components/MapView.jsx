import React from 'react';
import { MapContainer, TileLayer, Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';

const MapView = ({ userLocation, lokasiKantor, radius }) => {
  const kantorLatLng = [lokasiKantor.latitude, lokasiKantor.longitude];

  const userLatLng = userLocation
    ? [userLocation.latitude, userLocation.longitude]
    : null;

  return (
    <MapContainer
      center={kantorLatLng}
      zoom={17}
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker Kantor */}
      <Marker position={kantorLatLng}>
        <Popup>Kantor PTB Manyar</Popup>
      </Marker>

      {/* Lingkaran Radius */}
      <Circle center={kantorLatLng} radius={radius} pathOptions={{ color: 'blue' }} />

      {/* Marker Lokasi User */}
      {userLatLng && (
        <Marker position={userLatLng} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
          <Popup>Lokasi Anda</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;
