import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import PetCard from '../components/PetCard';
import { CardFlipProvider } from '../context/CardFlipContext';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, ArrowRight, ChevronLeft, Fish, Dog, Cat, Bird, Package, Compass } from 'lucide-react';

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
  const iconRef = useRef(null);
  const gridRef = useRef(null);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    // Banner entrance animation
    gsap.fromTo(bannerRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }
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
  }, []);

  // Compute Categories
  const categories = useMemo(() => {
    return [...new Set(pets.map(p => p.category))];
  }, [pets]);

  // Compute Subcategories for selected category
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    const filtered = pets.filter(p => p.category === selectedCategory);
    const subs = [...new Set(filtered.map(p => p.subcategory))];
    // Skip subcategory level if there's only one subcategory that matches the category name
    if (subs.length === 1 && subs[0] === selectedCategory) return [];
    return subs;
  }, [selectedCategory, pets]);

  // Compute Pets to display
  const displayedPets = useMemo(() => {
    if (selectedSubcategory) {
      return pets.filter(p => p.category === selectedCategory && p.subcategory === selectedSubcategory);
    }
    if (selectedCategory && subcategories.length === 0) {
      // Direct render (e.g. Dogs, Cats, Small Animals)
      return pets.filter(p => p.category === selectedCategory);
    }
    return [];
  }, [selectedCategory, selectedSubcategory, pets, subcategories]);

  // Animate grid children on state change
  useEffect(() => {
    if (gridRef.current && gridRef.current.children.length > 0) {
      gsap.fromTo(gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
      );
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

        {/* Dynamic Header & Back Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 mt-6 relative z-10 border-b-2 border-gray-100 pb-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {selectedCategory && (
              <button 
                onClick={handleBack}
                className="p-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl transition-colors active:scale-95 shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight drop-shadow-sm">
              {!selectedCategory 
                ? (lang === 'en' ? 'Browse Categories' : 'வகைகளை உலாவுக') 
                : selectedSubcategory 
                  ? selectedSubcategory 
                  : selectedCategory}
            </h1>
          </div>
        </div>
        
        {/* Dynamic Grid Rendering */}
        <div ref={gridRef} className="relative z-10">
          
          {/* Level 1: Categories */}
          {!selectedCategory && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map(cat => (
                <div 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className="bg-white rounded-[2rem] p-8 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center gap-4 group text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-50 transition-all duration-300">
                    {categoryIcons[cat] || <Compass size={40} className="text-gray-400" />}
                  </div>
                  <h3 className="text-xl font-black text-gray-800">{cat}</h3>
                </div>
              ))}
            </div>
          )}

          {/* Level 2: Subcategories */}
          {selectedCategory && !selectedSubcategory && subcategories.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {subcategories.map(sub => (
                <div 
                  key={sub} 
                  onClick={() => setSelectedSubcategory(sub)}
                  className="bg-white rounded-[2rem] p-6 cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center gap-4 group text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300 text-blue-500">
                    <Compass size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{sub}</h3>
                </div>
              ))}
            </div>
          )}

          {/* Level 3: Pets / Items */}
          {((selectedCategory && subcategories.length === 0) || selectedSubcategory) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedPets.map(pet => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}

        </div>
      </div>
    </CardFlipProvider>
  );
};

export default ShopPage;
