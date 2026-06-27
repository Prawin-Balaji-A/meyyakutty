import React, { createContext, useState, useContext } from 'react';

const CardFlipContext = createContext();

export const CardFlipProvider = ({ children }) => {
  const [activeFlippedId, setActiveFlippedId] = useState(null);

  return (
    <CardFlipContext.Provider value={{ activeFlippedId, setActiveFlippedId }}>
      {children}
    </CardFlipContext.Provider>
  );
};

export const useCardFlip = () => useContext(CardFlipContext);
