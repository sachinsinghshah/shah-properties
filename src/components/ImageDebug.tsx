"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageDebugProps {
  src: string;
  alt: string;
  propertyId: string;
}

export default function ImageDebug({ src, alt, propertyId }: ImageDebugProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
      <div className="mb-4">
        <h3 className="font-bold text-lg">
          Image Debug - Property {propertyId}
        </h3>
        <p className="text-sm text-gray-600">Path: {src}</p>
        <p className="text-sm text-gray-600">
          Status:{" "}
          {imageLoaded
            ? "✅ Loaded"
            : imageError
            ? "❌ Error"
            : "⏳ Loading..."}
        </p>
      </div>

      <div className="relative h-64 w-full overflow-hidden bg-gray-100 rounded">
        {!imageError ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain bg-gray-100"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              console.error(`Failed to load image: ${src}`);
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-red-500">
              <p className="text-lg font-bold">❌ Image Failed to Load</p>
              <p className="text-sm">Path: {src}</p>
              <button
                onClick={() => {
                  setImageError(false);
                  setImageLoaded(false);
                }}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
