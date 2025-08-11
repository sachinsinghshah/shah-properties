import Link from "next/link";
import { Metadata } from "next";
import {
  FaBuilding,
  FaHandshake,
  FaChartLine,
  FaQuoteLeft,
  FaArrowRight,
  FaPhone,
} from "react-icons/fa";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import VideoShowcaseClient from "@/components/VideoShowcaseClient";
import HeroCarouselClient from "@/components/HeroCarouselClient";
import SearchForm from "@/components/SearchForm";

export const metadata: Metadata = {
  title: "Premium Real Estate in Dehradun | Residential Plots & Properties",
  description:
    "Find your dream property in Dehradun with Shah Properties. Premium residential plots, commercial properties, and agricultural land in prime locations like Kalyanpur, Pondha, and Dholas. Expert real estate services since 2005.",
  keywords: [
    "real estate Dehradun",
    "properties Dehradun",
    "residential plots Dehradun",
    "commercial properties Dehradun",
    "property investment Dehradun",
    "Shah Properties Dehradun",
    "Roshan Singh Shah",
  ],
  openGraph: {
    title: "Premium Real Estate in Dehradun | Shah Properties",
    description:
      "Find your dream property in Dehradun with Shah Properties. Premium residential plots and properties in prime locations.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Shah Properties - Premium Real Estate in Dehradun",
      },
    ],
  },
  alternates: {
    canonical: "https://shahproperties.com",
  },
};

