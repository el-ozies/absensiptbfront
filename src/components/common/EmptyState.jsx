// src/components/common/EmptyState.jsx
import { FaInbox } from 'react-icons/fa';
import React from 'react';

const EmptyState = ({ message = 'Data tidak tersedia.' }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-white p-8 rounded shadow-md text-gray-500">
      <FaInbox className="text-4xl mb-3 text-gray-400" />
      <p className="text-center text-sm">{message}</p>
    </div>
  );
};

export default EmptyState;
