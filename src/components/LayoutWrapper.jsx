import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const LayoutWrapper = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role || 'pegawai';

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar role={role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-4 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
