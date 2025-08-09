// src/components/admin/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../api/user';

const UserForm = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nama: '',
    role: 'pegawai',
    nip: '',
    jabatan: '',
    no_telp: '',
    alamat: '',
  });

  const [jabatanLainnya, setJabatanLainnya] = useState('');

  const daftarJabatan = ['Admin', 'Supervisor', 'Staff', 'Keuangan', 'IT Support', 'Lainnya'];

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        password: '',
        nama: user.nama || '',
        role: user.role || 'pegawai',
        nip: user.nip || '',
        jabatan: user.jabatan || '',
        no_telp: user.no_telp || '',
        alamat: user.alamat || '',
        pegawai_id: user.pegawai_id || null,
      });

      // Jika jabatan bukan dari daftar → anggap Lainnya
      if (!daftarJabatan.includes(user.jabatan)) {
        setFormData((prev) => ({ ...prev, jabatan: 'Lainnya' }));
        setJabatanLainnya(user.jabatan || '');
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      ...formData,
      username: formData.username.trim(),
      nama: formData.nama.trim(),
      nip: formData.nip.trim(),
      no_telp: formData.no_telp.trim(),
      alamat: formData.alamat.trim(),
      jabatan: formData.jabatan === 'Lainnya' ? jabatanLainnya.trim() : formData.jabatan.trim(),
    };

    const requiredFields = ['username', 'nama', 'nip', 'jabatan', 'no_telp', 'alamat'];
    for (const field of requiredFields) {
      if (!trimmed[field]) {
        alert(`Field "${field}" wajib diisi`);
        return;
      }
    }

    if (!user && !formData.password.trim()) {
      alert('Password wajib diisi saat tambah user');
      return;
    }

    if (user) {
      await updateUser(user.id, trimmed);
    } else {
      await createUser(trimmed);
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {user ? 'Edit User' : 'Tambah User Baru'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-sm">
          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">Password {user ? '(kosongkan jika tidak diubah)' : ''}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
              required={!user}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Nama</label>
            <input
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="pegawai">Pegawai</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 mb-1">NIP</label>
            <input
              name="nip"
              value={formData.nip}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Jabatan</label>
            <select
              name="jabatan"
              value={formData.jabatan}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, jabatan: value }));
                if (value !== 'Lainnya') setJabatanLainnya('');
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              required
            >
              <option value="">-- Pilih Jabatan --</option>
              {daftarJabatan.map((j) => (
                <option key={j} value={j}>{j}</option>
              ))}
            </select>
          </div>

          {formData.jabatan === 'Lainnya' && (
            <div className="col-span-2">
              <label className="block text-gray-600 mb-1">Jabatan Lainnya</label>
              <input
                type="text"
                value={jabatanLainnya}
                onChange={(e) => setJabatanLainnya(e.target.value)}
                placeholder="Masukkan jabatan lainnya"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
                required
              />
            </div>
          )}

          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">No Telp</label>
            <input
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">Alamat</label>
            <textarea
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
              rows={2}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              required
            />
          </div>
          <div className="col-span-2 flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {user ? 'Update' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
