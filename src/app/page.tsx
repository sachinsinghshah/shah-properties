"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  FaSearch,
  FaBuilding,
  FaHandshake,
  FaChartLine,
  FaMapMarkerAlt,
  FaQuoteLeft,
  FaArrowRight,
  FaPhone,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProperties = properties.slice(0, 3);

  const slides = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/properties?location=${encodeURIComponent(
      searchLocation
    )}`;
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide}
                alt={`Beautiful property view ${index + 1}`}
                fill
                priority={index === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Elegant Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-800/30 to-pink-800/40"></div>

        {/* Dynamic Shimmer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-transparent to-blue-600/20"></div>

        {/* Text Readability Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Property Label */}
        <div className="absolute top-6 right-6 z-20">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm font-medium">
            🏡 Premium Properties
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        {/* Slideshow Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full shadow-lg transition-all duration-300 hover:scale-125 ${
                currentSlide === index
                  ? "bg-amber-400 ring-2 ring-white/50"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 animate-fadeIn hero-text-shadow">
            Find Your Dream Property in{" "}
            <span className="text-yellow-300 font-extrabold drop-shadow-lg">
              Dehradun & Saharanpur
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8 max-w-3xl animate-fadeIn animation-delay-200">
            Discover premium properties with Shah Properties, your trusted real
            estate partner
          </p>

          <form
            onSubmit={handleSearch}
            className="w-full max-w-4xl glass-effect p-8 rounded-2xl shadow-2xl animate-fadeIn animation-delay-400 animate-float border border-white/20"
          >
            <div className="mb-4 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                Find Your Dream Property
              </h3>
              <p className="text-emerald-100 text-sm">
                Search from thousands of premium properties
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              {/* Location Input */}
              <div className="flex-grow relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-emerald-400 group-focus-within:text-emerald-500 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  placeholder="Enter location (e.g., Shimla Bypass Road, Dehradun)"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:ring-3 focus:ring-emerald-400/50 text-gray-900 shadow-lg backdrop-blur-sm bg-white/95 hover:bg-white transition-all duration-300 placeholder:text-gray-500 font-medium"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced Search Button */}
              <button
                type="submit"
                className="group relative bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white py-4 px-8 lg:px-10 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105 hover:-translate-y-1 border border-white/20 min-w-[200px]"
              >
                <span className="relative z-10 flex items-center">
                  <FaSearch className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
                  Search Properties
                </span>
                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Quick Search Suggestions */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-white/80 text-sm mr-2">Popular:</span>
              {["Dehradun", "Saharanpur", "Shimla Bypass", "Race Course"].map(
                (location) => (
                  <button
                    key={location}
                    type="button"
                    onClick={() => setSearchLocation(location)}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-sm rounded-full transition-all duration-200 hover:scale-105 border border-white/30"
                  >
                    {location}
                  </button>
                )
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive real estate services to meet all your
              property needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Property Listing Service */}
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-l-4 border-emerald-400 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <FaBuilding className="text-emerald-600 text-2xl group-hover:text-emerald-700" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                  Property Listing
                </h3>
                <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300">
                  Explore our extensive collection of premium properties in
                  prime locations across Dehradun and Saharanpur
                </p>

                {/* Hover Call-to-Action */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    View Properties
                  </button>
                </div>
              </div>
            </div>

            {/* Expert Consultation Service */}
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-l-4 border-teal-400 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                <div className="bg-gradient-to-br from-teal-100 to-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <FaHandshake className="text-teal-600 text-2xl group-hover:text-teal-700" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4 group-hover:text-teal-600 transition-colors duration-300">
                  Expert Consultation
                </h3>
                <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300">
                  Get personalized advice from our experienced real estate
                  consultants to make informed decisions
                </p>

                {/* Hover Call-to-Action */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    Get Consultation
                  </button>
                </div>
              </div>
            </div>

            {/* Property Valuation Service */}
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border-l-4 border-blue-400 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                  <FaChartLine className="text-blue-600 text-2xl group-hover:text-blue-700" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Property Valuation
                </h3>
                <p className="text-gray-600 text-center group-hover:text-gray-700 transition-colors duration-300">
                  Accurate property valuation services to help you understand
                  the true worth of your investment
                </p>

                {/* Hover Call-to-Action */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                    Get Valuation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-4">
              🏆 Premium Selection
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Handpicked premium properties that offer exceptional value and
              quality. Each property is carefully selected for its location,
              amenities, and investment potential.
            </p>

            {/* Enhanced View All Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/properties"
                className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View All Properties
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <div className="flex items-center text-gray-500 text-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                <span>{properties.length}+ Properties Available</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-slate-800 via-emerald-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Clients Say</h2>
            <p className="mt-4 text-xl text-slate-200">
              Don&apos;t just take our word for it - hear from our satisfied
              clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <FaQuoteLeft className="text-amber-300 text-3xl mb-4" />
              <p className="mb-6 text-slate-100">
                &ldquo;Shah Properties helped me find my dream home in Dehradun.
                Their expert guidance made the entire process smooth and
                hassle-free.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                  RK
                </div>
                <div>
                  <p className="font-bold">Rajesh Kumar</p>
                  <p className="text-slate-300 text-sm">Dehradun</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <FaQuoteLeft className="text-amber-300 text-3xl mb-4" />
              <p className="mb-6 text-slate-100">
                &ldquo;I was looking for an investment property and Shah
                Properties provided exceptional service. Their market knowledge
                is unmatched.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                  AS
                </div>
                <div>
                  <p className="font-bold">Anita Singh</p>
                  <p className="text-slate-300 text-sm">Saharanpur</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <FaQuoteLeft className="text-amber-300 text-3xl mb-4" />
              <p className="mb-6 text-slate-100">
                &ldquo;The team at Shah Properties was professional and
                responsive. They found us a property that perfectly matched our
                requirements.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg">
                  VP
                </div>
                <div>
                  <p className="font-bold">Vikram Patel</p>
                  <p className="text-slate-300 text-sm">Dehradun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-orange-500/20"></div>

        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full animate-float animation-delay-200"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-400"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fadeIn">
              Ready to Find Your
              <span className="text-amber-300 block md:inline">
                {" "}
                Perfect Property?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-emerald-100 mb-10 max-w-3xl mx-auto animate-fadeIn animation-delay-200">
              Connect with us today and let our experts help you find the
              property that meets all your requirements
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeIn animation-delay-400">
              <Link
                href="/properties"
                className="group relative bg-white text-emerald-600 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-amber-50 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/25 min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Browse Properties
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/contact"
                className="group relative bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/25 min-w-[200px]"
              >
                <span className="flex items-center justify-center">
                  <FaPhone className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Contact Us
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fadeIn animation-delay-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300 mb-2">
                  500+
                </div>
                <div className="text-emerald-100">Properties Sold</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300 mb-2">
                  1000+
                </div>
                <div className="text-emerald-100">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-300 mb-2">
                  15+
                </div>
                <div className="text-emerald-100">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
