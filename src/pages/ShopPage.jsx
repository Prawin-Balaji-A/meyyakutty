import React, { useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import PetCard from '../components/PetCard';
import { CardFlipProvider } from '../context/CardFlipContext';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowRight } from 'lucide-react';

const ShopPage = () => {
  const { pets } = useShop();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const bannerRef = useRef(null);
  const iconRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    // Title animation
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
    
    // Banner entrance animation
    gsap.fromTo(bannerRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)', delay: 0.2 }
    );

    // Continuous floating for banner
    gsap.to(bannerRef.current, {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Icon pulse
    gsap.to(iconRef.current, {
      scale: 1.1,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Grid stagger entrance
    if (gridRef.current) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, []);

  return (
    <CardFlipProvider>
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Sell & Care Premium Banner */}
        <div 
          ref={bannerRef}
          className="mb-12 bg-white rounded-[2rem] p-8 md:p-12 shadow-md border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-[80px] -z-0 pointer-events-none translate-x-1/4 -translate-y-1/4" />
          
          <div className="flex-1 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <div ref={iconRef} className="p-3 bg-red-50 rounded-2xl text-[var(--color-brand-red)] shadow-sm border border-red-100">
                <HeartPulse size={32} strokeWidth={2.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
                Sell & Care
              </h2>
            </div>
            <p className="text-gray-600 text-lg font-medium max-w-2xl leading-relaxed">
              {lang === 'en' 
                ? 'Join our community! Whether you want to sell your pet, request professional care services, or adopt a street cat, we provide a premium, hassle-free experience.' 
                : 'எங்கள் சமூகத்தில் இணையுங்கள்! உங்கள் செல்லப்பிராணியை விற்கவோ, பராமரிக்கவோ அல்லது தெருப் பூனையை தத்தெடுக்கவோ நாங்கள் உதவுகிறோம்.'}
            </p>
          </div>
          
          <button 
            onClick={(e) => {
              gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => navigate('/sell-care') });
            }}
            className="relative z-10 px-8 py-4 bg-[var(--color-brand-red)] text-white rounded-xl font-bold text-lg shadow-md hover:bg-[var(--color-brand-dark)] transition-colors flex items-center gap-2 active:scale-95"
          >
            <span>{lang === 'en' ? 'Get Started' : 'தொடங்குங்கள்'}</span>
            <ArrowRight size={20} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-10 mt-6 relative z-10">
          <h1 ref={titleRef} className="text-4xl md:text-5xl font-black text-gray-900 text-center tracking-tight drop-shadow-sm">
            {lang === 'en' ? 'Our Beloved Pets' : 'எங்கள் அன்பு செல்லப்பிராணிகள்'}
          </h1>
        </div>
        
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </CardFlipProvider>
  );
};

export default ShopPage;
