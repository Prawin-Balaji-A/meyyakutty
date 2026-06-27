import React, { useEffect, useRef } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { X, Bell, Package, Truck, Tag, Info } from 'lucide-react';
import { gsap } from 'gsap';

const NotificationDrawer = ({ isOpen, onClose }) => {
  const { notifications, markAllAsRead } = useNotifications();
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: 'power3.out' });
      markAllAsRead(); // Mark as read when opened
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none' });
      gsap.to(drawerRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
    }
  }, [isOpen]);

  const getIcon = (type) => {
    switch(type) {
      case 'order': return <Package size={20} className="text-blue-500" />;
      case 'shipping': return <Truck size={20} className="text-green-500" />;
      case 'promo': return <Tag size={20} className="text-orange-500" />;
      default: return <Info size={20} className="text-gray-500" />;
    }
  };

  return (
    <>
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black/40 z-[60] hidden"
        onClick={onClose}
      />
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform translate-x-full flex flex-col"
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <Bell size={24} className="text-[var(--color-brand-red)]" />
            <h2 className="text-xl font-black text-gray-800">
              Notifications
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition-colors shadow-sm"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Bell size={48} className="mb-4 opacity-20" />
              <p>No notifications yet.</p>
            </div>
          ) : (
            notifications.map(notif => (
              <div 
                key={notif.id}
                className={`p-4 rounded-2xl border flex gap-4 items-start ${notif.read ? 'bg-white border-gray-100' : 'bg-red-50 border-red-100'}`}
              >
                <div className={`p-3 rounded-full shrink-0 ${notif.read ? 'bg-gray-100' : 'bg-white shadow-sm'}`}>
                  {getIcon(notif.type)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{notif.title}</h4>
                  <p className="text-sm text-gray-600 mt-1 leading-snug">{notif.message}</p>
                  <span className="text-xs text-gray-400 mt-2 block">{notif.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
