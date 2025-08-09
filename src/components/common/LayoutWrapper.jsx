import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const LayoutWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  let role = 'pegawai';
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role) role = user.role;
  } catch {}

  useEffect(() => setSidebarOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSidebarOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Drawer sidebar (SEMUA ukuran layar) */}
      <div
        aria-hidden={!sidebarOpen}
        className={`fixed inset-0 z-40 ${sidebarOpen ? '' : 'pointer-events-none'}`}
      >
        <div
          onClick={() => setSidebarOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={`absolute left-0 top-0 h-full w-72 max-w-[85%] transform transition-transform will-change-transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <Sidebar role={role} variant="mobile" onClose={() => setSidebarOpen(false)} />
        </div>
      </div>

      {/* Main full width */}
      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-4 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
