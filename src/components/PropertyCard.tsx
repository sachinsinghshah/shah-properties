import Link from "next/link";
import Image from "next/image";
import { FaRulerCombined, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

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
    <div className="h-full">
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-lg md:hover:shadow-2xl transition-all duration-500 h-full md:transform md:hover:-translate-y-2 md:hover:scale-[1.02] border border-gray-100">
        {/* Image Container with Overlay Actions wrapped in Link */}
        <Link
          href={`/properties/${property.id}`}
          className="relative block h-48 sm:h-56 md:h-64 w-full overflow-hidden"
          prefetch={false}
        >
          <Image
            src={property.images[0]}
            alt={`${property.title} - ${property.location}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain bg-gray-100 transition-transform duration-700 md:group-hover:scale-110"
            priority={false}
            loading="lazy"
            quality={75}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Property Type Badge */}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold text-xs sm:text-sm shadow-lg transform translate-y-0 md:group-hover:-translate-y-1 transition-transform duration-300">
            {property.type}
          </div>

          {/* Price Badge - Enhanced */}
          <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 shadow-xl transform translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
              <p className="text-emerald-600 font-bold text-lg sm:text-xl mb-0.5 sm:mb-1">
                {formatPrice(property.price)}
              </p>
              <p className="text-gray-600 text-xs sm:text-sm flex items-center">
                <FaRulerCombined className="mr-1" />
                {property.area.value} {property.area.unit}
              </p>
            </div>
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-4 sm:p-6">
          <Link
            href={`/properties/${property.id}`}
            className="block"
            prefetch={false}
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-1 md:group-hover:text-emerald-600 transition-colors duration-300">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
            <FaMapMarkerAlt className="mr-1.5 sm:mr-2 text-emerald-500 text-sm sm:text-base" />
            <p className="text-xs sm:text-sm line-clamp-1">
              {property.location}
            </p>
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
          <div className="flex space-x-2 sm:space-x-3 items-center">
            <Link
              href={`/properties/${property.id}`}
              className="flex-1 inline-flex items-center justify-center h-10 sm:h-11 bg-gradient-to-r from-emerald-500 to-teal-500 md:hover:from-emerald-600 md:hover:to-teal-600 text-white px-3 sm:px-4 rounded-lg font-medium leading-none transition-all duration-300 text-center md:hover:shadow-lg md:hover:shadow-emerald-500/25 md:transform md:hover:-translate-y-0.5 text-sm sm:text-base"
              prefetch={false}
            >
              View Details
            </Link>
            <Link
              href={`/properties/${property.id}#contact`}
              className="inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-white border-2 border-emerald-500 text-emerald-500 md:hover:bg-emerald-50 rounded-lg transition-all duration-300 md:hover:scale-110"
              prefetch={false}
              aria-label={`Contact about ${property.title}`}
            >
              <FaPhone className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
