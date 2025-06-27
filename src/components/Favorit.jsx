import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, X } from 'react-feather';

const Favorit = ({ favoritItems = [], removeFromFavorit }) => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-10 flex-grow"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-8 flex items-center">
          <Heart size={28} className="mr-2 text-pink-500" />
          Produk Favorit Saya
        </h1>
        {favoritItems.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
            <Heart size={48} className="text-pink-300 mb-4" />
            <p className="text-lg text-gray-500">Belum ada produk favorit.<br />Klik ikon <span className='text-pink-500'>&hearts;</span> pada produk untuk menambahkannya ke favorit Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favoritItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6, scale: 1.03 }}
                className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl border border-blue-100 hover:shadow-2xl transition-all duration-200 flex flex-col items-center overflow-hidden"
              >
                {/* Favorite Button (remove) */}
                <button
                  className="absolute top-2 left-2 p-2 rounded-full text-red-500 bg-white shadow z-20"
                  onClick={() => removeFromFavorit && removeFromFavorit(item.id)}
                  title="Hapus dari Favorit"
                >
                  <X size={18} />
                </button>
                {/* Foto produk */}
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mt-6 mb-3 overflow-hidden border-4 border-blue-200 shadow-lg">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <ShoppingBag size={40} className="text-blue-300" />
                  )}
                </div>
                {/* Nama produk */}
                <h3 className="font-bold text-blue-800 mb-1 text-center text-lg">{item.name}</h3>
                {/* Harga */}
                <div className="mb-1 flex items-center justify-center">
                  {item.discount ? (
                    <>
                      <span className="text-blue-600 font-bold text-lg">Rp{item.discount.toLocaleString()}</span>
                      <span className="text-xs text-gray-400 line-through ml-2">Rp{item.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-blue-600 font-bold text-lg">Rp{item.price.toLocaleString()}</span>
                  )}
                  {item.unit && (
                    <span className="text-xs text-gray-500 ml-2">/ {item.unit}</span>
                  )}
                </div>
                {/* Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < (item.ratings && item.ratings.length > 0
                        ? Math.round(item.ratings.reduce((sum, r) => sum + r.value, 0) / item.ratings.length)
                        : 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    {item.ratings && item.ratings.length > 0
                      ? (item.ratings.reduce((sum, r) => sum + r.value, 0) / item.ratings.length).toFixed(1)
                      : '-'}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">
                    ({item.ratings ? item.ratings.length : 0})
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-2">Stok: {item.stock}</div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default Favorit;
