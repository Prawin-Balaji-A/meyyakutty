import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Phone, MessageCircle, Mail, Camera, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current.children, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 w-full relative z-10">
      <div ref={containerRef} className="space-y-8">
        
        {/* Header / Our Story */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
          <div className="flex items-center gap-4 mb-8 border-b-2 border-gray-50 pb-6">
             <button 
                onClick={() => navigate(-1)} 
                className="p-3 bg-gray-50 hover:bg-red-50 text-[var(--color-brand-red)] rounded-2xl transition-colors active:scale-95"
             >
               <ChevronLeft size={24} />
             </button>
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">About Us</h1>
          </div>
          
          <h2 className="text-2xl font-black text-gray-800 mb-4">Our Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Welcome to Meeya Kutty Pet & Meat Shop! Since 2020, we have been committed to providing healthy pets, quality pet supplies, and fresh meat products. We specialize in pigeons and offer a wide range of birds, fish, dogs, cats, pet accessories, and pet food. Our mission is to deliver trusted products and excellent service to pet lovers and families.
          </p>
        </div>

        {/* Contact Us */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-black text-gray-800 mb-8 border-b-2 border-gray-50 pb-4">Contact Us</h2>
          
          <div className="space-y-4">
            <a href="tel:+917200271113" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform shadow-sm">
                <Phone size={24} fill="currentColor" />
              </div>
              <span className="font-bold text-gray-800 text-xl tracking-wide">+91 72002 71113</span>
            </a>

            <a href="https://wa.me/917200271113" target="_blank" rel="noreferrer" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/20 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform shadow-sm">
                <MessageCircle size={24} fill="currentColor" />
              </div>
              <span className="font-bold text-gray-800 text-xl tracking-wide">WhatsApp: +91 72002 71113</span>
            </a>

            <a href="mailto:meyyakuttyoffice@gmail.com" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform shadow-sm">
                <Mail size={24} fill="currentColor" />
              </div>
              <span className="font-bold text-gray-800 text-xl">meyyakuttyoffice@gmail.com</span>
            </a>

            <a href="https://www.instagram.com/meyyakutty/" target="_blank" rel="noreferrer" className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-sm">
                <Camera size={24} />
              </div>
              <span className="font-bold text-gray-800 text-xl">Instagram</span>
            </a>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-orange-400/10 rounded-full blur-[40px] -z-0 translate-x-1/2 -translate-y-1/2" />
           <div className="relative z-10">
              <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3 border-b-2 border-gray-50 pb-4">
                Opening Hours
              </h2>
              <div className="space-y-4 mt-8">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="font-bold text-gray-600">Monday - Friday</span>
                  <span className="font-black text-gray-900">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="font-bold text-gray-600">Saturday</span>
                  <span className="font-black text-gray-900">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <span className="font-bold text-gray-600">Sunday</span>
                  <span className="font-black text-gray-900">10:00 AM - 6:00 PM</span>
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
