import React, { createContext, useState, useContext } from 'react';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [pets] = useState([
    {
      id: 'c1',
      category: 'Cats',
      breed: 'Persian Cat',
      faceType: 'Doll Face',
      gender: 'Female',
      ageMonths: 6,
      isVaccinated: true,
      price: 5000,
      imageUrl: '/images/Cat%20image/Cat%20image/Cat-Persian%20cat.jpg',
      description: 'Beautiful Persian Cat'
    },
    {
      id: 'd1',
      category: 'Dogs',
      breed: 'Golden Retriever',
      gender: 'Male',
      ageMonths: 2,
      isVaccinated: false,
      price: 20000,
      imageUrl: '/images/Dog%20image/Dog%20image/Dog-%20golden%20retriever.jpg',
      description: 'Friendly Golden Retriever pup'
    },
    {
      id: 'f1',
      category: 'Fish',
      breed: 'Guppy',
      variety: 'Blue Guppy',
      gender: 'Pair',
      ageMonths: 2,
      isVaccinated: false,
      price: 150,
      imageUrl: '/images/Guppy_fish-_blue_guppy.jpg',
      description: 'Vibrant Blue Guppy.'
    },
    {
      id: 'h1',
      category: 'Hamsters',
      breed: 'Syrian Hamster',
      gender: 'Male',
      ageMonths: 3,
      isVaccinated: false,
      price: 600,
      imageUrl: '/images/Small%20animals/Small%20animals/Hamster.jpg',
      description: 'Active and healthy Syrian Hamster.'
    },
    {
      id: 'o1',
      category: 'Others',
      breed: 'Guinea Pig',
      gender: 'Female',
      ageMonths: 4,
      isVaccinated: true,
      price: 1200,
      imageUrl: '/images/Small%20animals/Small%20animals/Guneia%20pig.jpg',
      description: 'Cute and cuddly Guinea Pig.'
    }
  ]);

  return (
    <ShopContext.Provider value={{ pets }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
