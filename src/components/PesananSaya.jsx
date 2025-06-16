import { motion } from 'framer-motion';
import { Package, Clock, Check, X, Truck } from 'react-feather';
import FooterSetelahLogin from "./footers/FooterSetelahLogin";

const PesananSaya = ({ user }) => {
  // Sample orders data
  const orders = [
    {
      id: 'ORD-12345',
      date: '12 Jan 2023',
      status: 'completed',
      items: [
        { name: 'Indomie Goreng', price: 3000, quantity: 5 },
        { name: 'Aqua Gelas', price: 500, quantity: 10 }
      ],
      total: 20000,
      delivery: 'JNE Reguler'
    },
    {
      id: 'ORD-12346',
      date: '15 Jan 2023',
      status: 'shipped',
      items: [
        { name: 'Minyak Goreng', price: 15000, quantity: 2 }
      ],
      total: 30000,
      delivery: 'JNE Express'
    },
    {
      id: 'ORD-12347',
      date: '20 Jan 2023',
      status: 'processing',
      items: [
        { name: 'Lifebuoy Sabun', price: 4500, quantity: 3 },
        { name: 'Gula Pasir 1kg', price: 14000, quantity: 1 }
      ],
      total: 27500,
      delivery: 'J&T'
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <Check size={16} className="mr-1" />;
      case 'shipped': return <Truck size={16} className="mr-1" />;
      case 'processing': return <Clock size={16} className="mr-1" />;
      default: return <Clock size={16} className="mr-1" />;
    }
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
                          order.status === 'processing' ? 'text-yellow-500' : 'text-gray-800'
                        }>
                          Rp{order.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.main>

      <FooterSetelahLogin />
    </div>
  );
};

export default PesananSaya;