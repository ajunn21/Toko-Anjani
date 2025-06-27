import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'react-feather';
import { useState } from 'react';

const CartSetelahLogin = ({ onClose, user, setUser, navigate }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("JNE Reguler");
  const [showBarcode, setShowBarcode] = useState(false);

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
    // Simpan order ke localStorage
    const order = {
      id: 'ORD-' + Date.now(),
      date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'waiting_confirmation',
      items: user.cartItems,
      total: calculateTotal(user.cartItems),
      delivery: deliveryMethod,
      userEmail: user.email,
      paymentMethod: paymentMethod
    };
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (user.cartItems && user.cartItems.length > 0) {
      localStorage.setItem('orders', JSON.stringify([order, ...orders]));
    }
    setTimeout(() => {
      setUser({ ...user, cartItems: [] });
      setShowPayment(false);
      setPaymentMethod("");
      setShowBarcode(false);
      setTimeout(() => setPaymentSuccess(false), 1500);
    }, 1200);
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 40 }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center"
        onClick={e => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate__animated animate__fadeInDown relative"
        >
          <div className="p-6 flex flex-col min-h-[60vh]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-800">Keranjang Belanja</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Tutup keranjang"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex-grow">
              {user?.cartItems?.length > 0 ? (
                <>
                  {/* Cart items list */}
                  <div className="space-y-4 max-h-60 overflow-y-auto mb-4">
                    {user.cartItems.map(item => (
                      <div key={item.id} className="flex items-center py-3 border-b">
                        <div className="w-16 h-16 bg-blue-100 rounded mr-4 flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                          ) : (
                            <ShoppingBag size={24} className="text-blue-400" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-blue-600 font-bold">Rp {item.price.toLocaleString()} <span className='text-xs text-gray-500'>({item.unit || 'pcs'})</span></p>
                          <div className="flex items-center mt-2">
                            <button
                              className="w-8 h-8 border border-gray-300 rounded-l hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >-</button>
                            <span className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                              {item.quantity}
                            </span>
                            <button
                              className="w-8 h-8 border border-gray-300 rounded-r hover:bg-gray-100"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >+</button>
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
                  <div className="bg-blue-50 rounded-xl p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">Rp {calculateSubtotal(user.cartItems).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Ongkir</span>
                      <span className="font-medium">Rp 10.000</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mb-2">
                      <span>Total</span>
                      <span className="text-blue-600">Rp {calculateTotal(user.cartItems).toLocaleString()}</span>
                    </div>
                  </div>
                  {/* Payment Step */}
                  {!showPayment ? (
                    <button
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 transition-all mb-2"
                      onClick={() => setShowPayment(true)}
                    >
                      Lanjut ke Pembayaran
                    </button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl p-4 border mt-2"
                    >
                      <h4 className="font-semibold mb-2 text-blue-700">Pilih Metode Pengiriman</h4>
                      <select
                        className="w-full mb-4 p-2 border rounded"
                        value={deliveryMethod}
                        onChange={e => setDeliveryMethod(e.target.value)}
                      >
                        <option value="JNE Reguler">JNE Reguler</option>
                        <option value="J&T Express">J&T Express</option>
                        <option value="Gojek">Gojek</option>
                        <option value="Grab">Grab</option>
                      </select>
                      <h4 className="font-semibold mb-2 text-blue-700">Pilih Metode Pembayaran</h4>
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
                      {/* QRIS barcode */}
                      {paymentMethod === 'qris' && (
                        <div className="mb-4 flex flex-col items-center">
                          <div className="font-semibold mb-2">Scan QRIS untuk Pembayaran</div>
                          <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=TokoAnjani-QRIS"
                            alt="QRIS Pembayaran"
                            className="w-40 h-40 bg-white border rounded shadow mb-2"
                            onClick={() => setShowBarcode(true)}
                            style={{ cursor: 'pointer' }}
                          />
                          <div className="text-xs text-gray-500">Klik gambar untuk memperbesar. Scan QRIS ini dengan aplikasi pembayaran Anda.</div>
                        </div>
                      )}
                      <div className="flex gap-2 mt-2">
                        <button
                          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 shadow"
                          onClick={() => setShowPayment(false)}
                        >
                          Kembali
                        </button>
                        <button
                          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 shadow"
                          onClick={() => {
                            if (paymentMethod === 'qris') {
                              setShowBarcode(true);
                              setTimeout(() => handlePayment(), 1200);
                            } else {
                              handlePayment();
                            }
                          }}
                          disabled={!paymentMethod}
                        >
                          Bayar
                        </button>
                      </div>
                      {/* QRIS modal jika ingin tampilkan lebih besar */}
                      {showBarcode && paymentMethod === 'qris' && (
                        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center" onClick={() => setShowBarcode(false)}>
                          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center relative">
                            <button
                              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                              onClick={() => setShowBarcode(false)}
                            >
                              <X size={24} />
                            </button>
                            <img
                              src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TokoAnjani-QRIS"
                              alt="QRIS Pembayaran"
                              className="w-60 h-60 bg-white border rounded shadow"
                            />
                            <div className="mt-2 text-gray-700 text-sm">Scan QRIS ini untuk membayar</div>
                          </div>
                        </div>
                      )}
                      {paymentSuccess && (
                        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded text-center animate__animated animate__fadeInUp">
                          <lottie-player src='https://assets2.lottiefiles.com/packages/lf20_jbrw3hcz.json' background='transparent' speed='1' style={{width:'60px',height:'60px',margin:'0 auto'}} loop autoplay></lottie-player>
                          Pembayaran berhasil! Terima kasih sudah berbelanja.
                        </div>
                      )}
                    </motion.div>
                  )}
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
    </AnimatePresence>
  );
};

export default CartSetelahLogin;