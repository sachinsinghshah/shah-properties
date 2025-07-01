import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FaCalculator,
  FaChartLine,
  FaMap,
  FaHome,
  FaBuilding,
  FaRegChartBar,
} from "react-icons/fa";

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-blue-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Property Tools</h1>
            <p className="text-xl text-blue-100">
              Essential tools to help you make informed real estate decisions
            </p>
          </div>
        </div>

        {/* Tools Introduction */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Real Estate Tools
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Shah Properties offers a suite of powerful tools designed to
                simplify your real estate journey. Whether you're buying,
                selling, or investing, these resources will help you make
                data-driven decisions with confidence.
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Mortgage Calculator */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/images/image1.jpg"
                    alt="Mortgage Calculator"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                    <FaCalculator className="text-white text-5xl" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Mortgage Calculator
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Estimate your monthly mortgage payments based on your loan
                    amount, interest rate, and loan term. Plan your budget with
                    confidence.
                  </p>
                  <Link
                    href="/tools/mortgage-calculator"
                    className="block text-center bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Calculate Mortgage
                  </Link>
                </div>
              </div>

              {/* Property Valuation */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/images/image2.jpg"
                    alt="Property Valuation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                    <FaChartLine className="text-white text-5xl" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Property Valuation
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Get an estimated market value for your property based on
                    comparable sales, location data, and property
                    characteristics.
                  </p>
                  <Link
                    href="/tools/property-valuation"
                    className="block text-center bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Value Your Property
                  </Link>
                </div>
              </div>

              {/* Neighborhood Explorer */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/images/image3.jpg"
                    alt="Neighborhood Explorer"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                    <FaMap className="text-white text-5xl" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Neighborhood Explorer
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Research neighborhoods with detailed information on schools,
                    amenities, safety, and property trends to find your ideal
                    location.
                  </p>
                  <Link
                    href="/tools/neighborhood-explorer"
                    className="block text-center bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Explore Neighborhoods
                  </Link>
                </div>
              </div>

              {/* Investment Calculator */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/images/image4.jpg"
                    alt="Investment Calculator"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                    <FaRegChartBar className="text-white text-5xl" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Investment Calculator
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Analyze potential real estate investments with ROI
                    calculations, cash flow projections, and property
                    appreciation forecasts.
                  </p>
                  <Link
                    href="/tools/investment-calculator"
                    className="block text-center bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Analyze Investments
                  </Link>
                </div>
              </div>

              {/* Affordability Calculator */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/images/image1.jpg"
                    alt="Affordability Calculator"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                    <FaHome className="text-white text-5xl" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Affordability Calculator
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Determine how much house you can afford based on your
                    income, expenses, and savings. Find properties within your
                    budget.
                  </p>
                  <Link
                    href="/tools/affordability-calculator"
                    className="block text-center bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Check Affordability
                  </Link>
                </div>
              </div>

              {/* Commercial Property Analysis */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src="/images/image2.jpg"
                    alt="Commercial Property Analysis"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/60 flex items-center justify-center">
                    <FaBuilding className="text-white text-5xl" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Commercial Property Analysis
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Evaluate commercial properties with detailed reports on cap
                    rates, potential income, operating expenses, and market
                    comparisons.
                  </p>
                  <Link
                    href="/tools/commercial-analysis"
                    className="block text-center bg-blue-800 hover:bg-blue-700 text-white py-2 rounded-md font-medium transition-colors"
                  >
                    Analyze Commercial Property
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Use Our Tools */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Use Our Tools?
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Our property tools are designed with accuracy and ease of use in
                mind. Here's what sets them apart:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Accurate Data
                </h3>
                <p className="text-gray-700">
                  All our tools use the latest market data and advanced
                  algorithms to provide you with accurate, reliable information
                  for your decision-making.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  User-Friendly
                </h3>
                <p className="text-gray-700">
                  We've designed our tools to be intuitive and easy to use,
                  regardless of your level of real estate experience. Get the
                  information you need quickly.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Expert Support
                </h3>
                <p className="text-gray-700">
                  Need help interpreting results or have questions? Our team of
                  real estate experts is available to provide guidance and
                  insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make Informed Real Estate Decisions?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              Our tools are designed to help you navigate the real estate market
              with confidence. Start using them today to make data-driven
              decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tools/mortgage-calculator"
                className="bg-white text-blue-900 hover:bg-blue-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Try Mortgage Calculator
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Ask for Assistance
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
