"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const VideoShowcase = dynamic(() => import("./VideoShowcase"), {
  ssr: false,
  loading: () => null,
});

export default function VideoShowcaseClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return <div ref={containerRef}>{isVisible ? <VideoShowcase /> : null}</div>;
}

