const statusClass = {
  Hadir: 'bg-green-100 text-green-700',
  Terlambat: 'bg-yellow-100 text-yellow-700',
  'Pulang Cepat': 'bg-orange-100 text-orange-700',
  'Tidak Hadir': 'bg-red-100 text-red-700',
  default: 'bg-gray-100 text-gray-700',
};

const StatusBadge = ({ status }) => {
  const badgeStyle = statusClass[status] || statusClass.default;

  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${badgeStyle}`}>
      {status || '-'}
    </span>
  );
};

export default StatusBadge;
