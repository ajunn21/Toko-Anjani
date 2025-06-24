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
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="bg-blue-100 h-48 flex items-center justify-center relative">
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
                      onClick={() => navigate('/login')}
                      className="mt-3 w-full bg-blue-100 text-blue-700 py-2 rounded-md font-medium hover:bg-blue-200 transition-colors"
                    >
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
      
      <FooterSebelumLogin />
    </div>
  );
};

export default ProductSebelumLogin;