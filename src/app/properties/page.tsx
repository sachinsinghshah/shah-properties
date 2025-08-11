"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import PropertyCard from "@/components/PropertyCard";
import {
  FaFilter,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaRulerCombined,
  FaTimes,
  FaSort,
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
    priceRange: "",
    minPrice: "",
    maxPrice: "",
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [visibleCount, setVisibleCount] = useState(9);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Apply filters when component mounts or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, sortBy, filters]);

  // Reset visible items when filters/sort change
  useEffect(() => {
    setVisibleCount(9);
  }, [filters, sortBy]);

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
    if (name === "priceRange") {
      const [minRaw, maxRaw] = value.split("-");
      const minPrice = minRaw && minRaw !== "0" ? minRaw : "";
      const maxPrice = maxRaw ? maxRaw : "";
      setFilters((prev) => ({
        ...prev,
        priceRange: value,
        minPrice,
        maxPrice,
      }));
      return;
    }
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
    setIsFiltersOpen(false);
  };

  // Get unique locations for the filter dropdown
  const locations = Array.from(
    new Set(properties.map((p) => p.location))
  ).sort();

  // Note: additional ranges removed for simplicity; can be reintroduced if needed

  // Current items and infinite load
  const currentProperties = useMemo(
    () => filteredProperties.slice(0, visibleCount),
    [filteredProperties, visibleCount]
  );

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setVisibleCount((prev) =>
          Math.min(prev + 9, filteredProperties.length)
        );
      }
    });
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [filteredProperties.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-blue-900 text-white py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              {filters.type === "residential"
                ? "Residential Properties"
                : filters.type === "commercial"
                ? "Commercial Properties"
                : filters.type === "agricultural"
                ? "Agricultural Properties"
                : "All Properties"}
              {filters.location && ` in ${filters.location}`}
            </h1>
            <p className="text-base sm:text-xl text-blue-100">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Sticky toolbar (mobile) */}
          <div className="md:hidden sticky top-16 z-30 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100 py-2 mb-4">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setIsFiltersOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium"
              >
                <FaFilter /> Filters
              </button>
              <div className="flex items-center gap-2">
                <FaSort className="text-gray-500" />
                <label htmlFor="sortByMobile" className="sr-only">
                  Sort by
                </label>
                <select
                  id="sortByMobile"
                  className="rounded-md border border-gray-300 py-2 px-3 text-sm"
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
            </div>
          </div>
          {/* Filters */}
          <div className="hidden md:block bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
            <div className="flex items-center gap-2 text-blue-900 font-medium mb-4">
              <FaFilter />
              <span>Filters</span>
            </div>

            <div className="grid grid-cols-4 gap-4">
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
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All Prices</option>
                  <option value="0-2000000">Under ₹20 Lakh</option>
                  <option value="2000000-5000000">₹20 Lakh - ₹50 Lakh</option>
                  <option value="5000000-10000000">₹50 Lakh - ₹1 Crore</option>
                  <option value="10000000-">Above ₹1 Crore</option>
                </select>
              </div>

              {/* Submit */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white rounded-md py-2 font-medium"
                >
                  Apply
                </button>
              </div>

              {/* Category Filter (moved to mobile modal to reduce width) */}
              <div className="hidden">
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {filteredProperties.length} Properties
              </h2>
              <div className="hidden md:flex items-center gap-2">
                <FaSort className="text-gray-500" />
                <label htmlFor="sortByDesktop" className="sr-only">
                  Sort by
                </label>
                <select
                  id="sortByDesktop"
                  className="rounded-md border border-gray-300 py-2 px-3 text-sm"
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
            </div>

            {currentProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Load More + Sentinel */}
                {visibleCount < filteredProperties.length && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={() =>
                        setVisibleCount((v) =>
                          Math.min(v + 9, filteredProperties.length)
                        )
                      }
                      className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      Load More
                    </button>
                  </div>
                )}
                <div ref={loadMoreRef} className="h-6"></div>
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
                      priceRange: "",
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

      {/* Mobile Filters Modal */}
      {isFiltersOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 bg-white rounded-t-2xl p-4 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-blue-900 font-semibold">
                <FaFilter /> Filters
              </div>
              <button
                onClick={() => setIsFiltersOpen(false)}
                aria-label="Close filters"
                className="p-2 rounded-full bg-gray-100"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
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
                  className="w-full rounded-md border border-gray-300 py-2 px-3"
                >
                  <option value="">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="agricultural">Agricultural</option>
                </select>
              </div>
              <div>
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
                  className="w-full rounded-md border border-gray-300 py-2 px-3"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="priceRange"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price Range
                </label>
                <select
                  id="priceRange"
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3"
                >
                  <option value="">All Prices</option>
                  <option value="0-2000000">Under ₹20 Lakh</option>
                  <option value="2000000-5000000">₹20 Lakh - ₹50 Lakh</option>
                  <option value="5000000-10000000">₹50 Lakh - ₹1 Crore</option>
                  <option value="10000000-">Above ₹1 Crore</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      location: "",
                      type: "",
                      category: "",
                      priceRange: "",
                      minPrice: "",
                      maxPrice: "",
                    })
                  }
                  className="flex-1 py-2 rounded-md bg-gray-100 text-gray-700"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-md bg-blue-800 text-white font-medium"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading properties...</p>
            </div>
          </main>
        </div>
      }
    >
      <PropertiesPageContent />
    </Suspense>
  );
}
