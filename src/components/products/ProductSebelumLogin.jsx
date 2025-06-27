import { motion } from 'framer-motion';
import { ShoppingBag, Star, ChevronLeft, ChevronRight, Search } from 'react-feather';
import HeaderSebelumLogin from '../headers/HeaderSebelumLogin';
import FooterSebelumLogin from '../footers/FooterSebelumLogin';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductSebelumLogin = () => {
  const navigate = useNavigate();

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

  // Tambahkan unitList
  const unitList = ["Semua", "pcs", "dus", "pak", "kg", "liter", "box"];

  // Ambil produk dari localStorage
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const productsData = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(productsData);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedUnit, setSelectedUnit] = useState('Semua');
  const productsPerPage = 8;

  // Filter produk berdasarkan kategori dan unit
  let filteredProducts = products.filter(product =>
    (selectedCategory === 'Semua' || product.category === selectedCategory) &&
    (selectedUnit === 'Semua' || product.unit === selectedUnit) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedProducts = [...filteredProducts];
  if (sortOption === 'Harga Terendah') {
    sortedProducts.sort((a, b) => (a.discount || a.price) - (b.discount || b.price));
  } else if (sortOption === 'Harga Tertinggi') {
    sortedProducts.sort((a, b) => (b.discount || b.price) - (a.discount || a.price));
  } else if (sortOption === 'Rating Tertinggi') {
    sortedProducts.sort((a, b) => (b.rating - a.rating));
  } else if (sortOption === 'Terbaru') {
    sortedProducts.sort((a, b) => b.id - a.id);
  }
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Product List Section */}
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
                {/* Dropdown unit */}
                <select
                  className="py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent mb-2 md:mb-0"
                  value={selectedUnit}
                  onChange={e => {
                    setSelectedUnit(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  {unitList.map(unit => (
                    <option key={unit} value={unit}>{unit === "Semua" ? "Semua Satuan" : unit}</option>
                  ))}
                </select>
                
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {paginatedProducts.length === 0 ? (
                <div className="col-span-full text-center text-gray-400 py-12">
                  Tidak ada produk ditemukan.
                </div>
              ) : paginatedProducts.map((product) => {
                // Hitung rating rata-rata dari array ratings
                const ratings = product.ratings || [];
                const avgRating = ratings.length > 0
                  ? (ratings.reduce((sum, r) => sum + r.value, 0) / ratings.length)
                  : 0;
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
                    <button 
                      onClick={() => navigate('/login')}
                      className="mt-2 w-full bg-blue-100 text-blue-700 py-2 rounded-xl font-medium hover:bg-blue-200 transition-colors mb-4"
                      style={{ minHeight: 44 }}
                    >
                      Tambah ke Keranjang
                    </button>
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
      
      <FooterSebelumLogin />
    </div>
  );
};

export default ProductSebelumLogin;