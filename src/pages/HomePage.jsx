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

      {/* Highlights & Offers */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900">
            {lang === 'en' ? "Today's Highlights & Offers" : "இன்றைய சலுகைகள்"}
          </h2>
          <div 
            onClick={() => navigate('/shop')}
            className="flex items-center gap-1 text-[var(--color-brand-red)] font-bold cursor-pointer hover:underline text-sm md:text-base"
          >
            <span>{lang === 'en' ? 'View All' : 'அனைத்தையும் பார்க்க'}</span>
            <ArrowRight size={16} />
          </div>
        </div>
        
        {/* Horizontal Scroll for Offers */}
        <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden gap-4">
          
          {/* Card 1: New Arrival */}
          <div className="snap-start shrink-0 w-[240px] md:w-[280px] bg-gradient-to-b from-orange-50 to-orange-100 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between h-[320px] shadow-sm border border-orange-200/50">
            <div>
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider bg-orange-200/50 px-2 py-1 rounded-md">New Arrival</span>
              <h3 className="text-xl font-black text-gray-900 mt-3 leading-tight">New Arrivals Today!</h3>
              <p className="text-sm text-gray-700 mt-2 font-medium">Adorable pets waiting for you</p>
            </div>
            <img src="/images/clean/cat_maine_coon_cat.jpg" alt="New Arrival" className="absolute -bottom-4 -right-4 w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg" />
            <div className="absolute bottom-4 left-4 bg-orange-500 text-white font-black text-sm px-4 py-2 rounded-full shadow-md z-10">
              NEW
            </div>
          </div>

          {/* Card 2: Special Offer */}
          <div className="snap-start shrink-0 w-[240px] md:w-[280px] bg-gradient-to-b from-emerald-50 to-emerald-100 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between h-[320px] shadow-sm border border-emerald-200/50">
            <div>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider bg-emerald-200/50 px-2 py-1 rounded-md">Special Offer</span>
              <h3 className="text-xl font-black text-gray-900 mt-3 leading-tight">Pet Accessories Discount</h3>
              <p className="text-sm text-gray-700 mt-2 font-medium">Quality products at great prices</p>
            </div>
            <img src="/images/clean/dog_comb.jpg" alt="Accessories" className="absolute -bottom-4 -right-4 w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg" />
            <div className="absolute bottom-4 left-4 bg-emerald-600 text-white font-black text-sm px-4 py-2 rounded-full shadow-md z-10 flex flex-col items-center leading-none">
              <span>20%</span>
              <span className="text-[10px]">OFF</span>
            </div>
          </div>

          {/* Card 3: Bird Food Offer */}
          <div className="snap-start shrink-0 w-[240px] md:w-[280px] bg-gradient-to-b from-amber-50 to-amber-100 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between h-[320px] shadow-sm border border-amber-200/50">
            <div>
              <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider bg-amber-200/50 px-2 py-1 rounded-md">Bird Food Offer</span>
              <h3 className="text-xl font-black text-gray-900 mt-3 leading-tight">Bird Food Special</h3>
              <p className="text-sm text-gray-700 mt-2 font-medium">Premium nutrition for your birds</p>
            </div>
            <img src="/images/clean/bird_food_trae.jpg" alt="Bird Food" className="absolute -bottom-4 -right-4 w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg" />
            <div className="absolute bottom-4 left-4 bg-amber-500 text-white font-black text-sm px-4 py-2 rounded-full shadow-md z-10 flex flex-col items-center leading-none">
              <span>15%</span>
              <span className="text-[10px]">OFF</span>
            </div>
          </div>

          {/* Card 4: Free Delivery */}
          <div className="snap-start shrink-0 w-[240px] md:w-[280px] bg-gradient-to-b from-blue-50 to-blue-100 rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between h-[320px] shadow-sm border border-blue-200/50">
            <div>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider bg-blue-200/50 px-2 py-1 rounded-md">Free Delivery</span>
              <h3 className="text-xl font-black text-gray-900 mt-3 leading-tight">Free Delivery Offer</h3>
              <p className="text-sm text-gray-700 mt-2 font-medium">On orders above ₹499</p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-white rounded-full flex items-center justify-center border-4 border-blue-100 shadow-lg">
               <Package size={64} className="text-blue-400" />
            </div>
            <div className="absolute bottom-4 left-4 bg-blue-500 text-white font-black text-xs px-4 py-2 rounded-full shadow-md z-10 text-center leading-tight">
              LIMITED<br/>OFFER
            </div>
          </div>
          
        </div>

        {/* Promo Banner */}
        <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-[2rem] p-6 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-sm border border-emerald-200/50 group cursor-pointer" onClick={() => navigate('/shop')}>
           <div className="relative z-10 max-w-sm">
             <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider bg-emerald-200/60 px-2 py-1 rounded-md">Today's Promo</span>
             <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-4 leading-tight">Pamper your pet, every day!</h2>
             <p className="text-gray-700 font-medium mt-3 mb-6">Shop now & get exciting discounts on pet essentials.</p>
             <button className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-md">
               Shop Now <ArrowRight size={18} />
             </button>
           </div>
           
           <div className="relative z-10 mt-8 md:mt-0 right-0 md:absolute md:right-10 md:bottom-0 flex justify-end w-full md:w-auto">
              <img src="/images/clean/dog_golden_retriever.jpg" alt="Happy Pet" className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full border-4 border-white shadow-xl transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute -top-4 -right-4 md:-top-4 md:-right-4 bg-emerald-500 text-white w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shadow-lg rotate-12">
                 %
              </div>
           </div>
           
           <div className="absolute inset-0 bg-white/20 pointer-events-none" />
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
