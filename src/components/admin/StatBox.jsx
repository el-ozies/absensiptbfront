import React from 'react';
import {
  CheckCircle,
  XCircle,
  Clock,
  FileClock,
  CalendarDays,
} from 'lucide-react';

const iconMap = {
  hadir: {
    icon: <CheckCircle className="text-green-600" size={20} />,
    color: 'text-green-600',
  },
  alpha: {
    icon: <XCircle className="text-red-600" size={20} />,
    color: 'text-red-600',
  },
  terlambat: {
    icon: <Clock className="text-yellow-500" size={20} />,
    color: 'text-yellow-500',
  },
  izin: {
    icon: <FileClock className="text-blue-500" size={20} />,
    color: 'text-blue-500',
  },
  hariKerja: {
    icon: <CalendarDays className="text-indigo-500" size={20} />,
    color: 'text-indigo-500',
  },
};

const StatBox = ({ label, value = 0, type = 'hadir' }) => {
  const current = iconMap[type] || iconMap.hadir;

  return (
    <div className="bg-white rounded-lg shadow p-4 w-full sm:w-52 text-center">
      <div className="flex justify-center mb-2">{current.icon}</div>
      <h4 className="text-sm text-gray-600">{label}</h4>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatBox;
