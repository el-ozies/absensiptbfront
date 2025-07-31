import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../../api/axios';

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

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: '' });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await updateUser(user.id, formData);
    } else {
      await createUser(formData);
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
            <label className="block text-gray-600 mb-1">Password</label>
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
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Jabatan</label>
            <input
              name="jabatan"
              value={formData.jabatan}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-gray-600 mb-1">No Telp</label>
            <input
              name="no_telp"
              value={formData.no_telp}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
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
