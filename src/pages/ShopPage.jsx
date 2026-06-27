import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import PetCard from '../components/PetCard';
import { CardFlipProvider } from '../context/CardFlipContext';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowRight, ChevronLeft, Fish, Dog, Cat, Bird, Package, Compass, Sparkles, ShieldCheck, ThumbsUp, Truck } from 'lucide-react';

const categoryIcons = {
  'Fish': <Fish size={40} className="text-blue-500" />,
  'Dogs': <Dog size={40} className="text-orange-500" />,
  'Cats': <Cat size={40} className="text-pink-500" />,
  'Birds': <Bird size={40} className="text-yellow-500" />,
  'Small Animals': <Compass size={40} className="text-green-500" />,
  'Supplies': <Package size={40} className="text-purple-500" />
};

const ShopPage = () => {
  const { pets } = useShop();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  const gridRef = useRef(null);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

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
  }, [selectedCategory]);

  // Compute Categories
  const categories = useMemo(() => {
    return [...new Set(pets.map(p => p.category))];
  }, [pets]);

  // Compute Subcategories for selected category
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const filtered = pets.filter(p => p.category === selectedCategory);
    const subs = [...new Set(filtered.map(p => p.subcategory))];
    if (subs.length === 1 && subs[0] === selectedCategory) return [];
    return subs;
  }, [selectedCategory, pets]);

  // Compute Pets to display
  const displayedPets = useMemo(() => {
    if (selectedSubcategory) {
      return pets.filter(p => p.category === selectedCategory && p.subcategory === selectedSubcategory);
    }
    if (selectedCategory && subcategories.length === 0) {
      return pets.filter(p => p.category === selectedCategory);
    }
    return [];
  }, [selectedCategory, selectedSubcategory, pets, subcategories]);

  // Animate grid children on state change
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.group');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }
  }, [selectedCategory, selectedSubcategory]);

  const handleBack = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else if (selectedCategory) {
      setSelectedCategory(null);
    }
  };

  return (
    <CardFlipProvider>
      <div className="max-w-7xl w-full mx-auto px-4 py-8">
        
        {/* Dynamic Header */}
        {selectedCategory && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 mt-6 relative z-10 border-b-2 border-gray-100 pb-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button 
                onClick={handleBack}
                className="p-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl transition-colors active:scale-95 shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight drop-shadow-sm">
                {selectedSubcategory ? selectedSubcategory : selectedCategory}
              </h1>
            </div>
          </div>
        )}
        
        {/* Dynamic Grid Rendering */}
        <div ref={gridRef} className="relative z-10 w-full">
          
          {/* Trust Badges */}
          {!selectedCategory && (
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
          )}

          {/* Trending Section */}
          {!selectedCategory && (
            <div className="mb-16">
               <div className="flex items-center justify-between mb-8">
                 <h2 className="text-3xl font-black text-gray-900 border-l-4 border-[var(--color-brand-red)] pl-4">
                   {lang === 'en' ? 'Trending Pets' : 'பிரபலமானவை'}
                 </h2>
                 <div className="flex items-center gap-2 text-[var(--color-brand-red)] font-bold cursor-pointer hover:underline group">
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
          )}
          
          {/* Level 1: Categories */}
          {!selectedCategory && (
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
                      onClick={() => setSelectedCategory(cat)}
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
          )}

          {/* Level 2: Subcategories */}
          {selectedCategory && !selectedSubcategory && subcategories.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16 w-full">
              {subcategories.map(sub => {
                const representativeImage = pets.find(p => p.category === selectedCategory && p.subcategory === sub)?.imageUrl;
                return (
                  <div 
                    key={sub} 
                    onClick={() => setSelectedSubcategory(sub)}
                    className="relative h-48 rounded-[2rem] overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50"
                  >
                    {representativeImage ? (
                      <img src={representativeImage} alt={sub} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-0 p-5 flex flex-col items-center justify-end">
                       <h3 className="text-xl font-bold text-white drop-shadow-md text-center">{sub}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Level 3: Pets / Items */}
          {((selectedCategory && subcategories.length === 0) || selectedSubcategory) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 w-full">
              {displayedPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}

        </div>

        {/* Sell & Care Slim Banner (Moved below categories) */}
        {!selectedCategory && (
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
        )}

      </div>
    </CardFlipProvider>
  );
};

export default ShopPage;
