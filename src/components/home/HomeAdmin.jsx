// Halaman dashboard admin sederhana
import { Users, ShoppingCart, LogOut, Package, Star, Check, AlertCircle, Image as ImageIcon, Trash2, Plus, Edit2, X } from 'react-feather';
import { useEffect, useState } from 'react';

const defaultProducts = [
  { id: 1, name: 'Indomie Goreng', price: 3800, discount: 3500, stock: 10, category: 'Sembako', unit: 'pcs' },
  { id: 2, name: 'Aqua Gelas', price: 29500, discount: 27500, stock: 50, category: 'Minuman', unit: 'dus' },
  // ...tambahkan produk default lain jika perlu...
];

const kategoriList = [
  "Sembako", "Minuman", "Snack", "Perlengkapan Rumah", "Kopi & Teh", "Susu", "Roti & Biskuit", "Bumbu & Penyedap", "Lainnya"
];
const unitList = ["pcs", "dus", "pak", "kg", "liter", "box"];
const diskonList = [
  { label: "Tidak Ada Diskon", value: "" },
  { label: "Diskon 5%", value: 0.05 },
  { label: "Diskon 10%", value: 0.10 },
  { label: "Diskon 15%", value: 0.15 },
  { label: "Diskon 20%", value: 0.20 },
  { label: "Diskon 25%", value: 0.25 },
  { label: "Diskon 30%", value: 0.30 },
  { label: "Diskon 35%", value: 0.35 },
  { label: "Diskon 40%", value: 0.40 },
  { label: "Diskon 45%", value: 0.45 },
  { label: "Diskon 50%", value: 0.50 },
  { label: "Diskon 55%", value: 0.55 },
  { label: "Diskon 60%", value: 0.60 },
  { label: "Diskon 65%", value: 0.65 },
  { label: "Diskon 70%", value: 0.70 },
  { label: "Diskon 75%", value: 0.75 },
  { label: "Diskon 80%", value: 0.80 },
  { label: "Diskon 85%", value: 0.85 },
  { label: "Diskon 90%", value: 0.90 },
  { label: "Diskon 95%", value: 0.95 },
  { label: "Diskon 100%", value: 1.00 }
];

const formatNumber = (value) => {
  if (!value) return '';
  // Remove non-digit
  const num = value.toString().replace(/\D/g, '');
  if (!num) return '';
  return Number(num).toLocaleString('id-ID');
};

