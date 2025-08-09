// src/pages/Admin/ManajemenPegawai.jsx
import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../../api/user';
import LayoutWrapper from '../../components/common/LayoutWrapper';
import UserForm from '../../components/admin/UserForm';
import { Pencil, Trash } from 'lucide-react';

const ManajemenPegawai = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus user ini?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const filteredUsers = users.filter((u) =>
    u.nama.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.jabatan?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <LayoutWrapper>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Pegawai</h1>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 text-sm"
          >
            Tambah User
          </button>
        </div>
        <input
          type="text"
          placeholder="Cari pegawai..."
          className="border border-gray-300 rounded-md px-4 py-2 w-1/3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-left">Nama</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">NIP</th>
              <th className="px-4 py-3 text-left">Jabatan</th>
              <th className="px-4 py-3 text-left">No Telp</th>
              <th className="px-4 py-3 text-left">Alamat</th>
              <th className="px-4 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, i) => (
                <tr
                  key={u.id}
                  className={i % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
                >
                  <td className="px-4 py-2">{u.nama}</td>
                  <td className="px-4 py-2">{u.username}</td>
                  <td className="px-4 py-2 capitalize">{u.role}</td>
                  <td className="px-4 py-2">{u.nip}</td>
                  <td className="px-4 py-2">{u.jabatan}</td>
                  <td className="px-4 py-2">{u.no_telp}</td>
                  <td className="px-4 py-2">{u.alamat}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleEdit(u)} className="text-blue-600 hover:text-blue-800">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(u.id)} className="text-red-600 hover:text-red-800">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-400">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <UserForm
          user={editingUser}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchUsers();
          }}
        />
      )}
    </LayoutWrapper>
  );
};

export default ManajemenPegawai;
