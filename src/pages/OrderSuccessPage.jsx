import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { gsap } from 'gsap';
import { CheckCircle, Package, Download, ShoppingBag, Truck, Calendar, CreditCard, Box } from 'lucide-react';
import confetti from 'canvas-confetti';

const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useOrders();
  
  const orderId = location.state?.orderId;
  const order = orders.find(o => o.id === orderId) || {
    id: 'ORD-12345',
    date: new Date().toISOString(),
    total: 0,
    items: [],
    customer: { fullName: 'Guest' }
  };
  
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    // Confetti explosion
    const duration = 3500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#C8102E', '#ffffff', '#22c55e']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#C8102E', '#ffffff', '#22c55e']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Timeline Animation
    const tl = gsap.timeline();
    
    tl.fromTo(containerRef.current, 
      { scale: 0.9, opacity: 0, y: 30 }, 
      { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.2)' }
    )
    .fromTo(iconRef.current,
      { scale: 0, rotate: -180 },
      { scale: 1, rotate: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' },
      '-=0.2'
    )
    .fromTo(detailsRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );

  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 w-full flex items-center justify-center min-h-[80vh]">
      <div ref={containerRef} className="bg-white p-8 md:p-14 rounded-[3rem] shadow-2xl border border-gray-100 w-full relative overflow-hidden">
        
        {/* Animated Glow Backgrounds */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-brand-red)]/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/3" />

        <div className="text-center mb-10">
          <div ref={iconRef} className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 text-white rounded-full mb-8 shadow-[0_0_40px_rgba(34,197,94,0.5)]">
            <CheckCircle size={80} strokeWidth={2.5} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            🎉 Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Thank you for choosing MEYYAKUTTY, <span className="font-bold text-gray-800">{order.customer.fullName}</span>.<br/>Your order has been placed successfully.
          </p>
        </div>
        
        <div ref={detailsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Order Info Card */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm">
            <h3 className="font-black text-xl text-gray-800 mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-3">
              <Package className="text-[var(--color-brand-red)]" /> Order Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold flex items-center gap-2"><Box size={18}/> Order ID</span>
                <span className="font-black text-gray-900 bg-white px-3 py-1 rounded-lg border border-gray-200">{order.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold flex items-center gap-2"><Calendar size={18}/> Order Date</span>
                <span className="font-bold text-gray-800">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold flex items-center gap-2"><CreditCard size={18}/> Payment Method</span>
                <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">Cash on Delivery</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-bold flex items-center gap-2"><Truck size={18}/> Est. Delivery</span>
                <span className="font-bold text-[var(--color-brand-red)]">3-5 Business Days</span>
              </div>
            </div>
          </div>

          {/* Items Preview Card */}
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
               <h3 className="font-black text-xl text-gray-800 mb-6 flex items-center gap-2 border-b-2 border-gray-200 pb-3">
                 <ShoppingBag className="text-[var(--color-brand-red)]" /> Order Summary
               </h3>
               <div className="space-y-4 mb-4">
                 {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <img src={item.imageUrl} alt={item.breed} className="w-14 h-14 rounded-xl object-cover bg-white shadow-sm border border-gray-100" />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 line-clamp-1">{item.breed}</p>
                        <p className="text-sm font-bold text-gray-500">Qty: {item.quantity} &times; ₹{item.price}</p>
                      </div>
                    </div>
                 ))}
                 {order.items.length > 2 && (
                   <p className="text-sm font-bold text-[var(--color-brand-red)] pt-2">+ {order.items.length - 2} more items in this order</p>
                 )}
               </div>
            </div>
            
            <div className="flex justify-between items-end pt-4 border-t-2 border-gray-200 mt-4">
              <span className="text-gray-500 font-bold uppercase tracking-wider text-sm">Total Paid</span>
              <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{order.total}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={(e) => {
              gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => navigate('/orders') });
            }}
            className="px-8 py-5 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl shadow-gray-900/20 text-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <Package size={22} /> View My Orders
          </button>
          
          <button 
            onClick={(e) => {
              gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => navigate('/') });
            }}
            className="px-8 py-5 bg-[var(--color-brand-red)] text-white rounded-2xl font-black hover:bg-[var(--color-brand-dark)] transition-all shadow-xl shadow-red-900/20 text-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <ShoppingBag size={22} /> Continue Shopping
          </button>
          
          <button 
            onClick={(e) => {
              gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => alert('Invoice Download functionality coming soon!') });
            }}
            className="px-6 py-5 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-black hover:bg-gray-50 hover:border-gray-300 transition-all text-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <Download size={22} /> Invoice
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default OrderSuccessPage;
