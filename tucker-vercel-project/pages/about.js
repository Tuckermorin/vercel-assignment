import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  const [activeTab, setActiveTab] = useState('how-it-works');

  return (
    <>
      <Head>
        <title>How It Works - BikeShare</title>
        <meta name="description" content="Learn how BikeShare works for both bike renters and owners. Simple, safe, and flexible bike leasing." />
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
                <Link href="/about" className="text-blue-600 font-semibold">
                  How It Works
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">How BikeShare Works</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              BikeShare connects bike owners with riders, creating a community where everyone can access premium bikes through flexible leasing options.
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border">
            {/* Tab Headers */}
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'how-it-works', label: 'How It Works', icon: '🔄' },
                  { id: 'for-renters', label: 'For Renters', icon: '🚴‍♂️' },
                  { id: 'for-owners', label: 'For Owners', icon: '💰' },
                  { id: 'safety', label: 'Safety & Trust', icon: '🛡️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {/* How It Works Tab */}
              {activeTab === 'how-it-works' && (
                <div className="space-y-12">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Steps to Get Started</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Whether you want to rent a bike or share yours, BikeShare makes it easy and secure.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    {/* For Renters */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">For Renters</h3>
                      <div className="space-y-6">
                        {[
                          {
                            step: 1,
                            title: "Browse & Filter",
                            description: "Search through hundreds of bikes by type, location, and price range.",
                            icon: "🔍"
                          },
                          {
                            step: 2,
                            title: "Choose Duration",
                            description: "Select from 1, 3, 6, or 12-month lease options with flexible pricing.",
                            icon: "📅"
                          },
                          {
                            step: 3,
                            title: "Request Lease",
                            description: "Send a request to the bike owner with your preferred terms.",
                            icon: "📝"
                          },
                          {
                            step: 4,
                            title: "Pick Up & Ride",
                            description: "Meet the owner, complete the lease agreement, and start riding!",
                            icon: "🚴‍♂️"
                          }
                        ].map((item) => (
                          <div key={item.step} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-2xl">{item.icon}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {item.step}. {item.title}
                              </h4>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* For Owners */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">For Owners</h3>
                      <div className="space-y-6">
                        {[
                          {
                            step: 1,
                            title: "List Your Bike",
                            description: "Create a detailed listing with photos, specs, and pricing.",
                            icon: "📷"
                          },
                          {
                            step: 2,
                            title: "Set Your Terms",
                            description: "Choose your lease rates, security deposit, and availability.",
                            icon: "⚙️"
                          },
                          {
                            step: 3,
                            title: "Review Requests",
                            description: "Get lease requests and choose the best renters for your bike.",
                            icon: "✅"
                          },
                          {
                            step: 4,
                            title: "Earn Money",
                            description: "Meet your renter, hand over the bike, and start earning!",
                            icon: "💰"
                          }
                        ].map((item) => (
                          <div key={item.step} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <span className="text-2xl">{item.icon}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {item.step}. {item.title}
                              </h4>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* For Renters Tab */}
              {activeTab === 'for-renters' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Perfect for Riders</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Try before you buy, or simply enjoy riding without the commitment of ownership.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        title: "Try Different Brands",
                        description: "Test ride Trek, Specialized, Giant, and other premium brands before making a purchase decision.",
                        icon: "🏆",
                        color: "blue"
                      },
                      {
                        title: "Flexible Duration",
                        description: "Choose lease periods from 1 to 12 months. Extend, switch, or return anytime with proper notice.",
                        icon: "⏰",
                        color: "green"
                      },
                      {
                        title: "No Maintenance Hassle",
                        description: "Most owners include basic maintenance. Focus on riding, not repairs and tune-ups.",
                        icon: "🔧",
                        color: "purple"
                      },
                      {
                        title: "Lower Upfront Cost",
                        description: "Access expensive bikes for a fraction of the purchase price. Perfect for students and urban riders.",
                        icon: "💵",
                        color: "yellow"
                      },
                      {
                        title: "Local Community",
                        description: "Connect with local bike enthusiasts and get insider tips about the best riding spots.",
                        icon: "🤝",
                        color: "pink"
                      },
                      {
                        title: "Insurance Options",
                        description: "Optional insurance coverage protects you from theft and damage liability.",
                        icon: "🛡️",
                        color: "indigo"
                      }
                    ].map((benefit, index) => (
                      <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                        <div className={`w-16 h-16 bg-${benefit.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <span className="text-3xl">{benefit.icon}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Example */}
                  <div className="bg-blue-50 rounded-xl p-8">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Pricing Example</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                      {[
                        { duration: "1 Month", price: "$89", savings: "vs $2,500 to buy" },
                        { duration: "3 Months", price: "$79/mo", savings: "Save $30/month" },
                        { duration: "6 Months", price: "$69/mo", savings: "Save $60/month" },
                        { duration: "12 Months", price: "$59/mo", savings: "Save $90/month" }
                      ].map((option, index) => (
                        <div key={index} className="bg-white rounded-lg p-4 text-center">
                          <div className="text-sm text-gray-600 mb-1">{option.duration}</div>
                          <div className="text-2xl font-bold text-blue-600 mb-1">{option.price}</div>
                          <div className="text-xs text-green-600">{option.savings}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* For Owners Tab */}
              {activeTab === 'for-owners' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Earn Money from Your Bike</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      Turn your unused bike into a source of income while helping others discover the joy of cycling.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Passive Income",
                        description: "Earn $50-200+ per month depending on your bike and lease duration. Premium bikes command higher rates.",
                        icon: "💸"
                      },
                      {
                        title: "Meet Fellow Cyclists",
                        description: "Connect with local cycling enthusiasts and become part of the community.",
                        icon: "👥"
                      },
                      {
                        title: "Your Bike Stays Active",
                        description: "Bikes are meant to be ridden. Keep yours in good condition through regular use.",
                        icon: "🚴‍♀️"
                      },
                      {
                        title: "Full Control",
                        description: "Set your own rates, choose your renters, and maintain control over your property.",
                        icon: "🎛️"
                      }
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">{benefit.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Earnings Calculator */}
                  <div className="bg-green-50 rounded-xl p-8">
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Potential Earnings</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          type: "City Bike",
                          monthlyRate: "$65",
                          yearlyEarnings: "$780",
                          description: "Casual riders, commuters"
                        },
                        {
                          type: "Mountain Bike",
                          monthlyRate: "$89",
                          yearlyEarnings: "$1,068",
                          description: "Weekend adventurers"
                        },
                        {
                          type: "Premium Road Bike",
                          monthlyRate: "$125",
                          yearlyEarnings: "$1,500",
                          description: "Serious cyclists, racers"
                        }
                      ].map((example, index) => (
                        <div key={index} className="bg-white rounded-lg p-6 text-center">
                          <h4 className="font-semibold text-gray-900 mb-2">{example.type}</h4>
                          <div className="text-2xl font-bold text-green-600 mb-1">{example.monthlyRate}/mo</div>
                          <div className="text-lg text-gray-700 mb-2">{example.yearlyEarnings}/year</div>
                          <p className="text-sm text-gray-600">{example.description}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-4">
                      * Earnings based on 12-month leases. Actual earnings may vary.
                    </p>
                  </div>

                  {/* Requirements */}
                  <div className="bg-gray-100 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements for Owners</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span>Bike in good working condition</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span>Valid ID and contact information</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span>Clear photos of your bike</span>
                        </li>
                      </ul>
                      <ul className="space-y-2">
                        <li className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span>Responsive to renter inquiries</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span>Flexible with pickup/dropoff</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="text-green-600">✓</span>
                          <span>Honest about bike condition</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Safety & Trust Tab */}
              {activeTab === 'safety' && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Safety is Our Priority</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      We've built multiple layers of protection to ensure safe and trustworthy transactions for everyone.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* For Everyone */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Trust & Verification</h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Identity Verification",
                            description: "All users verify their identity with government-issued ID before participating.",
                            icon: "🆔"
                          },
                          {
                            title: "Rating System",
                            description: "Both renters and owners rate each other, building a trustworthy community.",
                            icon: "⭐"
                          },
                          {
                            title: "Secure Communication",
                            description: "Initial contact happens through our platform to protect privacy.",
                            icon: "💬"
                          },
                          {
                            title: "Support Team",
                            description: "Our customer support team is available to help resolve any issues.",
                            icon: "🎧"
                          }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Protection */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-6">Financial Protection</h3>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Security Deposits",
                            description: "Refundable deposits protect owners against damage or theft.",
                            icon: "🔒"
                          },
                          {
                            title: "Insurance Options",
                            description: "Optional insurance coverage for both theft and damage protection.",
                            icon: "🛡️"
                          },
                          {
                            title: "Dispute Resolution",
                            description: "Fair and impartial process to resolve any conflicts that arise.",
                            icon: "⚖️"
                          },
                          {
                            title: "Secure Payments",
                            description: "All transactions processed through secure, encrypted payment systems.",
                            icon: "💳"
                          }
                        ].map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                              <p className="text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Safety Tips */}
                  <div className="bg-yellow-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Safety Tips</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">For Renters</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Meet in public places for bike handover</li>
                          <li>• Inspect the bike thoroughly before accepting</li>
                          <li>• Take photos of any existing damage</li>
                          <li>• Keep all communication documented</li>
                          <li>• Report any issues immediately</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">For Owners</h4>
                        <ul className="space-y-1 text-sm text-gray-700">
                          <li>• Check renter profiles and ratings</li>
                          <li>• Document bike condition with photos</li>
                          <li>• Collect appropriate security deposit</li>
                          <li>• Verify renter identity in person</li>
                          <li>• Trust your instincts about renters</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of cyclists who are already using BikeShare to discover new bikes or earn money from their existing ones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/browse" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
                Browse Bikes
              </Link>
              <Link href="/list-bike" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
                List Your Bike
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}