import React, { useEffect, useRef } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, grandTotal } = useCart();
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.to(drawerRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none', delay: 0.2 });
    }
  }, [isOpen]);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 bg-black/50 z-50 hidden opacity-0 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col translate-x-full"
      >
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-black text-gray-800 flex items-center gap-2">
            <ShoppingBag /> Your Cart
          </h2>
          <button onClick={onClose} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingBag size={64} className="mb-4 opacity-50" />
              <p className="text-lg font-medium">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-white border border-gray-100 p-3 rounded-2xl shadow-sm">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.imageUrl} alt={item.breed} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-lg line-clamp-1">{item.breed}</h4>
                    <p className="text-[var(--color-brand-red)] font-extrabold">₹{item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold">-</button>
                      <span className="font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between text-gray-600 mb-2 font-medium">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-xl font-black text-gray-800 mb-6">
              <span>Total Estimated</span>
              <span>₹{grandTotal}</span>
            </div>
            <button 
              onClick={handleCheckout}
              className="w-full py-4 bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-dark)] text-white text-lg font-bold rounded-xl shadow-md transition-colors active:scale-95"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
