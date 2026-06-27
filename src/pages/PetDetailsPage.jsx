import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';

const PetDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets } = useShop();
  const { addToCart } = useCart();
  const containerRef = useRef(null);
  
  const pet = pets.find(p => p.id === id);

  useEffect(() => {
    gsap.fromTo(containerRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
    );
  }, []);

  if (!pet) {
    return <div className="text-center py-20 text-2xl font-bold">Pet Not Found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full" ref={containerRef}>
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
      >
        &larr; Back
      </button>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 h-96 md:h-auto bg-gray-100">
          <img src={pet.imageUrl} alt={pet.breed} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col">
          <h1 className="text-4xl font-black text-gray-800 mb-2">{pet.breed}</h1>
          <p className="text-3xl font-bold text-[var(--color-brand-red)] mb-6">₹{pet.price}</p>
          
          <div className="space-y-4 flex-grow">
            {pet.category === 'Cats' && (
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 font-medium">Face Type</span>
                <span className="font-bold text-gray-800">{pet.faceType || 'Standard'}</span>
              </div>
            )}
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">Gender</span>
              <span className="font-bold text-gray-800">{pet.gender}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">Age</span>
              <span className="font-bold text-gray-800">{pet.ageMonths} Months</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">Vaccinated</span>
              <span className="font-bold text-gray-800">{pet.isVaccinated ? 'Yes' : 'No'}</span>
            </div>
            
            <div className="mt-6 pt-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {pet.description}
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex gap-4">
            <button 
              onClick={(e) => {
                addToCart(pet);
                gsap.fromTo(e.target, 
                  { scale: 0.95 },
                  { scale: 1, duration: 0.4, ease: 'back.out' }
                );
              }}
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0 text-xl"
            >
              Add to Cart
            </button>
            <button 
              onClick={(e) => {
                addToCart(pet);
                navigate('/checkout');
              }}
              className="flex-1 bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-dark)] text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 active:translate-y-0 text-xl"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;
