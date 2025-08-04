"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { trackPhoneCall } from "@/components/GoogleAnalytics";

import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkedAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import Image from "next/image";

// Simple Map Placeholder Component
const MapPlaceholder = ({ location }: { location: string }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl w-full h-full flex items-center justify-center text-center p-6 border border-blue-100">
      <div>
        <FaMapMarkedAlt className="text-6xl text-blue-600 mx-auto mb-4" />
        <p className="text-blue-900 font-bold text-lg mb-2">{location}</p>
        <p className="text-sm text-blue-700">
          Interactive map available on request
        </p>
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setShowThankYou(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
        // Hide thank you message after 5 seconds
        setTimeout(() => {
          setShowThankYou(false);
        }, 5000);
      } else {
        alert(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error submitting form:", error);
      }
      alert(
        "Failed to send message. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Ready to find your dream property? Our expert team is here to help
              you with personalized guidance and professional real estate
              services.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 text-lg">
                    We'll get back to you within 24 hours
                  </p>
                </div>

                {showThankYou ? (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 p-8 rounded-xl border border-green-200 text-center">
                    <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-3">
                      Thank you for contacting us!
                    </h3>
                    <p className="text-lg">
                      We have received your message and will get back to you
                      shortly with a personalized response.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-700 mb-2 text-sm font-semibold"
                        >
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            isSubmitting
                              ? "bg-gray-100 cursor-not-allowed"
                              : "hover:border-gray-300"
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 mb-2 text-sm font-semibold"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            isSubmitting
                              ? "bg-gray-100 cursor-not-allowed"
                              : "hover:border-gray-300"
                          }`}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-gray-700 mb-2 text-sm font-semibold"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          disabled={isSubmitting}
                          className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            isSubmitting
                              ? "bg-gray-100 cursor-not-allowed"
                              : "hover:border-gray-300"
                          }`}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-gray-700 mb-2 text-sm font-semibold"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          disabled={isSubmitting}
                          className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                            isSubmitting
                              ? "bg-gray-100 cursor-not-allowed"
                              : "hover:border-gray-300"
                          }`}
                        >
                          <option value="General Inquiry">
                            General Inquiry
                          </option>
                          <option value="Property Viewing">
                            Property Viewing
                          </option>
                          <option value="Price Inquiry">Price Inquiry</option>
                          <option value="Investment Advice">
                            Investment Advice
                          </option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-gray-700 mb-2 text-sm font-semibold"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        required
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                          isSubmitting
                            ? "bg-gray-100 cursor-not-allowed"
                            : "hover:border-gray-300"
                        }`}
                        placeholder="Please describe your inquiry in detail..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex items-center justify-center w-full py-4 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
                        isSubmitting
                          ? "bg-blue-600 text-white cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white hover:shadow-xl transform hover:-translate-y-1"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FaArrowRight className="ml-3" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl text-white mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <FaMapMarkerAlt className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">
                        Address
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        2nd Floor, City Square Mega Mall, Ballupur, Dehradun,
                        <br />
                        Uttarakhand, India - 248001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-xl text-white mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <FaPhone className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">
                        Phone
                      </h4>
                      <p className="text-gray-600">
                        <a
                          href="tel:+918383815279"
                          className="hover:text-blue-600 font-semibold transition-colors"
                          onClick={() => trackPhoneCall("+918383815279")}
                        >
                          +91 83838 15279
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-xl text-white mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <FaEnvelope className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">
                        Email
                      </h4>
                      <p className="text-gray-600">
                        <a
                          href="mailto:shahproperties03@gmail.com"
                          className="hover:text-blue-600 font-semibold transition-colors"
                        >
                          shahproperties03@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 rounded-xl text-white mr-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <FaClock className="text-xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">
                        Working Hours
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Monday - Saturday: 9:00 AM - 7:00 PM
                        <br />
                        Sunday: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">
                    Connect With Us
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://wa.me/918383815279"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                      onClick={() => trackPhoneCall("WhatsApp:+918383815279")}
                    >
                      <FaWhatsapp size={20} />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <FaFacebook size={20} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <FaInstagram size={20} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-400 hover:bg-blue-500 text-white p-4 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                    >
                      <FaTwitter size={20} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Visit Our Office
                </h3>
                <div className="aspect-video w-full bg-gray-200 rounded-xl relative overflow-hidden mb-6">
                  <MapPlaceholder location="2nd Floor, City Square Mega Mall, Ballupur, Dehradun, Uttarakhand 248001, India" />
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our office is conveniently located in the heart of Dehradun
                  city, easily accessible from all major locations and public
                  transport.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Find answers to common questions about our services and property
                buying process
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What types of properties do you offer?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer a comprehensive range of properties including
                  residential plots, agricultural lands, commercial properties,
                  and investment opportunities in Dehradun and surrounding
                  areas.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  How can I schedule a property viewing?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  You can schedule a property viewing by contacting us through
                  this form, calling our office directly, or sending an email.
                  Our team will arrange a convenient time and provide detailed
                  directions.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Do you offer property management services?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we offer comprehensive property management services
                  including maintenance, rent collection, tenant management, and
                  legal documentation support for property owners.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  What documents are required for property purchase?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  For property purchase, you will need identity proof, address
                  proof, PAN card, and other documents as per legal
                  requirements. Our expert team will guide you through the
                  entire process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
