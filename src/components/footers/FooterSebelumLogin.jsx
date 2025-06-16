import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'react-feather';

const FooterSebelumLogin = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white pt-12 pb-6"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Toko Anjani</h3>
            <p className="text-gray-400 mb-4">
              Toko kelontong terlengkap dengan harga termurah di daerah Anda.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Beranda</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Produk</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Promo</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Makanan</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Minuman</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Snack</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bahan Pokok</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kebutuhan Rumah</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Jl. Contoh No. 123, Kota Anda, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-400">info@tokoanjani.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-400">+62 123 4567 890</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Toko Anjani. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default FooterSebelumLogin;