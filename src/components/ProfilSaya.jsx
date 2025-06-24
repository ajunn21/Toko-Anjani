import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Edit, Camera, CheckCircle, X } from 'react-feather';
import FooterSetelahLogin from "./footers/FooterSetelahLogin";
import { useState, useRef, useEffect } from 'react';

const ProfilSaya = ({ user, setUser }) => {
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const fileInputRef = useRef(null);
  const [notif, setNotif] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  // Sinkronkan form dengan user dari localStorage setiap mount dan saat user berubah
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || user || {};
    setForm({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || ''
    });
    setAvatar(userData.avatar || '');
  }, [user]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      setAvatar(ev.target.result);

      // Simpan ke localStorage user
      const currentUser = JSON.parse(localStorage.getItem('user')) || {};
      currentUser.avatar = ev.target.result;
      localStorage.setItem('user', JSON.stringify(currentUser));

      // Update juga di daftar users
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = users.map(u =>
        u.email === currentUser.email ? { ...u, avatar: ev.target.result } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      setNotif('Foto profil berhasil diubah!');
      setTimeout(() => setNotif(''), 1500);
    };
    reader.readAsDataURL(file);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || ''
    });
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (!form.name || !form.email || !form.phone || !form.address) {
      setNotif('Semua field harus diisi.');
      setTimeout(() => setNotif(''), 1500);
      return;
    }
    // Update localStorage user
    const currentUser = JSON.parse(localStorage.getItem('user')) || {};
    // Jika email berubah, update juga key di localStorage jika perlu
    const updatedUser = { ...currentUser, ...form, avatar };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser && setUser(updatedUser); // update state user di App jika ada setUser

    // Update juga di daftar users (cari berdasarkan email lama, update data baru)
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Jika email berubah, update user yang lama dan pastikan tidak duplikat email
    if (form.email !== currentUser.email) {
      // Cek jika email baru sudah dipakai user lain
      if (users.some(u => u.email === form.email && u.email !== currentUser.email)) {
        setNotif('Email sudah digunakan user lain.');
        setTimeout(() => setNotif(''), 2000);
        return;
      }
      users = users.map(u =>
        u.email === currentUser.email ? { ...u, ...form, avatar } : u
      );
    } else {
      users = users.map(u =>
        u.email === currentUser.email ? { ...u, ...form, avatar } : u
      );
    }
    localStorage.setItem('users', JSON.stringify(users));
    setNotif('Profil berhasil diperbarui!');
    setEditMode(false);
    setTimeout(() => setNotif(''), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Profil Saya</h1>
          {notif && (
            <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded flex items-center">
              <CheckCircle size={18} className="mr-2" />
              {notif}
            </div>
          )}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-20 pointer-events-none select-none" style={{fontSize:'7rem',lineHeight:1}}>
                <User size={120} className="text-white" />
              </div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-blue-200 relative group cursor-pointer" onClick={handleAvatarClick}>
                  {/* Tampilkan icon User jika belum upload avatar */}
                  {avatar && avatar.startsWith('data:') ? (
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <User size={40} className="text-blue-600" />
                  )}
                  <div className="absolute bottom-0 right-0 bg-blue-600 p-1 rounded-full border-2 border-white shadow group-hover:bg-blue-700 transition-colors">
                    <Camera size={16} className="text-white" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold drop-shadow-lg">{form.name || 'Nama Pengguna'}</h2>
                  <p className="text-blue-100">Member sejak Jan 2023</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              <form onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Informasi Pribadi</h3>
                    {/* Email */}
                    <div className="flex items-start space-x-3">
                      <Mail size={18} className="text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        {editMode ? (
                          <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleFormChange}
                            className="border rounded p-2 w-full"
                          />
                        ) : (
                          <p className="text-gray-800">{form.email || 'user@example.com'}</p>
                        )}
                      </div>
                    </div>
                    {/* Telepon */}
                    <div className="flex items-start space-x-3">
                      <Phone size={18} className="text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Telepon</p>
                        {editMode ? (
                          <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleFormChange}
                            className="border rounded p-2 w-full"
                          />
                        ) : (
                          <p className="text-gray-800">{form.phone || '08xx-xxxx-xxxx'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Alamat</h3>
                    <div className="flex items-start space-x-3">
                      <MapPin size={18} className="text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm text-gray-500">Alamat Utama</p>
                        {editMode ? (
                          <textarea
                            name="address"
                            value={form.address}
                            onChange={handleFormChange}
                            className="border rounded p-2 w-full"
                          />
                        ) : (
                          <p className="text-gray-800">
                            {form.address || 'Jl. Contoh No. 123, Kota, Provinsi, 12345'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tombol aksi */}
                <div className="mt-8 pt-6 border-t border-gray-200 flex gap-3">
                  {editMode ? (
                    <>
                      <button
                        type="button"
                        className="flex items-center space-x-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 shadow transition-all"
                        onClick={handleCancelEdit}
                      >
                        <X size={16} />
                        <span>Batal</span>
                      </button>
                      <button
                        type="submit"
                        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow transition-all"
                      >
                        <CheckCircle size={16} />
                        <span>Simpan</span>
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow transition-all"
                      onClick={handleEditClick}
                    >
                      <Edit size={16} />
                      <span>Edit Profil</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.main>
      <FooterSetelahLogin />
    </div>
  );
};

export default ProfilSaya;