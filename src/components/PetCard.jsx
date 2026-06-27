import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const PetCard = ({ pet }) => {
  const cardRef = useRef(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(pet);
  };

  const handleCardClick = () => {
    navigate(`/pet/${pet.id}`);
  };

  return (
    <div 
      ref={cardRef}
      className="bg-white w-full rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col relative group cursor-pointer"
      onMouseEnter={() => {
        gsap.to(cardRef.current, { scale: 1.02, y: -8, duration: 0.3, ease: 'power2.out' });
      }}
      onMouseLeave={() => {
        gsap.to(cardRef.current, { scale: 1, y: 0, duration: 0.3, ease: 'power2.out' });
      }}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="h-64 overflow-hidden relative bg-gray-50">
        <img 
          src={pet.imageUrl} 
          alt={pet.breed} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm">
          <p className="font-black text-[var(--color-brand-red)] text-lg">₹{pet.price}</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-black text-2xl text-gray-900 mb-4 line-clamp-1 group-hover:text-[var(--color-brand-red)] transition-colors">{pet.breed}</h3>
          
          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm font-semibold text-gray-600 mb-6 bg-gray-50 p-4 rounded-2xl">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Gender</span>
              <span className="text-gray-900">{pet.gender}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Age</span>
              <span className="text-gray-900">{pet.ageMonths} Mos</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs uppercase tracking-wider">Vaccinated</span>
              <span className={pet.isVaccinated ? "text-green-600 font-bold" : "text-gray-900"}>{pet.isVaccinated ? 'Yes' : 'No'}</span>
            </div>
            {pet.faceType && (
              <div className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Type</span>
                <span className="text-gray-900 line-clamp-1">{pet.faceType}</span>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={handleBuyNow}
          className="w-full py-4 bg-gray-900 hover:bg-[var(--color-brand-red)] text-white rounded-xl font-bold text-lg shadow-md transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <ShoppingCart size={20} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PetCard;
