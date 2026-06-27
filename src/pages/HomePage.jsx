import React, { useMemo, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowRight, Fish, Dog, Cat, Bird, Package, Compass, ShieldCheck, ThumbsUp, Truck } from 'lucide-react';
import { gsap } from 'gsap';
import PetCard from '../components/PetCard';

const categoryIcons = {
  'Fish': <Fish size={40} className="text-blue-500" />,
  'Dogs': <Dog size={40} className="text-orange-500" />,
  'Cats': <Cat size={40} className="text-pink-500" />,
  'Birds': <Bird size={40} className="text-yellow-500" />,
  'Small Animals': <Compass size={40} className="text-green-500" />,
  'Supplies': <Package size={40} className="text-purple-500" />
};

const HomePage = () => {
  const { pets } = useShop();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const bannerRef = useRef(null);

  useEffect(() => {
    // Banner continuous pulse
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        boxShadow: '0px 10px 30px rgba(200, 16, 46, 0.15)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    }
  }, []);

  const categories = useMemo(() => {
    return [...new Set(pets.map(p => p.category))];
  }, [pets]);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 py-8">
      {/* Trust Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12 relative z-10">
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-white/50 hover:bg-white hover:scale-105 transition-all cursor-default">
          <ShieldCheck size={20} className="text-green-600" />
          <span className="font-bold text-gray-800 text-sm">{lang === 'en' ? '100% Healthy Pets' : '100% ஆரோக்கியமானவை'}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-white/50 hover:bg-white hover:scale-105 transition-all cursor-default">
          <ThumbsUp size={20} className="text-blue-600" />
          <span className="font-bold text-gray-800 text-sm">{lang === 'en' ? 'Verified Breeders' : 'சரிபார்க்கப்பட்டவர்கள்'}</span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md px-5 py-2.5 rounded-full shadow-sm border border-white/50 hover:bg-white hover:scale-105 transition-all cursor-default">
          <Truck size={20} className="text-orange-500" />
          <span className="font-bold text-gray-800 text-sm">{lang === 'en' ? 'Safe & Quick Delivery' : 'பாதுகாப்பான விநியோகம்'}</span>
        </div>
      </div>

      {/* Trending Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-[var(--color-brand-red)] pl-4">
            {lang === 'en' ? 'Trending Pets' : 'பிரபலமானவை'}
          </h2>
          <div 
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-[var(--color-brand-red)] font-bold cursor-pointer hover:underline group"
          >
            <span>{lang === 'en' ? 'View All' : 'அனைத்தையும் பார்க்க'}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        <div className="flex overflow-x-auto pb-8 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden gap-6">
          {pets.slice(0, 6).map((pet) => (
            <div key={pet.id} className="snap-start shrink-0 w-[280px] md:w-[320px]">
              <PetCard pet={pet} />
            </div>
          ))}
        </div>
      </div>

      {/* Level 1: Categories */}
      <div className="mb-16">
        <h2 className="text-3xl font-black text-gray-900 mb-8 border-l-4 border-[var(--color-brand-red)] pl-4">
          {lang === 'en' ? 'Browse by Category' : 'வகைகளை உலாவுக'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full">
          {categories.map(cat => {
            const representativeImage = pets.find(p => p.category === cat)?.imageUrl;
            return (
              <div 
                key={cat} 
                onClick={() => navigate(`/shop?category=${encodeURIComponent(cat)}`)}
                className="relative h-56 rounded-[2rem] overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {representativeImage ? (
                  <img src={representativeImage} alt={cat} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-lg border border-white/30 group-hover:bg-[var(--color-brand-red)] group-hover:scale-110 transition-all duration-300">
                    {categoryIcons[cat] || <Compass size={28} />}
                  </div>
                  <h3 className="text-2xl font-black text-white drop-shadow-md">{cat}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sell & Care Slim Banner */}
      <div 
        ref={bannerRef}
        className="mt-4 mb-8 bg-gradient-to-r from-white to-red-50 rounded-3xl p-6 md:p-8 shadow-sm border border-red-100 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
      >
        <div className="flex items-center gap-4 z-10">
          <div className="p-3 bg-white rounded-2xl text-[var(--color-brand-red)] shadow-sm">
            <HeartPulse size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800 tracking-tight">Sell & Care Services</h2>
            <p className="text-gray-600 font-medium text-sm md:text-base mt-1">Want to sell your pet or request professional care? We've got you covered.</p>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            gsap.to(e.currentTarget, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, onComplete: () => navigate('/sell-care') });
          }}
          className="z-10 px-6 py-3 bg-[var(--color-brand-red)] text-white rounded-xl font-bold shadow-md hover:bg-[var(--color-brand-dark)] transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <span>{lang === 'en' ? 'Get Started' : 'தொடங்குங்கள்'}</span>
          <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
};

export default HomePage;
