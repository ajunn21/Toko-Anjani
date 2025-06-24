// Halaman dashboard admin sederhana
import { Users, ShoppingCart, LogOut, Package, Star, Check, AlertCircle, Image as ImageIcon, Trash2, Plus, Edit2 } from 'react-feather';
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

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem('users')) || [];
    setUserCount(usersData.length);
    setUsers(usersData);
    const ordersData = JSON.parse(localStorage.getItem('orders')) || [];
    setOrderCount(ordersData.length);
    setOrders(ordersData);

    let productsData = JSON.parse(localStorage.getItem('products'));
    if (!productsData || productsData.length === 0) {
      productsData = defaultProducts;
      localStorage.setItem('products', JSON.stringify(productsData));
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
      unit: product.unit
    });
  };

  const handleEditFieldChange = (e) => {
    setEditFields({ ...editFields, [e.target.name]: e.target.value });
  };

  const handleSaveEditProduct = (id) => {
    const updatedProducts = products.map(p =>
      p.id === id
        ? {
            ...p,
            name: editFields.name,
            price: Number(editFields.price),
            discount: editFields.discount ? Number(editFields.discount) : null,
            stock: Number(editFields.stock),
            category: editFields.category,
            unit: editFields.unit
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow">
        <div className="text-2xl font-bold">Admin Dashboard</div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold">{user?.name || 'Admin'}</span>
          <button
            onClick={onLogout}
            className="flex items-center px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <LogOut size={16} className="mr-1" />
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-blue-800">Selamat Datang, Admin!</h1>
        {/* Notifikasi */}
        {notif && (
          <div className="mb-6 bg-green-100 text-green-700 px-4 py-2 rounded shadow flex items-center font-semibold">
            {notif}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Card Total User */}
          <div
            className={`bg-white rounded-xl shadow p-6 flex items-center space-x-4 cursor-pointer hover:bg-blue-50 transition ${activeSection === 'users' ? 'ring-2 ring-blue-400' : ''}`}
            onClick={() => setActiveSection(activeSection === 'users' ? null : 'users')}
            title="Klik untuk lihat daftar user"
          >
            <Users size={36} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{userCount}</div>
              <div className="text-gray-600">Total User</div>
            </div>
          </div>
          {/* Card Total Pesanan */}
          <div
            className={`bg-white rounded-xl shadow p-6 flex items-center space-x-4 cursor-pointer hover:bg-green-50 transition ${activeSection === 'orders' ? 'ring-2 ring-green-400' : ''}`}
            onClick={() => setActiveSection(activeSection === 'orders' ? null : 'orders')}
            title="Klik untuk lihat daftar pesanan"
          >
            <ShoppingCart size={36} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold">{orderCount}</div>
              <div className="text-gray-600">Total Pesanan</div>
            </div>
          </div>
          {/* Card Produk */}
          <div
            className={`bg-white rounded-xl shadow p-6 flex items-center space-x-4 cursor-pointer hover:bg-yellow-50 transition ${activeSection === 'products' ? 'ring-2 ring-yellow-400' : ''}`}
            onClick={() => setActiveSection(activeSection === 'products' ? null : 'products')}
            title="Klik untuk lihat/kelola produk"
          >
            <Package size={36} className="text-yellow-500" />
            <div>
              <div className="text-2xl font-bold">{products.length}</div>
              <div className="text-gray-600">Produk</div>
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
          <div className="bg-white rounded-xl shadow p-6 mt-6">
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
                              <img
                                src={order.buktiTransfer}
                                alt="Bukti Transfer"
                                className="w-20 h-20 object-contain border rounded shadow"
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

        {/* Riwayat Pesanan (toggle) */}
        {activeSection === 'history' && (
          <div className="bg-white rounded-xl shadow p-6 mt-6">
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
                                className="w-20 h-20 object-contain border rounded shadow"
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
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-xl font-bold mb-4 text-blue-700">Daftar User</h2>
            {users.length === 0 ? (
              <div className="text-gray-500">Belum ada user terdaftar.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="py-2 px-4 text-left font-semibold">Nama</th>
                      <th className="py-2 px-4 text-left font-semibold">Email</th>
                      <th className="py-2 px-4 text-left font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="py-2 px-4">{u.name}</td>
                        <td className="py-2 px-4">{u.email}</td>
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
          <div className="bg-white rounded-xl shadow p-6 mt-6">
            <h2 className="text-xl font-bold mb-4 text-yellow-700">Manajemen Produk</h2>
            {/* Form tambah produk */}
            <form className="mb-6 grid grid-cols-1 md:grid-cols-7 gap-2 items-end" onSubmit={handleAddProduct}>
              {/* Input gambar produk */}
              <input
                type="file"
                accept="image/*"
                className="border p-2 rounded"
                title="Upload Foto Produk"
                onChange={handleProductImageChange}
              />
              <input className="border p-2 rounded" placeholder="Nama" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Harga" type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Diskon" type="number" value={newProduct.discount} onChange={e => setNewProduct({ ...newProduct, discount: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Stok" type="number" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Kategori" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
              <input className="border p-2 rounded" placeholder="Unit" value={newProduct.unit} onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })} />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700 ml-0 md:ml-2">
                <Plus size={16} className="mr-1" /> Tambah
              </button>
            </form>
            {/* Tabel produk */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-yellow-50">
                    <th className="py-2 px-4 text-left font-semibold">Foto</th>
                    <th className="py-2 px-4 text-left font-semibold">Nama</th>
                    <th className="py-2 px-4 text-left font-semibold">Harga</th>
                    <th className="py-2 px-4 text-left font-semibold">Diskon</th>
                    <th className="py-2 px-4 text-left font-semibold">Stok</th>
                    <th className="py-2 px-4 text-left font-semibold">Kategori</th>
                    <th className="py-2 px-4 text-left font-semibold">Unit</th>
                    <th className="py-2 px-4 text-left font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b">
                      {/* Kolom foto produk */}
                      <td className="py-2 px-4">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-14 h-14 object-cover rounded border" />
                        ) : (
                          <span className="text-gray-400 text-xs">Tidak ada foto</span>
                        )}
                      </td>
                      {editProduct === p.id ? (
                        <>
                          <td className="py-2 px-4">
                            <input
                              name="name"
                              value={editFields.name}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-28"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="price"
                              type="number"
                              value={editFields.price}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-20"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="discount"
                              type="number"
                              value={editFields.discount}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-20"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="stock"
                              type="number"
                              value={editFields.stock}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-16"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="category"
                              value={editFields.category}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-24"
                            />
                          </td>
                          <td className="py-2 px-4">
                            <input
                              name="unit"
                              value={editFields.unit}
                              onChange={handleEditFieldChange}
                              className="border p-1 rounded w-16"
                            />
                          </td>
                          <td className="py-2 px-4 flex flex-col md:flex-row gap-2">
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                              onClick={() => handleSaveEditProduct(p.id)}
                              type="button"
                            >
                              Simpan
                            </button>
                            <button
                              className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400"
                              onClick={handleCancelEditProduct}
                              type="button"
                            >
                              Batal
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2 px-4">{p.name}</td>
                          <td className="py-2 px-4">Rp{p.price.toLocaleString()}</td>
                          <td className="py-2 px-4">{p.discount ? `Rp${p.discount.toLocaleString()}` : '-'}</td>
                          <td className="py-2 px-4">{p.stock}</td>
                          <td className="py-2 px-4">{p.category}</td>
                          <td className="py-2 px-4">{p.unit}</td>
                          <td className="py-2 px-4 flex flex-col md:flex-row gap-2">
                            <button
                              className="flex items-center px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                              onClick={() => handleEditProduct(p)}
                              type="button"
                              title="Edit Produk"
                            >
                              <Edit2 size={16} className="mr-1" />
                              Edit
                            </button>
                            <button
                              className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
        <div className="bg-white rounded-xl shadow p-6 mt-10">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Pesanan Menunggu Konfirmasi</h2>
          {orders.filter(order => order.status === 'waiting_confirmation').length === 0 ? (
            <div className="text-gray-500">Tidak ada pesanan yang menunggu konfirmasi.</div>
          ) : (
            <div className="space-y-4">
              {orders.filter(order => order.status === 'waiting_confirmation').map(order => (
                <div key={order.id} className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between bg-orange-50">
                  <div>
                    <div className="flex items-center mb-2">
                      <AlertCircle size={18} className="text-orange-500 mr-2" />
                      <span className="font-semibold">Order #{order.id}</span>
                    </div>
                    <div className="text-gray-600 text-sm mb-1">Tanggal: {order.date}</div>
                    <div className="text-gray-600 text-sm mb-1">Total: Rp{order.total.toLocaleString()}</div>
                    <div className="text-gray-600 text-sm mb-1">Email User: {order.userEmail || '-'}</div>
                    {/* Bukti Transfer */}
                    {order.delivery !== 'COD' && (
                      <div className="mt-2">
                        <div className="font-semibold mb-1 flex items-center">
                          <ImageIcon size={16} className="mr-2" />
                          Bukti Transfer:
                        </div>
                        {order.buktiTransfer ? (
                          <img
                            src={order.buktiTransfer}
                            alt="Bukti Transfer"
                            className="w-32 h-32 object-contain border rounded shadow"
                          />
                        ) : (
                          <span className="text-red-500 text-sm">Belum diupload</span>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleConfirmOrder(order.id)}
                    className="mt-3 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold flex items-center"
                  >
                    <Check size={16} className="mr-2" />
                    Konfirmasi Pesanan
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomeAdmin;