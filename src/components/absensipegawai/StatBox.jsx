// src/components/absensipegawai/StatBox.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * StatBox – kartu ringkas untuk angka/statistik.
 * Props:
 * - title: string
 * - value: string | number
 * - suffix?: string (mis. "Hari")
 * - icon?: ReactNode (ikon lucide-react)
 * - gradient?: string (tailwind gradient, default biru → cyan)
 * - loading?: boolean
 * - className?: string
 */
const StatBox = ({
  title,
  value,
  suffix,
  icon,
  gradient = 'from-blue-500 to-cyan-500',
  loading = false,
  className = ''
}) => {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} text-white rounded-xl p-4 sm:p-5 flex items-center gap-4 shadow-sm ${className}`}
    >
      <div className="shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm/5 opacity-90">{title}</p>
        <div className="mt-1 flex items-baseline gap-1">
          {loading ? (
            <Loader2 className="animate-spin" size={22} />
          ) : (
            <>
              <span className="text-2xl sm:text-3xl font-bold truncate">
                {value}
              </span>
              {suffix ? (
                <span className="text-sm sm:text-base font-medium opacity-90">
                  &nbsp;{suffix}
                </span>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatBox;
