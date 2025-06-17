import { motion } from 'framer-motion';
import { Star, Heart, Share2 } from 'react-feather';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      {/* Favorite Button (dummy, non-clickable) */}
      <button className="absolute top-2 left-2 p-2 rounded-full text-gray-300 cursor-default z-10" tabIndex={-1} aria-hidden="true" style={{ pointerEvents: 'none' }}>
        <Heart size={18} />
      </button>
      {/* Share Button (dummy, non-clickable) */}
      <button className="absolute top-2 right-2 p-2 rounded-full text-gray-400 cursor-default z-10" tabIndex={-1} aria-hidden="true" style={{ pointerEvents: 'none' }}>
        <Share2 size={18} />
      </button>
      <div className="h-48 bg-blue-100 flex items-center justify-center relative">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-full w-full object-cover rounded-xl"
          />
        ) : (
          <span className="text-gray-300 text-4xl font-bold">{product.name.charAt(0)}</span>
        )}
        {product.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            DISKON
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-blue-700">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.floor(product.rating) ? '#3b82f6' : 'none'}
              stroke={i < product.rating ? '#3b82f6' : '#d1d5db'}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>
        <div className="flex items-center">
          {product.discount ? (
            <>
              <span className="text-blue-600 font-bold">Rp{product.discount.toLocaleString()}</span>
              <span className="text-sm text-gray-500 line-through ml-2">Rp{product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-blue-600 font-bold">Rp{product.price.toLocaleString()}</span>
          )}
          {/* tampilkan satuan jika ada */}
          {product.unit && (
            <span className="text-xs text-gray-500 ml-2">/ {product.unit}</span>
          )}
        </div>
        <div className="text-xs text-gray-500 mt-1">Stok: {product.stock}</div>
      </div>
    </motion.div>
  );
};

export default ProductCard;