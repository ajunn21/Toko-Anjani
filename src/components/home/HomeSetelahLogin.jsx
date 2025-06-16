import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Home, Package, Users, CreditCard, Star, ChevronRight, Clock, Gift, Truck } from 'react-feather';
import FooterSetelahLogin from '../footers/FooterSetelahLogin';
import ProductCard from '../ProductCard';

export default function HomeSetelahLogin({ user, addToCart }) {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);

  // Data produk populer
  const popularProducts = [
    {
      id: 1,
      name: 'Beras Premium 5kg',
      price: 65000,
      discount: 60000,
      rating: 4.8,
      stock: 10,
      image: 'https://placehold.co/150x150',
      favorite: false
    },
    {
      id: 2,
      name: 'Minyak Goreng 2L',
      price: 32000,
      discount: null,
      rating: 4.5,
      stock: 15,
      image: 'https://placehold.co/150x150',
      favorite: false
    },
    {
      id: 3,
      name: 'Gula Pasir 1kg',
      price: 15000,
      discount: null,
      rating: 4.7,
      stock: 20,
      image: 'https://placehold.co/150x150',
      favorite: false
    },
    {
      id: 4,
      name: 'Telur Ayam 1kg',
      price: 28000,
      discount: 25000,
      rating: 4.6,
      stock: 8,
      image: 'https://placehold.co/150x150',
      favorite: false
    }
  ];

  // Data kategori dengan slug
  const categories = [
    { name: 'Sembako', icon: <Package size={24} />, slug: 'sembako' },
    { name: 'Minuman', icon: <ShoppingBag size={24} />, slug: 'minuman' },
    { name: 'Snack', icon: <ShoppingBag size={24} />, slug: 'snack' },
    { name: 'Perlengkapan Rumah', icon: <Home size={24} />, slug: 'perlengkapan-rumah' }
  ];

  // Fitur Toko
  const storeFeatures = [
    {
      title: "Pengiriman Cepat",
      description: "Pesanan sampai dalam 1-2 jam",
      icon: <Truck size={32} className="text-blue-600" />
    },
    {
      title: "Pembayaran Mudah",
      description: "Transfer, COD, atau e-Wallet",
      icon: <CreditCard size={32} className="text-blue-600" />
    },
    {
      title: "Buka 24 Jam",
      description: "Melayani kapan saja",
      icon: <Clock size={32} className="text-blue-600" />
    },
    {
      title: "Program Loyalitas",
      description: "Kumpulkan poin untuk hadiah",
      icon: <Gift size={32} className="text-blue-600" />
    }
  ];

  // Fungsi untuk navigasi
  const goToCategory = (categorySlug) => {
    navigate(`/kategori/${categorySlug}`);
  };

  const goToProductDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  const goToProducts = () => {
    navigate('/products');
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
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg tracking-wide">Selamat Datang, {user?.name}</h1>
                <p className="text-lg mb-6 drop-shadow font-medium">Belanja kebutuhan harian, murah & lengkap!</p>
                <button 
                  onClick={goToProducts}
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

        {/* Categories Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-blue-700">Kategori</h2>
            <button 
              onClick={goToProducts}
              className="text-blue-600 flex items-center hover:underline font-bold"
            >
              Lihat semua <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                onClick={() => goToCategory(category.slug)}
                className="bg-gradient-to-br from-blue-200 via-blue-100 to-blue-50 p-6 rounded-2xl shadow-lg text-center cursor-pointer hover:shadow-2xl transition-all border-2 border-blue-200"
              >
                <div className="text-blue-500 mb-3 flex justify-center text-3xl">
                  {category.icon}
                </div>
                <h3 className="font-bold text-lg mb-1 text-blue-700">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Products Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-blue-700">Produk Populer</h2>
            <button 
              onClick={goToProducts}
              className="text-blue-600 flex items-center hover:underline font-bold"
            >
              Lihat semua <ChevronRight size={18} className="ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <motion.div key={product.id} whileHover={{ scale: 1.03 }} className="relative">
                {/* Favorite Button (dummy) */}
                <button className="absolute top-2 left-2 p-2 rounded-full text-gray-300 cursor-default z-10" tabIndex={-1} aria-hidden="true" style={{ pointerEvents: 'none' }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.8 4.6c-1.4-1.4-3.6-1.4-5 0l-.8.8-.8-.8c-1.4-1.4-3.6-1.4-5 0-1.4 1.4-1.4 3.6 0 5l5.8 5.8 5.8-5.8c1.4-1.4 1.4-3.6 0-5z"></path></svg>
                </button>
                {/* Share Button (dummy) */}
                <button className="absolute top-2 right-2 p-2 rounded-full text-gray-400 cursor-default z-10" tabIndex={-1} aria-hidden="true" style={{ pointerEvents: 'none' }}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                </button>
                <div className="h-48 bg-blue-100 flex items-center justify-center cursor-pointer relative">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover rounded-xl" />
                  ) : (
                    <ShoppingBag size={48} className="text-gray-300" />
                  )}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      DISKON
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-blue-700">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < Math.floor(product.rating) ? '#3b82f6' : 'none'} stroke={i < product.rating ? '#3b82f6' : '#d1d5db'} />
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
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Fitur Toko Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold text-blue-700 mb-6">Kenapa Belanja di Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
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

        {/* Notifikasi tambah ke keranjang */}
        {showNotif && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate__animated animate__fadeInDown">
            Produk berhasil ditambahkan ke keranjang!
          </div>
        )}
      </motion.main>

      <FooterSetelahLogin />
    </div>
  );
}