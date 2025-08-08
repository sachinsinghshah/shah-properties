import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  FaAward,
  FaHandshake,
  FaHeart,
  FaBuilding,
  FaMedal,
  FaShieldAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us - Shah Properties Real Estate Experts",
  description:
    "Learn about Shah Properties, founded by retired Indian Army professional Roshan Singh Shah. Our mission is to provide honest property dealings in Dehradun after experiencing fraud firsthand.",
  openGraph: {
    title: "About Shah Properties - Founded by Retired Army Officer",
    description:
      "Honest real estate services in Dehradun by retired Indian Army professional Roshan Singh Shah.",
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
              Founded by a retired Indian Army professional to serve honest
              property seekers in Dehradun
            </p>
          </div>
        </div>

        {/* Our Founder's Story */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  A Story of Service, Sacrifice, and Second Chances
                </h2>
                <p className="text-gray-700 mb-4">
                  Shah Properties was born from the vision of{" "}
                  <strong>Roshan Singh Shah</strong>, a retired Indian Army
                  professional who dedicated 32 years of his life serving our
                  nation in the Core of Signals division. After three decades of
                  unwavering commitment to protecting India's borders and
                  ensuring secure communications, Sub Maj & Hny. Lt Shah thought
                  his service days were behind him.
                </p>
                <p className="text-gray-700 mb-4">
                  But destiny had other plans. When he returned to his hometown
                  of Dehradun after retirement, ready to settle into peaceful
                  civilian life, he encountered a different kind of battlefield
                  – one where innocent, middle-class families were being
                  exploited by dishonest property dealers.
                </p>
                <p className="text-gray-700 mb-4">
                  The turning point came when Sub Maj & Hny. Lt Shah himself
                  fell victim to fraudulent property practices. Despite his
                  military training and sharp instincts, he faced the same
                  deception that countless honest families encounter daily –
                  inflated prices, hidden charges, and properties misrepresented
                  to exploit those seeking their dream homes.
                </p>
                <p className="text-gray-700">
                  "I spent 32 years protecting this country from external
                  threats," says Sub Maj & Hny. Lt Shah, "but I realized there
                  was another battle to fight – protecting honest, hardworking
                  families from those who would cheat them out of their life
                  savings."
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl bg-gray-100">
                <Image
                  src="/images/business/team/roshan-shah.jpeg"
                  alt="Roshan Singh Shah - Founder"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain"
                  priority={false}
                  quality={85}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Mission: Honesty in Every Transaction
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
              After witnessing and experiencing the rampant fraud in Dehradun's
              property market, Sub Maj & Hny. Lt Shah made a solemn promise: no
              family should have to face what he faced. Shah Properties was
              established with a simple yet powerful mission – to provide
              transparent, honest property dealings where the client's interest
              always comes first.
            </p>
            <div className="bg-blue-900 text-white p-8 rounded-lg max-w-3xl mx-auto">
              <blockquote className="text-xl italic">
                "Just as I served to protect our nation's borders, I now serve
                to protect families from property fraud. Every transaction is a
                chance to restore faith in honest business."
              </blockquote>
              <p className="mt-4 font-semibold">
                - Sub Maj & Hny. Lt Roshan Singh Shah (Retd.)
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Values Forged in Service
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-blue-800">
                <div className="text-5xl text-blue-800 mb-4 flex justify-center">
                  <FaShieldAlt />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Military Discipline
                </h3>
                <p className="text-gray-700">
                  Bringing the same precision, attention to detail, and
                  commitment that defined 32 years of military service to every
                  property transaction.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-orange-600">
                <div className="text-5xl text-orange-600 mb-4 flex justify-center">
                  <FaHandshake />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Uncompromising Integrity
                </h3>
                <p className="text-gray-700">
                  Zero tolerance for fraud or deception. We believe every family
                  deserves honest dealings and fair prices, just as we would
                  want for our own loved ones.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-green-600">
                <div className="text-5xl text-green-600 mb-4 flex justify-center">
                  <FaHeart />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Protection & Service
                </h3>
                <p className="text-gray-700">
                  Our mission continues – protecting families from property
                  fraud and serving the community with the same dedication shown
                  to our nation.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-purple-600">
                <div className="text-5xl text-purple-600 mb-4 flex justify-center">
                  <FaMedal />
                </div>
                <h3 className="text-xl font-semibold mb-3">Earned Trust</h3>
                <p className="text-gray-700">
                  Trust earned through decades of service to the nation, now
                  extended to serving families seeking honest property guidance
                  in Dehradun.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-red-600">
                <div className="text-5xl text-red-600 mb-4 flex justify-center">
                  <FaAward />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Combat Against Fraud
                </h3>
                <p className="text-gray-700">
                  Fighting property fraud with the same determination used to
                  defend our country's borders for over three decades.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-blue-600">
                <div className="text-5xl text-blue-600 mb-4 flex justify-center">
                  <FaBuilding />
                </div>
                <h3 className="text-xl font-semibold mb-3">Local Expertise</h3>
                <p className="text-gray-700">
                  Deep understanding of Dehradun's property landscape, gained
                  through personal experience and a commitment to serving the
                  local community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Why Families Trust Shah Properties
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  We've Been Where You Are
                </h3>
                <p className="text-gray-700 mb-4">
                  Sub Maj & Hny. Lt Shah's personal experience with property
                  fraud means we understand exactly what families face. We've
                  walked in your shoes, felt the frustration, and know the red
                  flags to watch for.
                </p>
                <p className="text-gray-700">
                  This isn't just business for us – it's personal. Every client
                  reminds us of our own experience and strengthens our resolve
                  to ensure no one else faces what we faced.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Military-Grade Standards
                </h3>
                <p className="text-gray-700 mb-4">
                  With 32 years of military discipline, we apply the same
                  standards of excellence, precision, and reliability to
                  property transactions that were demanded in military service.
                </p>
                <p className="text-gray-700">
                  When you work with us, you get the assurance that comes from
                  dealing with someone who has dedicated their life to service,
                  honor, and protecting others.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Fair Pricing Always
                </h3>
                <p className="text-gray-700 mb-4">
                  We refuse to participate in the inflation and deception that
                  plagues Dehradun's property market. Our clients get honest
                  market prices, transparent dealings, and no hidden surprises.
                </p>
                <p className="text-gray-700">
                  Your financial security is as important to us as our nation's
                  security was during our military service.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  A Personal Mission
                </h3>
                <p className="text-gray-700 mb-4">
                  This isn't just another business venture. It's a continuation
                  of Sub Maj & Hny. Lt Shah's service to protect and serve, now
                  focused on defending families from property fraud.
                </p>
                <p className="text-gray-700">
                  Every honest transaction is a victory against the fraudulent
                  practices that harm innocent families seeking their dream
                  homes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Your Search for Honest Property Dealing Ends Here
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join the hundreds of families who have found their dream
              properties through Shah Properties – where military discipline
              meets compassionate service, and where your trust is our most
              valuable asset.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center mb-12">
              <div>
                <p className="text-4xl font-bold mb-2">32</p>
                <p className="text-lg text-blue-100">Years of Service</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">0</p>
                <p className="text-lg text-blue-100">Tolerance for Fraud</p>
              </div>
              <div className="border-l border-blue-700 pl-4">
                <p className="text-4xl font-bold mb-2">100%</p>
                <p className="text-lg text-blue-100">Transparent Dealings</p>
              </div>
              <div className="border-l border-blue-700 pl-4">
                <p className="text-4xl font-bold mb-2">∞</p>
                <p className="text-lg text-blue-100">Commitment to Honesty</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-md inline-block font-medium transition-colors text-lg"
            >
              Start Your Honest Property Journey Today
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
