import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  
  // Dummy data representing order status notifications
  const initialNotifications = [
    {
      id: 1,
      title: 'Order Confirmed!',
      message: 'Your order #ORD-8492 has been confirmed and is being packed.',
      time: '2 hours ago',
      read: false,
      type: 'order'
    },
    {
      id: 2,
      title: 'Out for Delivery',
      message: 'Good news! Your previous order #ORD-7110 is out for delivery today.',
      time: '1 day ago',
      read: true,
      type: 'shipping'
    },
    {
      id: 3,
      title: 'Flash Sale on Pet Food!',
      message: 'Get flat 20% off on premium pet food. Limited time offer.',
      time: '2 days ago',
      read: true,
      type: 'promo'
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (title, message, type = 'info') => {
    setNotifications(prev => [{
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      read: false,
      type
    }, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
