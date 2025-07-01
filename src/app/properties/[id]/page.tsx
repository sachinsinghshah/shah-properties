import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaRulerCombined,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaShare,
  FaHeart,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { properties, getSimilarProperties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import OptimizedImage from "@/components/OptimizedImage";

interface Props {
  params: Promise<{ id: string }>;
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Property Images */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="relative h-96">
                  <OptimizedImage
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    priority
                    className="object-cover"
                    placeholder="blur"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <FaHeart className="text-red-500" />
                    </button>
                    <button className="bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                      <FaShare className="text-blue-800" />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-blue-800 text-white px-3 py-1 rounded-md font-medium">
                      {property.type}
                    </div>
                  </div>
                </div>

                {/* Image Gallery */}
                {property.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 p-4">
                    {property.images.slice(1, 4).map((image, index) => (
                      <div
                        key={index}
                        className="relative h-24 rounded overflow-hidden"
                      >
                        <OptimizedImage
                          src={image}
                          alt={`${property.title} - Image ${index + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <FaRulerCombined className="text-blue-800 text-2xl mx-auto mb-2" />
                    <div className="font-semibold">Area</div>
                    <div className="text-gray-600">
                      {property.area.value} {property.area.unit}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-800 text-2xl mx-auto mb-2">
                      🏷️
                    </div>
                    <div className="font-semibold">Category</div>
                    <div className="text-gray-600 capitalize">
                      {property.category}
                    </div>
                  </div>
                  <div className="text-center">
                    <FaCalendarAlt className="text-blue-800 text-2xl mx-auto mb-2" />
                    <div className="font-semibold">Posted</div>
                    <div className="text-gray-600">
                      {new Date(property.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-800 text-2xl mx-auto mb-2">
                      📍
                    </div>
                    <div className="font-semibold">Status</div>
                    <div
                      className={`capitalize font-medium ${
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

                {/* Features */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheckCircle className="text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <FaCheckCircle className="text-blue-500 mr-2" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nearby Facilities */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">
                    Nearby Facilities
                  </h2>
                  <div className="space-y-2">
                    {property.nearbyFacilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <span className="font-medium">{facility.name}</span>
                          <span className="text-gray-600 ml-2 capitalize">
                            ({facility.type})
                          </span>
                        </div>
                        <span className="text-blue-800 font-medium">
                          {facility.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Agent */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-24">
                <h3 className="text-xl font-semibold mb-4">Contact Agent</h3>
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-xl">
                      {property.agent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    {property.agent.name}
                  </h4>
                  <p className="text-gray-600">Real Estate Agent</p>
                </div>

                <div className="space-y-3 mb-6">
                  <a
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center justify-center bg-blue-800 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <FaPhone className="mr-2" />
                    Call Now
                  </a>
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="flex items-center justify-center border border-blue-800 text-blue-800 py-3 px-4 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <FaEnvelope className="mr-2" />
                    Send Email
                  </a>
                  {property.agent.facebook && (
                    <a
                      href={property.agent.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <FaFacebook className="mr-2" />
                      Facebook
                    </a>
                  )}
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-600">
                    <FaPhone className="inline mr-1" />
                    {property.agent.phone}
                  </div>
                  <div className="text-sm text-gray-600">
                    <FaEnvelope className="inline mr-1" />
                    {property.agent.email}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Similar Properties
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
