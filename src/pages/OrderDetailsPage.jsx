import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useShop } from '../context/ShopContext';
import { gsap } from 'gsap';
import { Truck, MapPin, PhoneCall, MessageCircle, FileText, ChevronLeft, Package, CheckCircle2, Clock, Navigation, XCircle } from 'lucide-react';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders, cancelOrder } = useOrders();
  const { restorePetStock } = useShop();
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

  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
      cancelOrder(order.id);
      // Restore stock for all items
      order.items.forEach(item => {
        restorePetStock(item.id, item.quantity, item.category === 'Supplies');
      });
      alert("Order cancelled successfully.");
    }
  };

  const primaryPhone = '917200271113';

  // Tracking Logic
  const allStatuses = ['Placed', 'Confirmed', 'Preparing', 'Shipped', 'Out for Delivery', 'Delivered'];
  const isCancelled = order.status === 'Cancelled';
  let currentIndex = allStatuses.indexOf(order.status);
  
  // Fallback for unexpected status
  if (currentIndex === -1 && !isCancelled) currentIndex = 0; 
  if (isCancelled) currentIndex = -1; // -1 means don't show normal progress

  const canCancel = ['Placed', 'Confirmed', 'Preparing'].includes(order.status);

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
        <div className={`bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100 relative overflow-hidden`}>
          <div className={`absolute top-0 right-0 w-64 h-64 ${isCancelled ? 'bg-red-400/10' : 'bg-green-400/10'} rounded-full blur-[60px] -z-0 translate-x-1/2 -translate-y-1/2`} />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Order ID</p>
              <h1 className="text-4xl font-black text-gray-900">{order.id}</h1>
              <p className="font-bold text-gray-500 mt-2 flex items-center gap-2">
                <Clock size={16} /> Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            <div className={`px-6 py-4 rounded-2xl border text-center ${
              isCancelled ? 'bg-red-50 border-red-200' : 
              order.status === 'Delivered' ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'
            }`}>
              <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                isCancelled ? 'text-red-600' : 
                order.status === 'Delivered' ? 'text-green-600' : 'text-blue-600'
              }`}>Current Status</p>
              
              <p className={`text-2xl font-black flex items-center justify-center gap-2 ${
                isCancelled ? 'text-red-700' : 
                order.status === 'Delivered' ? 'text-green-700' : 'text-blue-700'
              }`}>
                {isCancelled ? <XCircle size={24} /> : <CheckCircle2 size={24} className={order.status !== 'Delivered' ? 'animate-pulse' : ''} />} 
                {order.status}
              </p>
            </div>
          </div>
        </div>

        {/* Glowing Tracking Timeline */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-red)]/30 rounded-full blur-[60px] -z-0 translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-[40px] -z-0 -translate-x-1/2 translate-y-1/2" />
          
          <h3 className="font-black text-3xl mb-12 relative z-10 flex items-center gap-3 tracking-tight drop-shadow-md">
            <Navigation className="text-[var(--color-brand-red)] w-8 h-8" /> Live Order Tracking
          </h3>

          <div className="relative z-10 pb-4">
            {isCancelled ? (
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl backdrop-blur-sm text-center">
                <XCircle size={48} className="text-red-500 mx-auto mb-4" />
                <h4 className="text-2xl font-black text-red-400 mb-2">Order Cancelled</h4>
                <p className="text-red-200 font-medium">This order has been cancelled and cannot be tracked.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800 -translate-y-1/2 rounded-full overflow-hidden shadow-inner">
                   {/* Progress Line */}
                   <div 
                     className="h-full bg-gradient-to-r from-[var(--color-brand-red)] to-orange-400 rounded-full shadow-[0_0_15px_rgba(200,16,46,0.8)] transition-all duration-1000 ease-out" 
                     style={{ width: `${Math.max(5, (currentIndex / (allStatuses.length - 1)) * 100)}%` }} 
                   />
                </div>

                {/* Steps */}
                <div className="flex justify-between relative z-10">
                  {allStatuses.map((step, idx) => {
                    const isCompleted = idx <= currentIndex;
                    const isActive = idx === currentIndex;
                    
                    return (
                      <div key={step} className="flex flex-col items-center group">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-sm md:text-base border-4 transition-all duration-500 ${
                          isCompleted 
                            ? 'bg-[var(--color-brand-red)] border-gray-900 text-white shadow-[0_0_20px_rgba(200,16,46,0.6)] scale-110' 
                            : 'bg-gray-800 border-gray-700 text-gray-500'
                        } ${isActive ? 'animate-pulse' : ''}`}>
                          {isCompleted ? <CheckCircle2 size={20} /> : idx + 1}
                        </div>
                        <span className={`mt-4 text-[10px] md:text-xs font-black uppercase tracking-wider text-center max-w-[60px] md:max-w-[80px] transition-colors duration-500 ${
                          isCompleted ? 'text-white drop-shadow-md' : 'text-gray-600'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Details */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
          <h3 className="font-black text-2xl text-gray-800 mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
            <MapPin className="text-[var(--color-brand-red)]" /> {order.deliveryMethod === 'pickup' ? 'Store Pickup Details' : 'Delivery Details'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Customer Info</p>
              <p className="font-black text-gray-900 text-xl mb-1">{order.customer.fullName}</p>
              <p className="font-bold text-gray-700 flex items-center gap-2 mb-4">
                <PhoneCall size={16} className="text-[var(--color-brand-red)]" /> {order.customer.mobile}
              </p>
            </div>
            {order.deliveryMethod === 'delivery' && (
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Shipping Address</p>
                <p className="text-gray-700 font-medium leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {order.customer.address}<br/>
                  {order.customer.city} - {order.customer.pincode}
                </p>
              </div>
            )}
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

          <div className="mt-10 pt-6 border-t-2 border-gray-100 bg-gray-50 p-6 rounded-3xl">
            <div className="space-y-3 mb-4 text-gray-600 font-bold">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-900">₹{order.subtotal || order.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span className="text-gray-900">{order.deliveryFee === 0 ? 'Free' : `₹${order.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (5%)</span>
                <span className="text-[var(--color-brand-red)]">₹{order.tax || 0}</span>
              </div>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-gray-200">
               <div>
                 <span className="text-gray-500 font-bold uppercase tracking-wider block">Grand Total</span>
                 <span className="text-xs text-gray-400 font-medium">Paid via {order.paymentMethod || 'Cash on Delivery'}</span>
               </div>
               <span className="text-4xl font-black text-gray-900 tracking-tight">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {canCancel && !isCancelled && (
            <button 
              onClick={handleCancelOrder}
              className="flex flex-col items-center justify-center gap-2 p-6 bg-white hover:bg-red-50 text-red-600 border-2 border-red-100 rounded-[2rem] font-black transition-all shadow-sm active:scale-95"
            >
              <XCircle size={28} /> Cancel Order
            </button>
          )}
          
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
