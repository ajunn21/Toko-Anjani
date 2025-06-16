import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, Star, ChevronRight, Clock, Gift, Truck, Users } from 'react-feather';
import FooterSebelumLogin from '../footers/FooterSebelumLogin';
import ProductCard from '../ProductCard';

export default function HomeSebelumLogin() {
  const navigate = useNavigate();

  // Data produk populer
  const popularProducts = [
    { id: 1, name: 'Indomie Goreng', price: 3000, discount: 2500, rating: 4.5, stock: 10, favorite: true, category: 'Sembako' },
    { id: 2, name: 'Aqua Gelas', price: 500, discount: null, rating: 4.8, stock: 50, favorite: false, category: 'Minuman' },
    { id: 3, name: 'Lifebuoy Sabun', price: 4500, discount: 4000, rating: 4.2, stock: 15, favorite: true, category: 'Perlengkapan Rumah' },
    { id: 4, name: 'Minyak Goreng', price: 15000, discount: 13500, rating: 4.0, stock: 8, favorite: false, category: 'Sembako' },
    { id: 5, name: 'Rinso Detergent', price: 12000, discount: 11000, rating: 4.3, stock: 12, favorite: false, category: 'Perlengkapan Rumah' },
    { id: 6, name: 'Gula Pasir 1kg', price: 14000, discount: null, rating: 4.1, stock: 20, favorite: false, category: 'Sembako' },
    { id: 7, name: 'Kopi Kapal Api', price: 8000, discount: 7500, rating: 4.6, stock: 18, favorite: true, category: 'Kopi & Teh' },
    { id: 8, name: 'Teh Celup Sosro', price: 10000, discount: 9000, rating: 4.4, stock: 25, favorite: false, category: 'Kopi & Teh' },
  ];

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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

        {/* Produk Populer Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-blue-700">Produk Populer</h2>
            <button 
              onClick={goToLogin}
              className="text-blue-600 flex items-center hover:underline font-bold"
            >
              Lihat semua <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Testimoni Pelanggan */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold text-blue-700 mb-6">Apa Kata Pelanggan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimoni 1 */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
                    <Users size={48} className="text-blue-600" />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <blockquote className="text-lg italic text-blue-700 mb-4 font-semibold">
                    "Toko kelontong ini sangat praktis! Barang lengkap, harga terjangkau, dan pengirimannya cepat. Sudah langganan sejak tahun lalu."
                  </blockquote>
                  <p className="font-bold text-blue-700">- Bu Siti, Pelanggan Setia</p>
                  <div className="flex justify-center md:justify-start mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-blue-400 fill-blue-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Testimoni 2 */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
                    <Users size={48} className="text-blue-600" />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <blockquote className="text-lg italic text-blue-700 mb-4 font-semibold">
                    "Pelayanan ramah, produk selalu fresh, dan harga bersaing. Sangat recommended untuk belanja bulanan!"
                  </blockquote>
                  <p className="font-bold text-blue-700">- Pak Budi, Pelanggan Baru</p>
                  <div className="flex justify-center md:justify-start mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-blue-400 fill-blue-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Testimoni 3 */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
                    <Users size={48} className="text-blue-600" />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <blockquote className="text-lg italic text-blue-700 mb-4 font-semibold">
                    "Belanja online di sini gampang banget, pengiriman cepat dan CS responsif. Sukses terus Toko Anjani!"
                  </blockquote>
                  <p className="font-bold text-blue-700">- Mbak Rina, Ibu Rumah Tangga</p>
                  <div className="flex justify-center md:justify-start mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-blue-400 fill-blue-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Testimoni 4 */}
            <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-100">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center shadow-lg">
                    <Users size={48} className="text-blue-600" />
                  </div>
                </div>
                <div className="md:w-2/3 text-center md:text-left">
                  <blockquote className="text-lg italic text-blue-700 mb-4 font-semibold">
                    "Suka banget sama promo dan diskonnya. Barang selalu sampai tepat waktu dan sesuai pesanan."
                  </blockquote>
                  <p className="font-bold text-blue-700">- Sari, Mahasiswa</p>
                  <div className="flex justify-center md:justify-start mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="text-blue-400 fill-blue-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>

      <FooterSebelumLogin />
    </div>
  );
}