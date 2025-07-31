import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { getChartKehadiran } from '../../api/axios';

const ChartKehadiran = ({ data = [] }) => {
  if (!Array.isArray(data)) {
    console.warn('Data ChartKehadiran bukan array:', data);
    return <p>Data grafik tidak valid</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow w-full">
      <h3 className="text-lg font-semibold mb-4">Grafik Kehadiran Bulanan</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tanggal" />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip />
          <Line type="monotone" dataKey="persentase" stroke="#4F46E5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default ChartKehadiran;
