import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function BikeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [bike, setBike] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('1');
  const [loading, setLoading] = useState(true);
  const [showLeaseModal, setShowLeaseModal] = useState(false);
  const [leaseForm, setLeaseForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const modalRef = useRef(null);

  // Mock bike data - replace with your API call
  const mockBikeData = {
    1: {
      id: 1,
      title: "Trek Mountain Explorer",
      brand: "Trek",
      type: "Mountain",
      price: 89,
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400", "/api/placeholder/600/400"],
      rating: 4.8,
      reviews: 24,
      location: "Salt Lake City, UT",
      owner: {
        name: "Mike Johnson",
        rating: 4.9,
        bikesListed: 3,
        avatar: "/api/placeholder/100/100",
        joinedDate: "2023"
      },
      description: "Perfect for trail adventures and mountain exploration. This Trek mountain bike has been meticulously maintained and is ready for your next adventure. Features high-quality components and has been serviced regularly.",
      available: true,
      features: ["Full Suspension", "27 Speed", "Disc Brakes", "Tubeless Tires", "Carbon Fiber Frame"],
      specifications: {
        "Frame Material": "Carbon Fiber",
        "Wheel Size": "29 inches",
        "Gear System": "27 Speed Shimano",
        "Weight": "28 lbs",
        "Brake Type": "Hydraulic Disc",
        "Suspension": "Full Suspension"
      },
      pricing: {
        1: 89,
        3: 79,
        6: 69,
        12: 59
      },
      policies: {
        "Security Deposit": "$200 (refundable)",
        "Maintenance": "Included in lease",
        "Insurance": "Required (can be arranged)",
        "Cancellation": "30-day notice required"
      }
    },
    2: {
      id: 2,
      title: "Specialized Road Racer",
      brand: "Specialized",
      type: "Road",
      price: 125,
      images: ["/api/placeholder/600/400", "/api/placeholder/600/400"],
      rating: 4.9,
      reviews: 18,
      location: "Provo, UT",
      owner: {
        name: "Sarah Wilson",
        rating: 5.0,
        bikesListed: 2,
        avatar: "/api/placeholder/100/100",
        joinedDate: "2022"
      },
      description: "Lightweight carbon frame designed for serious road cycling and racing. This bike has been professionally maintained and is perfect for long rides and competitive cycling.",
      available: true,
      features: ["Carbon Frame", "22 Speed", "Racing Geometry", "Lightweight", "Aerodynamic"],
      specifications: {
        "Frame Material": "Carbon Fiber",
        "Wheel Size": "700c",
        "Gear System": "22 Speed Shimano Ultegra",
        "Weight": "18 lbs",
        "Brake Type": "Caliper Brakes",
        "Handlebars": "Drop Bars"
      },
      pricing: {
        1: 125,
        3: 115,
        6: 105,
        12: 89
      },
      policies: {
        "Security Deposit": "$300 (refundable)",
        "Maintenance": "Included in lease",
        "Insurance": "Required (can be arranged)",
        "Cancellation": "30-day notice required"
      }
    }
  };

  useEffect(() => {
    if (id) {
      // Simulate API call
      const fetchBike = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        const bikeData = mockBikeData[id];
        if (bikeData) {
          setBike(bikeData);
        }
        setLoading(false);
      };
      
      fetchBike();
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLeaseModal(false);
      }
    };

    if (showLeaseModal) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showLeaseModal]);

  const handleLeaseRequest = (e) => {
    e.preventDefault();
    // Here you would normally send the lease request to your API
    console.log('Lease request:', {
      bikeId: bike.id,
      duration: selectedDuration,
      ...leaseForm
    });
    
    alert(`Lease request submitted for ${bike.title}! The owner will be notified.`);
    setShowLeaseModal(false);
    setLeaseForm({ name: '', email: '', phone: '', message: '' });
  };

  const getPriceForDuration = (duration) => {
    return bike?.pricing[duration] || bike?.price;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bike details...</p>
        </div>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🚴‍♂️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bike Not Found</h2>
          <p className="text-gray-600 mb-4">The bike you're looking for doesn't exist.</p>
          <Link href="/browse" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Browse All Bikes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{bike.title} - BikeShare</title>
        <meta name="description" content={bike.description} />
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
                <Link href="/list-bike" className="text-gray-700 hover:text-blue-600 transition-colors">
                  List Your Bike
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                  How It Works
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link href="/browse" className="text-blue-600 hover:underline">Browse</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-500">{bike.title}</span>
          </nav>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-xl shadow-sm border mb-8">
                <div className="relative h-96">
                  <Image
                    src={bike.images[0]}
                    alt={bike.title}
                    fill
                    className="object-cover rounded-t-xl"
                    priority
                  />
                </div>
                {bike.images.length > 1 && (
                  <div className="p-4 flex space-x-2 overflow-x-auto">
                    {bike.images.map((image, index) => (
                      <div key={index} className="relative h-20 w-20 flex-shrink-0">
                        <Image
                          src={image}
                          alt={`${bike.title} view ${index + 1}`}
                          fill
                          className="object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bike Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{bike.title}</h1>
                    <p className="text-xl text-gray-600">{bike.brand} • {bike.type}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xl">★</span>
                    <span className="text-lg font-medium ml-1">{bike.rating}</span>
                    <span className="text-gray-500 ml-1">({bike.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    📍 {bike.location}
                  </span>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{bike.description}</p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {bike.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(bike.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Owner Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Owner</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src={bike.owner.avatar}
                      alt={bike.owner.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{bike.owner.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">{bike.owner.rating} rating</span>
                      <span className="mx-2">•</span>
                      <span>{bike.owner.bikesListed} bikes listed</span>
                      <span className="mx-2">•</span>
                      <span>Joined {bike.owner.joinedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing and Booking */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-4">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${getPriceForDuration(selectedDuration)}/month
                  </div>
                  <p className="text-gray-600">Starting price for lease</p>
                </div>

                {/* Duration Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Lease Duration
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '1', label: '1 Month', price: bike.pricing[1] },
                      { value: '3', label: '3 Months', price: bike.pricing[3] },
                      { value: '6', label: '6 Months', price: bike.pricing[6] },
                      { value: '12', label: '12 Months', price: bike.pricing[12] }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedDuration(option.value)}
                        className={`p-3 text-center border rounded-lg transition-colors ${
                          selectedDuration === option.value
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-600">${option.price}/mo</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Cost */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span>Monthly Rate:</span>
                    <span>${getPriceForDuration(selectedDuration)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>Duration:</span>
                    <span>{selectedDuration} month{selectedDuration !== '1' ? 's' : ''}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between items-center font-semibold">
                    <span>Total Cost:</span>
                    <span>${getPriceForDuration(selectedDuration) * parseInt(selectedDuration)}</span>
                  </div>
                </div>

                {/* Request Lease Button */}
                <button
                  onClick={() => setShowLeaseModal(true)}
                  disabled={!bike.available}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    bike.available
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {bike.available ? 'Request Lease' : 'Currently Unavailable'}
                </button>

                {/* Policies */}
                <div className="mt-6 text-sm">
                  <h4 className="font-medium text-gray-900 mb-3">Lease Policies</h4>
                  {Object.entries(bike.policies).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-gray-600">{key}:</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lease Request Modal */}
        {showLeaseModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div ref={modalRef} className="bg-white rounded-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Lease</h2>
              <p className="text-gray-600 mb-6">
                Send a lease request for {bike.title} for {selectedDuration} month{selectedDuration !== '1' ? 's' : ''} 
                at ${getPriceForDuration(selectedDuration)}/month.
              </p>
              
              <form onSubmit={handleLeaseRequest}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leaseForm.name}
                      onChange={(e) => setLeaseForm({...leaseForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={leaseForm.email}
                      onChange={(e) => setLeaseForm({...leaseForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={leaseForm.phone}
                      onChange={(e) => setLeaseForm({...leaseForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message to Owner
                    </label>
                    <textarea
                      rows={3}
                      value={leaseForm.message}
                      onChange={(e) => setLeaseForm({...leaseForm, message: e.target.value})}
                      placeholder="Tell the owner about yourself and why you'd like to lease their bike..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowLeaseModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}