// src/pages/Register.jsx
import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'pegawai',
    nama: '',
    nip: '',
    jabatan: '',
    no_telp: '',
    alamat: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/register', form);
      setMessage(res.data.message);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Gagal daftar');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
          <select
            name="role"
            onChange={handleChange}
            value={form.role}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="pegawai">Pegawai</option>
            <option value="admin">Admin</option>
          </select>

          {/* Form tambahan hanya muncul jika role pegawai */}
          {form.role === 'pegawai' && (
            <>
              <input
                name="nama"
                type="text"
                placeholder="Nama Pegawai"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                name="nip"
                type="text"
                placeholder="NIP (opsional)"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                name="jabatan"
                type="text"
                placeholder="Jabatan (opsional)"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                name="no_telp"
                type="text"
                placeholder="No. Telepon (opsional)"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                name="alamat"
                placeholder="Alamat (opsional)"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </>
          )}

          {message && (
            <p className="text-sm text-center text-red-500">{message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Daftar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
