import Link from "next/link";
import {
  FaRulerCombined,
  FaMapMarkerAlt,
  FaHeart,
  FaEye,
  FaPhone,
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
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-contain bg-gray-100 transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Property Type Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full font-semibold text-sm shadow-lg transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
          {property.type}
        </div>

        {/* Quick Action Buttons */}
        <div className="absolute top-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110">
            <FaHeart className="w-4 h-4" />
          </button>
          <button className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/30 transition-all duration-200 hover:scale-110">
            <FaEye className="w-4 h-4" />
          </button>
        </div>

        {/* Price Badge - Enhanced */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <p className="text-emerald-600 font-bold text-xl mb-1">
              {formatPrice(property.price)}
            </p>
            <p className="text-gray-600 text-sm flex items-center">
              <FaRulerCombined className="mr-1" />
              {property.area.value} {property.area.unit}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1 group-hover:text-emerald-600 transition-colors duration-300">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 mb-4">
          <FaMapMarkerAlt className="mr-2 text-emerald-500" />
          <p className="text-sm line-clamp-1">{property.location}</p>
        </div>

        {/* Property Details */}
        <div className="border-t border-gray-100 pt-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-emerald-600 font-semibold capitalize bg-emerald-50 px-3 py-1 rounded-full text-sm">
              {property.category}
            </span>
            <span className="text-gray-500 text-sm">For Sale</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            href={`/properties/${property.id}`}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 text-center hover:shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-0.5"
          >
            View Details
          </Link>
          <button className="bg-white border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 p-2 rounded-lg transition-all duration-300 hover:scale-110">
            <FaPhone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floating "New" Badge for Featured Properties */}
      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg transform rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300">
        Featured
      </div>
    </div>
  );
}
