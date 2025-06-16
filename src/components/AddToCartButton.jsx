import { ShoppingBag } from 'react-feather';
import { toast } from 'react-toastify';

const AddToCartButton = ({ productId, stock, userId }) => {
  const handleAddToCart = () => {
    if (stock <= 0) {
      toast.error('Stok produk habis');
      return;
    }
    
    // Logika tambahkan ke keranjang
    toast.success('Produk berhasil ditambahkan ke keranjang');
    console.log(`Product ${productId} added by user ${userId}`);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={stock <= 0}
      className={`mt-3 w-full py-2 rounded-lg flex items-center justify-center ${
        stock <= 0 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      } transition duration-300 shadow-lg font-semibold`}
    >
      <ShoppingBag size={16} className="mr-2" />
      {stock <= 0 ? 'Stok Habis' : 'Tambah ke Keranjang'}
    </button>
  );
};

export default AddToCartButton;