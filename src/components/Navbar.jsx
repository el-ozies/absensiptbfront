import React from 'react';

const Navbar = ({ title = "Absensi PTB" }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="bg-white shadow-md w-full h-14 px-6 flex items-center justify-between">
      <h1 className="font-bold text-lg">{title}</h1>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">
            {user.username} ({user.role})
          </span>
        )}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = '/';
          }}
          className="text-red-500 hover:underline text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