const HomeAdmin = ({ user, onLogout }) => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', discount: '', stock: '', category: '', unit: '', image: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [editStock, setEditStock] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [editFields, setEditFields] = useState({});
  const [productImageFile, setProductImageFile] = useState(null);

  // Notifikasi
  const [notif, setNotif] = useState('');
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifType, setNotifType] = useState('success'); // 'success' | 'error'

  // Hanya satu fitur yang tampil: users, orders, atau products
  const [activeSection, setActiveSection] = useState(null);

  // Modal bukti transfer
  const [showBuktiModal, setShowBuktiModal] = useState(false);
  const [buktiImage, setBuktiImage] = useState(null);

  // Tambahkan state untuk tab pesanan
  const [orderTab, setOrderTab] = useState('orders');
  // Tambahkan state untuk tab testimoni
  const [testimoniTab, setTestimoniTab] = useState('store');
  const [storeRatings, setStoreRatings] = useState([]);
  const [productRatings, setProductRatings] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    setUserCount(usersData.length);
    setUsers(usersData);
    const ordersData = JSON.parse(localStorage.getItem('orders')) || [];
    setOrderCount(ordersData.length);
    setOrders(ordersData);

    // Hanya isi default jika localStorage belum pernah ada key 'products'
    let productsData = localStorage.getItem('products');
    if (productsData === null) {
      productsData = defaultProducts;
      localStorage.setItem('products', JSON.stringify(productsData));
    } else {
      productsData = JSON.parse(productsData);
    }
    setProducts(productsData);

    // Ambil testimoni toko
    const storeRatingsData = JSON.parse(localStorage.getItem('storeRatings')) || [];
    setStoreRatings(storeRatingsData);

    // Ambil semua produk dan rating produk
    const productsDataAll = JSON.parse(localStorage.getItem('products')) || [];
    setAllProducts(productsDataAll);
    // Flatten semua rating produk
    let ratings = [];
    productsDataAll.forEach(p => {
      if (Array.isArray(p.ratings)) {
        p.ratings.forEach(r => {
          ratings.push({
            ...r,
            productId: p.id,
            productName: p.name
          });
        });
      }
    });
    setProductRatings(ratings);
  }, []);

  // Tambah notifikasi setelah aksi
  const showNotif = (msg, type = 'success') => {
    setNotif(msg);
    setNotifType(type);
    setShowNotifModal(true);
  };

  // Konfirmasi pesanan oleh admin
  const handleConfirmOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId && order.status === 'waiting_confirmation'
        ? { ...order, status: 'processing' }
        : order
    );
    setOrders(updatedOrders);
    setOrderCount(updatedOrders.length);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    showNotif('Pesanan berhasil dikonfirmasi!', 'success');
  };

  // Hapus user
  const handleDeleteUser = (email) => {
    if (!window.confirm('Yakin ingin menghapus user ini?')) return;
    const updatedUsers = users.filter(u => u.email !== email);
    setUsers(updatedUsers);
    setUserCount(updatedUsers.length);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    showNotif('User berhasil dihapus!', 'success');
    // Optional: Jika ingin hapus pesanan user juga, uncomment berikut:
    // const updatedOrders = orders.filter(order => order.userEmail !== email);
    // setOrders(updatedOrders);
    // setOrderCount(updatedOrders.length);
    // localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  // Fungsi handle upload gambar produk
  const handleProductImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      setNewProduct(prev => ({ ...prev, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // Tambah produk baru
  const handleAddProduct = (e) => {
    e.preventDefault();
    // Validasi field kosong
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.category ||
      !newProduct.unit
    ) {
      showNotif('Semua field produk harus diisi!', 'error');
      return;
    }
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    let discountValue = null;
    if (newProduct.discount && !isNaN(Number(newProduct.discount))) {
      discountValue = Number(newProduct.price) - (Number(newProduct.price) * Number(newProduct.discount));
    }
    const product = {
      ...newProduct,
      id: newId,
      price: Number(newProduct.price),
      discount: discountValue,
      stock: Number(newProduct.stock)
    };
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setNewProduct({ name: '', price: '', discount: '', stock: '', category: '', unit: '', image: '' });
    showNotif('Produk berhasil ditambahkan!', 'success');
  };

  // Hapus produk
  const handleDeleteProduct = (id) => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return;
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    showNotif('Produk berhasil dihapus!', 'success');
  };

  // Edit stok produk
  const handleEditStock = (id) => {
    const updatedProducts = products.map(p =>
      p.id === id ? { ...p, stock: Number(editStock) } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditProductId(null);
    setEditStock('');
  };

  // Edit produk (semua field)
  const handleEditProduct = (product) => {
    setEditProduct(product.id);
    setEditFields({
      name: product.name,
      price: product.price,
      discount: product.discount || '',
      stock: product.stock,
      category: product.category,
      unit: product.unit,
      image: product.image || ''
    });
  };

  // Tambahkan handler untuk upload gambar saat edit
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      setEditFields(prev => ({ ...prev, image: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleEditFieldChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleSaveEditProduct = (id) => {
    // Validasi sederhana
    if (
      !editFields.name ||
      !editFields.price ||
      !editFields.stock ||
      !editFields.category ||
      !editFields.unit
    ) {
      showNotif('Semua field harus diisi!', 'error');
      return;
    }
    const updatedProducts = products.map(p =>
      p.id === id
        ? {
            ...p,
            name: editFields.name,
            price: Number(editFields.price),
            discount: editFields.discount ? Number(editFields.discount) : null,
            stock: Number(editFields.stock),
            category: editFields.category,
            unit: editFields.unit,
            image: editFields.image // update image jika ada perubahan
          }
        : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setEditProduct(null);
    setEditFields({});
    showNotif('Produk berhasil diupdate!', 'success');
  };

  const handleCancelEditProduct = () => {
    setEditProduct(null);
    setEditFields({});
  };

  // Fungsi untuk mengubah status pesanan dari admin
  const handleChangeOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setOrderCount(updatedOrders.length);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    showNotif('Status pesanan berhasil diubah!', 'success');
  };

  // Fungsi hapus pesanan
  const handleDeleteOrder = (orderId) => {
    if (!window.confirm('Yakin ingin menghapus pesanan ini?')) return;
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    setOrderCount(updatedOrders.length);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    showNotif('Pesanan berhasil dihapus!', 'success');
  };

  // Hapus testimoni toko
  const handleDeleteStoreRating = (userEmail) => {
    if (!window.confirm('Yakin ingin menghapus testimoni ini?')) return;
    const updated = storeRatings.filter(r => r.userEmail !== userEmail);
    setStoreRatings(updated);
    localStorage.setItem('storeRatings', JSON.stringify(updated));
    showNotif('Testimoni berhasil dihapus!', 'success');
  };

  // Hapus rating produk
  const handleDeleteProductRating = (productId, userEmail) => {
    if (!window.confirm('Yakin ingin menghapus rating produk ini?')) return;
    // Update di localStorage products
    const updatedProducts = allProducts.map(p => {
      if (p.id === productId && Array.isArray(p.ratings)) {
        return { ...p, ratings: p.ratings.filter(r => r.userEmail !== userEmail) };
      }
      return p;
    });
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    showNotif('Rating produk berhasil dihapus!', 'success');
  };

  const getDiskonLabel = (discount, price) => {
    if (!discount || !price) return "-";
    const percent = Math.round((1 - discount / price) * 100);
    if (percent > 0 && percent < 100) {
      return `Rp${discount.toLocaleString()} (${percent}% OFF)`;
    }
    return `Rp${discount.toLocaleString()}`;
  };

  // Handler khusus untuk input harga agar auto-format
  const handlePriceInput = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setNewProduct({ ...newProduct, price: raw });
  };
  // Handler khusus untuk edit harga agar auto-format
  const handleEditPriceInput = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    setEditFields({ ...editFields, price: raw });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-50 to-orange-50">
      {/* Notifikasi Modal */}
      {showNotifModal && notif && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className={`bg-white px-8 py-6 rounded-xl shadow-2xl flex flex-col items-center space-y-4 animate__animated animate__fadeInDown min-w-[280px] border-2
            ${notifType === 'success' ? 'border-green-400' : 'border-red-400'}`}>
            <span className={notifType === 'success' ? "text-green-600" : "text-red-600"}>
              {notifType === 'success' ? <Check size={28} /> : <X size={28} />}
            </span>
            <span className={`text-lg font-semibold text-center ${notifType === 'success' ? 'text-green-700' : 'text-red-700'}`}>{notif}</span>
            <button
              className={`mt-2 px-6 py-2 rounded-lg font-semibold shadow hover:opacity-90 transition
                ${notifType === 'success' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
              onClick={() => {
                setShowNotifModal(false);
                setNotif('');
              }}
              autoFocus
            >
              OK
            </button>
          </div>
        </div>
      )}
      <header className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-2xl">
        <div className="text-2xl font-bold tracking-wide drop-shadow-lg">Admin Dashboard</div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold">{user?.name || 'Admin'}</span>
          <button
            onClick={onLogout}
            className="flex items-center px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg font-semibold"
          >
            <LogOut size={16} className="mr-1" />
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-10">
        <h1 className="text-3xl font-bold mb-10 text-blue-800 drop-shadow">Selamat Datang, Admin!</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Card Total User */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4 cursor-pointer hover:bg-blue-100 transition ring-1 ring-blue-100 border border-blue-200 hover:scale-105 duration-200 ${activeSection === 'users' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setActiveSection(activeSection === 'users' ? null : 'users')}
            title="Klik untuk lihat daftar user"
          >
            <Users size={40} className="text-blue-500 drop-shadow" />
            <div>
              <div className="text-3xl font-bold">{userCount}</div>
              <div className="text-gray-600 font-medium">Total User</div>
            </div>
          </div>
          {/* Card Total Pesanan */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4 cursor-pointer hover:bg-green-100 transition ring-1 ring-green-100 border border-green-200 hover:scale-105 duration-200 ${activeSection === 'orders' ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => setActiveSection(activeSection === 'orders' ? null : 'orders')}
            title="Klik untuk lihat daftar pesanan"
          >
            <ShoppingCart size={40} className="text-green-500 drop-shadow" />
            <div>
              <div className="text-3xl font-bold flex items-center">
                {orders.filter(order => order.status !== 'completed' && order.status !== 'cancelled').length}
                <span className="mx-2 text-gray-400 font-normal">|</span>
                {orders.filter(order => order.status === 'completed' || order.status === 'cancelled').length}
              </div>
              <div className="text-gray-600 font-medium">Aktif | Riwayat</div>
            </div>
          </div>
          {/* Card Produk */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4 cursor-pointer hover:bg-yellow-100 transition ring-1 ring-yellow-100 border border-yellow-200 hover:scale-105 duration-200 ${activeSection === 'products' ? 'ring-2 ring-yellow-400' : ''}`}
            onClick={() => setActiveSection(activeSection === 'products' ? null : 'products')}
            title="Klik untuk lihat/kelola produk"
          >
            <Package size={40} className="text-yellow-500 drop-shadow" />
            <div>
              <div className="text-3xl font-bold">{products.length}</div>
              <div className="text-gray-600 font-medium">Produk</div>
            </div>
          </div>
          {/* Card Testimoni */}
          <div
            className={`bg-white rounded-2xl shadow-xl p-8 flex items-center space-x-4 cursor-pointer hover:bg-pink-100 transition ring-1 ring-pink-100 border border-pink-200 hover:scale-105 duration-200 ${activeSection === 'testimoni' ? 'ring-2 ring-pink-400' : ''}`}
            onClick={() => setActiveSection(activeSection === 'testimoni' ? null : 'testimoni')}
            title="Klik untuk lihat/kelola testimoni"
          >
            <Star size={40} className="text-pink-500 drop-shadow" />
            <div>
              <div className="text-3xl font-bold">{storeRatings.length + productRatings.length}</div>
              <div className="text-gray-600 font-medium">Testimoni</div>
            </div>
          </div>
        </div>

        {/* Tombol navigasi section pesanan */}
        {activeSection === 'orders' && (
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded font-semibold ${orderTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setOrderTab('orders')}
            >
              Semua Pesanan
            </button>
            <button
              className={`px-4 py-2 rounded font-semibold ${orderTab === 'history' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setOrderTab('history')}
            >
              Riwayat Pesanan
            </button>
          </div>
        )}

        {/* Daftar Semua Pesanan (tab) */}
        {activeSection === 'orders' && orderTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Semua Pesanan</h2>
            {orders.filter(order => order.status !== 'completed' && order.status !== 'cancelled').length === 0 ? (
              <div className="text-gray-500">Tidak ada pesanan aktif.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="py-2 px-4 text-left font-semibold">Order ID</th>
                      <th className="py-2 px-4 text-left font-semibold">User</th>
                      <th className="py-2 px-4 text-left font-semibold">Tanggal</th>
                      <th className="py-2 px-4 text-left font-semibold">Produk</th>
                      <th className="py-2 px-4 text-left font-semibold">Total</th>
                      <th className="py-2 px-4 text-left font-semibold">Status</th>
                      <th className="py-2 px-4 text-left font-semibold">Bukti Transfer</th>
                      <th className="py-2 px-4 text-left font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(order => order.status !== 'completed' && order.status !== 'cancelled').map((order) => (
                      <tr key={order.id} className="border-b align-top">
                        <td className="py-2 px-4">{order.id}</td>
                        <td className="py-2 px-4">{order.userEmail || '-'}</td>
                        <td className="py-2 px-4">{order.date}</td>
                        <td className="py-2 px-4">
                          <ul className="list-disc ml-4">
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-2 px-4">Rp{order.total.toLocaleString()}</td>
                        <td className="py-2 px-4 capitalize">
                          <select
                            className="border rounded px-2 py-1 text-xs"
                            value={order.status}
                            onChange={e => handleChangeOrderStatus(order.id, e.target.value)}
                          >
                            <option value="waiting_confirmation">Menunggu Konfirmasi</option>
                            <option value="processing">Diproses</option>
                            <option value="shipped">Dikirim</option>
                            <option value="completed">Selesai</option>
                            <option value="cancelled">Dibatalkan</option>
                          </select>
                        </td>
                        <td className="py-2 px-4">
                          {order.delivery !== 'COD' ? (
                            order.buktiTransfer ? (
                              <>
                                <img
                                  src={order.buktiTransfer}
                                  alt="Bukti Transfer"
                                  className="w-20 h-20 object-contain border rounded shadow cursor-pointer"
                                  onClick={() => {
                                    setBuktiImage(order.buktiTransfer);
                                    setShowBuktiModal(true);
                                  }}
                                />
                              </>
                            ) : (
                              <span className="text-red-500 text-xs">Belum diupload</span>
                            )
                          ) : (
                            <span className="text-gray-400 text-xs">COD</span>
                          )}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            onClick={() => handleDeleteOrder(order.id)}
                            title="Hapus Pesanan"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Riwayat Pesanan (tab) */}
        {activeSection === 'orders' && orderTab === 'history' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
            <h2 className="text-xl font-bold mb-4 text-green-700">Riwayat Pesanan</h2>
            {orders.filter(order => order.status === 'completed' || order.status === 'cancelled').length === 0 ? (
              <div className="text-gray-500">Belum ada riwayat pesanan.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="py-2 px-4 text-left font-semibold">Order ID</th>
                      <th className="py-2 px-4 text-left font-semibold">User</th>
                      <th className="py-2 px-4 text-left font-semibold">Tanggal</th>
                      <th className="py-2 px-4 text-left font-semibold">Produk</th>
                      <th className="py-2 px-4 text-left font-semibold">Total</th>
                      <th className="py-2 px-4 text-left font-semibold">Status</th>
                      <th className="py-2 px-4 text-left font-semibold">Bukti Transfer</th>
                      <th className="py-2 px-4 text-left font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.filter(order => order.status === 'completed' || order.status === 'cancelled').map((order) => (
                      <tr key={order.id} className="border-b align-top">
                        <td className="py-2 px-4">{order.id}</td>
                        <td className="py-2 px-4">{order.userEmail || '-'}</td>
                        <td className="py-2 px-4">{order.date}</td>
                        <td className="py-2 px-4">
                          <ul className="list-disc ml-4">
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.name} × {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-2 px-4">Rp{order.total.toLocaleString()}</td>
                        <td className="py-2 px-4 capitalize">
                          {order.status === 'completed' && <span className="text-green-600 font-semibold">Selesai</span>}
                          {order.status === 'cancelled' && <span className="text-red-600 font-semibold">Dibatalkan</span>}
                        </td>
                        <td className="py-2 px-4">
                          {order.delivery !== 'COD' ? (
                            order.buktiTransfer ? (
                              <img
                                src={order.buktiTransfer}
                                alt="Bukti Transfer"
                                className="w-20 h-20 object-contain border rounded shadow cursor-pointer"
                                onClick={() => {
                                  setBuktiImage(order.buktiTransfer);
                                  setShowBuktiModal(true);
                                }}
                              />
                            ) : (
                              <span className="text-red-500 text-xs">Belum diupload</span>
                            )
                          ) : (
                            <span className="text-gray-400 text-xs">COD</span>
                          )}
                        </td>
                        <td className="py-2 px-4">
                          <button
                            className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            onClick={() => handleDeleteOrder(order.id)}
                            title="Hapus Pesanan"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Daftar User (toggle) */}
        {activeSection === 'users' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Daftar User</h2>
            {users.length === 0 ? (
              <div className="text-gray-500">Belum ada user terdaftar.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="py-2 px-4 text-left font-semibold">Foto</th>
                      <th className="py-2 px-4 text-left font-semibold">Nama</th>
                      <th className="py-2 px-4 text-left font-semibold">Email</th>
                      <th className="py-2 px-4 text-left font-semibold">No. Telepon</th>
                      <th className="py-2 px-4 text-left font-semibold">Alamat</th>
                      <th className="py-2 px-4 text-left font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, idx) => (
                      <tr key={idx} className="border-b">
                        {/* Foto profil */}
                        <td className="py-2 px-4">
                          {u.avatar && u.avatar.startsWith('data:') ? (
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-10 h-10 object-cover rounded-full border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                              {(u.name && u.name[0]) || (u.email && u.email[0])}
                            </div>
                          )}
                        </td>
                        <td className="py-2 px-4">{u.name}</td>
                        <td className="py-2 px-4">{u.email}</td>
                        <td className="py-2 px-4">{u.phone || '-'}</td>
                        <td className="py-2 px-4">{u.address || '-'}</td>
                        <td className="py-2 px-4">
                          <button
                            className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            onClick={() => handleDeleteUser(u.email)}
                            title="Hapus User"
                          >
                            <Trash2 size={16} className="mr-1" />
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Daftar Produk (toggle) */}
        {activeSection === 'products' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mt-6 border border-yellow-200">
            <h2 className="text-2xl font-bold mb-8 text-yellow-700 drop-shadow">Manajemen Produk</h2>
            {/* Form tambah produk */}
            <form
              className="mb-10 flex flex-col md:flex-row md:items-end gap-4 bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow"
              onSubmit={handleAddProduct}
            >
              <div className="flex flex-col gap-2 md:flex-row md:gap-4 flex-wrap w-full">
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Foto</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="border p-2 rounded bg-white"
                    title="Upload Foto Produk"
                    onChange={handleProductImageChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Nama</label>
                  <input className="border p-2 rounded bg-white" placeholder="Nama" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Harga</label>
                  <input
                    className="border p-2 rounded bg-white"
                    placeholder="Harga"
                    type="text"
                    value={formatNumber(newProduct.price)}
                    onChange={handlePriceInput}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Diskon</label>
                  <select
                    className="border p-2 rounded bg-white"
                    name="discount"
                    value={newProduct.discount}
                    onChange={e => setNewProduct({ ...newProduct, discount: e.target.value })}
                  >
                    {diskonList.map(opt => (
                      <option key={opt.label} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Stok</label>
                  <input
                    className="border p-2 rounded bg-white"
                    placeholder="Stok"
                    type="number"
                    value={newProduct.stock}
                    onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Kategori</label>
                  <select
                    className="border p-2 rounded bg-white"
                    name="category"
                    value={newProduct.category}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    <option value="">Pilih Kategori</option>
                    {kategoriList.map(k => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Unit</label>
                  <select
                    className="border p-2 rounded bg-white"
                    name="unit"
                    value={newProduct.unit}
                    onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })}
                  >
                    <option value="">Pilih Unit</option>
                    {unitList.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-white px-6 py-2 rounded-lg flex items-center hover:bg-yellow-600 shadow font-bold mt-4 md:mt-0"
              >
                <Plus size={18} className="mr-2" /> Tambah Produk
              </button>
            </form>
            {/* Tabel produk */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-yellow-200 rounded-xl overflow-hidden shadow">
                <thead>
                  <tr className="bg-yellow-100">
                    <th className="py-3 px-4 text-left font-bold text-yellow-800">Foto</th>
                    <th className="py-3 px-4 text-left font-bold text-yellow-800">Nama</th>
                    <th className="py-3 px-4 text-left font-bold text-yellow-800">Harga</th>
                    <th className="py-3 px-4 text-left font-bold text-yellow-800">Diskon</th>
                    <th className="py-3 px-4 text-left font-bold text-yellow-800">Stok</th>
                    <th className="py-3 px-4 text-left font-bold text-yellow-800">Kategori</th>
                    <th className="py-3 px-4 text-left font-bold text-yellow-800">Unit</th>
                    <th className="py-3 px-4 text-left font-bold text-yellow-800">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b hover:bg-yellow-50 transition">
                      {/* Kolom foto produk */}
                      <td className="py-2 px-4 text-center">
                        {editProduct === p.id ? (
                          <div className="flex flex-col items-center">
                            {editFields.image ? (
                              <img src={editFields.image} alt={editFields.name} className="w-16 h-16 object-cover rounded border mb-1 shadow" />
                            ) : (
                              <span className="text-gray-400 text-xs mb-1">Tidak ada foto</span>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="border p-1 rounded text-xs"
                              onChange={handleEditImageChange}
                            />
                          </div>
                        ) : (
                          p.image ? (
                            <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded border shadow mx-auto" />
                          ) : (
                            <span className="text-gray-400 text-xs">Tidak ada foto</span>
                          )
                        )}
                      </td>
                      {editProduct === p.id ? (
                        <>
                          <td className="py-2 px-4">
                            <input
                              name="name"
                              value={editFields.name}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-28 bg-yellow-50"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="price"
                              type="text"
                              value={formatNumber(editFields.price)}
                              onChange={handleEditPriceInput}
                              className="border p-1 rounded w-20 bg-yellow-50"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <select
                              name="discount"
                              value={editFields.discount}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-20 bg-yellow-50"
                            >
                              {diskonList.map(opt => (
                                <option key={opt.label} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="stock"
                              type="number"
                              value={editFields.stock}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-16 bg-yellow-50"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <select
                              name="category"
                              value={editFields.category}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-24 bg-yellow-50"
                            >
                              <option value="">Pilih Kategori</option>
                              {kategoriList.map(k => (
                                <option key={k} value={k}>{k}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-2 px-4">
                            <select
                              name="unit"
                              value={editFields.unit}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-16 bg-yellow-50"
                            >
                              <option value="">Pilih Unit</option>
                              {unitList.map(u => (
                                <option key={u} value={u}>{u}</option>
                              ))}
                            </select>
                          </td>
                          <td className="py-2 px-4 flex flex-col md:flex-row gap-2">
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 shadow font-semibold"
                              onClick={() => handleSaveEditProduct(p.id)}
                              type="button"
                            >
                              Simpan
                            </button>
                            <button
                              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-400 shadow font-semibold"
                              onClick={handleCancelEditProduct}
                              type="button"
                            >
                              Batal
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2 px-4 font-semibold">{p.name}</td>
                          <td className="py-2 px-4 text-blue-700 font-bold">Rp{p.price.toLocaleString()}</td>
                          <td className="py-2 px-4 text-green-700 font-bold">
                            {p.discount
                              ? getDiskonLabel(p.discount, p.price)
                              : '-'}
                          </td>
                          <td className="py-2 px-4">{p.stock}</td>
                          <td className="py-2 px-4">{p.category}</td>
                          <td className="py-2 px-4">{p.unit}</td>
                          <td className="py-2 px-4 flex flex-col md:flex-row gap-2">
                            <button
                              className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors shadow font-semibold"
                              onClick={() => handleEditProduct(p)}
                              type="button"
                              title="Edit Produk"
                            >
                              <Edit2 size={16} className="mr-1" />
                              Edit
                            </button>
                            <button
                              className="flex items-center px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow font-semibold"
                              onClick={() => handleDeleteProduct(p.id)}
                              type="button"
                              title="Hapus Produk"
                            >
                              <Trash2 size={16} className="mr-1" />
                              Hapus
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pesanan Menunggu Konfirmasi tetap tampil */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mt-16 border border-orange-200">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700 mr-3 drop-shadow">Pesanan Menunggu Konfirmasi</h2>
            {orders.filter(order => order.status === 'waiting_confirmation').length > 0 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                {orders.filter(order => order.status === 'waiting_confirmation').length}
              </span>
            )}
          </div>
          {orders.filter(order => order.status === 'waiting_confirmation').length === 0 ? (
            <div className="text-gray-500 italic">Tidak ada pesanan yang menunggu konfirmasi.</div>
          ) : (
            <div className="space-y-6">
              {orders.filter(order => order.status === 'waiting_confirmation').map(order => (
                <div key={order.id} className="border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between bg-orange-50 shadow hover:shadow-lg transition duration-200 border-orange-200">
                  <div>
                    <div className="flex items-center mb-2">
                      <AlertCircle size={20} className="text-orange-500 mr-2" />
                      <span className="font-semibold text-lg">Order #{order.id}</span>
                    </div>
                    <div className="text-gray-600 text-sm mb-1">Tanggal: <span className="font-semibold">{order.date}</span></div>
                    <div className="text-gray-600 text-sm mb-1">Total: <span className="font-bold text-orange-700">Rp{order.total.toLocaleString()}</span></div>
                    <div className="text-gray-600 text-sm mb-1">Email User: <span className="font-semibold">{order.userEmail || '-'}</span></div>
                    {/* Bukti Transfer */}
                    {order.delivery !== 'COD' && (
                      <div className="mt-2">
                        <div className="font-semibold mb-1 flex items-center">
                          <ImageIcon size={16} className="mr-2" />
                          Bukti Transfer:
                        </div>
                        {order.buktiTransfer ? (
                          <>
                            <img
                              src={order.buktiTransfer}
                              alt="Bukti Transfer"
                              className="w-32 h-32 object-contain border rounded shadow cursor-pointer"
                              onClick={() => {
                                setBuktiImage(order.buktiTransfer);
                                setShowBuktiModal(true);
                              }}
                            />
                            <div className="text-xs text-gray-500 mt-1">Klik gambar untuk perbesar</div>
                          </>
                        ) : (
                          <span className="text-red-500 text-sm">Belum diupload</span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0 md:ml-6">
                    <button
                      onClick={() => handleConfirmOrder(order.id)}
                      className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center shadow transition duration-150"
                    >
                      <Check size={18} className="mr-2" />
                      Konfirmasi Pesanan
                    </button>
                    <button
                      onClick={() => handleChangeOrderStatus(order.id, 'cancelled')}
                      className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 font-semibold flex items-center shadow transition duration-150"
                    >
                      <X size={18} className="mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tambahkan modal untuk menampilkan gambar bukti transfer */}
        {showBuktiModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center" onClick={() => setShowBuktiModal(false)}>
            <div className="bg-white rounded-xl shadow-lg p-4 max-w-lg w-full flex flex-col items-center relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                onClick={() => setShowBuktiModal(false)}
              >
                <X size={24} />
              </button>
              <img src={buktiImage} alt="Bukti Transfer" className="max-w-full max-h-[70vh] rounded shadow" />
              <div className="mt-2 text-gray-700 text-sm">Klik di luar gambar untuk menutup</div>
            </div>
          </div>
        )}

        {/* Testimoni & Rating Produk (toggle) */}
        {activeSection === 'testimoni' && (
          <div className="bg-white rounded-2xl shadow-2xl p-8 mt-6 border border-pink-200">
            <h2 className="text-2xl font-bold mb-8 text-pink-700 drop-shadow">Manajemen Testimoni & Rating</h2>
            {/* Tab switcher */}
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded font-semibold ${testimoniTab === 'store' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTestimoniTab('store')}
              >
                Testimoni Toko
              </button>
              <button
                className={`px-4 py-2 rounded font-semibold ${testimoniTab === 'produk' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setTestimoniTab('produk')}
              >
                Rating Produk
              </button>
            </div>
            {/* Testimoni Toko */}
            {testimoniTab === 'store' && (
              <div>
                {storeRatings.length === 0 ? (
                  <div className="text-gray-500">Belum ada testimoni toko.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-pink-200 rounded-xl overflow-hidden shadow">
                      <thead>
                        <tr className="bg-pink-100">
                          <th className="py-3 px-4 text-left font-bold text-pink-800">User</th>
                          <th className="py-3 px-4 text-left font-bold text-pink-800">Rating</th>
                          <th className="py-3 px-4 text-left font-bold text-pink-800">Komentar</th>
                          <th className="py-3 px-4 text-left font-bold text-pink-800">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {storeRatings.map((r, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-2 px-4 flex items-center gap-2">
                              {r.avatar && r.avatar.startsWith('data:') ? (
                                <img src={r.avatar} alt={r.name || r.userEmail} className="w-8 h-8 object-cover rounded-full border" />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">
                                  {(r.name && r.name[0]) || (r.userEmail && r.userEmail[0])}
                                </div>
                              )}
                              <span>{r.name || r.userEmail}</span>
                            </td>
                            <td className="py-2 px-4">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className={i < r.value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                              ))}
                              <span className="ml-2 text-pink-700 font-bold">{r.value}/5</span>
                            </td>
                            <td className="py-2 px-4">{r.comment || <span className="text-gray-400 italic">-</span>}</td>
                            <td className="py-2 px-4">
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow font-semibold"
                                onClick={() => handleDeleteStoreRating(r.userEmail)}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {/* Rating Produk */}
            {testimoniTab === 'produk' && (
              <div>
                {productRatings.length === 0 ? (
                  <div className="text-gray-500">Belum ada rating produk.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-yellow-200 rounded-xl overflow-hidden shadow">
                      <thead>
                        <tr className="bg-yellow-100">
                          <th className="py-3 px-4 text-left font-bold text-yellow-800">Produk</th>
                          <th className="py-3 px-4 text-left font-bold text-yellow-800">User</th>
                          <th className="py-3 px-4 text-left font-bold text-yellow-800">Rating</th>
                          <th className="py-3 px-4 text-left font-bold text-yellow-800">Komentar</th>
                          <th className="py-3 px-4 text-left font-bold text-yellow-800">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productRatings.map((r, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="py-2 px-4">{r.productName}</td>
                            <td className="py-2 px-4">{r.userEmail}</td>
                            <td className="py-2 px-4">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className={i < r.value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                              ))}
                              <span className="ml-2 text-yellow-700 font-bold">{r.value}/5</span>
                            </td>
                            <td className="py-2 px-4">{r.comment || <span className="text-gray-400 italic">-</span>}</td>
                            <td className="py-2 px-4">
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 shadow font-semibold"
                                onClick={() => handleDeleteProductRating(r.productId, r.userEmail)}
                              >
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
};

export default HomeAdmin;