import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Truck, CreditCard, Clock, Gift } from 'react-feather';
import FooterSebelumLogin from '../footers/FooterSebelumLogin';
import { useState, useEffect } from 'react';

export default function HomeSebelumLogin() {
  const navigate = useNavigate();

  // Fitur Toko
  const storeFeatures = [
    {
      title: "Pengiriman Cepat",
      description: "Pesanan sampai dalam 1-2 jam",
      icon: <Truck size={32} className="text-green-600" />
    },
    {
      title: "Pembayaran Mudah",
      description: "Transfer, COD, atau e-Wallet",
      icon: <CreditCard size={32} className="text-green-600" />
    },
    {
      title: "Buka 24 Jam",
      description: "Melayani kapan saja",
      icon: <Clock size={32} className="text-green-600" />
    },
    {
      title: "Program Loyalitas",
      description: "Kumpulkan poin untuk hadiah",
      icon: <Gift size={32} className="text-green-600" />
    }
  ];

  // Fungsi untuk navigasi
  const goToLogin = () => {
    navigate('/login');
  };

  const goToCategory = (categorySlug) => {
    navigate(`/kategori/${categorySlug}`);
  };

  const goToProductDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  // Ambil semua produk dan testimoni/rating dari localStorage
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const allRatings = [];
    products.forEach(product => {
      if (product.ratings && Array.isArray(product.ratings)) {
        product.ratings.forEach(r => {
          allRatings.push({
            productName: product.name,
            ...r
          });
        });
      }
    });
    setTestimonials(allRatings);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex-grow container mx-auto px-4 py-6"
      >
        {/* Hero Section */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-blue-700 via-blue-400 to-blue-200 rounded-xl p-6 text-white shadow-2xl animate__animated animate__fadeIn">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg tracking-wide">Selamat Datang di Toko Anjani</h1>
                <p className="text-lg mb-6 drop-shadow font-medium">Belanja kebutuhan harian, murah & lengkap!</p>
                <button 
                  onClick={goToLogin}
                  className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold hover:bg-blue-100 shadow-lg transition duration-300 animate__animated animate__pulse animate__infinite"
                >
                  Belanja Sekarang
                </button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full h-64 flex items-center justify-center">
                  <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src="https://assets2.lottiefiles.com/packages/lf20_3vbOcw.json"
                    style={{ width: '90%', height: '90%' }}
                  ></lottie-player>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Apa Kata Pelanggan Kami */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold text-blue-700 mb-6">Apa Kata Pelanggan Kami</h2>
          {testimonials.length === 0 ? (
            <div className="text-gray-400 italic text-center py-12">
              Belum ada testimoni pelanggan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Render testimoni dari rating user di produk jika ada */}
              {/* ...bisa dikembangkan jika sudah ada rating... */}
            </div>
          )}
        </section>
      </motion.main>

      <FooterSebelumLogin />
    </div>
  );
}