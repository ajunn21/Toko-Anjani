import { motion } from 'framer-motion';
import { Lock, Mail, Smartphone, AlertCircle } from 'react-feather';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Lottie script is already loaded in index.html, no need to load it here
  }, []);

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
    const user = users.find(u => (u.email === emailOrPhone) && u.password === password);

    setTimeout(() => {
      if (user) {
        const userData = {
          name: user.name,
          email: user.email,
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        };
        onLogin(userData);
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
        navigate('/');
      } else {
        // Cek login dummy lama
        const isEmailLogin = emailOrPhone === 'user@example.com' && password === '123456';
        const isPhoneLogin = emailOrPhone === '081234567890' && password === 'password';
        if (isEmailLogin || isPhoneLogin) {
          const userData = {
            name: 'Pelanggan Toko Anjani',
            email: isEmailLogin ? 'user@example.com' : 'user@example.com',
            phone: isPhoneLogin ? '081234567890' : '081234567890',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          };
          onLogin(userData);
          navigate('/');
        } else {
          setError('Email/No HP atau password salah');
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Login with Google');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Login Form Section - Now on the left */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-100"
        >
          <div className="p-8 sm:p-10">
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
              <h2 className="text-3xl font-extrabold text-blue-700 drop-shadow">Masuk ke Toko Anjani</h2>
              <p className="mt-2 text-sm text-blue-500">Belanja kebutuhan sehari-hari dengan mudah dan murah</p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email-phone" className="block text-sm font-medium text-blue-700 mb-1">
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
                    id="email-phone"
                    name="email-phone"
                    type="text"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 sm:text-sm bg-blue-50"
                    placeholder="contoh@email.com atau 081234567890"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-blue-700 mb-1">
                  Password
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-blue-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-3 py-3 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 sm:text-sm bg-blue-50"
                    placeholder="Minimal 6 karakter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-blue-200 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-700">
                    Ingat saya
                  </label>
                </div>

                <div className="text-sm">
                  <span
                    className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                    onClick={() => navigate('/lupa-password')}
                  >
                    Lupa password?
                  </span>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
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
                      Masuk Sekarang
                    </span>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-blue-400">
                    Atau lanjutkan dengan
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleLogin}
                  className="w-full inline-flex justify-center items-center py-2 px-4 border border-blue-200 rounded-md shadow-sm bg-white text-sm font-medium text-blue-700 hover:bg-blue-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.7663 12.2764C23.7663 11.4607 23.7001 10.6406 23.559 9.83807H12.2402V14.4591H18.722C18.453 15.9494 17.5888 17.2678 16.3233 18.1056V21.1039H20.1903C22.4611 19.0139 23.7663 15.9274 23.7663 12.2764Z" fill="#4285F4"/>
                    <path d="M12.2401 24C15.4766 24 18.2059 22.9383 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.2519 12.2445 19.2519C9.11388 19.2519 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24 12.2401 24Z" fill="#34A853"/>
                    <path d="M5.50253 14.3003C5.00011 12.8099 5.00011 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04"/>
                    <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55737 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"/>
                  </svg>
                  Lanjutkan dengan Google
                </motion.button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-blue-500">
                Belum punya akun?{' '}
                <span
                  className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                  onClick={() => navigate('/register')}
                >
                  Daftar sekarang
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Animation Section - Now on the right */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white p-6 border-2 border-blue-100">
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json"
              style={{ width: '100%', height: '100%' }}
            ></lottie-player>
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold text-blue-700">Belanja lebih mudah dengan Toko Anjani</h3>
            <p className="mt-2 text-sm text-blue-500">
              Temukan berbagai kebutuhan harian dengan harga terjangkau
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;