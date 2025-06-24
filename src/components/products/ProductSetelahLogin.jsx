import { motion } from 'framer-motion'; 
import { useState, useEffect } from 'react';
import { ShoppingBag, Star, ChevronLeft, ChevronRight, Search, Heart, Share2, User as UserIcon } from 'react-feather';
import FooterSetelahLogin from '../footers/FooterSetelahLogin';

const ProductSetelahLogin = ({ user, addToCart, cartItems, addToFavorit, favoritItems, removeFromFavorit }) => {
  // Daftar kategori
  const categories = [
    'Semua',
    'Minuman',
    'Sembako',
    'Snack',
    'Perlengkapan Rumah',
    'Kopi & Teh',
    'Susu',
    'Roti & Biskuit',
    'Bumbu & Penyedap',
    'Lainnya'
  ];

  // Ambil produk dari localStorage
  const [products, setProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const productsData = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(productsData);

    // Hitung produk populer
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const productSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        productSales[item.id] = (productSales[item.id] || 0) + item.quantity;
      });
    });
    const productsWithSales = productsData.map(p => ({
      ...p,
      totalSold: productSales[p.id] || 0
    }));
    productsWithSales.sort((a, b) => b.totalSold - a.totalSold);
    setPopularProducts(productsWithSales.slice(0, 4));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showNotif, setShowNotif] = useState(false);
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Filter produk berdasarkan kategori
  let filteredProducts = products.filter(product =>
    (selectedCategory === 'Semua' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedProducts = [...filteredProducts];
  if (sortOption === 'Harga Terendah') {
    sortedProducts.sort((a, b) => (a.discount || a.price) - (b.discount || b.price));
  } else if (sortOption === 'Harga Tertinggi') {
    sortedProducts.sort((a, b) => (b.discount || b.price) - (a.discount || a.price));
  } else if (sortOption === 'Rating Tertinggi') {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === 'Terbaru') {
    sortedProducts.sort((a, b) => b.id - a.id);
  }
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Logika tambah ke keranjang
  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotif(true);
    setTimeout(() => setShowNotif(false), 1500);
  };

  // Logika favorit
  const handleToggleFavorit = (product) => {
    if (favoritItems.find(item => item.id === product.id)) {
      removeFromFavorit(product.id);
    } else {
      addToFavorit(product);
    }
    setProducts(products.map(p =>
      p.id === product.id ? { ...p, favorite: !p.favorite } : p
    ));
  };

  // Rating logic
  const handleRateProduct = (productId, rating) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        // Simpan rating per user di array ratings: [{userEmail, value}]
        let ratings = p.ratings || [];
        const existing = ratings.find(r => r.userEmail === user.email);
        if (existing) {
          ratings = ratings.map(r => r.userEmail === user.email ? { ...r, value: rating } : r);
        } else {
          ratings = [...ratings, { userEmail: user.email, value: rating }];
        }
        return { ...p, ratings };
      }
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Produk Populer */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-blue-700 mb-6">Produk Populer</h2>
            {popularProducts.length === 0 ? (
              <div className="text-gray-400 italic text-center py-8">
                Belum ada data produk populer.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-600 mb-6">
              <a href="/" className="hover:text-blue-600">Home</a>
              <ChevronRight size={14} className="mx-2" />
              <span>Semua Produk</span>
            </div>

            {/* Page Title */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Semua Produk</h1>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
                {/* Dropdown kategori */}
                <select
                  className="py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent mb-2 md:mb-0"
                  value={selectedCategory}
                  onChange={e => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {/* Search dan Sort */}
                <div className="relative flex-1 md:w-64">
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Search size={18} />
                  </button>
                </div>
                <select className="py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent" value={sortOption} onChange={e => setSortOption(e.target.value)}>
                  <option value="">Urutkan</option>
                  <option value="Harga Terendah">Harga Terendah</option>
                  <option value="Harga Tertinggi">Harga Tertinggi</option>
                  <option value="Rating Tertinggi">Rating Tertinggi</option>
                  <option value="Terbaru">Terbaru</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => {
                // Hitung rating rata-rata
                const ratings = product.ratings || [];
                const avgRating = ratings.length > 0
                  ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length)
                  : 0;
                const userRating = ratings.find(r => r.userEmail === user.email)?.value || 0;
                return (
                  <motion.div
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow relative"
                  >
                    {/* Favorite Button */}
                    <button 
                      className={`absolute top-2 left-2 p-2 rounded-full ${favoritItems.find(item => item.id === product.id) ? 'text-red-500' : 'text-gray-300'} hover:text-red-500`}
                      onClick={() => handleToggleFavorit(product)}
                    >
                      <Heart 
                        size={18} 
                        fill={favoritItems.find(item => item.id === product.id) ? 'currentColor' : 'none'} 
                        stroke="currentColor" 
                      />
                    </button>

                    {/* Share Button */}
                    <button className="absolute top-2 right-2 p-2 rounded-full text-gray-400 hover:text-blue-600">
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
                      {/* User rating + avatar */}
                      <div className="flex items-center mb-2">
                        <span className="text-xs text-gray-500 mr-2">Rating Anda:</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleRateProduct(product.id, i + 1)}
                              className="focus:outline-none"
                            >
                              <Star
                                size={18}
                                className={i < userRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                              />
                            </button>
                          ))}
                          {userRating > 0 && (
                            <span className="text-xs text-blue-500 ml-2">({userRating})</span>
                          )}
                          {/* Avatar user */}
                          <span className="ml-2">
                            {/* Tampilkan icon User jika belum upload avatar */}
                            {user?.avatar && user.avatar.startsWith('data:') ? (
                              <img
                                src={user.avatar}
                                alt="Avatar"
                                className="w-6 h-6 object-cover rounded-full inline-block border"
                              />
                            ) : (
                              <UserIcon size={18} className="text-blue-400" />
                            )}
                          </span>
                        </div>
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
                        onClick={() => handleAddToCart(product)}
                        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <ShoppingBag size={16} className="mr-2" />
                        Tambah ke Keranjang
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full ${currentPage === i + 1 ? 'bg-blue-600 text-white font-medium' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="p-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100">
                  <ChevronRight size={16} />
                </button>
              </nav>
            </div>
          </div>
        </section>
      </main>

      {/* Notifikasi tambah ke keranjang */}
      {showNotif && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate__animated animate__fadeInDown">
          Produk berhasil ditambahkan ke keranjang!
        </div>
      )}

      <FooterSetelahLogin />
    </div>
  );
};

export default ProductSetelahLogin;