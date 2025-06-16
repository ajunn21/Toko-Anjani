import { motion } from 'framer-motion';
import { Heart } from 'react-feather';

const Favorit = ({ favoritItems = [] }) => {
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
            {/* Render produk favorit di sini */}
            {favoritItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mb-2" />
                <h3 className="font-semibold text-blue-800 mb-1">{item.name}</h3>
                <p className="text-blue-600 font-bold mb-2">Rp {item.price.toLocaleString()}</p>
                {/* Tambahkan tombol hapus dari favorit jika diinginkan */}
              </div>
            ))}
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default Favorit;
