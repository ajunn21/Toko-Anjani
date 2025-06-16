import { useState } from 'react';
import { ShoppingCart, User, Menu, Home, Box } from 'react-feather';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CartSebelumLogin from '../ShoppingCart/CartSebelumLogin';

const HeaderSebelumLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCart, setShowCart] = useState(false);

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white shadow-xl">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo tanpa animasi */}
          <Link to="/" className="group inline-block">
            <span className="relative text-2xl font-extrabold tracking-wide cursor-pointer transition-all duration-300 group-hover:scale-105 group-active:scale-95">
              <span className="transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-blue-700 group-hover:text-transparent group-hover:bg-clip-text">
                Toko Anjani
              </span>
              <span className="block absolute left-0 -bottom-1 h-1 w-0 bg-gradient-to-r from-blue-400 to-blue-700 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 mx-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 hover:text-blue-100 transition-colors duration-200"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/products" 
              className="flex items-center space-x-1 hover:text-blue-100 transition-colors duration-200"
            >
              <Box size={18} />
              <span>Produk</span>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart Button */}
            <button 
              onClick={() => setShowCart(true)}
              className="p-2 rounded-full hover:bg-blue-500 transition-colors duration-200 relative shadow-lg"
              aria-label="Keranjang Belanja"
            >
              <ShoppingCart size={20} />
            </button>

            {/* Login Button */}
            <button
              onClick={handleLoginClick}
              className="flex items-center space-x-1 bg-white text-blue-600 px-4 py-2 rounded-full font-bold shadow hover:bg-blue-100 transition-colors duration-200"
            >
              <User size={16} />
              <span>Masuk</span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-blue-500 transition-colors duration-200"
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mt-3 flex justify-center space-x-6 md:hidden">
          <Link 
            to="/" 
            className="flex items-center space-x-1 hover:text-blue-100 transition-colors duration-200"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link 
            to="/products" 
            className="flex items-center space-x-1 hover:text-blue-100 transition-colors duration-200"
          >
            <Box size={18} />
            <span>Produk</span>
          </Link>
        </div>
      </header>

      {/* Shopping Cart Modal */}
      {showCart && <CartSebelumLogin onClose={() => setShowCart(false)} />}
    </>
  );
};

export default HeaderSebelumLogin;