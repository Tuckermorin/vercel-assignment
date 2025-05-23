import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Browse() {
  const [bikes, setBikes] = useState([]);
  const [filteredBikes, setFilteredBikes] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    priceRange: '',
    location: '',
    duration: ''
  });
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');
  const searchRef = useRef(null);

  // Mock bike data - replace with your API call
  const mockBikes = [
    {
      id: 1,
      title: "Trek Mountain Explorer",
      brand: "Trek",
      type: "Mountain",
      price: 89,
      image: "/api/placeholder/400/300",
      rating: 4.8,
      location: "Salt Lake City, UT",
      owner: "Mike Johnson",
      description: "Perfect for trail adventures and mountain exploration.",
      available: true,
      features: ["Full Suspension", "27 Speed", "Disc Brakes"]
    },
    {
      id: 2,
      title: "Specialized Road Racer",
      brand: "Specialized",
      type: "Road",
      price: 125,
      image: "/api/placeholder/400/300",
      rating: 4.9,
      location: "Provo, UT",
      owner: "Sarah Wilson",
      description: "Lightweight carbon frame for serious road cycling.",
      available: true,
      features: ["Carbon Frame", "22 Speed", "Racing Geometry"]
    },
    {
      id: 3,
      title: "Cannondale City Cruiser",
      brand: "Cannondale",
      type: "City",
      price: 65,
      image: "/api/placeholder/400/300",
      rating: 4.7,
      location: "Orem, UT",
      owner: "David Chen",
      description: "Comfortable city riding with style and efficiency.",
      available: true,
      features: ["Comfort Seat", "7 Speed", "Built-in Lights"]
    },
    {
      id: 4,
      title: "Giant Hybrid Commuter",
      brand: "Giant",
      type: "Hybrid",
      price: 75,
      image: "/api/placeholder/400/300",
      rating: 4.6,
      location: "Salt Lake City, UT",
      owner: "Emma Davis",
      description: "Best of both worlds - comfort and performance.",
      available: true,
      features: ["Hybrid Design", "21 Speed", "Puncture Resistant"]
    },
    {
      id: 5,
      title: "Scott Electric Mountain",
      brand: "Scott",
      type: "Electric",
      price: 195,
      image: "/api/placeholder/400/300",
      rating: 4.9,
      location: "Park City, UT",
      owner: "Alex Rodriguez",
      description: "Electric-powered mountain adventures await.",
      available: false,
      features: ["E-Motor", "Full Suspension", "50mi Range"]
    },
    {
      id: 6,
      title: "Bianchi Road Classic",
      brand: "Bianchi",
      type: "Road",
      price: 110,
      image: "/api/placeholder/400/300",
      rating: 4.8,
      location: "Provo, UT",
      owner: "Lisa Thompson",
      description: "Classic Italian road bike with modern performance.",
      available: true,
      features: ["Steel Frame", "16 Speed", "Drop Bars"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchBikes = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBikes(mockBikes);
      setFilteredBikes(mockBikes);
      setLoading(false);
    };

    fetchBikes();
  }, []);

  useEffect(() => {
    let filtered = [...bikes];

    // Apply filters
    if (filters.type) {
      filtered = filtered.filter(bike => bike.type === filters.type);
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(bike => bike.price >= min && (max ? bike.price <= max : true));
    }
    if (filters.location) {
      filtered = filtered.filter(bike => bike.location.includes(filters.location));
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    setFilteredBikes(filtered);
  }, [filters, sortBy, bikes]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      priceRange: '',
      location: '',
      duration: ''
    });
    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setFilteredBikes(bikes);
    } else {
      const searched = bikes.filter(bike => 
        bike.title.toLowerCase().includes(searchTerm) ||
        bike.brand.toLowerCase().includes(searchTerm) ||
        bike.type.toLowerCase().includes(searchTerm)
      );
      setFilteredBikes(searched);
    }
  };

  return (
    <>
      <Head>
        <title>Browse Bikes - BikeShare</title>
        <meta name="description" content="Browse and compare bikes available for lease from trusted owners." />
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
                <Link href="/browse" className="text-blue-600 font-semibold">
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Available Bikes</h1>
            <p className="text-gray-600">Find your perfect ride from our collection of premium bikes</p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
            <div className="grid md:grid-cols-6 gap-4 items-end">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search bikes, brands..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSearch}
                />
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="Mountain">Mountain</option>
                  <option value="Road">Road</option>
                  <option value="City">City</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Any Price</option>
                  <option value="0-75">$0 - $75</option>
                  <option value="75-125">$75 - $125</option>
                  <option value="125-200">$125 - $200</option>
                  <option value="200">$200+</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  <option value="Salt Lake City">Salt Lake City</option>
                  <option value="Provo">Provo</option>
                  <option value="Orem">Orem</option>
                  <option value="Park City">Park City</option>
                </select>
              </div>

              {/* Clear Filters */}
              <div>
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredBikes.length} bikes found`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Bikes Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-xl shadow-sm border animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-10 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBikes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No bikes found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBikes.map((bike) => (
                <div key={bike.id} className={`bg-white rounded-xl shadow-sm border hover:shadow-lg transition-shadow ${!bike.available ? 'opacity-75' : ''}`}>
                  <div className="relative">
                    <div className="relative h-48">
                      <Image
                        src={bike.image}
                        alt={bike.title}
                        fill
                        className="object-cover rounded-t-xl"
                      />
                    </div>
                    {!bike.available && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Currently Leased
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded flex items-center">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="text-sm font-medium ml-1">{bike.rating}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{bike.title}</h3>
                    <p className="text-gray-600 mb-1">{bike.brand} • {bike.type}</p>
                    <p className="text-sm text-gray-500 mb-2">{bike.location}</p>
                    <p className="text-sm text-gray-600 mb-3">{bike.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {bike.features.map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">${bike.price}/mo</div>
                        <div className="text-xs text-gray-500">by {bike.owner}</div>
                      </div>
                      <Link 
                        href={`/bike/${bike.id}`} 
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          bike.available 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {bike.available ? 'View Details' : 'Unavailable'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}