import { motion } from 'framer-motion';
import { Star } from 'react-feather';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="h-48 bg-blue-100 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-blue-700">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(product.rating) ? 'text-blue-400 fill-blue-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
        </div>
        <p className="text-blue-600 font-bold">{product.price}</p>
        {product.stock <= 0 && (
          <p className="text-red-500 text-sm mt-1">Stok habis</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;