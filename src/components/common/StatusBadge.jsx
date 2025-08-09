// src/components/common/StatusBadge.jsx
import React from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { BsFillInfoCircleFill } from 'react-icons/bs';

const statusStyles = {
  Hadir: {
    icon: <HiCheckCircle className="text-green-600" />,
    color: 'bg-green-100 text-green-700 border-green-600',
  },
  Izin: {
    icon: <BsFillInfoCircleFill className="text-blue-600" />,
    color: 'bg-blue-100 text-blue-700 border-blue-600',
  },
  Alpha: {
    icon: <HiXCircle className="text-red-600" />,
    color: 'bg-red-100 text-red-700 border-red-600',
  },
};

const StatusBadge = ({ status = 'Alpha' }) => {
  const { icon, color } = statusStyles[status] || statusStyles['Alpha'];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-sm font-semibold border ${color}`}
    >
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;
