// src/utils/formatDate.js
export const formatTanggal = (dateStr) => {
  const tanggal = new Date(dateStr);
  return tanggal.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const formatJam = (timeStr) => {
  if (!timeStr) return '-';
  const [hour, minute] = timeStr.split(':');
  return `${hour}:${minute}`;
};
