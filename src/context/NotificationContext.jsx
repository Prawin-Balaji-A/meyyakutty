import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const { lang } = useLanguage();
  
  // Dummy data representing order status notifications
  const initialNotifications = [
    {
      id: 1,
      title: lang === 'en' ? 'Order Confirmed!' : 'ஆர்டர் உறுதிசெய்யப்பட்டது!',
      message: lang === 'en' ? 'Your order #ORD-8492 has been confirmed and is being packed.' : 'உங்கள் ஆர்டர் #ORD-8492 உறுதிசெய்யப்பட்டு பேக் செய்யப்படுகிறது.',
      time: '2 hours ago',
      read: false,
      type: 'order'
    },
    {
      id: 2,
      title: lang === 'en' ? 'Out for Delivery' : 'டெலிவரிக்கு தயாராகிறது',
      message: lang === 'en' ? 'Good news! Your previous order #ORD-7110 is out for delivery today.' : 'நற்செய்தி! உங்கள் முந்தைய ஆர்டர் #ORD-7110 இன்று டெலிவரிக்கு வரவுள்ளது.',
      time: '1 day ago',
      read: true,
      type: 'shipping'
    },
    {
      id: 3,
      title: lang === 'en' ? 'Flash Sale on Pet Food!' : 'செல்லப்பிராணி உணவில் சிறப்பு தள்ளுபடி!',
      message: lang === 'en' ? 'Get flat 20% off on premium pet food. Limited time offer.' : 'உயர்தர செல்லப்பிராணி உணவுக்கு 20% தள்ளுபடி. சலுகை குறுகிய காலம் வரை.',
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
