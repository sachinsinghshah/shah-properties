import { Metadata } from "next";
import Link from "next/link";
import { FaAward, FaHandshake, FaHeart, FaBuilding } from "react-icons/fa";
import OptimizedImage from "@/components/OptimizedImage";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us - Shah Properties Real Estate Experts",
  description:
    "Learn about Shah Properties, Dehradun's trusted real estate experts since 2005. Our experienced team helps you find the perfect property in Dehradun and Saharanpur.",
  openGraph: {
    title: "About Shah Properties - Real Estate Experts Since 2005",
    description:
      "Trusted real estate services in Dehradun and Saharanpur since 2005.",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-blue-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">About Shah Properties</h1>
            <p className="text-xl text-blue-100">
              Your trusted partner in the Dehradun real estate market since 2005
            </p>
          </div>
        </div>

        {/* Our Story */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-700 mb-4">
                  Shah Properties was founded in 2005 with a simple mission: to
                  make the process of buying, selling, and renting properties in
                  Dehradun as smooth and rewarding as possible. What began as a
                  small family business has grown into one of Uttarakhand&apos;s
                  most trusted real estate companies.
                </p>
                <p className="text-gray-700 mb-4">
                  Our founder, Rajesh Shah, started the company after
                  recognizing a need for a more personalized, client-focused
                  approach to real estate in the growing city of Dehradun. He
                  believed that by truly understanding each client&apos;s unique
                  needs and aspirations, we could provide a level of service
                  unmatched in the industry.
                </p>
                <p className="text-gray-700">
                  Today, Shah Properties is proud to have helped thousands of
                  clients find their perfect homes and investment properties
                  across Dehradun and surrounding areas. Our team has expanded,
                  but our commitment to personalized service and client
                  satisfaction remains at the core of everything we do.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <OptimizedImage
                  src="/images/image1.jpg"
                  alt="Shah Properties office"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Our Core Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-5xl text-blue-800 mb-4 flex justify-center">
                  <FaHandshake />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-gray-700">
                  We believe in transparency and honesty in every transaction.
                  Our reputation is built on ethical business practices and
                  always doing what&apos;s right for our clients.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-5xl text-blue-800 mb-4 flex justify-center">
                  <FaAward />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in every aspect of our business, from
                  the properties we represent to the service we provide.
                  Mediocrity has no place at Shah Properties.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-5xl text-blue-800 mb-4 flex justify-center">
                  <FaHeart />
                </div>
                <h3 className="text-xl font-semibold mb-3">Client-Focused</h3>
                <p className="text-gray-700">
                  Our clients are at the heart of everything we do. We take the
                  time to understand your unique needs and goals to provide
                  personalized solutions.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-5xl text-blue-800 mb-4 flex justify-center">
                  <FaBuilding />
                </div>
                <h3 className="text-xl font-semibold mb-3">Market Expertise</h3>
                <p className="text-gray-700">
                  Our deep knowledge of local real estate markets allows us to
                  provide valuable insights and guidance, helping you make
                  informed decisions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Meet Our Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  <OptimizedImage
                    src="/images/image2.jpg"
                    alt="Rajesh Shah"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Rajesh Shah
                  </h3>
                  <p className="text-blue-800 mb-2">Founder & CEO</p>
                  <p className="text-gray-700 text-sm">
                    With over 25 years of experience in real estate, Rajesh
                    leads our company with vision and deep knowledge of the
                    Dehradun market.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  <OptimizedImage
                    src="/images/image3.jpg"
                    alt="Priya Sharma"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Priya Sharma
                  </h3>
                  <p className="text-blue-800 mb-2">Director of Sales</p>
                  <p className="text-gray-700 text-sm">
                    Priya&apos;s market expertise and negotiation skills have
                    helped countless clients find their perfect properties in
                    and around Dehradun.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  <OptimizedImage
                    src="/images/image4.jpg"
                    alt="Amit Kapoor"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Amit Kapoor
                  </h3>
                  <p className="text-blue-800 mb-2">Lead Real Estate Agent</p>
                  <p className="text-gray-700 text-sm">
                    Specializing in luxury properties in Rajpur Road and
                    Mussoorie Road, Amit&apos;s attention to detail ensures a
                    premium experience for his clients.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-64 w-full">
                  <OptimizedImage
                    src="/images/image1.jpg"
                    alt="Meera Patel"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Meera Patel
                  </h3>
                  <p className="text-blue-800 mb-2">Property Manager</p>
                  <p className="text-gray-700 text-sm">
                    Meera oversees our property management division, ensuring
                    both owners and tenants receive exceptional service across
                    Dehradun.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-700 mb-6">
                Our team consists of experienced professionals dedicated to
                providing the highest level of service. We&apos;re proud of our
                diverse backgrounds and united by our passion for
                Dehradun&apos;s real estate market.
              </p>
              <Link
                href="/contact"
                className="bg-blue-800 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-block font-medium transition-colors"
              >
                Get in Touch With Our Team
              </Link>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 px-6 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Our Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-bold mb-2">1,200+</p>
                <p className="text-xl text-blue-100">Properties Sold</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">850+</p>
                <p className="text-xl text-blue-100">Happy Clients</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">15+</p>
                <p className="text-xl text-blue-100">Industry Awards</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">18</p>
                <p className="text-xl text-blue-100">Years of Excellence</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
