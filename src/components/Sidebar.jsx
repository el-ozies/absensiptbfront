import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoPTB from '../assets/logo-ptb.jpg';

const Sidebar = ({ role }) => {
  const { pathname } = useLocation();

  const menuPegawai = [
    { to: '/pegawai/dashboard', label: 'Dashboard' },
    { to: '/pegawai/absen', label: 'Absen' },
    { to: '/pegawai/riwayat', label: 'Riwayat Absensi' },
    { to: '/izin/ajukan', label: 'Ajukan Izin' },
    { to: '/izin/riwayat', label: 'Riwayat Izin' },
  ];

  const menuAdmin = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/rekap', label: 'Rekap' },
    { section: 'Izin Pegawai' },
    { to: '/izin/validasi', label: 'Validasi Izin' },
  ];

  const menu = role === 'admin' ? menuAdmin : menuPegawai;

  return (
    <div className="bg-black text-white w-56 h-screen p-4 rounded-r-2xl flex flex-col items-center">
      <img src={logoPTB} alt="Logo PTB" className="w-24 mb-6 rounded" />

      <ul className="w-full space-y-1">
        {menu.map((item, index) =>
          item.section ? (
            <li
              key={index}
              className="mt-4 mb-1 px-4 text-xs text-gray-400 tracking-widest uppercase border-t border-gray-700 pt-2"
            >
              {item.section}
            </li>
          ) : (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === item.to
                    ? 'bg-purple-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
