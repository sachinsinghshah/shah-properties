import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaCalendarAlt,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { properties, getSimilarProperties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import ImageGallery from "@/components/ImageGallery";
import YouTubeVideo from "@/components/YouTubeVideo";
import PropertyViewTracker from "@/components/PropertyViewTracker";
import PropertyContactButtons from "@/components/PropertyContactButtons";

interface Props {
  params: Promise<{ id: string }>;
}

// Pre-generate static params for ISR/SSG
export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    return {
      title: "Property Not Found | Shah Properties",
    };
  }

  return {
    title: `${property.title} | Shah Properties`,
    description: property.description.substring(0, 160),
    openGraph: {
      title: property.title,
      description: property.description.substring(0, 160),
      images: [
        {
          url: property.images[0],
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);

  if (!property) {
    notFound();
  }

  const similarProperties = getSimilarProperties(id, 3);

  // Format price in Indian currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Structured data for property
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://shahproperties.com/properties/${id}`,
    image: property.images,
    price: {
      "@type": "PriceSpecification",
      price: property.price,
      priceCurrency: "INR",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressRegion: "Uttarakhand",
      addressCountry: "IN",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area.value,
      unitCode: property.area.unit,
    },
    numberOfRooms: property.type === "residential" ? "Multiple" : "N/A",
    datePosted: property.postedDate,
    availability: property.status === "available" ? "InStock" : "OutOfStock",
  };

  return (
    <>
      <PropertyViewTracker
        propertyId={property.id}
        propertyTitle={property.title}
        price={property.price}
        location={property.location}
      />
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Back Button */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/properties"
              className="inline-flex items-center text-blue-800 hover:text-blue-700"
            >
              <FaArrowLeft className="mr-2" />
              Back to Properties
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2">
              {/* Property Images */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <ImageGallery images={property.images} title={property.title} />
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <FaMapMarkerAlt className="mr-2 text-blue-800" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-800">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-gray-600">
                      ₹{property.pricePerSqYard.toLocaleString()}/sq.yd
                    </div>
                  </div>
                </div>

                {/* Key Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <FaRulerCombined className="text-blue-600 text-3xl mx-auto mb-3" />
                    <div className="font-bold text-gray-900 mb-1">Area</div>
                    <div className="text-blue-600 font-semibold">
                      {property.area.value} {property.area.unit}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="text-green-600 text-3xl mx-auto mb-3">
                      🏷️
                    </div>
                    <div className="font-bold text-gray-900 mb-1">Category</div>
                    <div className="text-green-600 font-semibold capitalize">
                      {property.category}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                    <FaCalendarAlt className="text-purple-600 text-3xl mx-auto mb-3" />
                    <div className="font-bold text-gray-900 mb-1">Posted</div>
                    <div className="text-purple-600 font-semibold">
                      {new Date(property.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                    <div className="text-orange-600 text-3xl mx-auto mb-3">
                      📍
                    </div>
                    <div className="font-bold text-gray-900 mb-1">Status</div>
                    <div
                      className={`capitalize font-semibold ${
                        property.status === "available"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {property.status}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Property Video */}
                {property.videoUrl && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                      Property Video Tour
                    </h2>
                    <YouTubeVideo
                      videoUrl={property.videoUrl}
                      title={`${property.title} - Video Tour`}
                      className="w-full"
                      startTime={
                        property.location.toLowerCase().includes("kalyanpur")
                          ? 7 * 60 + 33 // 7:33 for Kalyanpur
                          : property.location.toLowerCase().includes("pondha")
                          ? 9 * 60 + 21 // 9:21 for Pondha
                          : undefined
                      }
                      endTime={
                        property.location.toLowerCase().includes("kalyanpur")
                          ? 8 * 60 // 8:00 for Kalyanpur
                          : property.location.toLowerCase().includes("pondha")
                          ? 9 * 60 + 29 // 9:29 for Pondha
                          : undefined
                      }
                    />
                  </div>
                )}

                {/* Features */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-green-50 rounded-lg border border-green-100"
                      >
                        <FaCheckCircle className="text-green-600 mr-3 text-lg" />
                        <span className="text-gray-800 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    Amenities
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-100"
                      >
                        <FaCheckCircle className="text-blue-600 mr-3 text-lg" />
                        <span className="text-gray-800 font-medium">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Facilities */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    Nearby Facilities
                  </h2>
                  <div className="space-y-3">
                    {property.nearbyFacilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                      >
                        <div>
                          <span className="font-bold text-gray-900">
                            {facility.name}
                          </span>
                          <span className="text-gray-600 ml-2 capitalize">
                            ({facility.type})
                          </span>
                        </div>
                        <span className="text-blue-600 font-bold">
                          {facility.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              {/* Contact Agent */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 mb-8 sticky top-24 border border-gray-100">
                <div className="text-center mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                      <span className="text-white font-bold text-3xl">
                        {property.agent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-2">
                    {property.agent.name}
                  </h3>
                  <p className="text-blue-600 font-semibold text-lg mb-1">
                    Real Estate Agent
                  </p>
                  <p className="text-gray-600 text-sm">Available Now</p>
                </div>

                {/* Agent Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">15+</div>
                    <div className="text-xs text-gray-600">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">500+</div>
                    <div className="text-xs text-gray-600">Properties Sold</div>
                  </div>
                </div>

                {/* Contact Buttons */}
                <PropertyContactButtons property={property} />

                {/* Contact Information */}
                <div className="space-y-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Phone:</span>
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="text-blue-600 font-bold hover:text-blue-800 transition-colors"
                    >
                      +91 {property.agent.phone}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Email:</span>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="text-blue-600 font-bold hover:text-blue-800 transition-colors text-sm"
                    >
                      {property.agent.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">
                      Response Time:
                    </span>
                    <span className="text-green-600 font-bold">
                      Within 1 hour
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-2">
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full text-left text-sm text-yellow-700 hover:text-yellow-900 transition-colors">
                      📋 Schedule Property Viewing
                    </button>
                    <button className="w-full text-left text-sm text-yellow-700 hover:text-yellow-900 transition-colors">
                      💰 Get Price Negotiation
                    </button>
                    <button className="w-full text-left text-sm text-yellow-700 hover:text-yellow-900 transition-colors">
                      📄 Request Documents
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Similar Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {similarProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
