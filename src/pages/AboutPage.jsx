import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Phone, Mail, Instagram, ChevronLeft, MapPin, Clock, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(containerRef.current.children, 
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(1.2)' }
    );
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full relative z-10 min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="p-3 bg-white/80 backdrop-blur-md shadow-sm hover:shadow-md text-[var(--color-brand-red)] rounded-2xl transition-all active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">About Us</h1>
      </div>

      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Story Bento Box - Col Span 8 */}
        <div className="md:col-span-8 bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-white/50 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-400/10 rounded-full blur-[60px] -z-10 group-hover:bg-red-400/20 transition-colors" />
          <h2 className="text-2xl font-black text-gray-800 mb-4 flex items-center gap-2">
            Our Story
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Welcome to <span className="text-[var(--color-brand-red)] font-black">Meyyakutty Pet Shop!</span> Since 2020, we have been committed to providing healthy pets and quality pet supplies. We specialize in pigeons and offer a wide range of birds, fish, dogs, cats, pet accessories, and pet food. Our mission is to deliver trusted products and excellent service to pet lovers and families.
          </p>
        </div>

        {/* Opening Hours Bento Box - Col Span 4 */}
        <div className="md:col-span-4 bg-gradient-to-br from-[var(--color-brand-red)] to-orange-500 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20">
            <Clock size={100} />
          </div>
          <h2 className="text-2xl font-black mb-6 relative z-10">Opening Hours</h2>
          <div className="space-y-4 relative z-10">
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
              <span className="font-bold">Mon - Fri</span>
              <span className="font-black">9AM - 7PM</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
              <span className="font-bold">Saturday</span>
              <span className="font-black">9AM - 8PM</span>
            </div>
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/20">
              <span className="font-bold">Sunday</span>
              <span className="font-black">10AM - 6PM</span>
            </div>
          </div>
        </div>

        {/* Map Bento Box - Col Span 7 */}
        <div className="md:col-span-7 bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-4 shadow-xl border border-white/50 flex flex-col">
          <div className="flex items-center justify-between px-4 pt-2 pb-4">
            <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <MapPin className="text-[var(--color-brand-red)]" /> Find Us
            </h2>
            <a href="https://www.google.com/maps/place/MEYYAKUTTY+CHICKEN+CORNER/@10.9558569,79.4047693,967m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3a55338007452e75:0x3e23fabd9918c749!8m2!3d10.9558569!4d79.4047693!16s%2Fg%2F11w7hh5slq!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="text-sm font-bold text-[var(--color-brand-red)] hover:underline bg-red-50 px-3 py-1 rounded-full">
              Open App &rarr;
            </a>
          </div>
          <div className="w-full h-48 md:flex-grow rounded-[1.5rem] overflow-hidden shadow-inner relative bg-gray-100">
            <iframe 
              src="https://maps.google.com/maps?q=10.9558569,79.4047693&z=17&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Meyyakutty Location"
            />
          </div>
        </div>

        {/* Contact Grid Bento - Col Span 5 */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          
          {/* Phone */}
          <a href="tel:+917200271113" className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/50 flex flex-col items-center justify-center text-center hover:scale-105 hover:bg-green-50 transition-all group">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3 shadow-sm group-hover:shadow-md transition-shadow">
              <Phone size={26} fill="currentColor" />
            </div>
            <span className="font-black text-gray-800 text-sm">Call Us</span>
            <span className="font-bold text-gray-500 text-xs mt-1">+91 72002 71113</span>
          </a>

          {/* WhatsApp */}
          <a href="https://wa.me/917200271113" target="_blank" rel="noreferrer" className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/50 flex flex-col items-center justify-center text-center hover:scale-105 hover:bg-[#25D366]/10 transition-all group">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] mb-3 shadow-sm group-hover:shadow-md transition-shadow">
              {/* WhatsApp custom SVG icon for authentic look */}
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.8 5.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
            <span className="font-black text-gray-800 text-sm">WhatsApp</span>
            <span className="font-bold text-gray-500 text-xs mt-1">Chat with us</span>
          </a>

          {/* Email */}
          <a href="mailto:meyyakuttyoffice@gmail.com" className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/50 flex flex-col items-center justify-center text-center hover:scale-105 hover:bg-blue-50 transition-all group col-span-1">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3 shadow-sm group-hover:shadow-md transition-shadow">
              <Mail size={26} fill="currentColor" />
            </div>
            <span className="font-black text-gray-800 text-sm">Email</span>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/meyyakutty/" target="_blank" rel="noreferrer" className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/50 flex flex-col items-center justify-center text-center hover:scale-105 hover:bg-pink-50 transition-all group col-span-1">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 flex items-center justify-center text-white mb-3 shadow-sm group-hover:shadow-md transition-shadow">
              <Instagram size={28} />
            </div>
            <span className="font-black text-gray-800 text-sm">Instagram</span>
          </a>

          {/* YouTube */}
          <a href="https://youtube.com/@meyyakutty9372?si=iHZEEa8tyZfw9gB3" target="_blank" rel="noreferrer" className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-6 shadow-xl border border-white/50 flex flex-row items-center justify-center gap-4 text-center hover:scale-[1.02] hover:bg-red-50 transition-all group col-span-2">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 shadow-sm group-hover:shadow-md transition-shadow shrink-0">
              <Youtube size={32} />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-black text-gray-800 text-sm md:text-base">Subscribe on YouTube</span>
              <span className="font-bold text-gray-500 text-xs mt-0.5">@meyyakutty9372</span>
            </div>
          </a>
          
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
