import { motion } from 'framer-motion';
import { ShoppingBag, LogIn, X } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const CartSebelumLogin = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onClose(); // Close cart first
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end"
      onClick={(e) => e.target === e.currentTarget && onClose()} // Close when clicking backdrop
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ 
          type: 'spring', 
          stiffness: 300, 
          damping: 30 
        }}
        className="w-full max-w-md bg-white h-full shadow-xl flex flex-col"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Tutup keranjang"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
          <div className="bg-blue-100 p-6 rounded-full mb-4">
            <ShoppingBag size={48} className="text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Keranjang Belanja Kosong</h3>
          <p className="text-gray-600 mb-6">Silakan login terlebih dahulu untuk melihat keranjang belanja Anda</p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoginClick}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center shadow-lg"
          >
            <LogIn size={18} className="mr-2" />
            Login Sekarang
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartSebelumLogin;