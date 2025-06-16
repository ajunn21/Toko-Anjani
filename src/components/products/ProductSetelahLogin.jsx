import { motion } from 'framer-motion'; 
import { useState } from 'react';
import { ShoppingBag, Star, ChevronLeft, ChevronRight, Search, Heart, Share2 } from 'react-feather';
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

  const [products, setProducts] = useState([
    { id: 1, name: 'Indomie Goreng', price: 3000, discount: 2500, rating: 4.5, stock: 10, favorite: true, category: 'Sembako' },
    { id: 2, name: 'Aqua Gelas', price: 500, discount: null, rating: 4.8, stock: 50, favorite: false, category: 'Minuman' },
    { id: 3, name: 'Lifebuoy Sabun', price: 4500, discount: 4000, rating: 4.2, stock: 15, favorite: true, category: 'Perlengkapan Rumah' },
    { id: 4, name: 'Minyak Goreng', price: 15000, discount: 13500, rating: 4.0, stock: 8, favorite: false, category: 'Sembako' },
    { id: 5, name: 'Rinso Detergent', price: 12000, discount: 11000, rating: 4.3, stock: 12, favorite: false, category: 'Perlengkapan Rumah' },
    { id: 6, name: 'Gula Pasir 1kg', price: 14000, discount: null, rating: 4.1, stock: 20, favorite: false, category: 'Sembako' },
    { id: 7, name: 'Kopi Kapal Api', price: 8000, discount: 7500, rating: 4.6, stock: 18, favorite: true, category: 'Kopi & Teh' },
    { id: 8, name: 'Teh Celup Sosro', price: 10000, discount: 9000, rating: 4.4, stock: 25, favorite: false, category: 'Kopi & Teh' },
    { id: 9, name: 'Susu UHT', price: 12000, discount: 11000, rating: 4.7, stock: 30, favorite: false, category: 'Susu' },
    { id: 10, name: 'Bimoli Minyak Goreng 1L', price: 17000, discount: 15000, rating: 4.5, stock: 22, favorite: false, category: 'Sembako' },
    { id: 11, name: 'Beras Merah 5kg', price: 75000, discount: 70000, rating: 4.3, stock: 9, favorite: false, category: 'Sembako' },
    { id: 12, name: 'Sarden ABC', price: 9000, discount: 8500, rating: 4.2, stock: 17, favorite: false, category: 'Lainnya' },
    { id: 13, name: 'Mie Sedap', price: 2800, discount: 2500, rating: 4.4, stock: 40, favorite: false, category: 'Sembako' },
    { id: 14, name: 'Sabun Lifebuoy Cair', price: 18000, discount: 16000, rating: 4.6, stock: 14, favorite: false, category: 'Perlengkapan Rumah' },
    { id: 15, name: 'Roti Tawar', price: 16000, discount: null, rating: 4.5, stock: 19, favorite: false, category: 'Roti & Biskuit' },
    { id: 16, name: 'Susu Kental Manis', price: 11000, discount: 10000, rating: 4.7, stock: 21, favorite: false, category: 'Susu' },
    { id: 17, name: 'Biskuit Roma Kelapa', price: 9000, discount: 8000, rating: 4.3, stock: 16, favorite: false, category: 'Roti & Biskuit' },
    { id: 18, name: 'Sirup Marjan', price: 21000, discount: 19000, rating: 4.8, stock: 13, favorite: false, category: 'Minuman' },
    { id: 19, name: 'Tepung Terigu Segitiga', price: 12000, discount: 11000, rating: 4.4, stock: 27, favorite: false, category: 'Sembako' },
    { id: 20, name: 'Garam Dapur', price: 3000, discount: null, rating: 4.2, stock: 35, favorite: false, category: 'Bumbu & Penyedap' },
    { id: 21, name: 'Susu Ultra 1L', price: 16000, discount: 15000, rating: 4.7, stock: 25, favorite: false, category: 'Susu' },
    { id: 22, name: 'Beras Putih 5kg', price: 68000, discount: 65000, rating: 4.6, stock: 12, favorite: false, category: 'Sembako' },
    { id: 23, name: 'Kecap ABC 600ml', price: 12000, discount: 11000, rating: 4.5, stock: 18, favorite: false, category: 'Bumbu & Penyedap' },
    { id: 24, name: 'Sari Roti Coklat', price: 9000, discount: 8500, rating: 4.4, stock: 20, favorite: false, category: 'Roti & Biskuit' },
    { id: 25, name: 'Sprite 1.5L', price: 13000, discount: 12000, rating: 4.3, stock: 15, favorite: false, category: 'Minuman' },
    { id: 26, name: 'Fanta 1.5L', price: 13000, discount: 12000, rating: 4.2, stock: 15, favorite: false, category: 'Minuman' },
    { id: 27, name: 'Susu Dancow 400g', price: 42000, discount: 40000, rating: 4.8, stock: 10, favorite: false, category: 'Susu' },
    { id: 28, name: 'Biskuit Regal', price: 15000, discount: 14000, rating: 4.7, stock: 17, favorite: false, category: 'Roti & Biskuit' },
    { id: 29, name: 'Teh Botol Sosro 1L', price: 9000, discount: 8500, rating: 4.5, stock: 22, favorite: false, category: 'Minuman' },
    { id: 30, name: 'Chitato Sapi Panggang', price: 12000, discount: 11000, rating: 4.6, stock: 19, favorite: false, category: 'Snack' },
    { id: 31, name: 'SilverQueen Chunky Bar', price: 18000, discount: 17000, rating: 4.8, stock: 14, favorite: false, category: 'Snack' },
    { id: 32, name: 'Good Day Cappuccino', price: 6000, discount: 5500, rating: 4.4, stock: 30, favorite: false, category: 'Kopi & Teh' },
    { id: 33, name: 'Nutrisari Jeruk', price: 3000, discount: 2500, rating: 4.3, stock: 40, favorite: false, category: 'Minuman' },
    { id: 34, name: 'Roma Malkist', price: 9000, discount: 8500, rating: 4.5, stock: 21, favorite: false, category: 'Roti & Biskuit' },
    { id: 35, name: 'Sari Gandum', price: 8000, discount: 7500, rating: 4.2, stock: 18, favorite: false, category: 'Roti & Biskuit' },
    { id: 36, name: 'Milo 3in1', price: 12000, discount: 11000, rating: 4.6, stock: 25, favorite: false, category: 'Susu' },
    { id: 37, name: 'Energen Coklat', price: 7000, discount: 6500, rating: 4.4, stock: 28, favorite: false, category: 'Susu' },
    { id: 38, name: 'Susu Bear Brand', price: 9500, discount: 9000, rating: 4.7, stock: 16, favorite: false, category: 'Susu' },
    { id: 39, name: 'Yakult 5pcs', price: 12000, discount: 11000, rating: 4.8, stock: 13, favorite: false, category: 'Minuman' },
    { id: 40, name: 'Ultra Mimi', price: 5000, discount: 4500, rating: 4.5, stock: 20, favorite: false, category: 'Susu' },
    { id: 41, name: 'Beng-Beng', price: 2000, discount: 1800, rating: 4.6, stock: 50, favorite: false, category: 'Snack' },
    { id: 42, name: 'Choki-Choki', price: 1500, discount: 1300, rating: 4.5, stock: 60, favorite: false, category: 'Snack' },
    { id: 43, name: 'Oreo 137g', price: 9000, discount: 8500, rating: 4.7, stock: 40, favorite: false, category: 'Roti & Biskuit' },
    { id: 44, name: 'Tango Wafer', price: 8000, discount: 7500, rating: 4.6, stock: 35, favorite: false, category: 'Snack' },
    { id: 45, name: 'Sariwangi Teh Celup', price: 7000, discount: 6500, rating: 4.5, stock: 30, favorite: false, category: 'Kopi & Teh' },
    { id: 46, name: 'ABC Kopi Susu', price: 3000, discount: 2500, rating: 4.4, stock: 45, favorite: false, category: 'Kopi & Teh' },
    { id: 47, name: 'Torabika Cappuccino', price: 4000, discount: 3500, rating: 4.6, stock: 38, favorite: false, category: 'Kopi & Teh' },
    { id: 48, name: 'Malkist Crackers', price: 9500, discount: 9000, rating: 4.7, stock: 28, favorite: false, category: 'Roti & Biskuit' },
    { id: 49, name: 'Roma Kelapa', price: 8500, discount: 8000, rating: 4.5, stock: 32, favorite: false, category: 'Roti & Biskuit' },
    { id: 50, name: 'Chitato Sapi Panggang 68g', price: 12000, discount: 11000, rating: 4.8, stock: 27, favorite: false, category: 'Snack' },
    { id: 51, name: 'Qtela Tempe', price: 9000, discount: 8500, rating: 4.4, stock: 33, favorite: false, category: 'Roti & Biskuit' },
    { id: 52, name: 'Lay’s Rumput Laut', price: 12000, discount: 11500, rating: 4.6, stock: 29, favorite: false, category: 'Snack' },
    { id: 53, name: 'Good Time Choco', price: 10000, discount: 9500, rating: 4.7, stock: 36, favorite: false, category: 'Snack' },
    { id: 54, name: 'SilverQueen Cashew', price: 20000, discount: 19000, rating: 4.8, stock: 22, favorite: false, category: 'Snack' },
    { id: 55, name: 'Dancow Fortigro 800g', price: 85000, discount: 82000, rating: 4.9, stock: 15, favorite: false, category: 'Susu' },
    { id: 56, name: 'Susu Zee Coklat', price: 18000, discount: 17000, rating: 4.5, stock: 18, favorite: false, category: 'Susu' },
    { id: 57, name: 'Nutella 350g', price: 65000, discount: 63000, rating: 4.9, stock: 10, favorite: false, category: 'Snack' },
    { id: 58, name: 'Bango Kecap Manis 220ml', price: 9000, discount: 8500, rating: 4.7, stock: 25, favorite: false, category: 'Bumbu & Penyedap' },
    { id: 59, name: 'Sasa Tepung Bumbu', price: 5000, discount: 4500, rating: 4.6, stock: 40, favorite: false, category: 'Bumbu & Penyedap' },
    { id: 60, name: 'Royco Ayam 230g', price: 8000, discount: 7500, rating: 4.5, stock: 37, favorite: false, category: 'Bumbu & Penyedap' },
    { id: 61, name: 'Indomilk UHT Coklat', price: 7000, discount: 6500, rating: 4.6, stock: 28, favorite: false, category: 'Susu' },
    { id: 62, name: 'Frisian Flag Kental Manis', price: 11000, discount: 10000, rating: 4.7, stock: 24, favorite: false, category: 'Susu' },
    { id: 63, name: 'Ultra Milk Stroberi', price: 7000, discount: 6500, rating: 4.5, stock: 30, favorite: false, category: 'Susu' },
    { id: 64, name: 'Teh Pucuk Harum', price: 6000, discount: 5500, rating: 4.6, stock: 35, favorite: false, category: 'Kopi & Teh' },
    { id: 65, name: 'Floridina Jeruk', price: 5000, discount: 4500, rating: 4.4, stock: 40, favorite: false, category: 'Minuman' },
    { id: 66, name: 'Aqua Botol 600ml', price: 4000, discount: 3500, rating: 4.7, stock: 50, favorite: false, category: 'Minuman' },
    { id: 67, name: 'Le Minerale 1.5L', price: 7000, discount: 6500, rating: 4.6, stock: 45, favorite: false, category: 'Minuman' },
    { id: 68, name: 'Sprite Kaleng', price: 6000, discount: 5500, rating: 4.5, stock: 38, favorite: false, category: 'Minuman' },
    { id: 69, name: 'Fanta Kaleng', price: 6000, discount: 5500, rating: 4.5, stock: 38, favorite: false, category: 'Minuman' },
    { id: 70, name: 'Coca Cola Kaleng', price: 6000, discount: 5500, rating: 4.6, stock: 38, favorite: false, category: 'Minuman' },
    { id: 71, name: 'Sari Roti Tawar', price: 16000, discount: 15000, rating: 4.7, stock: 20, favorite: false, category: 'Roti & Biskuit' },
    { id: 72, name: 'Roti O Coklat', price: 12000, discount: 11000, rating: 4.6, stock: 18, favorite: false, category: 'Roti & Biskuit' },
    { id: 73, name: 'Roti Boy', price: 10000, discount: 9500, rating: 4.5, stock: 15, favorite: false, category: 'Roti & Biskuit' },
    { id: 74, name: 'Roma Sari Gandum', price: 9000, discount: 8500, rating: 4.6, stock: 22, favorite: false, category: 'Roti & Biskuit' },
    { id: 75, name: 'Beng-Beng Share It', price: 12000, discount: 11000, rating: 4.7, stock: 25, favorite: false, category: 'Snack' },
    { id: 76, name: 'Choki-Choki Stick', price: 8000, discount: 7500, rating: 4.5, stock: 30, favorite: false, category: 'Snack' },
    { id: 77, name: 'Ovaltine Sachet', price: 3000, discount: 2500, rating: 4.6, stock: 40, favorite: false, category: 'Susu' },
    { id: 78, name: 'Milo Kotak', price: 7000, discount: 6500, rating: 4.7, stock: 35, favorite: false, category: 'Susu' },
    { id: 79, name: 'Good Day Freeze', price: 6000, discount: 5500, rating: 4.5, stock: 28, favorite: false, category: 'Snack' },
    { id: 80, name: 'Nutrisari Mangga', price: 3000, discount: 2500, rating: 4.4, stock: 40, favorite: false, category: 'Minuman' }
  ]);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
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
              {paginatedProducts.map((product) => (
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
                    <h3 className="font-semibold text-lg mb-1 text-blue-700">{product.name}</h3>
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
                      onClick={() => handleAddToCart(product)}
                      className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <ShoppingBag size={16} className="mr-2" />
                      Tambah ke Keranjang
                    </button>
                  </div>
                </motion.div>
              ))}
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