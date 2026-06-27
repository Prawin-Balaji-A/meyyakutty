import React, { useEffect, useRef, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import PetCard from '../components/PetCard';
import { CardFlipProvider } from '../context/CardFlipContext';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, Fish, Dog, Cat, Bird, Package, Compass } from 'lucide-react';

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
  const gridRef = useRef(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const selectedSubcategory = searchParams.get('subcategory');

  const setCategory = (cat) => {
    setSearchParams({ category: cat });
  };

  const setSubcategory = (sub) => {
    setSearchParams({ category: selectedCategory, subcategory: sub });
  };

  const handleBack = () => {
    if (selectedSubcategory) {
      setSearchParams({ category: selectedCategory });
    } else if (selectedCategory) {
      setSearchParams({});
    }
  };

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
    if (!selectedCategory && !selectedSubcategory) {
       // if we want to show all pets initially? 
       // No, we show Level 1 categories if no category is selected.
       return [];
    }
    return [];
  }, [selectedCategory, selectedSubcategory, pets, subcategories]);

  // Animate grid children on state change
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.group, .pet-card-wrapper');
      if (cards.length > 0) {
        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }
  }, [selectedCategory, selectedSubcategory]);

  return (
    <CardFlipProvider>
      <div className="max-w-7xl w-full mx-auto px-4 py-8 min-h-screen">
        
        {/* Header / Breadcrumb */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 relative z-10 border-b-2 border-gray-100 pb-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            {selectedCategory ? (
              <button 
                onClick={handleBack}
                className="p-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl transition-colors active:scale-95 shadow-sm"
              >
                <ChevronLeft size={24} />
              </button>
            ) : null}
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight drop-shadow-sm">
              {selectedSubcategory ? selectedSubcategory : (selectedCategory ? selectedCategory : (lang === 'en' ? 'Shop All Categories' : 'அனைத்து வகைகளும்'))}
            </h1>
          </div>
        </div>
        
        {/* Dynamic Grid Rendering */}
        <div ref={gridRef} className="relative z-10 w-full">
          
          {/* Level 1: Categories */}
          {!selectedCategory && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full mb-16">
              {categories.map(cat => {
                const representativeImage = pets.find(p => p.category === cat)?.imageUrl;
                return (
                  <div 
                    key={cat} 
                    onClick={() => setCategory(cat)}
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
          )}

          {/* Level 2: Subcategories */}
          {selectedCategory && !selectedSubcategory && subcategories.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16 w-full">
              {subcategories.map(sub => {
                const representativeImage = pets.find(p => p.category === selectedCategory && p.subcategory === sub)?.imageUrl;
                return (
                  <div 
                    key={sub} 
                    onClick={() => setSubcategory(sub)}
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
                <div key={pet.id} className="pet-card-wrapper w-full">
                  <PetCard pet={pet} />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </CardFlipProvider>
  );
};

export default ShopPage;
