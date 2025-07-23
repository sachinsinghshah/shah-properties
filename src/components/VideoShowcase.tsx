import React from "react";
import Link from "next/link";
import YouTubeVideo from "./YouTubeVideo";
import { FaPlay, FaMapMarkerAlt } from "react-icons/fa";

interface VideoShowcaseProps {
  className?: string;
}

const VideoShowcase: React.FC<VideoShowcaseProps> = ({ className = "" }) => {
  const areaVideos = [
    {
      id: "kalyanpur",
      title: "Kalyanpur, Van Vihar - Dehradun",
      description:
        "Explore our premium residential plots in the heart of Kalyanpur, Van Vihar area. Perfect location with excellent connectivity and modern amenities.",
      videoUrl: "https://youtu.be/RvOUMyv6Css?si=X9QMicUdf7X_B2ai",
      startTime: 7 * 60 + 33, // 7:33 in seconds
      endTime: 8 * 60, // 8:00 in seconds
      features: [
        "Premium Location",
        "Excellent Connectivity",
        "Modern Amenities",
        "Investment Opportunity",
      ],
    },
    {
      id: "pondha",
      title: "Pondha - Dehradun",
      description:
        "Discover our MDDA approved residential plots in the prestigious Pondha area. Gated society with world-class infrastructure and facilities.",
      videoUrl: "https://youtu.be/m4p9OR2Hn6Q?si=vZ4BLDZBHU3PVONl",
      startTime: 9 * 60 + 21, // 9:21 in seconds
      endTime: 9 * 60 + 29, // 9:29 in seconds
      features: [
        "MDDA Approved",
        "Gated Society",
        "Premium Infrastructure",
        "RERA Registered",
      ],
    },
  ];

  return (
    <section className={`py-12 sm:py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Explore Our Properties Through Video Tours
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of our premium properties in Dehradun&apos;s
            most sought-after locations. See the areas, infrastructure, and
            surroundings before you visit.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {areaVideos.map((area) => (
            <div
              key={area.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full"
            >
              {/* Video Section */}
              <div className="p-4 sm:p-6">
                <YouTubeVideo
                  videoUrl={area.videoUrl}
                  title={area.title}
                  className="mb-4 sm:mb-6"
                  startTime={area.startTime}
                  endTime={area.endTime}
                />
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 flex-1 flex flex-col">
                <div className="flex items-center mb-2 sm:mb-3">
                  <FaMapMarkerAlt className="text-blue-600 mr-1.5 sm:mr-2 text-sm sm:text-base" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {area.title}
                  </h3>
                </div>

                <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
                  {area.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {area.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center text-xs sm:text-sm text-gray-600"
                    >
                      <FaPlay className="text-green-500 mr-1.5 sm:mr-2 text-xs" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/properties?location=${encodeURIComponent(
                    area.title.split(" - ")[0]
                  )}`}
                  className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center mt-auto text-sm sm:text-base"
                >
                  <FaPlay className="mr-1.5 sm:mr-2" />
                  View Properties in {area.title.split(" - ")[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md inline-block">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              Why Choose Video Tours?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div>
                <FaPlay className="text-blue-600 mx-auto mb-1" />
                <p>Virtual Site Visits</p>
              </div>
              <div>
                <FaMapMarkerAlt className="text-blue-600 mx-auto mb-1" />
                <p>Area Overview</p>
              </div>
              <div>
                <FaPlay className="text-blue-600 mx-auto mb-1" />
                <p>Infrastructure Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
