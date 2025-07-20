"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import {
  FaFilter,
  FaSort,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaRulerCombined,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
} from "react-icons/fa";
import { properties } from "@/data/properties";

type SortOption =
  | "default"
  | "price_low"
  | "price_high"
  | "area_low"
  | "area_high";

function PropertiesPageContent() {
  const searchParams = useSearchParams();

  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    category: searchParams.get("category") || "",
    minPrice: "",
    maxPrice: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Apply filters when component mounts or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
    applyFilters();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, sortBy, filters]);

  const applyFilters = () => {
    let result = [...properties];

    // Filter by location
    if (filters.location) {
      result = result.filter((property) =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by type
    if (filters.type) {
      result = result.filter(
        (property) => property.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Filter by category
    if (filters.category) {
      result = result.filter(
        (property) =>
          property.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      const minPrice = parseInt(filters.minPrice, 10);
      result = result.filter((property) => property.price >= minPrice);
    }

    if (filters.maxPrice) {
      const maxPrice = parseInt(filters.maxPrice, 10);
      result = result.filter((property) => property.price <= maxPrice);
    }

    // Apply sorting
    switch (sortBy) {
      case "price_low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "area_low":
        result.sort((a, b) => a.area.value - b.area.value);
        break;
      case "area_high":
        result.sort((a, b) => b.area.value - a.area.value);
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProperties(result);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;

  // Get unique locations for the filter dropdown
  const locations = Array.from(
    new Set(properties.map((p) => p.location))
  ).sort();

  // Price range options for dropdown
  const priceRanges = [
    { label: "All Prices", min: undefined, max: undefined },
    { label: "Under ₹20 Lakh", min: undefined, max: 2000000 },
    { label: "₹20 Lakh - ₹50 Lakh", min: 2000000, max: 5000000 },
    { label: "₹50 Lakh - ₹1 Crore", min: 5000000, max: 10000000 },
    { label: "Above ₹1 Crore", min: 10000000, max: undefined },
  ];

  // Area range options for dropdown
  const areaRanges = [
    { label: "All Sizes", min: undefined, max: undefined },
    { label: "Under 150 sq.yd", min: undefined, max: 150 },
    { label: "150-250 sq.yd", min: 150, max: 250 },
    { label: "250-500 sq.yd", min: 250, max: 500 },
    { label: "Above 500 sq.yd", min: 500, max: undefined },
  ];

  // Get current page properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Pagination controls
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Scroll to top when changing pages (only in browser)
      if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-blue-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">
              {filters.type === "residential"
                ? "Residential Properties"
                : filters.type === "commercial"
                ? "Commercial Properties"
                : filters.type === "agricultural"
                ? "Agricultural Properties"
                : "All Properties"}
              {filters.location && ` in ${filters.location}`}
            </h1>
            <p className="text-xl text-blue-100">
              Browse our curated selection of premium properties
              {filters.minPrice &&
                filters.maxPrice &&
                ` priced between ₹${(
                  parseInt(filters.minPrice) / 100000
                ).toFixed(2)} - ₹${(
                  parseInt(filters.maxPrice) / 100000
                ).toFixed(2)} Lakhs`}
              {filters.minPrice &&
                !filters.maxPrice &&
                ` priced above ₹${(parseInt(filters.minPrice) / 100000).toFixed(
                  2
                )} Lakhs`}
              {!filters.minPrice &&
                filters.maxPrice &&
                ` priced below ₹${(parseInt(filters.maxPrice) / 100000).toFixed(
                  2
                )} Lakhs`}
            </p>
          </div>
        </div>

        {/* Filters and Listings */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Filters */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-center gap-2 text-blue-900 font-medium mb-4">
              <FaFilter />
              <span>Filters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Property Type Filter */}
              <div className="relative">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Property Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
              </div>

              {/* Location Filter */}
              <div className="relative">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="relative">
                <label
                  htmlFor="priceRange"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price Range
                </label>
                <select
                  id="priceRange"
                  name="minPrice"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Prices</option>
                  <option value="2000000">Under ₹20 Lakh</option>
                  <option value="5000000">₹20 Lakh - ₹50 Lakh</option>
                  <option value="10000000">₹50 Lakh - ₹1 Crore</option>
                  <option value="10000000">Above ₹1 Crore</option>
                </select>
              </div>

              {/* Area Range Filter */}
              <div className="relative">
                <label
                  htmlFor="areaRange"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Area (sq. yards)
                </label>
                <select
                  id="areaRange"
                  name="maxPrice"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Sizes</option>
                  <option value="150">Under 150 sq.yd</option>
                  <option value="250">150-250 sq.yd</option>
                  <option value="500">250-500 sq.yd</option>
                  <option value="500">Above 500 sq.yd</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  <option value="plot">Plot</option>
                  <option value="farmland">Farmland</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Sort Filter */}
              <div className="relative">
                <label
                  htmlFor="sortBy"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sort By
                </label>
                <select
                  id="sortBy"
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                  <option value="default">Default</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="area_low">Area: Low to High</option>
                  <option value="area_high">Area: High to Low</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <div className="relative flex items-end">
                <button
                  onClick={() => {
                    setFilters({
                      location: "",
                      type: "",
                      category: "",
                      minPrice: "",
                      maxPrice: "",
                    });
                    setSortBy("default");
                  }}
                  className="w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 font-medium flex items-center justify-center"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <FaRupeeSign className="text-blue-800 text-xl" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-800">
                    {filteredProperties.length > 0
                      ? `₹${Math.min(
                          ...filteredProperties.map(
                            (p) => p.pricePerSqYard || 0
                          )
                        ).toLocaleString()} - ₹${Math.max(
                          ...filteredProperties.map(
                            (p) => p.pricePerSqYard || 0
                          )
                        ).toLocaleString()}`
                      : "N/A"}
                  </div>
                  <div className="text-gray-600">Price Per Sq. Yard</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <FaRulerCombined className="text-blue-800 text-xl" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-800">
                    {filteredProperties.length}
                  </div>
                  <div className="text-gray-600">Properties Found</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-blue-800 text-xl" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-800">
                    {new Set(filteredProperties.map((p) => p.location)).size}
                  </div>
                  <div className="text-gray-600">Unique Locations</div>
                </div>
              </div>
            </div>
          </div>

          {/* Locations Quick Links */}
          <div className="flex flex-wrap gap-2 mb-6 bg-white p-4 rounded-lg shadow-md">
            <span className="text-gray-700 font-medium">Quick Filters:</span>
            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    location: loc === filters.location ? "" : loc,
                  }))
                }
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm 
                  ${
                    filters.location === loc
                      ? "bg-blue-800 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
              >
                <FaMapMarkerAlt className="mr-1" size={12} />
                {loc}
              </button>
            ))}
          </div>

          {/* Property Listing */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredProperties.length} Properties Found
              </h2>
              <div className="flex items-center gap-2">
                <FaSort className="text-blue-800" />
                <span className="text-gray-600 text-sm">
                  Sort by:{" "}
                  {sortBy === "default"
                    ? "Default"
                    : sortBy === "price_low"
                    ? "Price: Low to High"
                    : sortBy === "price_high"
                    ? "Price: High to Low"
                    : sortBy === "area_low"
                    ? "Area: Low to High"
                    : "Area: High to Low"}
                </span>
              </div>
            </div>

            {currentProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        aria-label="Previous page"
                      >
                        <FaAngleLeft />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                              currentPage === page
                                ? "bg-blue-800 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        aria-label="Next page"
                      >
                        <FaAngleRight />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try changing your search filters to find more results.
                </p>
                <button
                  onClick={() => {
                    setFilters({
                      location: "",
                      type: "",
                      category: "",
                      minPrice: "",
                      maxPrice: "",
                    });
                  }}
                  className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </main>
          <Footer />
        </div>
      }
    >
      <PropertiesPageContent />
    </Suspense>
  );
}
