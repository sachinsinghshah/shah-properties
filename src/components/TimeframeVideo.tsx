"use client";

import { useEffect, useRef, useState } from "react";

interface TimeframeVideoProps {
  videoUrl: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
  className?: string;
  onVideoReady?: () => void;
  onTimeframeComplete?: () => void;
}

const TimeframeVideo: React.FC<TimeframeVideoProps> = ({
  videoUrl,
  startTime,
  endTime,
  className = "",
  onVideoReady,
  onTimeframeComplete,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const videoId = getVideoId(videoUrl);

  useEffect(() => {
    if (!videoId) return;

    // Create a unique iframe source with timeframe parameters
    const createEmbedUrl = () => {
      const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        controls: "0",
        showinfo: "0",
        rel: "0",
        modestbranding: "1",
        playsinline: "1",
        enablejsapi: "1",
        start: startTime.toString(),
        end: endTime.toString(),
        loop: "1",
        playlist: videoId,
      });

      return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    };

    if (iframeRef.current) {
      iframeRef.current.src = createEmbedUrl();
    }

    // Set up a timer to restart the video at the specified timeframe
    const restartVideo = () => {
      if (iframeRef.current) {
        const currentSrc = iframeRef.current.src;
        // Force reload to restart from the beginning of timeframe
        iframeRef.current.src = "";
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.src = currentSrc;
          }
        }, 100);
      }
    };

    // Calculate the duration of the timeframe
    const timeframeDuration = (endTime - startTime) * 1000; // Convert to milliseconds

    // Set up timeout to call onTimeframeComplete after first cycle
    setTimeout(() => {
      if (onTimeframeComplete) {
        onTimeframeComplete();
      }
    }, timeframeDuration);

    // Set up interval to restart video after timeframe duration
    intervalRef.current = setInterval(restartVideo, timeframeDuration + 1000); // Add 1 second buffer

    // Mark video as ready
    setTimeout(() => {
      setIsVideoReady(true);
      if (onVideoReady) {
        onVideoReady();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [videoId, startTime, endTime, onVideoReady]);

  if (!videoId) {
    return (
      <div
        className={`bg-gray-900 flex items-center justify-center ${className}`}
      >
        <p className="text-white">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full video-container ${className}`}>
      <iframe
        ref={iframeRef}
        className={`w-full h-full absolute inset-0 ${
          className.includes("echo-background") ? "echo-iframe" : "main-iframe"
        }`}
        title="Property Video Tour"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {!isVideoReady && !className.includes("echo-background") && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeframeVideo;
