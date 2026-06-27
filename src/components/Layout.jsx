import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { MessageCircle, ShoppingCart, Home, Store, HeartHandshake, Info, Bell } from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';

const Layout = () => {
  const { cartItems } = useCart();
  const { unreadCount } = useNotifications();
  const whatsappRef = useRef(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
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
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-bold text-white hover:text-red-200 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="font-bold text-white hover:text-red-200 transition-colors">
              Shop
            </Link>
            <Link to="/sell-care" className="font-bold text-white hover:text-red-200 transition-colors">
              Sell & Care
            </Link>
            <Link to="/about" className="font-bold text-white hover:text-red-200 transition-colors">
              About Us
            </Link>
          </nav>

          {/* Action Icons (Visible on all screens) */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => setIsNotifOpen(true)}
              className="relative p-1 md:p-2 text-white hover:text-red-200 transition-colors"
            >
              <Bell size={22} className="md:w-6 md:h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-white border border-[var(--color-brand-red)] rounded-full flex items-center justify-center -translate-y-1/4 translate-x-1/4 shadow-sm animate-pulse"></span>
              )}
            </button>
            <Link 
              to="/cart"
              className="relative p-1 md:p-2 text-white hover:text-red-200 transition-colors"
            >
              <ShoppingCart size={22} className="md:w-6 md:h-6" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-white text-[var(--color-brand-red)] text-[10px] font-bold rounded-full flex items-center justify-center -translate-y-1/4 translate-x-1/4 shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>

      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

      {/* Floating WhatsApp Button */}
      <button
        ref={whatsappRef}
        onClick={handleWhatsAppClick}
        className="fixed bottom-24 md:bottom-8 right-6 z-50 group flex items-center gap-0 cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        {/* Tooltip / Expandable text */}
        <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[150px] group-hover:opacity-100 group-hover:mr-3 transition-all duration-500 ease-out bg-white text-gray-800 font-bold px-0 py-2 rounded-xl shadow-lg whitespace-nowrap group-hover:px-4 border border-gray-100">
          Chat with us!
        </span>
        
        {/* Button Circle */}
        <div className="bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.6)] transition-all flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </button>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
        <div className="flex items-center justify-around h-16">
          <Link to="/" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/' ? 'text-[var(--color-brand-red)]' : 'text-gray-500'}`}>
            <Home size={24} />
            <span className="text-[10px] font-bold">Home</span>
          </Link>
          <Link to="/shop" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/shop' ? 'text-[var(--color-brand-red)]' : 'text-gray-500'}`}>
            <Store size={24} />
            <span className="text-[10px] font-bold">Shop</span>
          </Link>
          <Link to="/sell-care" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/sell-care' ? 'text-[var(--color-brand-red)]' : 'text-gray-500'}`}>
            <HeartHandshake size={24} />
            <span className="text-[10px] font-bold">Care</span>
          </Link>
          <Link to="/about" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/about' ? 'text-[var(--color-brand-red)]' : 'text-gray-500'}`}>
            <Info size={24} />
            <span className="text-[10px] font-bold">About</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
