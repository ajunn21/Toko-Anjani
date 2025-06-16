import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError('Semua field harus diisi.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Password dan konfirmasi password tidak sama.');
      return;
    }
    // Simpan user baru ke localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === form.email)) {
      setError('Email sudah terdaftar.');
      return;
    }
    users.push({
      name: form.name,
      email: form.email,
      password: form.password
    });
    localStorage.setItem('users', JSON.stringify(users));
    setSuccess('Registrasi berhasil! Silakan login.');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border-2 border-blue-100">
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 mb-4 shadow-lg">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-blue-700 drop-shadow">Daftar Akun Baru</h2>
          <p className="mt-2 text-sm text-blue-500">Buat akun untuk mulai belanja di Toko Anjani</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">Nama</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 sm:text-sm bg-blue-50" placeholder="Nama lengkap" />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 sm:text-sm bg-blue-50" placeholder="contoh@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 sm:text-sm bg-blue-50" placeholder="Minimal 6 karakter" />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-1">Konfirmasi Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 border border-blue-200 rounded-md shadow-sm placeholder-blue-300 sm:text-sm bg-blue-50" placeholder="Ulangi password" />
          </div>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg transition">Daftar</button>
        </form>
        <p className="mt-6 text-center text-sm text-blue-500">
          Sudah punya akun?{' '}
          <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
