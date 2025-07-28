"use client";

import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function SearchForm() {
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/properties?location=${encodeURIComponent(
      searchLocation
    )}`;
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl glass-effect p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-2xl animate-fadeIn animation-delay-400 animate-float border border-white/20 backdrop-blur-xl bg-white/10 hover:bg-white/15 transition-all duration-500 mx-2 sm:mx-4"
    >
      {/* Mobile: Simplified form header */}
      <div className="block sm:hidden mb-3 text-center">
        <h3 className="text-base font-semibold text-white mb-1">
          Find Your Dream Property
        </h3>
      </div>

      {/* Desktop: Full form header */}
      <div className="hidden sm:block mb-3 sm:mb-4 text-center">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-1 sm:mb-2">
          Find Your Dream Property
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-2 sm:gap-3 md:gap-4">
        {/* Location Input */}
        <div className="flex-grow relative group">
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <FaMapMarkerAlt className="text-emerald-400 group-focus-within:text-emerald-500 transition-colors duration-200 text-sm sm:text-base" />
          </div>
          <input
            type="text"
            placeholder="Enter location (e.g., Shimla Bypass Road, Dehradun)"
            className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 md:py-4 rounded-xl border-0 focus:ring-3 focus:ring-emerald-400/50 text-gray-900 shadow-lg backdrop-blur-sm bg-white/95 hover:bg-white transition-all duration-300 placeholder:text-gray-500 font-medium text-sm sm:text-base"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Search Button */}
        <button
          type="submit"
          className="group relative bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 lg:px-10 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 flex items-center justify-center shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-105 hover:-translate-y-1 border border-white/20 min-w-[120px] sm:min-w-[160px] md:min-w-[200px]"
        >
          <span className="relative z-10 flex items-center">
            <FaSearch className="mr-1.5 sm:mr-2 md:mr-3 group-hover:rotate-12 transition-transform duration-300 text-sm sm:text-base" />
            <span className="hidden sm:inline">Search Properties</span>
            <span className="sm:hidden">Search</span>
          </span>
          <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </form>
  );
} 