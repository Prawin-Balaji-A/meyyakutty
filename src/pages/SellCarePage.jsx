import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import imageCompression from 'browser-image-compression';
import { useAdmin } from '../context/AdminContext';
import { UploadCloud, CheckCircle, X } from 'lucide-react';

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
        // Create an object URL for preview
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

    if (service === 'sell') {
      if (!formData.petType) newErrors.petType = 'Pet Type is required';
      if (!formData.breed) newErrors.breed = 'Breed is required';
      if (!formData.age) newErrors.age = 'Age is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.health) newErrors.health = 'Health Condition is required';
      if (!formData.vaccinated) newErrors.vaccinated = 'Vaccination status is required';
    } else if (service === 'care') {
      if (!formData.petType) newErrors.petType = 'Pet Type is required';
      if (!formData.breed) newErrors.breed = 'Breed is required';
      if (!formData.age) newErrors.age = 'Age is required';
      if (!formData.careRequired) newErrors.careRequired = 'Care type is required';
      if (!formData.preferredDate) newErrors.preferredDate = 'Preferred Date is required';
    } else if (service === 'adopt') {
      if (!formData.rescueLocation) newErrors.rescueLocation = 'Rescue Location is required';
      if (!formData.health) newErrors.health = 'Health Condition is required';
      if (!formData.injured) newErrors.injured = 'Injury status is required';
    }

    if (images.length === 0) newErrors.images = 'At least 1 image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      addRequest({ service, data: formData, images: images.map(i => i.preview) });
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

  const renderError = (field) => {
    return errors[field] ? <p className="text-red-500 text-sm mt-1">{errors[field]}</p> : null;
  };

  const inputClass = "w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-brand-red)] focus:border-transparent outline-none transition-shadow";

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full relative">
      <h1 className="text-4xl font-black text-gray-800 mb-8 text-center">
        'Sell & Care'
      </h1>

      {/* Service Selector */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        {['sell', 'care', 'adopt'].map((type) => (
          <button
            key={type}
            onClick={() => setService(type)}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              service === type 
                ? 'bg-[var(--color-brand-red)] text-white shadow-md' 
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow border border-gray-100'
            }`}
          >
            {type === 'sell' && 'Sell Pet'}
            {type === 'care' && 'Pet Care'}
            {type === 'adopt' && 'Street Cat Adoption'}
          </button>
        ))}
      </div>

      <div ref={formContainerRef} className="bg-white rounded-3xl shadow-xl p-6 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Fields - Rendered conditionally based on service */}
            {(service === 'sell' || service === 'care') && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Pet Type *</label>
                  <input type="text" name="petType" value={formData.petType || ''} onChange={handleInputChange} className={inputClass} />
                  {renderError('petType')}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Breed *</label>
                  <input type="text" name="breed" value={formData.breed || ''} onChange={handleInputChange} className={inputClass} />
                  {renderError('breed')}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Age *</label>
                  <input type="text" name="age" value={formData.age || ''} onChange={handleInputChange} className={inputClass} />
                  {renderError('age')}
                </div>
              </>
            )}

            {service === 'sell' && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Gender *</label>
                  <select name="gender" value={formData.gender || ''} onChange={handleInputChange} className={inputClass}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {renderError('gender')}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Vaccinated *</label>
                  <select name="vaccinated" value={formData.vaccinated || ''} onChange={handleInputChange} className={inputClass}>
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                  {renderError('vaccinated')}
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Health Condition *</label>
                  <input type="text" name="health" value={formData.health || ''} onChange={handleInputChange} className={inputClass} />
                  {renderError('health')}
                </div>
              </>
            )}

            {service === 'care' && (
              <>
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
              </>
            )}

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

            {/* Always Required Fields */}
            <div className="md:col-span-2">
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
                // only allow numbers
                if (!/^\d*$/.test(e.target.value)) return;
                handleInputChange(e);
              }} className={inputClass} />
              {renderError('mobile')}
            </div>
          </div>

          {/* Image Upload */}
          <div className="pt-4 border-t">
            <h3 className="font-bold text-gray-800 mb-2">Upload Images (Max 2) *</h3>
            <p className="text-sm text-gray-500 mb-4">Automatically compressed to WebP format for fast uploads.</p>
            
            <div className="flex flex-wrap gap-4 items-start">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-32 h-32 rounded-xl overflow-hidden shadow-md">
                  <img src={img.preview} alt="preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:scale-110">
                    <X size={16} />
                  </button>
                </div>
              ))}
              
              {images.length < 2 && (
                <label className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <UploadCloud className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 font-bold">{images.length}/2 Selected</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>
            {renderError('images')}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all shadow-md ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[var(--color-brand-red)] hover:bg-[var(--color-brand-dark)] active:scale-95'
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
