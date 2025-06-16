import { motion } from 'framer-motion';
import { Mail, Smartphone, ArrowLeft, AlertCircle, CheckCircle } from 'react-feather';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LupaPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!emailOrPhone) {
      setError('Email atau No HP harus diisi');
      setIsLoading(false);
      return;
    }

    // Cek user dari localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === emailOrPhone || u.phone === emailOrPhone);

    setTimeout(() => {
      if (user || emailOrPhone === 'user@example.com' || emailOrPhone === '081234567890') {
        setSuccess('Link reset password telah dikirim ke email/nomor HP Anda. Silakan cek inbox atau SMS.');
        setError('');
      } else {
        setError('Akun tidak ditemukan.');
        setSuccess('');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl border-2 border-blue-100 p-8 sm:p-10">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center text-blue-500 hover:text-blue-700 mb-6 focus:outline-none"
        >
          <ArrowLeft className="mr-2" />
          Kembali ke Login
        </button>
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 mb-4 shadow-lg">
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json"
              style={{ width: '40px', height: '40px' }}
            ></lottie-player>
          </div>
          <h2 className="text-2xl font-extrabold text-blue-700 drop-shadow">Lupa Password</h2>
          <p className="mt-2 text-sm text-blue-500">Masukkan email atau nomor HP yang terdaftar</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md"
          >
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-md"
          >
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-blue-700 mb-1">
              Email atau Nomor HP
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {emailOrPhone.includes('@') ? (
                  <Mail className="h-5 w-5 text-blue-400" />
                ) : (
                  <Smartphone className="h-5 w-5 text-blue-400" />
                )}
              </div>
              <input
                id="emailOrPhone"
                name="emailOrPhone"
                type="text"
                required
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 sm:text-sm bg-blue-50"
                placeholder="contoh@email.com atau 081234567890"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                disabled={isLoading || success}
              />
            </div>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || success}
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg ${isLoading || success ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              <span className="flex items-center">
                Kirim Link Reset
              </span>
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default LupaPassword;
