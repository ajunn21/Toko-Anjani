// Halaman dashboard admin sederhana
import { Users, ShoppingCart, LogOut, Package, Star, Check, AlertCircle, Image as ImageIcon, Trash2, Plus, Edit2, X } from 'react-feather';
import { useEffect, useState } from 'react';

const defaultProducts = [
  { id: 1, name: 'Indomie Goreng', price: 3800, discount: 3500, stock: 10, category: 'Sembako', unit: 'pcs' },
  { id: 2, name: 'Aqua Gelas', price: 29500, discount: 27500, stock: 50, category: 'Minuman', unit: 'dus' },
  // ...tambahkan produk default lain jika perlu...
];

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

  // Hanya satu fitur yang tampil: users, orders, atau products
  const [activeSection, setActiveSection] = useState(null);

  // Modal bukti transfer
  const [showBuktiModal, setShowBuktiModal] = useState(false);
  const [buktiImage, setBuktiImage] = useState(null);

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
  }, []);

  // Tambah notifikasi setelah aksi
  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => setNotif(''), 1800);
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
    showNotif('Pesanan berhasil dikonfirmasi!');
  };

  // Hapus user
  const handleDeleteUser = (email) => {
    if (!window.confirm('Yakin ingin menghapus user ini?')) return;
    const updatedUsers = users.filter(u => u.email !== email);
    setUsers(updatedUsers);
    setUserCount(updatedUsers.length);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    showNotif('User berhasil dihapus!');
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
    if (!newProduct.name || !newProduct.price || !newProduct.stock || !newProduct.category || !newProduct.unit) return;
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const product = {
      ...newProduct,
      id: newId,
      price: Number(newProduct.price),
      discount: newProduct.discount ? Number(newProduct.discount) : null,
      stock: Number(newProduct.stock)
    };
    const updatedProducts = [...products, product];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setNewProduct({ name: '', price: '', discount: '', stock: '', category: '', unit: '', image: '' });
    showNotif('Produk berhasil ditambahkan!');
  };

  // Hapus produk
  const handleDeleteProduct = (id) => {
    if (!window.confirm('Yakin ingin menghapus produk ini?')) return;
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    showNotif('Produk berhasil dihapus!');
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
      showNotif('Semua field harus diisi!');
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
    showNotif('Produk berhasil diupdate!');
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
    showNotif('Status pesanan berhasil diubah!');
  };

  // Fungsi hapus pesanan
  const handleDeleteOrder = (orderId) => {
    if (!window.confirm('Yakin ingin menghapus pesanan ini?')) return;
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    setOrderCount(updatedOrders.length);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    showNotif('Pesanan berhasil dihapus!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-50 to-orange-50">
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
        {/* Notifikasi */}
        {notif && (
          <div className="mb-8 bg-green-100 text-green-700 px-4 py-2 rounded shadow-lg flex items-center font-semibold border border-green-300 animate-pulse">
            {notif}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
        </div>

        {/* Tombol navigasi section pesanan */}
        {activeSection === 'orders' && (
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded font-semibold ${!activeSection || activeSection === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveSection('orders')}
            >
              Semua Pesanan
            </button>
            <button
              className={`px-4 py-2 rounded font-semibold ${activeSection === 'history' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setActiveSection('history')}
            >
              Riwayat Pesanan
            </button>
          </div>
        )}

        {/* Daftar Semua Pesanan (toggle) */}
        {activeSection === 'orders' && (
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

        {/* Riwayat Pesanan (toggle) */}
        {activeSection === 'history' && (
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
                  <input className="border p-2 rounded bg-white" placeholder="Harga" type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Diskon</label>
                  <input className="border p-2 rounded bg-white" placeholder="Diskon" type="number" value={newProduct.discount} onChange={e => setNewProduct({ ...newProduct, discount: e.target.value })} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Stok</label>
                  <input className="border p-2 rounded bg-white" placeholder="Stok" type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Kategori</label>
                  <input className="border p-2 rounded bg-white" placeholder="Kategori" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-semibold text-yellow-700 mb-1">Unit</label>
                  <input className="border p-2 rounded bg-white" placeholder="Unit" value={newProduct.unit} onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })} />
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
                              type="number"
                              value={editFields.price}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-20 bg-yellow-50"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="discount"
                              type="number"
                              value={editFields.discount}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-20 bg-yellow-50"
                            />
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
                            <input
                              name="category"
                              value={editFields.category}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-24 bg-yellow-50"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="unit"
                              value={editFields.unit}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-16 bg-yellow-50"
                            />
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
                          <td className="py-2 px-4 text-green-700 font-bold">{p.discount ? `Rp${p.discount.toLocaleString()}` : '-'}</td>
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
      </main>
    </div>
  );
};

export default HomeAdmin;