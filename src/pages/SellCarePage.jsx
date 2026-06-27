import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import imageCompression from 'browser-image-compression';
import { useAdmin } from '../context/AdminContext';
import { UploadCloud, CheckCircle, X, MapPin, Search, ChevronDown } from 'lucide-react';

const SearchablePetSelect = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  const options = [
    { id: 'Dog', icon: '🐶' },
    { id: 'Cat', icon: '🐱' },
    { id: 'Birds', icon: '🐦' },
    { id: 'Fish', icon: '🐟' },
    { id: 'Hamsters', icon: '🐹' },
    { id: 'Others', icon: '🐾' }
  ];

  const filtered = options.filter(o => o.id.toLowerCase().includes(search.toLowerCase()));
  const selectedOpt = options.find(o => o.id === value);

  // Close dropdown on outside click (simple implementation: close on mouse leave)
  return (
    <div className="relative" onMouseLeave={() => setIsOpen(false)}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-3 rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} bg-white flex items-center justify-between cursor-pointer focus:ring-2 focus:ring-[var(--color-brand-red)] transition-shadow`}
      >
        <div className="flex items-center gap-2">
          {selectedOpt ? (
             <>
               <span className="text-xl">{selectedOpt.icon}</span>
               <span className="font-bold text-gray-800">{selectedOpt.id}</span>
             </>
          ) : (
             <span className="text-gray-400">Select Pet Type</span>
          )}
        </div>
        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl p-2 animate-fade-in origin-top">
           <div className="relative mb-2">
             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search..."
               value={search}
               onChange={e => setSearch(e.target.value)}
               onClick={e => e.stopPropagation()}
               className="w-full pl-9 p-2 bg-gray-50 border border-transparent rounded-lg outline-none focus:border-gray-300 transition-colors"
             />
           </div>
           <div className="max-h-48 overflow-y-auto space-y-1">
             {filtered.length === 0 ? (
               <p className="text-center text-sm text-gray-400 py-4">No results found</p>
             ) : (
               filtered.map(opt => (
                 <div 
                   key={opt.id}
                   onClick={() => { onChange(opt.id); setIsOpen(false); setSearch(''); }}
                   className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 cursor-pointer group transition-colors"
                 >
                   <div className="text-2xl group-hover:scale-110 transition-transform">
                     {opt.icon}
                   </div>
                   <span className="font-bold text-gray-700 group-hover:text-[var(--color-brand-red)] transition-colors">{opt.id}</span>
                 </div>
               ))
             )}
           </div>
        </div>
      )}
    </div>
  );
};

const SellCarePage = () => {
  const { addRequest } = useAdmin();
  const [service, setService] = useState('sell'); // 'sell', 'care', 'adopt'
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const formContainerRef = useRef(null);
  const successModalRef = useRef(null);

  // Animate form change
  useEffect(() => {
    gsap.fromTo(formContainerRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
    // Reset state on service change
    setFormData({});
    setImages([]);
    setErrors({});
  }, [service]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 2) {
      alert('Maximum 2 images allowed.');
      return;
    }

    const compressedImages = [];
    for (const file of files) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: 'image/webp'
        };
        const compressedFile = await imageCompression(file, options);
        const previewUrl = URL.createObjectURL(compressedFile);
        compressedImages.push({ file: compressedFile, preview: previewUrl });
      } catch (error) {
        console.error('Compression error:', error);
      }
    }
    setImages(prev => [...prev, ...compressedImages].slice(0, 2));
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile)) newErrors.mobile = 'Valid 10-digit mobile number is required';
    if (!formData.description) newErrors.description = 'Description is required';

    if (service === 'sell' || service === 'care') {
      if (!formData.petType) newErrors.petType = 'Pet Type is required';
      else {
        if (formData.petType !== 'Others' && !formData.breed) newErrors.breed = 'Breed is required';
        if (!formData.age) newErrors.age = 'Age is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        
        if (['Dog', 'Cat', 'Hamsters'].includes(formData.petType) && !formData.color) {
          newErrors.color = 'Color is required';
        }
        if (['Dog', 'Cat'].includes(formData.petType) && !formData.vaccinated) {
          newErrors.vaccinated = 'Vaccination status is required';
        }
        if (formData.petType === 'Dog' && !formData.trained) {
          newErrors.trained = 'Training status is required';
        }
        if (formData.petType === 'Cat' && !formData.faceType) {
          newErrors.faceType = 'Face type is required';
        }
        if (formData.petType === 'Birds') {
          if (!formData.birdType) newErrors.birdType = 'Bird type is required';
          if (!formData.wingClipped) newErrors.wingClipped = 'Wing clipped status is required';
        }
        if (formData.petType === 'Others' && !formData.animalName) {
          newErrors.animalName = 'Animal Name is required';
        }
      }

      if (service === 'care') {
        if (!formData.careRequired) newErrors.careRequired = 'Care type is required';
        if (!formData.preferredDate) newErrors.preferredDate = 'Preferred Date is required';
      }
    } else if (service === 'adopt') {
      if (!formData.rescueLocation) newErrors.rescueLocation = 'Rescue Location is required';
      if (!formData.health) newErrors.health = 'Health Condition is required';
      if (!formData.injured) newErrors.injured = 'Injury status is required';
    }

    // Address Validation
    if (!formData.addressLine) newErrors.addressLine = 'Address Line is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode || formData.pincode.length !== 6) newErrors.pincode = 'Valid 6-digit Pincode is required';

    if (images.length === 0) newErrors.images = 'At least 1 image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Clean data before submission
    let cleanedData = { ...formData };
    
    if (service === 'sell' || service === 'care') {
      if (cleanedData.petType !== 'Dog') delete cleanedData.trained;
      if (cleanedData.petType !== 'Cat') delete cleanedData.faceType;
      if (!['Dog', 'Cat'].includes(cleanedData.petType)) delete cleanedData.vaccinated;
      if (!['Dog', 'Cat', 'Hamsters'].includes(cleanedData.petType)) delete cleanedData.color;
      if (cleanedData.petType !== 'Birds') {
        delete cleanedData.birdType;
        delete cleanedData.wingClipped;
      }
      if (cleanedData.petType !== 'Others') {
        delete cleanedData.animalName;
      }
      // Remove old health condition if it existed for these services
      delete cleanedData.health;
    }

    // Mock API call
    setTimeout(() => {
      addRequest({ service, data: cleanedData, images: images.map(i => i.preview) });
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Success modal animation
      setTimeout(() => {
        gsap.fromTo(successModalRef.current, 
          { scale: 0.5, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
        );
      }, 10);
    }, 1500);
  };

  const resetForm = () => {
    setShowSuccess(false);
    setService('sell');
    setFormData({});
    setImages([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePetTypeChange = (value) => {
    // Preserve old data to avoid wiping out user's effort, but remove invalid validations
    setFormData(prev => ({ ...prev, petType: value }));
    setErrors(prev => {
      const newErr = { ...prev };
      delete newErr.petType;
      return newErr;
    });
  };

  const renderError = (field) => {
    return errors[field] ? <p className="text-red-500 text-xs mt-1 animate-fade-in font-bold">{errors[field]}</p> : null;
  };

  const inputClass = "w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-red)] focus:border-transparent outline-none transition-shadow bg-gray-50/50";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full relative">
      <h1 className="text-4xl font-black text-gray-800 mb-8 text-center">
        Sell & Care
      </h1>

      {/* Service Selector */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        {['sell', 'care', 'adopt'].map((type) => (
          <button
            key={type}
            onClick={() => setService(type)}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              service === type 
                ? 'bg-[var(--color-brand-red)] text-white shadow-md scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow border border-gray-100'
            }`}
          >
            {type === 'sell' && 'Sell Pet'}
            {type === 'care' && 'Pet Care'}
            {type === 'adopt' && 'Street Cat Adoption'}
          </button>
        ))}
      </div>

      <div ref={formContainerRef} className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Dynamic Sell / Care Pet Fields */}
            {(service === 'sell' || service === 'care') && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Pet Type *</label>
                  <SearchablePetSelect 
                    value={formData.petType} 
                    onChange={handlePetTypeChange}
                    error={errors.petType}
                  />
                  {renderError('petType')}
                </div>

                {formData.petType && (
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in bg-orange-50/50 p-6 rounded-2xl border border-orange-100">
                    
                    {formData.petType === 'Others' && (
                      <div className="md:col-span-2 animate-fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Animal Name *</label>
                        <input type="text" name="animalName" value={formData.animalName || ''} onChange={handleInputChange} className={inputClass} placeholder="e.g. Guinea Pig" />
                        {renderError('animalName')}
                      </div>
                    )}

                    {formData.petType === 'Birds' && (
                      <div className="md:col-span-2 animate-fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Bird Type *</label>
                        <input type="text" name="birdType" value={formData.birdType || ''} onChange={handleInputChange} className={inputClass} placeholder="e.g. Parrot, Pigeon" />
                        {renderError('birdType')}
                      </div>
                    )}

                    <div className={formData.petType === 'Others' ? "md:col-span-2" : ""}>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        Breed {formData.petType === 'Others' ? '(Optional)' : '*'}
                      </label>
                      <input type="text" name="breed" value={formData.breed || ''} onChange={handleInputChange} className={inputClass} />
                      {renderError('breed')}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Age *</label>
                      <input type="text" name="age" value={formData.age || ''} onChange={handleInputChange} className={inputClass} placeholder="e.g. 2 Months" />
                      {renderError('age')}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Gender *</label>
                      <select name="gender" value={formData.gender || ''} onChange={handleInputChange} className={inputClass}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Unknown">Unknown</option>
                      </select>
                      {renderError('gender')}
                    </div>

                    {['Dog', 'Cat', 'Hamsters'].includes(formData.petType) && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Color *</label>
                        <input type="text" name="color" value={formData.color || ''} onChange={handleInputChange} className={inputClass} />
                        {renderError('color')}
                      </div>
                    )}

                    {['Dog', 'Cat'].includes(formData.petType) && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Vaccinated *</label>
                        <select name="vaccinated" value={formData.vaccinated || ''} onChange={handleInputChange} className={inputClass}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {renderError('vaccinated')}
                      </div>
                    )}

                    {formData.petType === 'Dog' && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Trained *</label>
                        <select name="trained" value={formData.trained || ''} onChange={handleInputChange} className={inputClass}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {renderError('trained')}
                      </div>
                    )}

                    {formData.petType === 'Cat' && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Face Type *</label>
                        <input 
                          list="faceTypes" 
                          name="faceType" 
                          value={formData.faceType || ''} 
                          onChange={handleInputChange} 
                          className={inputClass}
                          placeholder="Select or type..."
                        />
                        <datalist id="faceTypes">
                          <option value="Flat Face (Persian)" />
                          <option value="Round Face" />
                          <option value="Normal Face" />
                          <option value="Long Face" />
                        </datalist>
                        {renderError('faceType')}
                      </div>
                    )}

                    {formData.petType === 'Birds' && (
                      <div className="animate-fade-in">
                        <label className="block text-sm font-bold text-gray-700 mb-1">Wing Clipped *</label>
                        <select name="wingClipped" value={formData.wingClipped || ''} onChange={handleInputChange} className={inputClass}>
                          <option value="">Select</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {renderError('wingClipped')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Adopt Fields */}
            {service === 'adopt' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Cat Type (Optional)</label>
                  <input type="text" name="petType" value={formData.petType || ''} onChange={handleInputChange} className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Rescue Location *</label>
                  <input type="text" name="rescueLocation" value={formData.rescueLocation || ''} onChange={handleInputChange} className={inputClass} />
                  {renderError('rescueLocation')}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Health Condition *</label>
                  <input type="text" name="health" value={formData.health || ''} onChange={handleInputChange} className={inputClass} />
                  {renderError('health')}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Injured? *</label>
                  <select name="injured" value={formData.injured || ''} onChange={handleInputChange} className={inputClass}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {renderError('injured')}
                </div>
              </>
            )}

            {/* Care Specific Fields */}
            {service === 'care' && (
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Care Required *</label>
                  <select name="careRequired" value={formData.careRequired || ''} onChange={handleInputChange} className={inputClass}>
                    <option value="">Select Care</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Health Check-up">Health Check-up</option>
                    <option value="Boarding">Boarding</option>
                    <option value="Training">Training</option>
                    <option value="Other">Other</option>
                  </select>
                  {renderError('careRequired')}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Preferred Date *</label>
                  <input type="date" name="preferredDate" value={formData.preferredDate || ''} onChange={handleInputChange} className={inputClass} />
                  {renderError('preferredDate')}
                </div>
              </div>
            )}

            {/* Description & Contact Details */}
            <div className="md:col-span-2 pt-4 border-t border-gray-100">
              <label className="block text-sm font-bold text-gray-700 mb-1">Description *</label>
              <textarea name="description" rows="3" value={formData.description || ''} onChange={handleInputChange} className={inputClass}></textarea>
              {renderError('description')}
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleInputChange} className={inputClass} />
              {renderError('fullName')}
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number *</label>
              <input type="tel" name="mobile" maxLength="10" placeholder="10 digit number" value={formData.mobile || ''} onChange={(e) => {
                if (!/^\d*$/.test(e.target.value)) return;
                handleInputChange(e);
              }} className={inputClass} />
              {renderError('mobile')}
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-100">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <MapPin className="text-[var(--color-brand-red)]" /> Address Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Address Line *</label>
                <textarea name="addressLine" rows="2" value={formData.addressLine || ''} onChange={handleInputChange} className={inputClass} placeholder="House No, Street Name, Area"></textarea>
                {renderError('addressLine')}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">City *</label>
                <input type="text" name="city" value={formData.city || ''} onChange={handleInputChange} className={inputClass} />
                {renderError('city')}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">District *</label>
                <input type="text" name="district" value={formData.district || ''} onChange={handleInputChange} className={inputClass} />
                {renderError('district')}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">State *</label>
                <input type="text" name="state" value={formData.state || ''} onChange={handleInputChange} className={inputClass} />
                {renderError('state')}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Pincode *</label>
                <input 
                  type="text" 
                  name="pincode" 
                  maxLength="6" 
                  value={formData.pincode || ''} 
                  onChange={(e) => {
                    if (!/^\d*$/.test(e.target.value)) return;
                    handleInputChange(e);
                  }} 
                  className={inputClass} 
                  placeholder="6 digit pincode" 
                />
                {renderError('pincode')}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-1">Landmark (Optional)</label>
                <input type="text" name="landmark" value={formData.landmark || ''} onChange={handleInputChange} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="pt-4">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <UploadCloud className="text-[var(--color-brand-red)]" /> Upload Images (Max 2) *
            </h3>
            <p className="text-sm text-gray-500 mb-4">Automatically compressed to WebP format for fast uploads.</p>
            
            <div className="flex flex-wrap gap-4 items-start">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-md">
                  <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:scale-110 shadow-lg transition-transform">
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {images.length < 2 && (
                <label className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-[var(--color-brand-red)] transition-colors group">
                  <UploadCloud className="text-gray-400 mb-2 group-hover:text-[var(--color-brand-red)] transition-colors" />
                  <span className="text-sm text-gray-500 font-bold group-hover:text-[var(--color-brand-red)] transition-colors">{images.length}/2 Selected</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
            {renderError('images')}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-black text-lg text-white transition-all shadow-xl hover:shadow-2xl ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-gradient-to-r from-[var(--color-brand-red)] to-red-500 hover:-translate-y-1 active:scale-95'
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Submit Request'}
          </button>
        </form>
      </div>

      {/* Success Modal Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div ref={successModalRef} className="glass bg-white/90 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl border border-white/40">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-black text-gray-800 mb-4">Request Submitted Successfully!</h2>
            <p className="text-gray-600 mb-8 font-medium">
              Your request has been received. Our MEYYAKUTTY team will review it and contact you shortly.
            </p>
            <div className="space-y-4">
              <button onClick={() => window.location.href = '/'} className="w-full py-3 bg-[var(--color-brand-red)] text-white rounded-xl font-bold shadow-md hover:bg-red-800 transition-colors">
                Back to Home
              </button>
              <button onClick={resetForm} className="w-full py-3 bg-gray-200 text-gray-800 rounded-xl font-bold hover:bg-gray-300 transition-colors">
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellCarePage;
