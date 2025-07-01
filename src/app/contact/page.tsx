"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
} from "react-icons/fa";
import Image from "next/image";

// Simple Map Placeholder Component
const MapPlaceholder = ({ location }: { location: string }) => {
  return (
    <div className="bg-blue-50 rounded-lg w-full h-full flex items-center justify-center text-center p-4">
      <div>
        <FaMapMarkedAlt className="text-5xl text-blue-800 mx-auto mb-3" />
        <p className="text-blue-900 font-medium">{location}</p>
        <p className="text-sm text-blue-700 mt-2">
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <div className="bg-blue-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-blue-100">
              Get in touch with our team for any inquiries about properties or
              services
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-12 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Send Us a Message
                </h2>

                {showThankYou ? (
                  <div className="bg-green-50 text-green-800 p-6 rounded-md">
                    <h3 className="text-xl font-medium mb-2">
                      Thank you for contacting us!
                    </h3>
                    <p>
                      We have received your message and will get back to you
                      shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-gray-700 mb-1 text-sm font-medium"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-gray-700 mb-1 text-sm font-medium"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-gray-700 mb-1 text-sm font-medium"
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-gray-700 mb-1 text-sm font-medium"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="block text-gray-700 mb-1 text-sm font-medium"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Please describe your inquiry..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-800 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-800 mr-4">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        123 Rajpur Road, Dehradun,
                        <br />
                        Uttarakhand, India - 248001
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-800 mr-4">
                      <FaPhone />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Phone</h4>
                      <p className="text-gray-600">
                        <a
                          href="tel:+919876543210"
                          className="hover:text-blue-800"
                        >
                          +91 98765 43210
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-800 mr-4">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600">
                        <a
                          href="mailto:info@shahproperties.com"
                          className="hover:text-blue-800"
                        >
                          info@shahproperties.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-800 mr-4">
                      <FaClock />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Working Hours
                      </h4>
                      <p className="text-gray-600">
                        Monday - Saturday: 9:00 AM - 7:00 PM
                        <br />
                        Sunday: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Connect With Us
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition-colors"
                    >
                      <FaWhatsapp size={18} />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                    >
                      <FaFacebook size={18} />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors"
                    >
                      <FaInstagram size={18} />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors"
                    >
                      <FaTwitter size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Visit Our Office
                </h3>
                <div className="aspect-video w-full bg-gray-200 rounded-lg relative overflow-hidden mb-4">
                  <MapPlaceholder location="123 Rajpur Road, Dehradun, Uttarakhand, India - 248001" />
                </div>
                <p className="text-gray-600">
                  Our office is conveniently located in the heart of Dehradun
                  city, easily accessible from all major locations.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What types of properties do you offer?
                </h3>
                <p className="text-gray-600">
                  We offer a wide range of properties including residential
                  plots, agricultural lands, and commercial properties in
                  Dehradun, Saharanpur, and surrounding areas.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How can I schedule a property viewing?
                </h3>
                <p className="text-gray-600">
                  You can schedule a property viewing by contacting us through
                  this form, calling our office, or sending an email. Our team
                  will arrange a convenient time for you.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Do you offer property management services?
                </h3>
                <p className="text-gray-600">
                  Yes, we offer comprehensive property management services
                  including maintenance, rent collection, and tenant management
                  for property owners.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What documents are required for property purchase?
                </h3>
                <p className="text-gray-600">
                  For property purchase, you will need identity proof, address
                  proof, PAN card, and other documents as per legal
                  requirements. Our team will guide you through the process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
