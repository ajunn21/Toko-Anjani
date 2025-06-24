import { motion } from 'framer-motion';
import { Package, Clock, Check, Truck, X, AlertCircle, UploadCloud, Image as ImageIcon, Star } from 'react-feather';
import FooterSetelahLogin from "./footers/FooterSetelahLogin";
import { useEffect, useState, useRef } from 'react';

const PesananSaya = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [notif, setNotif] = useState('');
  const [uploadingOrderId, setUploadingOrderId] = useState(null);
  const fileInputRef = useRef(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingOrderId, setRatingOrderId] = useState(null);
  const [productRatings, setProductRatings] = useState({});
  const [storeRating, setStoreRating] = useState(0);
  const [storeRatingGiven, setStoreRatingGiven] = useState(false);
  const [productComments, setProductComments] = useState({});
  const [storeComment, setStoreComment] = useState('');

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    // Filter hanya pesanan milik user yang sedang login
    const userOrders = user?.email
      ? storedOrders.filter(order => order.userEmail === user.email)
      : [];
    setOrders(userOrders);
  }, [user]);

  // Cek jika ada pesanan yang baru saja selesai dan belum dirating
  useEffect(() => {
    // Cari order yang baru saja completed dan belum dirating (cek localStorage)
    const completedOrder = orders.find(
      o => o.status === 'completed' && !o.rated
    );
    if (completedOrder) {
      setRatingOrderId(completedOrder.id);
      setShowRatingModal(true);
      // Siapkan rating produk default
      const ratings = {};
      const comments = {};
      completedOrder.items.forEach(item => {
        ratings[item.id] = 0;
        comments[item.id] = '';
      });
      setProductRatings(ratings);
      setProductComments(comments);
      setStoreRating(0);
      setStoreComment('');
      setStoreRatingGiven(false);
    }
  }, [orders]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'waiting_confirmation': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <Check size={16} className="mr-1" />;
      case 'shipped': return <Truck size={16} className="mr-1" />;
      case 'processing': return <Clock size={16} className="mr-1" />;
      case 'waiting_confirmation': return <AlertCircle size={16} className="mr-1" />;
      case 'cancelled': return <X size={16} className="mr-1" />;
      default: return <Clock size={16} className="mr-1" />;
    }
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    );
    setOrders(updatedOrders);
    // Update orders in localStorage (all orders, not just user)
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newAllOrders = allOrders.map(order =>
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    );
    localStorage.setItem('orders', JSON.stringify(newAllOrders));
    setNotif('Pesanan berhasil dibatalkan.');
    setTimeout(() => setNotif(''), 2000);
  };

  const handleUploadClick = (orderId) => {
    setUploadingOrderId(orderId);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e, orderId) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      // Simpan base64 ke order
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, buktiTransfer: ev.target.result } : order
      );
      setOrders(updatedOrders);
      // Update orders in localStorage (all orders, not just user)
      const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
      const newAllOrders = allOrders.map(order =>
        order.id === orderId ? { ...order, buktiTransfer: ev.target.result } : order
      );
      localStorage.setItem('orders', JSON.stringify(newAllOrders));
      setNotif('Bukti transfer berhasil diupload.');
      setTimeout(() => setNotif(''), 2000);
    };
    reader.readAsDataURL(file);
    setUploadingOrderId(null);
  };

  const handleOrderArrived = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: 'completed' } : order
    );
    setOrders(updatedOrders);
    // Update orders in localStorage (all orders, not just user)
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newAllOrders = allOrders.map(order =>
      order.id === orderId ? { ...order, status: 'completed' } : order
    );
    localStorage.setItem('orders', JSON.stringify(newAllOrders));
    setNotif('Pesanan telah selesai. Terima kasih!');
    setTimeout(() => setNotif(''), 2000);
  };

  // Handler rating produk
  const handleProductRating = (productId, value) => {
    setProductRatings(prev => ({ ...prev, [productId]: value }));
  };

  // Handler rating toko
  const handleStoreRating = (value) => {
    setStoreRating(value);
  };

  // Handler komentar produk
  const handleProductComment = (productId, value) => {
    setProductComments(prev => ({ ...prev, [productId]: value }));
  };

  // Handler komentar toko
  const handleStoreComment = (value) => {
    setStoreComment(value);
  };

  // Simpan rating produk dan toko
  const handleSubmitRatings = () => {
    // Simpan rating produk ke localStorage
    const allProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = allProducts.map(p => {
      if (productRatings[p.id]) {
        let ratings = p.ratings || [];
        // Update rating user jika sudah pernah rating produk ini
        const existing = ratings.find(r => r.userEmail === user.email);
        if (existing) {
          ratings = ratings.map(r =>
            r.userEmail === user.email
              ? { ...r, value: productRatings[p.id], comment: productComments[p.id] }
              : r
          );
        } else {
          ratings = [...ratings, { userEmail: user.email, value: productRatings[p.id], comment: productComments[p.id] }];
        }
        return { ...p, ratings };
      }
      return p;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Simpan rating toko ke localStorage
    if (storeRating > 0) {
      const storeRatings = JSON.parse(localStorage.getItem('storeRatings')) || [];
      // Satu user hanya satu rating toko, update jika sudah ada
      const filtered = storeRatings.filter(r => r.userEmail !== user.email);
      filtered.push({
        userEmail: user.email,
        value: storeRating,
        comment: storeComment,
        avatar: user.avatar || null, // simpan avatar user
        name: user.name || '' // simpan nama user
      });
      localStorage.setItem('storeRatings', JSON.stringify(filtered));
      setStoreRatingGiven(true);
    }

    // Tandai order sudah dirating
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = allOrders.map(order =>
      order.id === ratingOrderId ? { ...order, rated: true } : order
    );
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(orders.map(order =>
      order.id === ratingOrderId ? { ...order, rated: true } : order
    ));

    setShowRatingModal(false);
    setRatingOrderId(null);
    setNotif('Terima kasih atas rating Anda!');
    setTimeout(() => setNotif(''), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow container mx-auto px-4 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Pesanan Saya</h1>
          {notif && (
            <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded flex items-center">
              <Check size={18} className="mr-2" />
              {notif}
            </div>
          )}
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
              Belum ada pesanan. Silakan belanja dan lakukan pembayaran untuk melihat pesanan Anda di sini.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                        <p className="text-gray-500 text-sm">{order.date}</p>
                      </div>
                      <div className={`mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status === 'completed' && 'Selesai'}
                        {order.status === 'shipped' && 'Dikirim'}
                        {order.status === 'processing' && 'Diproses'}
                        {order.status === 'waiting_confirmation' && 'Menunggu Konfirmasi Admin'}
                        {order.status === 'cancelled' && 'Dibatalkan'}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between py-2">
                          <div className="flex items-center">
                            <Package size={16} className="text-gray-400 mr-2" />
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                          </div>
                          <span>Rp{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}

                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between py-1">
                          <span className="text-gray-600">Pengiriman</span>
                          <span>{order.delivery}</span>
                        </div>
                        <div className="flex justify-between py-1 font-medium">
                          <span>Total</span>
                          <span className={
                            order.status === 'completed' ? 'text-blue-600' :
                            order.status === 'shipped' ? 'text-blue-500' :
                            order.status === 'processing' ? 'text-yellow-500' :
                            order.status === 'waiting_confirmation' ? 'text-orange-500' :
                            order.status === 'cancelled' ? 'text-red-500' : 'text-gray-800'
                          }>
                            Rp{order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bukti Transfer */}
                    {order.delivery !== 'COD' && (
                      <div className="mt-6">
                        <div className="font-semibold mb-2 flex items-center">
                          <UploadCloud size={18} className="mr-2" />
                          Bukti Transfer
                        </div>
                        {order.buktiTransfer ? (
                          <div className="flex items-center space-x-4">
                            <img
                              src={order.buktiTransfer}
                              alt="Bukti Transfer"
                              className="w-32 h-32 object-contain border rounded shadow"
                            />
                            <span className="text-green-600 font-medium flex items-center">
                              <Check size={16} className="mr-1" /> Sudah diupload
                            </span>
                          </div>
                        ) : (
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                              onChange={e => handleFileChange(e, order.id)}
                            />
                            <button
                              onClick={() => handleUploadClick(order.id)}
                              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                              disabled={uploadingOrderId === order.id}
                            >
                              <ImageIcon size={16} className="mr-2" />
                              Upload Bukti Transfer
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Tombol Batalkan Pesanan & Pesanan Diterima berdampingan */}
                    <div className="mt-6 flex justify-end space-x-3">
                      {(order.status === 'waiting_confirmation' || order.status === 'processing') && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                        >
                          <X size={16} className="mr-2" />
                          Batalkan Pesanan
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <>
                          <button
                            onClick={() => handleOrderArrived(order.id)}
                            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                          >
                            <Check size={16} className="mr-2" />
                            Pesanan Diterima
                          </button>
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                          >
                            <X size={16} className="mr-2" />
                            Batalkan Pesanan
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        {/* Modal Rating Produk & Toko */}
        {showRatingModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full relative">
              <h2 className="text-xl font-bold mb-4 text-blue-700">Beri Rating Pesanan & Toko</h2>
              <div className="mb-6">
                <div className="mb-2 font-semibold text-gray-700">Rating Produk:</div>
                {orders.find(o => o.id === ratingOrderId)?.items.map(item => (
                  <div key={item.id} className="mb-4">
                    <div className="flex items-center mb-1">
                      <span className="mr-2 text-gray-700">{item.name}</span>
                      {[1,2,3,4,5].map(val => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleProductRating(item.id, val)}
                          className="focus:outline-none"
                        >
                          <Star
                            size={22}
                            className={productRatings[item.id] >= val ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                          />
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="w-full border rounded p-2 text-sm mt-1"
                      placeholder="Tulis komentar untuk produk ini (opsional)"
                      value={productComments[item.id]}
                      onChange={e => handleProductComment(item.id, e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
              </div>
              <div className="mb-6">
                <div className="mb-2 font-semibold text-gray-700">Rating Toko:</div>
                <div className="flex items-center mb-2">
                  {[1,2,3,4,5].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => handleStoreRating(val)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={26}
                        className={storeRating >= val ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    </button>
                  ))}
                  {storeRating > 0 && (
                    <span className="ml-3 text-blue-600 font-semibold">{storeRating} / 5</span>
                  )}
                </div>
                <textarea
                  className="w-full border rounded p-2 text-sm"
                  placeholder="Tulis komentar untuk toko (opsional)"
                  value={storeComment}
                  onChange={e => handleStoreComment(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => setShowRatingModal(false)}
                >
                  Nanti Saja
                </button>
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                  onClick={handleSubmitRatings}
                  disabled={
                    Object.values(productRatings).some(v => v === 0) || storeRating === 0
                  }
                >
                  Kirim Rating
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.main>
      <FooterSetelahLogin />
    </div>
  );
};

export default PesananSaya;