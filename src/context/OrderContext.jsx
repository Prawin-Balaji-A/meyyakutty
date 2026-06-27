import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('meyyakutty_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse orders from local storage");
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('meyyakutty_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toISOString(),
      status: 'Placed', // Placed, Confirmed, Preparing, Shipped, Out for Delivery, Delivered, Cancelled
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const cancelOrder = (id) => {
    // Only allow cancellation if it hasn't shipped
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        if (['Placed', 'Confirmed', 'Preparing'].includes(o.status)) {
          return { ...o, status: 'Cancelled' };
        }
      }
      return o;
    }));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
