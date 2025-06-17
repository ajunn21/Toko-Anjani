import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, CreditCard, Star, ChevronRight, Clock, Gift, Truck, Users, Heart, Share2 } from 'react-feather';
import FooterSebelumLogin from '../footers/FooterSebelumLogin';

export default function HomeSebelumLogin() {
  const navigate = useNavigate();

  // Data produk populer
  const popularProducts = [
    { id: 1, name: 'Indomie Goreng', price: 3800, discount: 3500, rating: 4, stock: 10, favorite: true, category: 'Sembako', unit: 'pcs' },
    { id: 2, name: 'Aqua Gelas', price: 29500, discount: 27500, rating: 5, stock: 50, favorite: false, category: 'Minuman', unit: 'dus' },
    { id: 3, name: 'Lifebuoy Sabun', price: 6500, discount: 6200, rating: 3.5, stock: 15, favorite: true, category: 'Perlengkapan Rumah', unit: 'pcs' },
    { id: 4, name: 'Minyak Goreng', price: 23500, discount: 22000, rating: 4.5, stock: 8, favorite: false, category: 'Sembako', unit: 'pcs' },
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
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative"
              >
                {/* Favorite Button */}
                <button 
                  className={`absolute top-2 left-2 p-2 rounded-full ${product.favorite ? 'text-red-500' : 'text-gray-300'} hover:text-red-500`}
                  type="button"
                >
                  <Heart 
                    size={18} 
                    fill={product.favorite ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                  />
                </button>
                {/* Share Button */}
                <button className="absolute top-2 right-2 p-2 rounded-full text-gray-400 hover:text-blue-600" type="button">
                  <Share2 size={18} />
                </button>
                <div className="bg-blue-100 h-48 flex items-center justify-center">
                  <ShoppingBag size={48} className="text-gray-300" />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      DISKON
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-blue-700">
                    {product.name} <span className="text-xs text-gray-500 font-normal">({product.unit})</span>
                  </h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < Math.floor(product.rating) ? '#3b82f6' : 'none'} 
                        stroke={i < product.rating ? '#3b82f6' : '#d1d5db'} 
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                  </div>
                  <div className="flex items-center">
                    {product.discount ? (
                      <>
                        <span className="text-blue-600 font-bold">Rp{product.discount.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">Rp{product.price.toLocaleString()}</span>
                      </>
                    ) : (
                      <span className="text-blue-600 font-bold">Rp{product.price.toLocaleString()}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Stok: {product.stock}</div>
                  <button 
                    onClick={goToLogin}
                    className="mt-3 w-full bg-blue-100 text-blue-700 py-2 rounded-md font-medium hover:bg-blue-200 transition-colors flex items-center justify-center"
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Tambah ke Keranjang
                  </button>
                </div>
              </motion.div>
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