export default function Home() {
  // Select one property from each location for featured properties
  const getFeaturedProperties = () => {
    const locations = ["Kalyanpur", "Pondha", "Dholas"];
    const featured: typeof properties = [];

    locations.forEach((location) => {
      const propertyFromLocation = properties.find((property) =>
        property.location.toLowerCase().includes(location.toLowerCase())
      );
      if (propertyFromLocation) {
        featured.push(propertyFromLocation);
      }
    });

    return featured;
  };

  const featuredProperties = getFeaturedProperties();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full aspect-video min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] overflow-hidden">
        {/* Background Carousel */}
        <HeroCarouselClient />

        {/* Enhanced Gradient Overlays (reduced on mobile to improve LCP) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-800/20 to-pink-800/30 hidden sm:block"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/15 via-transparent to-blue-600/15 animate-pulse hidden sm:block"></div>

        {/* Animated Background Elements (hidden on mobile to reduce paint costs) */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-float hidden sm:block"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-float animation-delay-200 hidden sm:block"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-float animation-delay-400 hidden sm:block"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Mobile: Simplified content */}
          <div className="block sm:hidden text-center mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold animate-fadeIn hero-text-shadow leading-tight mb-2">
              Find Your Dream Property in{" "}
              <span
                className="font-extrabold bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent "
                style={{ textShadow: "none" }}
              >
                Dehradun
              </span>
            </h1>
            <p className="text-sm text-center animate-fadeIn animation-delay-200 px-2">
              Discover premium properties with Shah Properties
            </p>
          </div>

          {/* Desktop: Full content */}
          <div className="hidden sm:block text-center mb-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold animate-fadeIn hero-text-shadow leading-tight">
              Find Your Dream Property in{" "}
              <span
                className="font-extrabold bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 bg-clip-text text-transparent  "
                style={{ textShadow: "none" }}
              >
                Dehradun
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-center mb-6 sm:mb-8 max-w-3xl animate-fadeIn animation-delay-200 px-2">
              Discover premium properties with Shah Properties, your trusted
              real estate partner
            </p>
          </div>

          {/* Search Form Component */}
          <SearchForm />

          {/* Quick Search Suggestions - Hidden on mobile */}
          <div className="hidden sm:block mt-3 sm:mt-4 md:mt-6 flex flex-wrap gap-1 sm:gap-2 justify-center">
            <span className="text-white/80 text-xs sm:text-sm mr-2">
              Popular:
            </span>
            {["Dehradun", "Shimla Bypass", "Race Course"].map((location) => (
              <Link
                key={location}
                href={`/properties?location=${encodeURIComponent(location)}`}
                className="px-2 sm:px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm rounded-full transition-all duration-200 hover:scale-105 border border-white/30"
              >
                {location}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Our Services
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive real estate services to meet all your
              property needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Property Listing Service */}
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-lg md:hover:shadow-2xl transition-all duration-500 md:transform md:hover:-translate-y-3 md:hover:scale-105 border-l-4 border-emerald-400 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-emerald-50 rounded-full -translate-y-10 sm:-translate-y-12 translate-x-10 sm:translate-x-12 md:group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-300">
                  <FaBuilding className="text-emerald-600 text-xl sm:text-2xl group-hover:text-emerald-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 md:group-hover:text-emerald-600 transition-colors duration-300">
                  Property Listing
                </h3>
                <p className="text-gray-600 text-center text-sm sm:text-base md:group-hover:text-gray-700 transition-colors duration-300">
                  Explore our extensive collection of premium properties in
                  prime locations across Dehradun
                </p>

                {/* Hover Call-to-Action for Property Listing */}
                <div className="mt-4 sm:mt-6 opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                  <Link
                    href="/properties"
                    className="block text-center w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                  >
                    View Properties
                  </Link>
                </div>
              </div>
            </div>

            {/* Expert Consultation Service */}
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-lg md:hover:shadow-2xl transition-all duration-500 md:transform md:hover:-translate-y-3 md:hover:scale-105 border-l-4 border-teal-400 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-teal-50 rounded-full -translate-y-10 sm:-translate-y-12 translate-x-10 sm:translate-x-12 md:group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                <div className="bg-gradient-to-br from-teal-100 to-blue-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-300">
                  <FaHandshake className="text-teal-600 text-xl sm:text-2xl group-hover:text-teal-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 md:group-hover:text-teal-600 transition-colors duration-300">
                  Expert Consultation
                </h3>
                <p className="text-gray-600 text-center text-sm sm:text-base md:group-hover:text-gray-700 transition-colors duration-300">
                  Get personalized advice from our experienced real estate
                  consultants to make informed decisions
                </p>

                {/* Hover Call-to-Action for Expert Consultation */}
                <div className="mt-4 sm:mt-6 opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                  <Link
                    href="/contact"
                    className="block text-center w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                  >
                    Get Consultation
                  </Link>
                </div>
              </div>
            </div>

            {/* Property Valuation Service */}
            <div className="group bg-white p-6 sm:p-8 rounded-xl shadow-lg md:hover:shadow-2xl transition-all duration-500 md:transform md:hover:-translate-y-3 md:hover:scale-105 border-l-4 border-blue-400 relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 rounded-full -translate-y-10 sm:-translate-y-12 translate-x-10 sm:translate-x-12 md:group-hover:scale-150 transition-transform duration-500"></div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg md:group-hover:scale-110 md:group-hover:rotate-12 transition-all duration-300">
                  <FaChartLine className="text-blue-600 text-xl sm:text-2xl group-hover:text-blue-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center mb-3 sm:mb-4 md:group-hover:text-blue-600 transition-colors duration-300">
                  Property Valuation
                </h3>
                <p className="text-gray-600 text-center text-sm sm:text-base md:group-hover:text-gray-700 transition-colors duration-300">
                  Accurate property valuation services to help you understand
                  the true worth of your investment
                </p>

                {/* Hover Call-to-Action for Property Valuation */}
                <div className="mt-4 sm:mt-6 opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-300">
                  <Link
                    href="/tools/property-valuation"
                    className="block text-center w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 text-sm sm:text-base"
                  >
                    Get Valuation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-100 text-emerald-800 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
              🏆 Premium Selection
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Featured Properties
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
              Handpicked premium properties that offer exceptional value and
              quality. Each property is carefully selected for its location,
              amenities, and investment potential.
            </p>

            {/* Enhanced View All Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Link
                href="/properties"
                className="group bg-gradient-to-r from-emerald-500 to-teal-500 md:hover:from-emerald-600 md:hover:to-teal-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold transition-all duration-300 flex items-center shadow-lg md:hover:shadow-xl md:transform md:hover:-translate-y-1 text-sm sm:text-base"
              >
                View All Properties
                <FaArrowRight className="ml-2 md:group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <div className="flex items-center text-gray-500 text-xs sm:text-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
                <span>{properties.length}+ Properties Available</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-800 via-emerald-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              What Our Clients Say
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-slate-200">
              Don&apos;t just take our word for it - hear from our satisfied
              clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/20 shadow-xl md:hover:bg-white/15 transition-all duration-300">
              <FaQuoteLeft className="text-amber-300 text-2xl sm:text-3xl mb-3 sm:mb-4" />
              <p className="mb-4 sm:mb-6 text-slate-100 text-sm sm:text-base">
                &ldquo;Shah Properties helped me find my dream home in Dehradun.
                Their expert guidance made the entire process smooth and
                hassle-free.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-base sm:text-lg mr-3 sm:mr-4 shadow-lg">
                  RK
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base">Rajesh Kumar</p>
                  <p className="text-slate-300 text-xs sm:text-sm">Dehradun</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/20 shadow-xl md:hover:bg-white/15 transition-all duration-300">
              <FaQuoteLeft className="text-amber-300 text-2xl sm:text-3xl mb-3 sm:mb-4" />
              <p className="mb-4 sm:mb-6 text-slate-100 text-sm sm:text-base">
                &ldquo;I was looking for an investment property and Shah
                Properties provided exceptional service. Their market knowledge
                is unmatched.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold text-base sm:text-lg mr-3 sm:mr-4 shadow-lg">
                  AS
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base">Anita Singh</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl border border-white/20 shadow-xl md:hover:bg-white/15 transition-all duration-300">
              <FaQuoteLeft className="text-amber-300 text-2xl sm:text-3xl mb-3 sm:mb-4" />
              <p className="mb-4 sm:mb-6 text-slate-100 text-sm sm:text-base">
                &ldquo;The team at Shah Properties was professional and
                responsive. They found us a property that perfectly matched our
                requirements.&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-base sm:text-lg mr-3 sm:mr-4 shadow-lg">
                  VP
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base">Vikram Patel</p>
                  <p className="text-slate-300 text-xs sm:text-sm">Dehradun</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Showcase (client-only, deferred until near viewport) */}
      <VideoShowcaseClient />

      {/* Call to Action */}
      <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-transparent to-orange-500/20"></div>

        {/* Floating Shapes */}
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full animate-float animation-delay-200"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full animate-float animation-delay-400"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 animate-fadeIn">
              Ready to Find Your
              <span className="text-amber-300 block md:inline">
                {" "}
                Perfect Property?
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-emerald-100 mb-8 sm:mb-10 max-w-3xl mx-auto animate-fadeIn animation-delay-200">
              Connect with us today and let our experts help you find the
              property that meets all your requirements
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-fadeIn animation-delay-400">
              <Link
                href="/properties"
                className="group relative bg-white text-emerald-600 py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:bg-amber-50 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/25 min-w-[180px] sm:min-w-[200px]"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Browse Properties
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/contact"
                className="group relative bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-600 py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/25 min-w-[180px] sm:min-w-[200px]"
              >
                <span className="flex items-center justify-center">
                  <FaPhone className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Contact Us
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 animate-fadeIn animation-delay-600">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-300 mb-1 sm:mb-2">
                  500+
                </div>
                <div className="text-emerald-100 text-sm sm:text-base">
                  Properties Sold
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-300 mb-1 sm:mb-2">
                  1000+
                </div>
                <div className="text-emerald-100 text-sm sm:text-base">
                  Happy Clients
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
