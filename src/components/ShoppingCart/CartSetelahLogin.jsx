import { motion } from 'framer-motion';
import { X, ShoppingBag } from 'react-feather';
import { useState } from 'react';

const CartSetelahLogin = ({ onClose, user, setUser, navigate }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper functions
  const calculateSubtotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = (items) => {
    const subtotal = calculateSubtotal(items);
    return subtotal + 10000; // Adding shipping cost
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      // If quantity would become 0, remove the item instead
      removeItem(id);
      return;
    }
    
    setUser({
      ...user,
      cartItems: user.cartItems.map(item =>
        item.id === id 
          ? { ...item, quantity: newQuantity }
          : item
      )
    });
  };

  const removeItem = (id) => {
    setUser({
      ...user,
      cartItems: user.cartItems.filter(item => item.id !== id)
    });
  };

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setUser({ ...user, cartItems: [] });
      setShowPayment(false);
      setPaymentMethod("");
      setTimeout(() => setPaymentSuccess(false), 1500);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full max-w-md bg-gradient-to-br from-blue-50 to-blue-100 h-full shadow-2xl overflow-y-auto rounded-l-3xl animate__animated animate__fadeInRight"
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-grow">
            {user?.cartItems?.length > 0 ? (
              <>
                {/* Cart items list */}
                <div className="space-y-4">
                  {user.cartItems.map(item => (
                    <div key={item.id} className="flex items-center py-4 border-b">
                      <div className="w-16 h-16 bg-blue-100 rounded mr-4 flex items-center justify-center">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <ShoppingBag size={24} className="text-blue-400" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-blue-600 font-bold">Rp {item.price.toLocaleString()} <span className='text-xs text-gray-500'>(/pcs)</span></p>
                        <p className="text-gray-700 text-sm">Total: <span className="font-semibold">Rp {(item.price * item.quantity).toLocaleString()}</span></p>
                        <div className="flex items-center mt-2">
                          <button 
                            className="w-8 h-8 border border-gray-300 rounded-l hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                            {item.quantity}
                          </span>
                          <button 
                            className="w-8 h-8 border border-gray-300 rounded-r hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        className="text-gray-400 hover:text-red-500 ml-4"
                        onClick={() => removeItem(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart summary */}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rp {calculateSubtotal(user.cartItems).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-600">Ongkir</span>
                    <span className="font-medium">Rp 10.000</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span className="text-blue-600">Rp {calculateTotal(user.cartItems).toLocaleString()}</span>
                  </div>
                  <button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all mb-4"
                    onClick={() => {
                      setShowPayment(true);
                    }}
                  >
                    Lanjut ke Pembayaran
                  </button>
                  {showPayment && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border">
                      <h4 className="font-semibold mb-2">Pilih Metode Pembayaran</h4>
                      <select className="w-full mb-4 p-2 border rounded" value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                        <option value="">-- Pilih --</option>
                        <option value="transfer">Transfer Bank</option>
                        <option value="cod">COD (Bayar di Tempat)</option>
                        <option value="ewallet">E-Wallet</option>
                        <option value="qris">QRIS</option>
                        <option value="alfamart">Alfamart/Indomaret</option>
                        <option value="kartu">Kartu Kredit/Debit</option>
                      </select>
                      {/* Tambahan pilihan bank dan e-wallet */}
                      {paymentMethod === 'transfer' && (
                        <select className="w-full mb-4 p-2 border rounded">
                          <option value="">-- Pilih Bank --</option>
                          <option value="bca">BCA</option>
                          <option value="bri">BRI</option>
                          <option value="mandiri">Mandiri</option>
                          <option value="bni">BNI</option>
                        </select>
                      )}
                      {paymentMethod === 'ewallet' && (
                        <select className="w-full mb-4 p-2 border rounded">
                          <option value="">-- Pilih E-Wallet --</option>
                          <option value="ovo">OVO</option>
                          <option value="dana">DANA</option>
                          <option value="gopay">GoPay</option>
                          <option value="shopeepay">ShopeePay</option>
                        </select>
                      )}
                      {paymentMethod === 'kartu' && (
                        <select className="w-full mb-4 p-2 border rounded">
                          <option value="">-- Pilih Jenis Kartu --</option>
                          <option value="visa">Visa</option>
                          <option value="mastercard">MasterCard</option>
                          <option value="jcb">JCB</option>
                        </select>
                      )}
                      {paymentMethod === 'alfamart' && (
                        <select className="w-full mb-4 p-2 border rounded">
                          <option value="">-- Pilih Gerai --</option>
                          <option value="alfamart">Alfamart</option>
                          <option value="indomaret">Indomaret</option>
                        </select>
                      )}
                      <button
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 shadow"
                        onClick={handlePayment}
                        disabled={!paymentMethod}
                      >
                        Bayar
                      </button>
                      {paymentSuccess && (
                        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center animate__animated animate__fadeInUp">
                          <lottie-player src='https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json' background='transparent' speed='1' style={{width:'60px',height:'60px',margin:'0 auto'}} loop autoplay></lottie-player>
                          Pembayaran berhasil! Terima kasih sudah berbelanja.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center">
                <div className="bg-blue-100 p-6 rounded-full mb-4 shadow-lg">
                  <lottie-player src='https://assets2.lottiefiles.com/packages/lf20_3vbOcw.json' background='transparent' speed='1' style={{width:'80px',height:'80px',margin:'0 auto'}} loop autoplay></lottie-player>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Keranjang Belanja Kosong</h3>
                <p className="text-gray-600 mb-6">Tambahkan produk ke keranjang Anda</p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/products');
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all"
                >
                  Belanja Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartSetelahLogin;