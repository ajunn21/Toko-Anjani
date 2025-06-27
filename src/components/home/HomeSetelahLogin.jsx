import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Home, Package, Users, CreditCard, Star, ChevronRight, Clock, Gift, Truck, Heart, Share2 } from 'react-feather';
import FooterSetelahLogin from '../footers/FooterSetelahLogin';

export default function HomeSetelahLogin({ user, addToCart }) {
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [popularProducts, setPopularProducts] = useState([]);
  const [storeRatings, setStoreRatings] = useState([]);

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

  // Ambil semua produk dan testimoni/rating dari localStorage
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    // Ambil semua rating dari produk
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

    // Hitung produk populer
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    // Buat map id produk ke jumlah pembelian
    const productSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
      });
    });
    // Gabungkan info produk dan jumlah pembelian
    const productsWithSales = products.map(p => ({
      ...p,
      totalSold: productSales[p.id] || 0
    }));
    // Urutkan dari terbanyak
    productsWithSales.sort((a, b) => b.totalSold - a.totalSold);
    setPopularProducts(productsWithSales.slice(0, 4)); // Tampilkan 4 produk terpopuler

    // Ambil rating toko dari localStorage
    const storeRatingsData = JSON.parse(localStorage.getItem('storeRatings')) || [];
    setStoreRatings(storeRatingsData);
  }, []);

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

        {/* Produk Populer */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold text-blue-700 mb-6">Produk Populer</h2>
          {popularProducts.length === 0 ? (
            <div className="text-gray-400 italic text-center py-8">
              Belum ada data produk populer.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {popularProducts.map(product => {
                const ratings = product.ratings || [];
                const avgRating = ratings.length > 0
                  ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length)
                  : 0;
                // Favorit logic: ambil dari localStorage
                const favoritItems = JSON.parse(localStorage.getItem('favoritItems')) || [];
                const isFavorit = favoritItems.find(item => item.id === product.id);
                return (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -10, scale: 1.04 }}
                    className="relative bg-white rounded-3xl shadow-2xl border border-blue-100 hover:shadow-blue-300 transition-all duration-200 flex flex-col items-center overflow-hidden group"
                  >
                    {/* Ribbon Diskon */}
                    {product.discount && (
                      <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-xl z-10 shadow-lg">
                        DISKON
                      </div>
                    )}
                    {/* Badge Stok Habis / Terjual */}
                    <div className="absolute top-0 right-0 flex flex-col items-end z-10">
                      {product.stock === 0 ? (
                        <div className="bg-gray-400 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg mb-1">
                          Stok Habis
                        </div>
                      ) : null}
                      <div className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                        Terjual: {product.totalSold || 0}
                      </div>
                    </div>
                    {/* Foto produk */}
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center mt-6 mb-3 overflow-hidden border-4 border-blue-200 shadow-lg group-hover:scale-110 transition-transform duration-200">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <ShoppingBag size={48} className="text-blue-300" />
                      )}
                    </div>
                    {/* Nama produk */}
                    <h3 className="font-bold text-blue-800 mb-1 text-center text-lg group-hover:text-blue-900 transition-colors">
                      {product.name} <span className="text-xs text-gray-500 font-normal">({product.unit})</span>
                    </h3>
                    {/* Rating rata-rata */}
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < Math.round(avgRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {ratings.length > 0 ? avgRating.toFixed(1) : '-'}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">({ratings.length})</span>
                    </div>
                    {/* Harga */}
                    <div className="flex items-center mb-1">
                      {product.discount ? (
                        <>
                          <span className="text-blue-600 font-bold text-lg">Rp{product.discount.toLocaleString()}</span>
                          <span className="text-xs text-gray-400 line-through ml-2">Rp{product.price.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="text-blue-600 font-bold text-lg">Rp{product.price.toLocaleString()}</span>
                      )}
                      {product.unit && (
                        <span className="text-xs text-gray-500 ml-2">/ {product.unit}</span>
                      )}
                    </div>
                    {/* Terjual & Stok */}
                    <div className="flex justify-between w-full px-6 mb-2">
                      <div className="text-xs text-gray-500">Terjual: {product.totalSold || 0}</div>
                      <div className="text-xs text-gray-500">Stok: {product.stock}</div>
                    </div>
                    {/* Tombol aksi */}
                    <div className="flex items-center gap-2 w-full px-6 mb-4">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                        className={`flex-1 h-11 rounded-xl flex items-center justify-center font-semibold shadow-lg transition-all duration-200 ${
                          product.stock === 0
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:scale-105'
                        }`}
                        style={{ minHeight: 44, height: 44 }}
                      >
                        <ShoppingBag size={26} className="mr-2" />
                        {product.stock === 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
                      </button>
                      <button
                        className={`h-11 w-11 flex items-center justify-center p-2 rounded-full ${isFavorit ? 'text-red-500' : 'text-gray-300'} hover:text-red-500 bg-white shadow transition`}
                        onClick={() => {
                          let updated;
                          if (isFavorit) {
                            updated = favoritItems.filter(item => item.id !== product.id);
                          } else {
                            updated = [...favoritItems, product];
                          }
                          localStorage.setItem('favoritItems', JSON.stringify(updated));
                          window.dispatchEvent(new Event('storage'));
                        }}
                        type="button"
                        style={{ minHeight: 44, minWidth: 44 }}
                        aria-label="Tambah ke Favorit"
                      >
                        <Heart
                          size={18}
                          fill={isFavorit ? 'currentColor' : 'none'}
                          stroke="currentColor"
                        />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
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

        {/* Apa Kata Pelanggan Kami */}
        <section className="mb-10">
          <h2 className="text-2xl font-extrabold text-blue-700 mb-6">Apa Kata Pelanggan Kami</h2>
          {storeRatings.length === 0 ? (
            <div className="text-gray-400 italic text-center py-12">
              Belum ada testimoni pelanggan.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {storeRatings.map((r, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col">
                  <div className="flex items-center mb-2">
                    {/* Avatar user */}
                    {r.avatar ? (
                      <img
                        src={r.avatar}
                        alt={r.name || r.userEmail}
                        className="w-8 h-8 object-cover rounded-full border mr-3"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold mr-3">
                        {(r.name && r.name[0]) || (r.userEmail && r.userEmail[0])}
                      </div>
                    )}
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < r.value ? "text-yellow-400" : "text-gray-300"}>
                        <Star size={20} />
                      </span>
                    ))}
                    <span className="ml-2 text-blue-700 font-bold">{r.value} / 5</span>
                  </div>
                  <div className="text-gray-700 mb-2 italic">"{r.comment || 'Tidak ada komentar.'}"</div>
                  <div className="text-xs text-gray-400">
                    {r.name ? r.name : r.userEmail}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Notifikasi tambah ke keranjang */}
        {showNotif && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate__animated animate__fadeIn">
            Produk berhasil ditambahkan ke keranjang!
          </div>
        )}
      </motion.main>

      <FooterSetelahLogin />
    </div>
  );
}