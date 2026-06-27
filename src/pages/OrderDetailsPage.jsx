import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { gsap } from 'gsap';
import { Truck, MapPin, PhoneCall, MessageCircle, FileText, ChevronLeft, Package, CheckCircle2, Clock, Map, Navigation } from 'lucide-react';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();
  const containerRef = useRef(null);
  
  const order = orders.find(o => o.id === id);

  useEffect(() => {
    if (order && containerRef.current) {
      gsap.fromTo(containerRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [order]);

  if (!order) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-3xl font-black text-gray-800 mb-4">Order Not Found</h1>
        <button onClick={() => navigate('/orders')} className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold">Back to Orders</button>
      </div>
    );
  }

  const primaryPhone = '917200271113';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <button 
        onClick={() => navigate('/orders')} 
        className="mb-8 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors flex items-center gap-2"
      >
        <ChevronLeft size={20} /> Back to Orders
      </button>

      <div ref={containerRef} className="space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/10 rounded-full blur-[60px] -z-0 translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Order ID</p>
              <h1 className="text-4xl font-black text-gray-900">{order.id}</h1>
              <p className="font-bold text-gray-500 mt-2 flex items-center gap-2">
                <Clock size={16} /> Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="bg-green-50 px-6 py-4 rounded-2xl border border-green-200 text-center">
              <p className="text-sm font-bold text-green-600 uppercase tracking-wider mb-1">Current Status</p>
              <p className="text-2xl font-black text-green-700 flex items-center justify-center gap-2">
                <CheckCircle2 size={24} className="animate-pulse" /> {order.status}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline & Delivery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-brand-red)]/20 rounded-full blur-[40px] -z-0 translate-x-1/3 -translate-y-1/3" />
            <h3 className="font-black text-2xl mb-6 relative z-10 flex items-center gap-3">
              <Truck className="text-[var(--color-brand-red)]" /> Estimated Delivery
            </h3>
            <p className="text-xl font-bold text-gray-300 relative z-10 leading-relaxed mb-6">
              Your order is being processed and will usually arrive in <span className="text-white bg-white/10 px-2 py-1 rounded-lg">3-5 Business Days</span>.
            </p>
            <div className="h-2 bg-gray-800 rounded-full relative z-10 overflow-hidden">
              <div className="h-full bg-[var(--color-brand-red)] w-1/3 rounded-full animate-pulse" />
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-400 mt-2 uppercase tracking-wider relative z-10">
              <span>Confirmed</span>
              <span>Packed</span>
              <span>Delivered</span>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="font-black text-2xl text-gray-800 mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                <MapPin className="text-[var(--color-brand-red)]" /> Delivery Details
              </h3>
              <p className="font-black text-gray-900 text-lg mb-2">{order.customer.fullName}</p>
              <p className="text-gray-600 font-medium leading-relaxed mb-4">{order.customer.address}</p>
              <p className="font-bold text-gray-700 flex items-center gap-2">
                <PhoneCall size={16} className="text-gray-400" /> {order.customer.mobile}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 border-gray-100">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Payment Method</p>
              <p className="font-black text-green-600">Cash on Delivery</p>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100">
          <h3 className="font-black text-2xl text-gray-800 mb-8 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
            <Package className="text-[var(--color-brand-red)]" /> Items in this Order
          </h3>
          <div className="space-y-6">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center p-4 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0 shadow-inner">
                  <img src={item.imageUrl} alt={item.breed} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h4 className="font-black text-xl text-gray-900">{item.breed}</h4>
                      <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-1">{item.category}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-black text-2xl text-[var(--color-brand-red)]">₹{item.price * item.quantity}</p>
                      <p className="text-sm font-bold text-gray-500 mt-1">₹{item.price} &times; {item.quantity}</p>
                    </div>
                  </div>
                  {item.faceType && <p className="text-sm font-bold text-gray-600 mt-2 bg-gray-100 px-3 py-1 inline-block rounded-lg">Face: {item.faceType}</p>}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-end mt-10 pt-6 border-t-2 border-gray-100">
             <span className="text-gray-500 font-bold uppercase tracking-wider">Total Amount</span>
             <span className="text-4xl font-black text-gray-900">₹{order.total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={(e) => {
              gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => alert('Tracking system integration coming soon!') });
            }}
            className="flex flex-col items-center justify-center gap-2 p-6 bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-dark)] text-white rounded-[2rem] font-black transition-all shadow-lg active:scale-95"
          >
            <Navigation size={28} /> Track Order
          </button>
          
          <a 
            href={`tel:${primaryPhone}`}
            className="flex flex-col items-center justify-center gap-2 p-6 bg-gray-900 hover:bg-black text-white rounded-[2rem] font-black transition-all shadow-lg active:scale-95"
          >
            <PhoneCall size={28} /> Call Support
          </a>
          
          <a 
            href={`https://wa.me/${primaryPhone}`}
            target="_blank" rel="noreferrer"
            className="flex flex-col items-center justify-center gap-2 p-6 bg-[#25D366] hover:bg-[#1ebd5a] text-white rounded-[2rem] font-black transition-all shadow-lg active:scale-95"
          >
            <MessageCircle size={28} /> WhatsApp
          </a>
          
          <button 
            onClick={(e) => {
              gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => alert('Invoice Download feature coming soon!') });
            }}
            className="flex flex-col items-center justify-center gap-2 p-6 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-100 rounded-[2rem] font-black transition-all shadow-sm active:scale-95"
          >
            <FileText size={28} /> Invoice
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsPage;
