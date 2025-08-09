// src/components/admin/StatBox.jsx
import React from "react";
import { FiUserCheck, FiUserX, FiClock, FiUsers, FiCalendar } from "react-icons/fi";

const iconMap = {
  hadir: <FiUserCheck className="text-green-600 w-6 h-6" />,
  alpha: <FiUserX className="text-red-600 w-6 h-6" />,
  warning: <FiClock className="text-yellow-600 w-6 h-6" />,
  info: <FiUsers className="text-blue-600 w-6 h-6" />,
  calendar: <FiCalendar className="text-gray-600 w-6 h-6" />,
};

const StatBox = ({ label, value, type }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:shadow-md transition-all">
      <div className="bg-gray-100 p-3 rounded-full">{iconMap[type] || iconMap.info}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

export default StatBox;
