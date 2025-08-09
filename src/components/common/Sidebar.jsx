import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPTB from '@/assets/logo-ptb.jpg';

const Sidebar = ({ role, variant = 'mobile', onClose }) => {
  const { pathname } = useLocation();

  const menuPegawai = [
    { to: '/pegawai/dashboard', label: 'Dashboard' },
    { to: '/pegawai/absen', label: 'Absensi' },
    { to: '/pegawai/riwayat', label: 'Riwayat Absensi' },
    { to: '/pegawai/izin', label: 'Izin Pegawai' },
  ];

  const menuAdmin = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/rekap', label: 'Rekap Absensi' },
    { to: '/admin/pegawai', label: 'Manajemen Pegawai' },
    { to: '/izin/validasi', label: 'Validasi Izin Pegawai' },
    { to: '/izin/riwayat', label: 'Riwayat Izin Pegawai' },
  ];

  const menu = role === 'admin' ? menuAdmin : menuPegawai;
  const isActive = (path) => pathname === path || pathname.startsWith(path + '/');

  return (
    <aside className="bg-black text-white h-full p-4 rounded-r-2xl flex flex-col items-center">
      {/* Logo seperti versi awal, tanpa tulisan PTB */}
      <div className="w-full flex flex-col items-center mb-6 relative">
        {variant === 'mobile' && (
          <button
            aria-label="Tutup menu"
            onClick={onClose}
            className="absolute right-0 top-0 p-2 rounded-lg hover:bg-white/10 transition"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        <img src={logoPTB} alt="Logo PTB" className="w-24 rounded mb-2" />
      </div>

      <ul className="w-full space-y-1">
        {menu.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              onClick={variant === 'mobile' ? onClose : undefined}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive(item.to)
                  ? 'bg-purple-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto w-full pt-4 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} PTB</p>
      </div>
    </aside>
  );
};

export default Sidebar;
