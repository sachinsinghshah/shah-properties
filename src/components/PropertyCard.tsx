import Link from "next/link";
import {
  FaRulerCombined,
  FaMapMarkerAlt,
  FaHeart,
  FaEye,
  FaPhone,
  FaPlay,
} from "react-icons/fa";
import Image from "next/image";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    price: number;
    location: string;
    area: {
      value: number;
      unit: string;
    };
    type: string;
    category: string;
    images: string[];
    videoUrl?: string;
  };
}

// Helper function to format price in Indian rupees
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-2 hover:scale-[1.02] border border-gray-100">
      {/* Image Container with Overlay Actions */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-contain bg-gray-100 transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Property Type Badge */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold text-xs sm:text-sm shadow-lg transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
          {property.type}
        </div>

        {/* Quick Action Buttons */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex space-x-1 sm:space-x-2 opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110">
            <FaHeart className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          <button className="bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110">
            <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
          {property.videoUrl && (
            <button className="bg-red-500/90 backdrop-blur-md p-1.5 sm:p-2 rounded-full text-white hover:bg-red-600 transition-all duration-200 hover:scale-110">
              <FaPlay className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          )}
        </div>

        {/* Price Badge - Enhanced */}
        <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <p className="text-emerald-600 font-bold text-lg sm:text-xl mb-0.5 sm:mb-1">
              {formatPrice(property.price)}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm flex items-center">
              <FaRulerCombined className="mr-1" />
              {property.area.value} {property.area.unit}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
          <FaMapMarkerAlt className="mr-1.5 sm:mr-2 text-emerald-500 text-sm sm:text-base" />
          <p className="text-xs sm:text-sm line-clamp-1">{property.location}</p>
        </div>

        {/* Property Details */}
        <div className="border-t border-gray-100 pt-3 sm:pt-4 mb-3 sm:mb-4">
          <div className="flex justify-between items-center">
            <span className="text-emerald-600 font-semibold capitalize bg-emerald-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
              {property.category}
            </span>
            <span className="text-gray-500 text-xs sm:text-sm">For Sale</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 sm:space-x-3">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-all duration-300 text-center hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            View Details
          </Link>
          <button className="bg-white border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 p-1.5 sm:p-2 rounded-lg transition-all duration-300 hover:scale-110">
            <FaPhone className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Floating "New" Badge for Featured Properties */}
      <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg transform rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300">
        Featured
      </div>
    </div>
  );
}
