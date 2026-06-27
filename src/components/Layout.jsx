import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { MessageCircle, ShoppingCart, Home, Store, HeartHandshake, Info } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const { lang, toggleLang } = useLanguage();
  const { cartItems } = useCart();
  const whatsappRef = useRef(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Floating WhatsApp animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(whatsappRef.current, {
      y: -10,
      duration: 2,
      ease: 'sine.inOut'
    });

    // Pulse effect
    gsap.to(whatsappRef.current, {
      scale: 1.05,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      boxShadow: '0 0 15px rgba(37, 211, 102, 0.6)'
    });
  }, []);

  const handleWhatsAppClick = () => {
    const primary = '917200271113';
    // Deep link directly to WhatsApp API
    window.open(`https://wa.me/${primary}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header (Mobile App Style App Bar) */}
      <header className="sticky top-0 z-50 shadow-md bg-[var(--color-brand-red)] text-white">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-full shadow-sm">
              <img src="/logo.jpg" alt="Meyyakutty Logo" className="h-10 w-10 object-contain rounded-full" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            </div>
            <span className="text-2xl font-black text-white tracking-wider">
              MEYYAKUTTY
            </span>
          </Link>
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-bold text-white hover:text-red-200 transition-colors">
              {lang === 'en' ? 'Home' : 'முகப்பு'}
            </Link>
            <Link to="/shop" className="font-bold text-white hover:text-red-200 transition-colors">
              {lang === 'en' ? 'Shop' : 'கடை'}
            </Link>
            <Link to="/sell-care" className="font-bold text-white hover:text-red-200 transition-colors">
              {lang === 'en' ? 'Sell & Care' : 'விற்க & பராமரிக்க'}
            </Link>
            <Link to="/about" className="font-bold text-white hover:text-red-200 transition-colors">
              {lang === 'en' ? 'About Us' : 'எங்களை பற்றி'}
            </Link>
            <button 
              onClick={toggleLang}
              className="px-3 py-1 bg-white text-[var(--color-brand-red)] rounded-full font-black text-xs shadow-sm hover:bg-gray-100 transition-colors"
            >
              {lang === 'en' ? 'TA' : 'EN'}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-red-200 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-white text-[var(--color-brand-red)] text-xs font-bold rounded-full flex items-center justify-center -translate-y-1/4 translate-x-1/4 shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Floating WhatsApp Button (Adjusted for bottom nav on mobile) */}
      <button
        ref={whatsappRef}
        onClick={handleWhatsAppClick}
        className="fixed bottom-24 md:bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle size={28} />
      </button>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
        <div className="flex items-center justify-around h-16">
          <Link to="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/' ? 'text-[var(--color-brand-red)]' : 'text-gray-500'}`}>
            <Home size={24} />
            <span className="text-[10px] font-bold">{lang === 'en' ? 'Home' : 'முகப்பு'}</span>
          </Link>
          <Link to="/shop" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/shop' ? 'text-[var(--color-brand-red)]' : 'text-gray-500'}`}>
            <Store size={24} />
            <span className="text-[10px] font-bold">{lang === 'en' ? 'Shop' : 'கடை'}</span>
          </Link>
          <Link to="/sell-care" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/sell-care' ? 'text-[var(--color-brand-red)]' : 'text-gray-500'}`}>
            <HeartHandshake size={24} />
            <span className="text-[10px] font-bold">{lang === 'en' ? 'Care' : 'பராமரிப்பு'}</span>
          </Link>
          <Link to="/about" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/about' ? 'text-[var(--color-brand-red)]' : 'text-gray-500'}`}>
            <Info size={24} />
            <span className="text-[10px] font-bold">{lang === 'en' ? 'About' : 'பற்றி'}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
