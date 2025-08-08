"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
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
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-colors duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/90 backdrop-blur-md shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Shah Properties logo"
              width={96}
              height={96}
              priority={false}
              sizes="48px"
              className="h-12 w-auto mr-3"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P4z8DwHwAF+gJ7S0kqNwAAAABJRU5ErkJggg=="
            />
            <span className="text-xl font-bold text-blue-900 hidden sm:inline-flex">
              Shah <span className="text-orange-600">Properties</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-blue-900 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="font-medium text-gray-700 hover:text-blue-900 transition-colors duration-200"
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-blue-900 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/tools"
              className="font-medium text-gray-700 hover:text-blue-900 transition-colors duration-200"
            >
              Tools
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen
            ? "max-h-screen bg-white shadow-lg border-t border-gray-100"
            : "max-h-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaHome className="mr-3 text-blue-900" />
            Home
          </Link>
          <Link
            href="/properties"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaBuilding className="mr-3 text-blue-900" />
            Properties
          </Link>
          <Link
            href="/about"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaInfoCircle className="mr-3 text-blue-900" />
            About
          </Link>
          <Link
            href="/tools"
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-900 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaTools className="mr-3 text-blue-900" />
            Tools
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center mx-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            <FaPhone className="mr-2" />
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
