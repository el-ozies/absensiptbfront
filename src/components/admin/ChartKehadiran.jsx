// src/components/admin/ChartKehadiran.jsx
import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { getChartKehadiran } from '@/api/dashboard';
import FilterDropdown from './FilterDropdown';
import { CalendarDays } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white p-3 border rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        <p>{payload[0].value} Pegawai Hadir</p>
      </div>
    );
  }
  return null;
};

const ChartKehadiran = () => {
  const today = new Date();
  const [bulan, setBulan] = useState(today.getMonth() + 1);
  const [tahun, setTahun] = useState(today.getFullYear());
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    fetchChart();
  }, [bulan, tahun]);

  const fetchChart = async () => {
    try {
      const res = await getChartKehadiran(bulan, tahun);
      setDataChart(Array.isArray(res) ? res : []);
    } catch (error) {
      console.error('Gagal fetch chart:', error);
      setDataChart([]);
    }
  };

  const handleChange = (key, value) => {
    if (key === 'bulan') setBulan(Number(value));
    if (key === 'tahun') setTahun(Number(value));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
            Grafik Kehadiran Bulanan
          </h2>
        </div>
        <FilterDropdown bulan={bulan} tahun={tahun} onChange={handleChange} />
      </div>

      {dataChart.length > 0 ? (
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={dataChart}
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorHadir" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.5} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="tanggal" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="jumlah_hadir"
              fill="url(#colorHadir)"
              name="Jumlah Hadir"
              radius={[4, 4, 0, 0]}
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-10 text-gray-500 text-sm">
          Tidak ada data kehadiran untuk bulan ini.
        </div>
      )}
    </div>
  );
};

export default ChartKehadiran;
