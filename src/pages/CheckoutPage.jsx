import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { CheckCircle2, ChevronRight, Loader2, ShieldCheck, MapPin, Phone, User, Store, CreditCard, X } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, subtotal, tax, clearCart } = useCart();
  const { addOrder } = useOrders();
  const { updatePetStock } = useShop();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // 'delivery' or 'pickup'
  
  const [formData, setFormData] = useState({ 
    fullName: '', 
    mobile: '', 
    address: '',
    city: '',
    pincode: ''
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRazorpayMock, setShowRazorpayMock] = useState(false);
  const [razorpayStatus, setRazorpayStatus] = useState('idle'); // idle, processing, success, failed

  const containerRef = useRef(null);
  const summaryRef = useRef(null);
  const progressLineRef = useRef(null);
  const modalRef = useRef(null);

  // Delivery fee logic
  const deliveryFee = deliveryMethod === 'delivery' && subtotal > 0 ? 100 : 0;
  const grandTotal = subtotal > 0 ? subtotal + tax + deliveryFee : 0;

  useEffect(() => {
    if (cartItems.length === 0 && !isProcessing && !showRazorpayMock) {
      navigate('/cart');
    }
    gsap.fromTo(containerRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' });
    gsap.fromTo(summaryRef.current, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
  }, [cartItems, navigate, isProcessing, showRazorpayMock]);

  useEffect(() => {
    // Progress line animation
    gsap.to(progressLineRef.current, {
      width: step === 1 ? '50%' : '100%',
      duration: 0.6,
      ease: 'power2.out'
    });
  }, [step]);

  useEffect(() => {
    if (showRazorpayMock && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.9, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [showRazorpayMock]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isNameValid = formData.fullName.trim().length >= 3;
  const isMobileValid = /^\d{10}$/.test(formData.mobile);
  
  // Address is only required if deliveryMethod is 'delivery'
  const isAddressValid = deliveryMethod === 'pickup' || (
    formData.address.trim().length >= 5 && 
    formData.city.trim().length >= 2 && 
    formData.pincode.trim().length === 6
  );
  
  const isStep1Valid = isNameValid && isMobileValid && isAddressValid;

  const proceedToPayment = (e) => {
    if (isStep1Valid) {
      gsap.fromTo(e.currentTarget, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
      setStep(2);
      setTimeout(() => {
        gsap.fromTo('.payment-step', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
      }, 50);
    }
  };

  const initiateRazorpay = () => {
    setShowRazorpayMock(true);
    setRazorpayStatus('idle');
  };

  const processMockPayment = () => {
    setRazorpayStatus('processing');
    
    // Simulate network delay for payment processing
    setTimeout(() => {
      // 95% success rate for mock
      const isSuccess = Math.random() > 0.05;
      
      if (isSuccess) {
        setRazorpayStatus('success');
        const paymentId = `pay_mock_${Math.random().toString(36).substr(2, 9)}`;
        
        setTimeout(() => {
          finalizeOrder(paymentId);
        }, 1500);
      } else {
        setRazorpayStatus('failed');
      }
    }, 2500);
  };

  const finalizeOrder = (paymentId) => {
    setShowRazorpayMock(false);
    setIsProcessing(true);
    
    setTimeout(() => {
      const orderData = {
        customer: formData,
        deliveryMethod,
        items: cartItems,
        subtotal,
        deliveryFee,
        tax,
        total: grandTotal,
        paymentId,
        paymentMethod: 'Razorpay',
        paymentStatus: 'Paid'
      };
      
      const order = addOrder(orderData);
      
      // Update stock for all items
      cartItems.forEach(item => {
        updatePetStock(item.id, item.quantity, item.category === 'Supplies');
      });
      
      clearCart();
      navigate('/success', { state: { orderId: order.id } });
    }, 1000);
  };

  const handleCashOnDelivery = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderData = {
        customer: formData,
        deliveryMethod,
        items: cartItems,
        subtotal,
        deliveryFee,
        tax,
        total: grandTotal,
        paymentId: `cod_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending'
      };
      
      const order = addOrder(orderData);
      
      cartItems.forEach(item => {
        updatePetStock(item.id, item.quantity, item.category === 'Supplies');
      });
      
      clearCart();
      navigate('/success', { state: { orderId: order.id } });
    }, 2000);
  };

  const inputClass = "w-full p-4 pl-12 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium text-gray-800";
  const inputClassNoIcon = "w-full p-4 rounded-xl border-2 border-gray-100 bg-gray-50 focus:bg-white focus:border-[var(--color-brand-red)] focus:ring-4 focus:ring-red-50 outline-none transition-all font-medium text-gray-800";

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 w-full flex flex-col lg:flex-row gap-10 relative">
      
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
              <User className="text-[var(--color-brand-red)]" /> Customer Details
            </h2>
            <div className="space-y-6 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className={inputClass} placeholder="e.g. Meyya Kutty" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="tel" name="mobile" maxLength="10" value={formData.mobile} onChange={(e) => {
                      if (!/^\d*$/.test(e.target.value)) return;
                      handleInputChange(e);
                    }} className={inputClass} placeholder="10 digit number" />
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2 border-t border-gray-100 pt-8">
              <MapPin className="text-[var(--color-brand-red)]" /> Delivery Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div 
                onClick={() => setDeliveryMethod('delivery')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${deliveryMethod === 'delivery' ? 'border-[var(--color-brand-red)] bg-red-50' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${deliveryMethod === 'delivery' ? 'border-[var(--color-brand-red)]' : 'border-gray-300'}`}>
                  {deliveryMethod === 'delivery' && <div className="w-3 h-3 bg-[var(--color-brand-red)] rounded-full" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Home Delivery</h4>
                  <p className="text-sm text-gray-500 font-medium">Delivered to your doorstep (+₹100)</p>
                </div>
              </div>

              <div 
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${deliveryMethod === 'pickup' ? 'border-[var(--color-brand-red)] bg-red-50' : 'border-gray-100 hover:border-gray-300'}`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center ${deliveryMethod === 'pickup' ? 'border-[var(--color-brand-red)]' : 'border-gray-300'}`}>
                  {deliveryMethod === 'pickup' && <div className="w-3 h-3 bg-[var(--color-brand-red)] rounded-full" />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Store Pickup</h4>
                  <p className="text-sm text-gray-500 font-medium">Pick up from our store (Free)</p>
                </div>
              </div>
            </div>

            {/* Address Fields only if Delivery is selected */}
            {deliveryMethod === 'delivery' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">Full Address *</label>
                  <textarea name="address" rows="3" value={formData.address} onChange={handleInputChange} className={inputClassNoIcon} placeholder="House no, Street Name, Landmark" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">City *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={inputClassNoIcon} placeholder="City Name" />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-2 text-sm uppercase tracking-wider">Pincode *</label>
                    <input type="text" name="pincode" maxLength="6" value={formData.pincode} onChange={(e) => {
                      if (!/^\d*$/.test(e.target.value)) return;
                      handleInputChange(e);
                    }} className={inputClassNoIcon} placeholder="6 Digits" />
                  </div>
                </div>
              </div>
            )}
            
            <button 
              onClick={proceedToPayment} 
              disabled={!isStep1Valid}
              className={`w-full py-5 mt-10 rounded-xl font-black text-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                isStep1Valid ? 'bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-dark)] text-white hover:-translate-y-1' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue to Payment <ChevronRight />
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 payment-step">
            <h2 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-2">
              <CreditCard className="text-[var(--color-brand-red)]" /> Select Payment Method
            </h2>
            
            <div className="space-y-4 mb-10">
              <label className="flex items-center justify-between p-6 border-2 border-gray-100 hover:border-gray-300 bg-gray-50 rounded-2xl cursor-pointer shadow-sm transition-all group hover:bg-white" onClick={initiateRazorpay}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-black italic shadow-inner">UPI</div>
                  <div>
                    <span className="font-black text-xl text-gray-900 block group-hover:text-blue-600 transition-colors">Razorpay Secure</span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">UPI, Cards, NetBanking</span>
                  </div>
                </div>
                <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
              </label>

              <label className="flex items-center justify-between p-6 border-2 border-gray-100 hover:border-[var(--color-brand-red)] bg-gray-50 rounded-2xl cursor-pointer shadow-sm transition-all group hover:bg-red-50" onClick={handleCashOnDelivery}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center group-hover:bg-[var(--color-brand-red)] group-hover:text-white transition-colors">
                    <Store size={24} />
                  </div>
                  <div>
                    <span className="font-black text-xl text-gray-900 block group-hover:text-[var(--color-brand-red)] transition-colors">Cash on {deliveryMethod === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Pay when you receive it</span>
                  </div>
                </div>
                {isProcessing ? <Loader2 className="animate-spin text-[var(--color-brand-red)]" /> : <ChevronRight className="text-gray-400 group-hover:text-[var(--color-brand-red)] transition-colors" />}
              </label>
            </div>

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
                  </div>
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
              <span className="font-bold text-gray-800">
                {deliveryMethod === 'pickup' ? (
                   <span className="text-green-500 text-sm uppercase tracking-wider">Free Pickup</span>
                ) : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (5%)</span>
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

      {/* Razorpay Mock Modal */}
      {showRazorpayMock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div ref={modalRef} className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="bg-blue-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded flex items-center justify-center font-black text-blue-600 text-xl italic shadow-md">R</div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">Razorpay Secure</h3>
                  <p className="text-blue-200 text-xs font-medium">MeyyaKutty Pet Shop</p>
                </div>
              </div>
              {razorpayStatus === 'idle' && (
                <button onClick={() => setShowRazorpayMock(false)} className="text-white/80 hover:text-white transition-colors p-1">
                  <X size={24} />
                </button>
              )}
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Amount to Pay</span>
                <span className="text-3xl font-black text-gray-900">₹{grandTotal}</span>
              </div>
              
              {razorpayStatus === 'idle' && (
                <div className="space-y-4">
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-xl">
                    <p className="text-sm text-blue-800 font-medium text-center">
                      This is a highly-realistic <b>Razorpay Simulation</b> since there is no NodeJS backend.
                    </p>
                  </div>
                  <button 
                    onClick={processMockPayment}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-colors flex justify-center items-center gap-2"
                  >
                    Simulate Successful Payment
                  </button>
                </div>
              )}

              {razorpayStatus === 'processing' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <Loader2 size={48} className="text-blue-600 animate-spin" />
                  <p className="text-gray-600 font-bold">Processing payment securely...</p>
                  <p className="text-xs text-gray-400">Please do not close this window</p>
                </div>
              )}

              {razorpayStatus === 'success' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-green-600" />
                  </div>
                  <p className="text-xl font-black text-green-700">Payment Successful!</p>
                  <p className="text-sm text-gray-500">Redirecting to order confirmation...</p>
                </div>
              )}

              {razorpayStatus === 'failed' && (
                <div className="flex flex-col items-center justify-center py-10 space-y-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <X size={40} className="text-red-600" />
                  </div>
                  <p className="text-xl font-black text-red-700">Payment Failed</p>
                  <button 
                    onClick={() => setRazorpayStatus('idle')}
                    className="mt-4 px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 p-3 text-center flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
               <ShieldCheck size={14} /> 100% Secure by Razorpay
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CheckoutPage;
