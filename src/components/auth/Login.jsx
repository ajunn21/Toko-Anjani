import { motion } from 'framer-motion';
import { Lock, Mail, Smartphone, AlertCircle } from 'react-feather';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!emailOrPhone || !password) {
      setError('Email/No HP dan password harus diisi');
      setIsLoading(false);
      return;
    }

    // Cek user dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Cari user berdasarkan email atau phone
    const user = users.find(
      u =>
        (u.email === emailOrPhone || u.phone === emailOrPhone) &&
        u.password === password
    );

    setTimeout(() => {
      if (user) {
        // Simpan semua data user yang didaftarkan (name, email, phone, address, avatar, dll)
        const userData = {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          avatar: user.avatar || '',
          role: user.role || 'user'
        };
        onLogin(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        // Jangan navigate sebelum onLogin selesai
        navigate('/');
      } else if (
        (emailOrPhone === 'admin123' || emailOrPhone === 'admin@tokoanjani.com') &&
        password === 'admin123'
      ) {
        // Login admin
        const userData = {
          name: 'Admin',
          email: 'admin@tokoanjani.com',
          role: 'admin',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        };
        onLogin(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      } else {
        setError('Email/No HP atau password salah');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 shadow-lg p-8">
        <div className="mb-7 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Login Toko Anjani</h2>
          <p className="text-gray-500 text-sm">Masuk untuk melanjutkan</p>
        </div>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4 text-sm flex items-center"
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email-phone" className="block text-sm font-medium text-gray-700 mb-1">
              Email atau Nomor HP
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                {emailOrPhone.includes('@') ? <Mail size={15} /> : <Smartphone size={15} />}
              </span>
              <input
                id="email-phone"
                name="email-phone"
                type="text"
                autoComplete="username"
                required
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-gray-800 bg-white text-sm"
                placeholder="Email atau No HP"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <Lock size={15} />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-600 focus:border-blue-600 text-gray-800 bg-white text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-xs text-blue-600 hover:underline focus:outline-none"
              onClick={() => navigate('/lupa-password')}
              tabIndex={0}
            >
              Lupa password?
            </button>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded bg-blue-700 text-white font-semibold text-sm hover:bg-blue-800 transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              <span>Masuk</span>
            )}
          </button>
        </form>
        <div className="mt-5 text-center text-xs text-gray-500">
          Belum punya akun?{' '}
          <button
            className="font-semibold text-blue-700 hover:underline focus:outline-none"
            onClick={() => navigate('/register')}
            tabIndex={0}
          >
            Daftar sekarang
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;