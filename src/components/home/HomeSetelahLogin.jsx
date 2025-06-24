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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {popularProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-100 rounded flex items-center justify-center mb-2 overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
                    ) : (
                      <ShoppingBag size={40} className="text-blue-400" />
                    )}
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-1 text-center">{product.name}</h3>
                  <div className="text-blue-600 font-bold mb-1">Rp{(product.discount || product.price).toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mb-2">Terjual: {product.totalSold}</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Tambah ke Keranjang
                  </button>
                </div>
              ))}
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
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate__animated animate__fadeInDown">
            Produk berhasil ditambahkan ke keranjang!
          </div>
        )}
      </motion.main>

      <FooterSetelahLogin />
    </div>
  );
}