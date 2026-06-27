import React, { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, delivery, tax, grandTotal } = useCart();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 w-full" ref={containerRef}>
        <div className="bg-red-50 p-10 rounded-full mb-6">
          <ShoppingBag size={80} className="text-red-300" />
        </div>
        <h2 className="text-3xl font-black text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8 max-w-md text-center">Looks like you haven't added any pets or supplies to your cart yet. Let's find you a companion!</p>
        <button 
          onClick={() => navigate('/shop')}
          className="px-8 py-4 bg-[var(--color-brand-red)] text-white font-bold rounded-2xl shadow-lg hover:bg-red-800 hover:-translate-y-1 transition-all flex items-center gap-2"
        >
          Start Shopping <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full" ref={containerRef}>
      <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">My Cart <span className="text-gray-400 text-2xl">({cartItems.length} items)</span></h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Cart Items List */}
        <div className="lg:w-2/3 space-y-6">
          {cartItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center group hover:shadow-md transition-shadow">
              
              {/* Product Image */}
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                <img src={item.imageUrl} alt={item.breed} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              {/* Product Info */}
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-1">{item.breed}</h3>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{item.category}</p>
                    <p className="text-sm text-gray-500">Seller: <span className="font-bold text-gray-700">Meyyakutty Premium</span></p>
                    <p className="text-xs font-bold text-green-600 mt-1">In Stock</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-black text-[var(--color-brand-red)]">₹{item.price * item.quantity}</p>
                    {item.quantity > 1 && <p className="text-xs text-gray-400 font-medium">₹{item.price} each</p>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                  {/* Quantity Selector - ONLY for Supplies */}
                  {item.category === 'Supplies' ? (
                    <div className="flex items-center gap-4 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-500 hover:text-black hover:bg-white rounded-md transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={18} />
                      </button>
                      <span className="font-black text-gray-800 w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-500 hover:text-black hover:bg-white rounded-md transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold border border-red-100">
                      Live Pet (Qty: 1 limit)
                    </div>
                  )}

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-500 font-bold text-sm px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} /> <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-gray-100 sticky top-24">
            <h2 className="text-2xl font-black text-gray-900 mb-8 border-b-2 border-gray-100 pb-4">Cart Summary</h2>
            
            <div className="space-y-4 pt-2 text-gray-600 font-medium text-lg">
              <div className="flex justify-between items-center">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-bold text-gray-800">₹{subtotal}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Charge</span>
                <span className="font-bold text-gray-800">₹{delivery}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Estimated Tax (5%)</span>
                <span className="font-bold text-[var(--color-brand-red)]">₹{tax}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mt-8 pt-6 border-t-2 border-gray-100 mb-8">
              <div>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Grand Total</p>
                <p className="text-gray-500 text-xs">Inclusive of all taxes</p>
              </div>
              <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{grandTotal}</span>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-5 bg-[var(--color-brand-red)] text-white rounded-2xl font-black text-xl shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:bg-[var(--color-brand-dark)] transition-all flex justify-center items-center gap-2"
            >
              Proceed to Checkout <ArrowRight size={22} />
            </button>
            <button 
              onClick={() => navigate('/shop')}
              className="w-full py-4 mt-4 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CartPage;
