import React from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { BsFillInfoCircleFill } from 'react-icons/bs';

const StatusBadge = ({ status }) => {
  let icon = null;
  let colorClass = '';

  switch (status) {
    case 'Hadir':
      icon = <HiCheckCircle className="text-green-600 inline-block mr-1" />;
      colorClass = 'text-green-600';
      break;
    case 'Izin':
      icon = <BsFillInfoCircleFill className="text-blue-600 inline-block mr-1" />;
      colorClass = 'text-blue-600';
      break;
    case 'Alpha':
    default:
      icon = <HiXCircle className="text-red-600 inline-block mr-1" />;
      colorClass = 'text-red-600';
      break;
  }

  return (
    <span className={`font-medium flex items-center gap-1 ${colorClass}`}>
      {icon} {status}
    </span>
  );
};

export default StatusBadge;
