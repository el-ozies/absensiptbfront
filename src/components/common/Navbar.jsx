import React from 'react';

const Navbar = ({ title = 'Absensi PTB', onMenuClick }) => {
  let user;
  try { user = JSON.parse(localStorage.getItem('user')); } catch {}

  return (
    <div className="bg-white shadow-md w-full h-14 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Burger di semua breakpoint */}
        <button
          type="button"
          aria-label="Buka menu"
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 active:scale-95 transition"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <h1 className="font-bold text-lg">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="hidden sm:inline text-sm text-gray-600">
            {user.username} ({user.role})
          </span>
        )}
        <button
          onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          className="text-red-500 hover:underline text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
