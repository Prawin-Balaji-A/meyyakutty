import React, { useEffect, useRef, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import PetCard from '../components/PetCard';
import { CardFlipProvider } from '../context/CardFlipContext';
import { gsap } from 'gsap';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, Fish, Dog, Cat, Bird, Package, Compass, Rat } from 'lucide-react';

const categoryIcons = {
  'Fish': <Fish size={40} className="text-blue-500" />,
  'Dogs': <Dog size={40} className="text-orange-500" />,
  'Cats': <Cat size={40} className="text-pink-500" />,
  'Birds': <Bird size={40} className="text-yellow-500" />,
  'Hamsters': <Rat size={40} className="text-orange-400" />, // Using Rat as Hamster icon from lucide
  'Others': <Compass size={40} className="text-green-500" />,
  'Supplies': <Package size={40} className="text-purple-500" />
};

const ShopPage = () => {
  const { pets } = useShop();
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

  // Fixed order of categories as requested
  const categoryOrder = ['Dogs', 'Cats', 'Birds', 'Fish', 'Hamsters', 'Others', 'Supplies'];

  // Compute Categories from data, sort based on categoryOrder
  const categories = useMemo(() => {
    const uniqueCats = [...new Set(pets.map(p => p.category))];
    return uniqueCats.sort((a, b) => {
      const idxA = categoryOrder.indexOf(a);
      const idxB = categoryOrder.indexOf(b);
      // Fallback if somehow a new category exists
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });
  }, [pets]);

  // Subcategories logic
  const subcategories = useMemo(() => {
    if (!selectedCategory) return [];
    
    // Per requirements, only Fish and Supplies use subcategories navigation
    if (!['Fish', 'Supplies'].includes(selectedCategory)) {
      return []; 
    }
    
    // For Supplies, we want the specific ones: Dog Supplies, Cat Supplies, etc.
    const filtered = pets.filter(p => p.category === selectedCategory);
    const subs = [...new Set(filtered.map(p => p.subcategory))].filter(Boolean);
    
    if (selectedCategory === 'Supplies') {
       // Just in case empty categories need to show up, we could hardcode them, 
       // but prompt says "Products must load dynamically from the database with no hardcoded data."
       // It also says "If a category has no products, show a professional empty state".
       // So we MUST load the actual dynamic subcategories from the context data.
    }
    
    return subs;
  }, [selectedCategory, pets]);

  // Compute Pets to display
  const displayedPets = useMemo(() => {
    if (selectedSubcategory) {
      return pets.filter(p => p.category === selectedCategory && p.subcategory === selectedSubcategory);
    }
    if (selectedCategory) {
      // If no subcategory is selected, and it's a direct-list category (Dogs, Cats, Birds, Hamsters, Others)
      if (!['Fish', 'Supplies'].includes(selectedCategory)) {
        return pets.filter(p => p.category === selectedCategory);
      }
    }
    return [];
  }, [selectedCategory, selectedSubcategory, pets]);

  // Empty state check for supplies
  const isEmptySupplies = selectedCategory === 'Supplies' && selectedSubcategory && displayedPets.length === 0;
  // Though `displayedPets` naturally returns 0 if nothing matches.

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
              {selectedSubcategory ? selectedSubcategory : (selectedCategory ? selectedCategory : 'Shop Categories')}
            </h1>
          </div>
        </div>
        
        {/* Dynamic Grid Rendering */}
        <div ref={gridRef} className="relative z-10 w-full">
          
          {/* Level 1: Categories */}
          {!selectedCategory && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 w-full mb-16">
              {categories.map(cat => {
                const representativeImage = pets.find(p => p.category === cat)?.imageUrl;
                return (
                  <div 
                    key={cat} 
                    onClick={() => setCategory(cat)}
                    className="relative h-64 rounded-[2rem] overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                  >
                    {representativeImage ? (
                      <img src={representativeImage} alt={cat} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
                        {categoryIcons[cat] || <Compass size={40} className="text-gray-300" />}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-3 shadow-lg border border-white/30 group-hover:bg-[var(--color-brand-red)] group-hover:scale-110 transition-all duration-300">
                        {categoryIcons[cat] || <Compass size={32} />}
                      </div>
                      <h3 className="text-2xl font-black text-white drop-shadow-md">{cat}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Level 2: Subcategories (Fish & Supplies only) */}
          {selectedCategory && !selectedSubcategory && subcategories.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-16 w-full">
              {subcategories.map(sub => {
                const representativeImage = pets.find(p => p.category === selectedCategory && p.subcategory === sub)?.imageUrl;
                return (
                  <div 
                    key={sub} 
                    onClick={() => setSubcategory(sub)}
                    className="relative h-48 rounded-[2rem] overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100/50 bg-white"
                  >
                    {representativeImage ? (
                      <img src={representativeImage} alt={sub} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
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

          {/* Level 3: Pets / Items Listings */}
          {((selectedCategory && subcategories.length === 0) || selectedSubcategory) && displayedPets.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16 w-full">
              {displayedPets.map(pet => (
                <div key={pet.id} className="pet-card-wrapper w-full">
                  <PetCard pet={pet} />
                </div>
              ))}
            </div>
          )}

          {/* Empty State for Supplies or Empty Categories */}
          {((selectedCategory && subcategories.length === 0) || selectedSubcategory) && displayedPets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200 text-center animate-fade-in w-full shadow-inner">
              <Package size={64} className="text-gray-300 mb-6" />
              <h3 className="text-2xl font-black text-gray-800 mb-2">No Items Available</h3>
              <p className="text-gray-500 max-w-md font-medium">
                We're currently updating our stock for {selectedSubcategory || selectedCategory}. Check back soon for new arrivals!
              </p>
              <button 
                onClick={handleBack}
                className="mt-8 px-6 py-3 bg-[var(--color-brand-red)] text-white font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
              >
                Go Back
              </button>
            </div>
          )}

        </div>
      </div>
    </CardFlipProvider>
  );
};

export default ShopPage;
