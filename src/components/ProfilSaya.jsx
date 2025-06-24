import { motion } from 'framer-motion';
import { User, Mail, MapPin, Phone, Edit, Camera } from 'react-feather';
import FooterSetelahLogin from "./footers/FooterSetelahLogin";
import { useState, useRef } from 'react';

const ProfilSaya = ({ user }) => {
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const fileInputRef = useRef(null);
  const [notif, setNotif] = useState('');

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
                  <h2 className="text-2xl font-bold drop-shadow-lg">{user?.name || 'Nama Pengguna'}</h2>
                  <p className="text-blue-100">Member sejak Jan 2023</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Informasi Pribadi</h3>
                  
                  <div className="flex items-start space-x-3">
                    <Mail size={18} className="text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-gray-800">{user?.email || 'user@example.com'}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone size={18} className="text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Telepon</p>
                      <p className="text-gray-800">{user?.phone || '08xx-xxxx-xxxx'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">Alamat</h3>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin size={18} className="text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Alamat Utama</p>
                      <p className="text-gray-800">
                        {user?.address || 'Jl. Contoh No. 123, Kota, Provinsi, 12345'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow transition-all">
                  <Edit size={16} />
                  <span>Edit Profil</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      <FooterSetelahLogin />
    </div>
  );
};

export default ProfilSaya;