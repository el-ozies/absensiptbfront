import React, { useState } from 'react';
import api from '../api/axios';
import logoPTB from '../assets/logo-ptb.jpg';
import bgGedung from '../assets/gedung-ptb.jpg';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const role = res.data.user.role;
      window.location.href = role === 'admin' ? '/admin/dashboard' : '/pegawai/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bgGedung})`,
      }}
    >
      {/* overlay transparan */}
      <div className="absolute inset-0 bg-white bg-opacity-70 z-0"></div>

      {/* card login */}
      <div className="relative z-10 bg-white bg-opacity-90 shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <img src={logoPTB} alt="Logo PTB" className="mx-auto mb-4 w-24" />

        <h1 className="text-xl font-semibold mb-1">Selamat datang di</h1>
        <h2 className="text-lg font-bold mb-4">Sistem Absensi Kepegawaian PTB Manyar</h2>
        <p className="text-sm mb-4 text-gray-600">Silakan login untuk mengakses sistem absensi dan kepegawaian</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              type="text"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Masukkan username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Masukkan password"
              required
            />
          </div>

          {error && <p className="text-red-600 text-sm mt-2">❌ {error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
