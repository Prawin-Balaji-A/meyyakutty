import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { CheckCircle2, ChevronRight, Loader2, ShieldCheck, MapPin, Phone, User, Package, CreditCard } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, subtotal, delivery, tax, grandTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ fullName: '', mobile: '', address: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  const containerRef = useRef(null);
  const summaryRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    if (cartItems.length === 0 && !isProcessing) {
      navigate('/');
    }
    gsap.fromTo(containerRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
    gsap.fromTo(summaryRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
  }, [cartItems, navigate, isProcessing]);

  useEffect(() => {
    // Progress line animation
    gsap.to(progressLineRef.current, {
      width: step === 1 ? '50%' : '100%',
      duration: 0.6,
      ease: 'power2.out'
    });
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isNameValid = formData.fullName.trim().length >= 3;
  const isMobileValid = /^\d{10}$/.test(formData.mobile);
  const isAddressValid = formData.address.trim().length >= 5;
  const isStep1Valid = isNameValid && isMobileValid && isAddressValid;

  const proceedToPayment = (e) => {
    if (isStep1Valid) {
      // Ripple button effect
      gsap.fromTo(e.currentTarget, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
      setStep(2);
      setTimeout(() => {
        gsap.fromTo('.payment-step', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }, 50);
    }
  };

  const handlePlaceOrder = (e) => {
    gsap.fromTo(e.currentTarget, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    setIsProcessing(true);
    setTimeout(() => {
      const orderData = {
        customer: formData,
        items: cartItems,
        total: grandTotal,
      };
      const order = addOrder(orderData);
      clearCart();
      navigate('/success', { state: { orderId: order.id } });
    }, 2500);
  };

  const inputClass = "w-full p-4 pl-12 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium text-gray-800";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full flex flex-col lg:flex-row gap-10">
      
      {/* Checkout Flow */}
      <div className="lg:w-3/5" ref={containerRef}>
        <div className="flex items-center gap-3 mb-10">
          <ShieldCheck className="text-[var(--color-brand-red)] w-8 h-8" />
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">Secure Checkout</h1>
        </div>
        
        {/* Animated Step Indicator */}
        <div className="relative mb-12 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full overflow-hidden">
            <div ref={progressLineRef} className="h-full bg-[var(--color-brand-red)] w-1/2 rounded-full" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 1 ? 'bg-[var(--color-brand-red)] text-white shadow-[0_0_20px_rgba(200,16,46,0.4)]' : 'bg-gray-100 text-gray-400'}`}>
              {step > 1 ? <CheckCircle2 size={24} /> : '1'}
            </div>
            <span className={`font-bold text-sm uppercase tracking-wider ${step >= 1 ? 'text-gray-800' : 'text-gray-400'}`}>Information</span>
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-2 bg-white px-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-500 ${step >= 2 ? 'bg-[var(--color-brand-red)] text-white shadow-[0_0_20px_rgba(200,16,46,0.4)]' : 'bg-gray-100 text-gray-400'}`}>
              2
            </div>
            <span className={`font-bold text-sm uppercase tracking-wider ${step >= 2 ? 'text-gray-800' : 'text-gray-400'}`}>Payment</span>
          </div>
        </div>

        {/* Step 1: Information */}
        {step === 1 && (
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 info-form">
            <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-2">
              <MapPin className="text-[var(--color-brand-red)]" /> Delivery Details
            </h2>
            <div className="space-y-6">
              <div className="relative">
                <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={inputClass} placeholder="e.g. Meyya Kutty" />
                </div>
                {formData.fullName.length > 0 && !isNameValid && (
                  <p className="text-[var(--color-brand-red)] mt-2 font-bold text-sm flex items-center gap-1">
                    Minimum 3 characters required.
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">Mobile Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="tel" name="mobile" maxLength="10" value={formData.mobile} onChange={(e) => {
                    if (!/^\d*$/.test(e.target.value)) return;
                    handleInputChange(e);
                  }} className={inputClass} placeholder="10 digit mobile number" />
                </div>
                {formData.mobile.length > 0 && !isMobileValid && (
                  <p className="text-[var(--color-brand-red)] mt-2 font-bold text-sm flex items-center gap-1">
                    Exactly 10 numeric digits required.
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">Full Address *</label>
                <textarea name="address" rows="3" value={formData.address} onChange={handleInputChange} className={`${inputClass} pl-4`} placeholder="House no, Street, City, Pincode" />
                {formData.address.length > 0 && !isAddressValid && (
                  <p className="text-[var(--color-brand-red)] mt-2 font-bold text-sm flex items-center gap-1">
                    Please enter a valid address.
                  </p>
                )}
              </div>
              
              <button 
                onClick={proceedToPayment} 
                disabled={!isStep1Valid}
                className={`w-full py-5 mt-4 rounded-xl font-black text-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isStep1Valid ? 'bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-dark)] text-white hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Continue to Payment <ChevronRight />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 payment-step">
            <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-2">
              <CreditCard className="text-[var(--color-brand-red)]" /> Select Payment Method
            </h2>
            
            <div className="space-y-4 mb-10">
              <label className="flex items-center justify-between p-6 border-2 border-[var(--color-brand-red)] bg-red-50/50 rounded-2xl cursor-pointer shadow-sm transition-all hover:bg-red-50">
                <div className="flex items-center gap-4">
                  <input type="radio" name="payment" defaultChecked className="w-6 h-6 accent-[var(--color-brand-red)]" />
                  <span className="font-black text-xl text-gray-900">Cash on Delivery</span>
                </div>
                <Package className="text-[var(--color-brand-red)] opacity-50" />
              </label>
              
              <label className="flex items-center justify-between p-6 border-2 border-gray-100 bg-gray-50 rounded-2xl opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-4">
                  <input type="radio" name="payment" disabled className="w-6 h-6" />
                  <span className="font-bold text-xl text-gray-500">UPI / Credit Card</span>
                </div>
                <span className="text-xs font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded-full uppercase">Coming Soon</span>
              </label>
            </div>

            <button 
              onClick={handlePlaceOrder} 
              disabled={isProcessing}
              className={`w-full py-5 text-white rounded-xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 ${
                isProcessing ? 'bg-[var(--color-brand-dark)] opacity-90 scale-95' : 'bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-dark)] active:scale-95'
              }`}
            >
              {isProcessing ? <><Loader2 className="animate-spin w-6 h-6" /> Processing Securely...</> : 'Confirm & Place Order'}
            </button>
            <button onClick={() => setStep(1)} disabled={isProcessing} className="w-full mt-4 py-4 text-gray-500 font-bold hover:text-gray-800 hover:bg-gray-50 rounded-xl transition-colors">
              &larr; Back to Information
            </button>
          </div>
        )}
      </div>

      {/* Premium Order Summary */}
      <div className="lg:w-2/5" ref={summaryRef}>
        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-gray-100 sticky top-24">
          <h2 className="text-2xl font-black text-gray-900 mb-8 border-b-2 border-gray-100 pb-4">Order Summary</h2>
          
          <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
            {cartItems.map(item => (
              <div key={item.id} className="flex gap-5 items-start group">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shadow-inner flex-shrink-0">
                  <img src={item.imageUrl} alt={item.breed} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-black text-lg text-gray-800 line-clamp-1">{item.breed}</h4>
                    <span className="font-black text-lg text-[var(--color-brand-red)] whitespace-nowrap">₹{item.price * item.quantity}</span>
                  </div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{item.category}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-bold bg-gray-100 text-gray-700 px-3 py-1 rounded-lg">Qty: {item.quantity}</span>
                    <span className="text-sm text-gray-500">₹{item.price} / each</span>
                  </div>
                  {item.category !== 'Supplies' && item.isVaccinated !== undefined && (
                     <p className="text-xs font-bold text-green-600 mt-2">✓ Vaccinated</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t-2 border-gray-100 text-gray-600 font-medium text-lg">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-gray-800">₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span className="font-bold text-gray-800">₹{delivery}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-bold text-[var(--color-brand-red)]">₹{tax}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-8 pt-6 border-t-2 border-[var(--color-brand-red)]">
            <div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Grand Total</p>
              <p className="text-gray-500 text-xs">Inclusive of all taxes</p>
            </div>
            <span className="text-4xl font-black text-gray-900 tracking-tighter">₹{grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
