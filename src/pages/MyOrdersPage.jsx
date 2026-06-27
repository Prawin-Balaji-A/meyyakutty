import React, { useEffect, useRef } from 'react';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Package, ChevronRight, Circle, Clock, CheckCircle, Truck, MapPin } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-600 border-yellow-200 shadow-[0_0_15px_rgba(234,179,8,0.2)]';
      case 'Confirmed': return 'bg-blue-50 text-blue-600 border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.2)]';
      case 'Packed': return 'bg-orange-50 text-orange-600 border-orange-200 shadow-[0_0_15px_rgba(249,115,22,0.2)]';
      case 'Out for Delivery': return 'bg-purple-50 text-purple-600 border-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.2)]';
      case 'Delivered': return 'bg-green-50 text-green-600 border-green-200 shadow-[0_0_15px_rgba(34,197,94,0.2)]';
      default: return 'bg-gray-50 text-gray-600 border-gray-200 shadow-sm';
    }
  };
  
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm border ${getColors()}`}>
      <Circle size={10} className="fill-current animate-pulse" />
      {status}
    </div>
  );
};

const MyOrdersPage = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();
  const listRef = useRef(null);

  useEffect(() => {
    if (orders.length > 0 && listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
      );
    }
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-gray-100">
          <Package size={64} className="text-gray-300" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">No Orders Yet</h1>
        <p className="text-lg text-gray-500 mb-8 max-w-md font-medium">You haven't placed any orders yet. Discover our premium collection of pets and find your new companion!</p>
        <button 
          onClick={(e) => {
            gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => navigate('/') });
          }}
          className="px-8 py-4 bg-[var(--color-brand-red)] text-white rounded-xl font-bold text-lg shadow-lg hover:bg-[var(--color-brand-dark)] hover:-translate-y-1 transition-all active:scale-95"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 w-full">
      <div className="flex items-center gap-3 mb-12">
        <Package className="text-[var(--color-brand-red)] w-8 h-8" />
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Orders</h1>
      </div>
      
      <div ref={listRef} className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border border-gray-100 overflow-hidden flex flex-col md:flex-row group">
            
            {/* Sidebar Info */}
            <div className="p-8 md:w-1/3 bg-gray-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-red)]/5 rounded-full blur-[40px] -z-0 translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
                <p className="text-2xl font-black text-gray-900 mb-6 bg-white px-3 py-1 inline-block rounded-lg shadow-sm border border-gray-200">{order.id}</p>
                
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={14}/> Date Placed</p>
                <p className="font-bold text-gray-800 text-lg mb-6">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={14}/> Delivery To</p>
                <p className="font-bold text-gray-800 line-clamp-1">{order.customer.fullName}</p>
              </div>
              <div className="mt-8 relative z-10">
                <StatusBadge status={order.status} />
              </div>
            </div>

            {/* Items and Totals */}
            <div className="p-8 flex-1 flex flex-col justify-between bg-white relative">
              <div>
                <h3 className="font-black text-gray-800 mb-6 text-xl flex items-center gap-2 border-b-2 border-gray-100 pb-3">
                  Items Included <span className="bg-red-50 text-[var(--color-brand-red)] text-sm px-2 py-0.5 rounded-full">{order.items.length}</span>
                </h3>
                <div className="space-y-4">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 shadow-sm border border-gray-200">
                        <img src={item.imageUrl} alt={item.breed} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-gray-900 text-lg line-clamp-1">{item.breed}</p>
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-[var(--color-brand-red)] text-lg">₹{item.price * item.quantity}</p>
                        <p className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-md inline-block mt-1">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <p className="text-sm font-black text-[var(--color-brand-red)] pt-2 pl-3">+ {order.items.length - 3} more items in this order</p>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="text-3xl font-black text-gray-900 tracking-tighter">₹{order.total}</p>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-gray-200"></div>
                  <div className="hidden sm:block">
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle size={14} className="text-green-500"/> Payment</p>
                     <p className="font-black text-green-600">Cash on Delivery</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => navigate(`/orders/${order.id}`) });
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-dark)] text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                >
                  View Details <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;
