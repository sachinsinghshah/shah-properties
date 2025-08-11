"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { trackPhoneCall } from "./GoogleAnalytics";
import {
  getShahPropertiesPhone,
  getShahPropertiesWhatsApp,
  SHAH_PROPERTIES_PHONE_WITH_COUNTRY,
  SHAH_PROPERTIES_PHONE_DISPLAY,
} from "@/lib/phoneUtils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="flex flex-col items-start">
            <Image
              src="/images/logo.png"
              alt="Shah Properties logo"
              width={240}
              height={240}
              className="h-24 w-auto mb-6"
              sizes="(max-width: 640px) 120px, 192px"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P4z8DwHwAF+gJ7S0kqNwAAAABJRU5ErkJggg=="
            />
            <h3 className="text-2xl font-bold mb-4">Shah Properties</h3>
            <p className="text-gray-300 mb-6 max-w-xs">
              Your trusted partner for premium real estate in Dehradun and
              Dehradun region.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1AnqEc5BRA/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/shahpropertiesrealestate"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 hover:opacity-90 h-10 w-10 rounded-full flex items-center justify-center transition-opacity"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://twitter.com/shahproperties"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 hover:bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={`https://wa.me/${SHAH_PROPERTIES_PHONE_WITH_COUNTRY.replace(
                  "+",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
                onClick={() => trackPhoneCall(getShahPropertiesWhatsApp())}
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 md:hover:text-white flex items-center"
                >
                  <FaArrowRight className="mr-2 text-sm" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-gray-300 md:hover:text-white flex items-center"
                >
                  <FaArrowRight className="mr-2 text-sm" />
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 md:hover:text-white flex items-center"
                >
                  <FaArrowRight className="mr-2 text-sm" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 md:hover:text-white flex items-center"
                >
                  <FaArrowRight className="mr-2 text-sm" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-xl font-bold mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/properties?type=residential"
                  className="text-gray-300 hover:text-white flex items-center"
                >
                  <FaArrowRight className="mr-2 text-sm" />
                  Residential Plots
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=commercial"
                  className="text-gray-300 hover:text-white flex items-center"
                >
                  <FaArrowRight className="mr-2 text-sm" />
                  Commercial Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=agricultural"
                  className="text-gray-300 hover:text-white flex items-center"
                >
                  <FaArrowRight className="mr-2 text-sm" />
                  Agricultural Land
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-blue-400" />
                <span className="text-gray-300">Shah Properties, Dehradun</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-blue-400" />
                <a
                  href={`tel:${SHAH_PROPERTIES_PHONE_WITH_COUNTRY}`}
                  className="text-gray-300 hover:text-white"
                  onClick={() => trackPhoneCall(getShahPropertiesPhone())}
                >
                  {SHAH_PROPERTIES_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-blue-400" />
                <a
                  href="mailto:shahproperties03@gmail.com"
                  className="text-gray-300 hover:text-white"
                >
                  shahproperties03@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>© {currentYear} Shah Properties. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
