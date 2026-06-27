import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Try to load from localStorage first
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('meyyakutty_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse notifications", e);
      }
    }
    return initialNotifications;
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('meyyakutty_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (title, message, type = 'info', link = null) => {
    setNotifications(prev => [{
      id: Date.now(),
      title,
      message,
      time: 'Just now',
      read: false,
      type,
      link
    }, ...prev]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
