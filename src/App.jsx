import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import komponen
import HomeSebelumLogin from './components/home/HomeSebelumLogin';
import HomeSetelahLogin from './components/home/HomeSetelahLogin';
import HomeAdmin from './components/home/HomeAdmin';
import ProductSebelumLogin from './components/products/ProductSebelumLogin';
import ProductSetelahLogin from './components/products/ProductSetelahLogin';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HeaderSebelumLogin from './components/headers/HeaderSebelumLogin';
import HeaderSetelahLogin from './components/headers/HeaderSetelahLogin';
import Favorit from './components/Favorit';
import ProfilSaya from './components/ProfilSaya';
import PesananSaya from './components/PesananSaya';
import LupaPassword from './components/auth/LupaPassword';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [favoritItems, setFavoritItems] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('user'));
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedFavorit = JSON.parse(localStorage.getItem('favoritItems')) || [];
    if (loggedIn && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
    setCartItems(storedCart);
    setFavoritItems(storedFavorit);
  }, []);

  // Tambahkan efek sinkronisasi user setelah update profil
  useEffect(() => {
    // Sync user state jika ada perubahan di localStorage (misal setelah edit profil)
    const syncUser = () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) setUser(userData);
    };
    window.addEventListener('storage', syncUser);
    // Juga sync setiap render (misal setelah edit profil)
    syncUser();
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCartItems([]);
    setFavoritItems([]);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('favoritItems');
  };

  const addToCart = (product) => {
    const priceToUse = product.discount || product.price;
    const existingItem = cartItems.find(item => item.id === product.id);
    let newCart;
    if (existingItem) {
      newCart = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, price: priceToUse }
          : item
      );
    } else {
      newCart = [
        ...cartItems,
        { ...product, price: priceToUse, quantity: 1, image: product.image || null }
      ];
    }
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
  };

  const addToFavorit = (product) => {
    if (!favoritItems.find(item => item.id === product.id)) {
      const newFavorit = [...favoritItems, product];
      setFavoritItems(newFavorit);
      localStorage.setItem('favoritItems', JSON.stringify(newFavorit));
    }
  };

  const removeFromFavorit = (productId) => {
    const newFavorit = favoritItems.filter(item => item.id !== productId);
    setFavoritItems(newFavorit);
    localStorage.setItem('favoritItems', JSON.stringify(newFavorit));
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          user?.role === 'admin' ? null : // Admin tidak pakai header user
          <HeaderSetelahLogin user={user} onLogout={handleLogout} cartItems={cartItems} setCartItems={setCartItems} />
        ) : (
          <HeaderSebelumLogin />
        )}
        <Routes>
          {/* Halaman utama */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                user?.role === 'admin' ? (
                  <HomeAdmin user={user} onLogout={handleLogout} />
                ) : (
                  <HomeSetelahLogin user={user} addToCart={addToCart} />
                )
              ) : (
                <HomeSebelumLogin />
              )
            }
          />

          {/* Produk */}
          <Route
            path="/products"
            element={
              isLoggedIn ? (
                <ProductSetelahLogin user={user} addToCart={addToCart} cartItems={cartItems} addToFavorit={addToFavorit} favoritItems={favoritItems} removeFromFavorit={removeFromFavorit} />
              ) : (
                <ProductSebelumLogin />
              )
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          {/* Register */}
          <Route
            path="/register"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Register />
              )
            }
          />

          {/* Profil Saya */}
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                // Berikan setUser agar ProfilSaya bisa update state user di App
                <ProfilSaya user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Pesanan Saya */}
          <Route
            path="/orders"
            element={
              isLoggedIn ? (
                <PesananSaya user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Favorit */}
          <Route
            path="/favorit"
            element={
              isLoggedIn ? (
                <Favorit favoritItems={favoritItems} removeFromFavorit={removeFromFavorit} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          {/* Lupa Password */}
          <Route
            path="/lupa-password"
            element={<LupaPassword />}
          />

          {/* Redirect untuk path lainnya ke halaman utama */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;