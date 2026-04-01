"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageGalleryProps {
  images: string[];
  title: string;
  propertyType?: string;
}

export default function ImageGallery({ images, title, propertyType }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Main Image Container */}
      <div className="relative w-full h-96 md:h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-4">
        {/* Main Image */}
        <Image
          src={images[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          className="object-contain transition-opacity duration-300"
          priority={currentImageIndex === 0}
          fetchPriority={currentImageIndex === 0 ? "high" : undefined}
          quality={75}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 md:hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 md:hover:scale-110"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 md:hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 md:hover:scale-110"
              aria-label="Next image"
            >
              <FaChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Property Tag */}
        {propertyType && (
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium select-none capitalize">
              {propertyType}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                index === currentImageIndex
                  ? "border-blue-600 shadow-lg"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority={false}
                  quality={70}
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Image Indicators (Dots) */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentImageIndex
                  ? "bg-blue-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
