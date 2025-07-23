"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaBars,
  FaTimes,
  FaHome,
  FaBuilding,
  FaTools,
  FaPhone,
  FaInfoCircle,
} from "react-icons/fa";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-1 sm:py-2"
          : "bg-slate-900/80 backdrop-blur-lg py-2 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 sm:h-10 sm:w-10 mr-1.5 sm:mr-2">
              <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 h-full w-full flex items-center justify-center rounded-xl shadow-lg animate-pulse">
                <span className="text-white font-bold text-sm sm:text-xl">
                  SP
                </span>
              </div>
            </div>
            <span
              className={`font-bold text-lg sm:text-xl ${
                isScrolled ? "text-slate-800" : "text-white"
              }`}
            >
              Shah Properties
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-md font-medium transition-colors hover:bg-blue-50 ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-800"
                  : "text-white hover:text-blue-100"
              }`}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`px-4 py-2 rounded-md font-medium transition-colors hover:bg-blue-50 ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-800"
                  : "text-white hover:text-blue-100"
              }`}
            >
              Properties
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 rounded-md font-medium transition-colors hover:bg-blue-50 ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-800"
                  : "text-white hover:text-blue-100"
              }`}
            >
              About
            </Link>
            <Link
              href="/tools/mortgage-calculator"
              className={`px-4 py-2 rounded-md font-medium transition-colors hover:bg-blue-50 ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-800"
                  : "text-white hover:text-blue-100"
              }`}
            >
              Tools
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 rounded-md font-medium transition-colors hover:bg-blue-50 ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-800"
                  : "text-white hover:text-blue-100"
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Search Button */}
          <div className="hidden md:flex items-center">
            <Link
              href="/properties"
              className={`ml-4 px-5 py-2 rounded-full flex items-center transition-all duration-300 ${
                isScrolled
                  ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-pink-500/25"
                  : "bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-500 hover:to-blue-600 shadow-lg hover:shadow-cyan-400/25 backdrop-blur-sm"
              }`}
            >
              <FaSearch className="mr-2" />
              <span>Search</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-1.5 sm:p-2 rounded-md focus:outline-none ${
                isScrolled ? "text-blue-800" : "text-white"
              }`}
            >
              {isMenuOpen ? (
                <FaTimes size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <FaBars size={20} className="sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 bg-white shadow-lg" : "max-h-0"
        }`}
      >
        <div className="px-3 sm:px-4 py-2 space-y-1">
          <Link
            href="/"
            className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaHome className="mr-2 sm:mr-3 text-sm sm:text-base" />
            Home
          </Link>
          <Link
            href="/properties"
            className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaBuilding className="mr-2 sm:mr-3 text-sm sm:text-base" />
            Properties
          </Link>
          <Link
            href="/about"
            className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaInfoCircle className="mr-2 sm:mr-3 text-sm sm:text-base" />
            About
          </Link>
          <Link
            href="/tools/mortgage-calculator"
            className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTools className="mr-2 sm:mr-3 text-sm sm:text-base" />
            Tools
          </Link>
          <Link
            href="/contact"
            className="flex items-center px-3 sm:px-4 py-2.5 sm:py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-800 rounded-md text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaPhone className="mr-2 sm:mr-3 text-sm sm:text-base" />
            Contact
          </Link>
          <Link
            href="/properties"
            className="flex items-center justify-center mt-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaSearch className="mr-1.5 sm:mr-2" />
            Search Properties
          </Link>
        </div>
      </div>
    </nav>
  );
}
