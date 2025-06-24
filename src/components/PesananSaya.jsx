import { motion } from 'framer-motion';
import { Package, Clock, Check, Truck, X, AlertCircle, UploadCloud, Image as ImageIcon } from 'react-feather';
import FooterSetelahLogin from "./footers/FooterSetelahLogin";
import { useEffect, useState, useRef } from 'react';

const PesananSaya = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [notif, setNotif] = useState('');
  const [uploadingOrderId, setUploadingOrderId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    // Filter hanya pesanan milik user yang sedang login
    const userOrders = user?.email
      ? storedOrders.filter(order => order.userEmail === user.email)
      : [];
    setOrders(userOrders);
  }, [user]);

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
      </motion.main>
      <FooterSetelahLogin />
    </div>
  );
};

export default PesananSaya;