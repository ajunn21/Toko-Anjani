import { useState } from 'react';
import { ShoppingCart, Menu, User, LogOut, Home, Box, Heart, Package } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import CartSetelahLogin from '../ShoppingCart/CartSetelahLogin';

const HeaderSetelahLogin = ({ user, onLogout, cartItems, setCartItems, favoritItems = [] }) => {
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/HomeSebelumLogin');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 text-white shadow-xl animate__animated animate__fadeInDown">
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

          <div className="hidden md:flex items-center space-x-6 mx-8">
            <Link 
              to="/" 
              className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/products" 
              className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200"
            >
              <Box size={18} />
              <span>Produk</span>
            </Link>
            <Link 
              to="/orders" 
              className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200"
            >
              <Package size={18} />
              <span>Pesanan Saya</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Produk Favorit Icon (Love) di sebelah cart */}
            <Link 
              to="/favorit"
              className="p-2 rounded-full hover:bg-blue-600 transition-colors duration-200 relative"
              title="Produk Favorit"
            >
              <Heart size={20} className="text-white" />
              {favoritItems && favoritItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {favoritItems.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <button 
              onClick={() => setShowCart(true)}
              className="p-2 rounded-full hover:bg-blue-600 transition-colors duration-200 relative"
            >
              <ShoppingCart size={20} />
              {cartItems && cartItems.reduce((total, item) => total + item.quantity, 0) > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            
            {/* User Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:bg-blue-600 px-2 py-1 rounded transition-colors duration-200 group/profile">
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200 shadow group-focus:ring-2 group-focus:ring-blue-300 overflow-hidden">
                  {/* Tampilkan icon User jika belum upload avatar */}
                  {user?.avatar
                    ? (user.avatar.startsWith('data:') ? (
                        <img
                          src={user.avatar}
                          alt="Avatar"
                          className="w-8 h-8 object-cover rounded-full"
                        />
                      ) : (
                        <User size={16} className="text-blue-700 group-hover:text-blue-900 transition-colors duration-200" />
                      )
                    )
                    : (
                      <User size={16} className="text-blue-700 group-hover:text-blue-900 transition-colors duration-200" />
                    )
                  }
                </div>
                <span className="hidden md:inline text-white group-hover:text-blue-100 font-semibold transition-colors duration-200">{user?.name || 'User'}</span>
              </button>
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-2xl py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 origin-top-right transform scale-95 group-hover:scale-100 group-focus-within:scale-100">
                <Link 
                  to="/profile" 
                  className="block px-4 py-2 text-blue-800 hover:bg-blue-50 hover:text-blue-700 font-medium rounded transition-colors duration-200"
                >
                  Profil Saya
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-blue-800 hover:bg-blue-50 hover:text-blue-700 font-medium rounded flex items-center space-x-2 transition-colors duration-200"
                >
                  <LogOut size={14} />
                  <span>Keluar</span>
                </button>
              </div>
            </div>

            <button className="md:hidden p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mt-3 flex justify-center space-x-6 md:hidden">
          <Link 
            to="/" 
            className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>
          <Link 
            to="/products" 
            className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200"
          >
            <Box size={18} />
            <span>Produk</span>
          </Link>
          <Link 
            to="/orders" 
            className="flex items-center space-x-1 hover:text-blue-200 transition-colors duration-200"
          >
            <Package size={18} />
            <span>Pesanan Saya</span>
          </Link>
        </div>
      </header>

      {/* Cart Modal */}
      {showCart && (
        <CartSetelahLogin 
          onClose={() => setShowCart(false)} 
          user={{...user, cartItems: cartItems}}
          setUser={(u) => setCartItems(u.cartItems)}
          navigate={navigate}
        />
      )}
    </>
  );
};

export default HeaderSetelahLogin;