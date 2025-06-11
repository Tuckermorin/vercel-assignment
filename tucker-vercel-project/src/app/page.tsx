'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [featuredBikes, setFeaturedBikes] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalBikes: 0,
    activeLeasers: 0,
    citiesCovered: 12
  });

  useEffect(() => {
    // Simulate API call for featured bikes
    const fetchFeaturedBikes = async () => {
      const mockFeaturedBikes = [
        {
          id: 1,
          title: "Trek Mountain Explorer",
          brand: "Trek",
          type: "Mountain",
          price: 89,
          image: "/api/placeholder/400/300",
          rating: 4.8,
          location: "Salt Lake City, UT"
        },
        {
          id: 2,
          title: "Specialized Road Racer",
          brand: "Specialized",
          type: "Road",
          price: 125,
          image: "/api/placeholder/400/300",
          rating: 4.9,
          location: "Provo, UT"
        },
        {
          id: 3,
          title: "Cannondale City Cruiser",
          brand: "Cannondale",
          type: "City",
          price: 65,
          image: "/api/placeholder/400/300",
          rating: 4.7,
          location: "Orem, UT"
        }
      ];
      
      setFeaturedBikes(mockFeaturedBikes);
      setStats({
        totalBikes: 247,
        activeLeasers: 1834,
        citiesCovered: 12
      });
    };

    fetchFeaturedBikes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                🚴‍♀️ BikeShare
              </Link>
            </div>
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
            <div className="flex space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition-colors">
                Sign In
              </button>
              <button
                aria-label="get-started"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Test Drive Your Dream Bike Before You Buy
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover the perfect bike through flexible monthly leasing. From mountain adventures to city commutes, find your ideal ride.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/browse"
                  title="main-browse-link"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Browse Bikes
                </Link>
                <Link href="/list-bike" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors text-center">
                  List Your Bike
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 w-full">
                <Image
                  src="/api/placeholder/600/400"
                  alt="Premium bikes available for lease"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div data-testid="stats-section" className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalBikes}+</div>
              <div className="text-gray-600">Bikes Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.activeLeasers.toLocaleString()}+</div>
              <div className="text-gray-600">Happy Riders</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.citiesCovered}</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Bikes */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Bikes</h2>
            <p className="text-xl text-gray-600">Discover popular bikes from trusted owners</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredBikes.map((bike) => (
              <div
                data-testid={`bike-card-${bike.id}`}
                key={bike.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={bike.image}
                    alt={bike.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{bike.title}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">{bike.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{bike.brand} • {bike.type}</p>
                  <p className="text-sm text-gray-500 mb-4">{bike.location}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">${bike.price}/mo</div>
                    <Link href={`/bike/${bike.id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/browse" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
              View All Bikes
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">🚴‍♀️ BikeShare</div>
              <p className="text-gray-400">Making bike ownership accessible through flexible leasing options.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Riders</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/browse" className="hover:text-white transition-colors">Browse Bikes</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Owners</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/list-bike" className="hover:text-white transition-colors">List Your Bike</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BikeShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
