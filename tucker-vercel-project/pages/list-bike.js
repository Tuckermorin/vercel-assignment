import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function ListBike() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    brand: '',
    type: '',
    model: '',
    year: '',
    condition: '',
    
    // Description
    description: '',
    features: [],
    
    // Specifications
    frameSize: '',
    wheelSize: '',
    gearSystem: '',
    brakeType: '',
    weight: '',
    frameMaterial: '',
    
    // Pricing
    pricing: {
      1: '',
      3: '',
      6: '',
      12: ''
    },
    securityDeposit: '',
    
    // Location & Availability
    location: '',
    address: '',
    availableFrom: '',
    availableTo: '',
    
    // Contact
    ownerName: '',
    email: '',
    phone: '',
    
    // Images
    images: []
  });

  const [newFeature, setNewFeature] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const bikeTypes = ['Mountain', 'Road', 'City', 'Hybrid', 'Electric', 'BMX', 'Cruiser'];
  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair'];
  const frameMaterials = ['Carbon Fiber', 'Aluminum', 'Steel', 'Titanium'];
  const brakeTypes = ['Disc Brakes', 'Rim Brakes', 'Hydraulic Disc', 'Mechanical Disc'];

  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload these to a storage service
    // For now, we'll just store the file names
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls].slice(0, 5) // Max 5 images
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Bike listing submitted:', formData);
    alert('Your bike has been listed successfully! It will be reviewed and published shortly.');
    
    // Reset form
    setFormData({
      title: '', brand: '', type: '', model: '', year: '', condition: '',
      description: '', features: [], frameSize: '', wheelSize: '', gearSystem: '',
      brakeType: '', weight: '', frameMaterial: '', 
      pricing: { 1: '', 3: '', 6: '', 12: '' }, securityDeposit: '',
      location: '', address: '', availableFrom: '', availableTo: '',
      ownerName: '', email: '', phone: '', images: []
    });
    setCurrentStep(1);
    setIsSubmitting(false);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.title && formData.brand && formData.type && formData.year && formData.condition;
      case 2:
        return formData.description && formData.features.length > 0;
      case 3:
        return formData.frameSize && formData.wheelSize && formData.frameMaterial;
      case 4:
        return formData.pricing[1] && formData.pricing[3] && formData.location;
      case 5:
        return formData.ownerName && formData.email;
      default:
        return false;
    }
  };

  return (
    <>
      <Head>
        <title>List Your Bike - BikeShare</title>
        <meta name="description" content="List your bike for lease and earn money while helping others discover great bikes." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                🚴‍♀️ BikeShare
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/browse" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Browse Bikes
                </Link>
                <Link href="/list-bike" className="text-blue-600 font-semibold">
                  List Your Bike
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  How It Works
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">List Your Bike for Lease</h1>
            <p className="text-gray-600">Share your bike with the community and earn money while it's not in use</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 5 && (
                    <div className={`w-12 h-1 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <div className="text-sm text-gray-600">
                Step {currentStep} of 5: {
                  ['Basic Info', 'Description', 'Specifications', 'Pricing & Location', 'Contact & Images'][currentStep - 1]
                }
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bike Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => updateFormData('title', e.target.value)}
                        placeholder="e.g., Trek Mountain Explorer"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.brand}
                        onChange={(e) => updateFormData('brand', e.target.value)}
                        placeholder="e.g., Trek, Specialized, Giant"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type *
                      </label>
                      <select
                        required
                        value={formData.type}
                        onChange={(e) => updateFormData('type', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select bike type</option>
                        {bikeTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model
                      </label>
                      <input
                        type="text"
                        value={formData.model}
                        onChange={(e) => updateFormData('model', e.target.value)}
                        placeholder="e.g., X-Caliber 8"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Year *
                      </label>
                      <input
                        type="number"
                        required
                        min="1990"
                        max="2025"
                        value={formData.year}
                        onChange={(e) => updateFormData('year', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Condition *
                      </label>
                      <select
                        required
                        value={formData.condition}
                        onChange={(e) => updateFormData('condition', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select condition</option>
                        {conditions.map(condition => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Description */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Description & Features</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.description}
                      onChange={(e) => updateFormData('description', e.target.value)}
                      placeholder="Describe your bike, its condition, maintenance history, and what makes it special..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features *
                    </label>
                    <div className="flex space-x-2 mb-3">
                      <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Add a feature (e.g., Full Suspension)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                          {feature}
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    {formData.features.length === 0 && (
                      <p className="text-sm text-gray-500 mt-2">Add at least one feature to continue</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Specifications */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frame Size *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.frameSize}
                        onChange={(e) => updateFormData('frameSize', e.target.value)}
                        placeholder="e.g., Large, 56cm, 18in"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Wheel Size *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.wheelSize}
                        onChange={(e) => updateFormData('wheelSize', e.target.value)}
                        placeholder="e.g., 29in, 700c, 26in"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Frame Material *
                      </label>
                      <select
                        required
                        value={formData.frameMaterial}
                        onChange={(e) => updateFormData('frameMaterial', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select material</option>
                        {frameMaterials.map(material => (
                          <option key={material} value={material}>{material}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gear System
                      </label>
                      <input
                        type="text"
                        value={formData.gearSystem}
                        onChange={(e) => updateFormData('gearSystem', e.target.value)}
                        placeholder="e.g., 21 Speed Shimano"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brake Type
                      </label>
                      <select
                        value={formData.brakeType}
                        onChange={(e) => updateFormData('brakeType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select brake type</option>
                        {brakeTypes.map(brake => (
                          <option key={brake} value={brake}>{brake}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight
                      </label>
                      <input
                        type="text"
                        value={formData.weight}
                        onChange={(e) => updateFormData('weight', e.target.value)}
                        placeholder="e.g., 25 lbs"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Pricing & Location */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing & Location</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Monthly Lease Rates *
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">1 Month Rate</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">$</span>
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.pricing[1]}
                            onChange={(e) => updateFormData('pricing.1', e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">3 Month Rate</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">$</span>
                          <input
                            type="number"
                            required
                            min="0"
                            value={formData.pricing[3]}
                            onChange={(e) => updateFormData('pricing.3', e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">6 Month Rate</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">$</span>
                          <input
                            type="number"
                            min="0"
                            value={formData.pricing[6]}
                            onChange={(e) => updateFormData('pricing.6', e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">12 Month Rate</label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-gray-500">$</span>
                          <input
                            type="number"
                            min="0"
                            value={formData.pricing[12]}
                            onChange={(e) => updateFormData('pricing.12', e.target.value)}
                            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Longer lease periods typically have lower monthly rates
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Deposit
                    </label>
                    <div className="relative max-w-xs">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        min="0"
                        value={formData.securityDeposit}
                        onChange={(e) => updateFormData('securityDeposit', e.target.value)}
                        placeholder="200"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City/Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => updateFormData('location', e.target.value)}
                        placeholder="e.g., Salt Lake City, UT"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pickup Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                        placeholder="Street address or general area"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available From
                      </label>
                      <input
                        type="date"
                        value={formData.availableFrom}
                        onChange={(e) => updateFormData('availableFrom', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Available Until (Optional)
                      </label>
                      <input
                        type="date"
                        value={formData.availableTo}
                        onChange={(e) => updateFormData('availableTo', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Contact & Images */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information & Photos</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.ownerName}
                        onChange={(e) => updateFormData('ownerName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Photos (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="text-gray-600 mb-4">
                        <div className="text-4xl mb-2">📷</div>
                        <p>Upload photos of your bike</p>
                        <p className="text-sm">Up to 5 images, JPG or PNG</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Choose Photos
                      </button>
                    </div>
                    
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <div className="relative h-24 w-full">
                              <Image
                                src={image}
                                alt={`Bike photo ${index + 1}`}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  Previous
                </button>

                <div className="flex space-x-4">
                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!isStepValid(currentStep)}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        isStepValid(currentStep)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid(currentStep) || isSubmitting}
                      className={`px-8 py-2 rounded-lg transition-colors ${
                        isStepValid(currentStep) && !isSubmitting
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Listing'}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">💡 Tips for a Great Listing</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Take clear, well-lit photos from multiple angles</li>
              <li>• Be honest about the bike's condition and any wear</li>
              <li>• Include maintenance records if available</li>
              <li>• Set competitive pricing based on similar bikes</li>
              <li>• Respond promptly to lease requests</li>
              <li>• Consider offering flexible pickup/delivery options</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}