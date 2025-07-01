import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaBed,
  FaBath,
  FaCar,
  FaSearch,
  FaChartLine,
} from "react-icons/fa";

export default function PropertyValuationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-blue-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Property Valuation Tool</h1>
            <p className="text-xl text-blue-100">
              Get an estimated market value of your property based on local
              market data and property details
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-10 px-6">
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Valuation Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FaBuilding className="text-blue-800 mr-3" />
                  Enter Property Details
                </h2>

                {/* Property Location */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaMapMarkerAlt className="text-blue-800 mr-2" />
                    Property Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main Street"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="New York"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        State
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select State</option>
                        <option value="AL">Alabama</option>
                        <option value="CA">California</option>
                        <option value="FL">Florida</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        {/* Add other states */}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        placeholder="10001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <FaRulerCombined className="text-blue-800 mr-2" />
                    Property Characteristics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Property Type
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select Type</option>
                        <option value="single-family">
                          Single Family Home
                        </option>
                        <option value="condo">Condominium</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="multi-family">Multi-Family Home</option>
                        <option value="land">Land</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <FaBed className="inline-block mr-1" /> Bedrooms
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <FaBath className="inline-block mr-1" /> Bathrooms
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                        <option value="3.5">3.5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Square Feet
                      </label>
                      <input
                        type="number"
                        placeholder="2000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Lot Size (acres)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="0.25"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        <FaCar className="inline-block mr-1" /> Garage Spaces
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="0">None</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Year Built
                      </label>
                      <input
                        type="number"
                        placeholder="2000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Condition
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Needs Work</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Recent Upgrades
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="none">None</option>
                        <option value="minimal">Minimal</option>
                        <option value="some">Some</option>
                        <option value="extensive">Extensive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="bg-blue-800 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium text-lg transition-colors">
                  <FaSearch className="inline-block mr-2" />
                  Get Property Valuation
                </button>
              </div>

              {/* Results Section */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FaChartLine className="text-blue-800 mr-3" />
                  Estimated Property Value
                </h2>

                <div className="mb-8 text-center">
                  <div className="bg-blue-50 py-8 px-4 rounded-lg inline-block mb-4">
                    <p className="text-lg text-gray-700 mb-2">
                      Estimated Market Value
                    </p>
                    <p className="text-5xl font-bold text-blue-900">$425,000</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Value range: $405,000 - $445,000
                    </p>
                  </div>

                  <p className="text-gray-600">
                    This estimate is based on recent sales of similar properties
                    in your area and the information provided.
                  </p>
                </div>

                {/* Comparable Properties */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Comparable Properties
                  </h3>

                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4 flex items-start">
                      <div className="bg-gray-200 h-16 w-16 flex-shrink-0 rounded mr-4"></div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">
                          123 Similar Ave, New York, NY
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                          <span>3 bed</span>
                          <span>2 bath</span>
                          <span>1,950 sqft</span>
                          <span>Sold: $410,000 (2 months ago)</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 flex items-start">
                      <div className="bg-gray-200 h-16 w-16 flex-shrink-0 rounded mr-4"></div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">
                          456 Comparable St, New York, NY
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                          <span>3 bed</span>
                          <span>2.5 bath</span>
                          <span>2,100 sqft</span>
                          <span>Sold: $438,000 (1 month ago)</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4 flex items-start">
                      <div className="bg-gray-200 h-16 w-16 flex-shrink-0 rounded mr-4"></div>
                      <div className="flex-grow">
                        <p className="font-medium text-gray-900">
                          789 Related Rd, New York, NY
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mt-1">
                          <span>4 bed</span>
                          <span>2 bath</span>
                          <span>2,050 sqft</span>
                          <span>Sold: $427,000 (3 months ago)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  About Our Valuation Tool
                </h3>

                <p className="text-gray-700 mb-4">
                  Our property valuation tool uses advanced algorithms and local
                  market data to provide an accurate estimate of your property's
                  value.
                </p>

                <p className="text-gray-700 mb-4">
                  Factors that influence property value:
                </p>

                <ul className="list-disc pl-5 text-gray-700 mb-4 space-y-1">
                  <li>Location and neighborhood</li>
                  <li>Property size and layout</li>
                  <li>Age and condition</li>
                  <li>Recent renovations</li>
                  <li>Local market trends</li>
                  <li>Comparable property sales</li>
                </ul>

                <p className="text-gray-700 text-sm italic">
                  Note: This is an automated estimate and should not be
                  considered an appraisal or substitute for professional
                  valuation.
                </p>
              </div>

              <div className="bg-blue-900 text-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Ready to Sell or Buy?
                </h3>

                <p className="text-blue-100 mb-6">
                  Our team of real estate experts is ready to help you navigate
                  the market.
                </p>

                <a
                  href="/contact"
                  className="block w-full text-center bg-white text-blue-900 hover:bg-blue-50 py-3 rounded-md font-medium transition-colors mb-3"
                >
                  Contact Us
                </a>

                <a
                  href="/properties"
                  className="block w-full text-center border border-white text-white hover:bg-white/10 py-3 rounded-md font-medium transition-colors"
                >
                  Browse Properties
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
 