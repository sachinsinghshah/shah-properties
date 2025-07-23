"use client";

import { useEffect, useRef } from "react";
import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoUrl: string;
  startTime?: number;
  endTime?: number;
  className?: string;
  onReady?: (event: any) => void;
  onStateChange?: (event: any) => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  startTime,
  endTime,
  className = "",
  onReady,
  onStateChange,
}) => {
  const playerRef = useRef<any>(null);

  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const videoId = getVideoId(videoUrl);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: videoId,
      start: startTime || 0,
      end: endTime || undefined,
      controls: 0,
      showinfo: 0,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
      enablejsapi: 1,
    },
  };

  const handleReady = (event: any) => {
    playerRef.current = event.target;

    // Force seek to start time and play
    if (startTime) {
      event.target.seekTo(startTime, true); // true forces allowSeekAhead
      // Small delay to ensure seek completes before playing
      setTimeout(() => {
        event.target.playVideo();
      }, 200);
    }

    if (onReady) {
      onReady(event);
    }
  };

  const handleStateChange = (event: any) => {
    // YouTube states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)

    if (event.data === 1) {
      // Playing - Set up continuous monitoring for strict timeframe enforcement
      const monitorTimeframe = () => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();

          // If we're before the start time, seek to start time
          if (startTime && currentTime < startTime) {
            playerRef.current.seekTo(startTime);
          }

          // If we're past the end time, seek back to start time
          if (endTime && currentTime >= endTime) {
            playerRef.current.seekTo(startTime || 0);
          }
        }
      };

      // Monitor every 100ms to ensure strict timeframe compliance
      const interval = setInterval(monitorTimeframe, 100);

      // Store interval reference for cleanup
      (playerRef.current as any)._timeframeInterval = interval;
    } else {
      // Clear monitoring when not playing
      if (playerRef.current && (playerRef.current as any)._timeframeInterval) {
        clearInterval((playerRef.current as any)._timeframeInterval);
        (playerRef.current as any)._timeframeInterval = null;
      }
    }

    if (onStateChange) {
      onStateChange(event);
    }
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      if (playerRef.current) {
        // Clear any running timeframe monitoring interval
        if ((playerRef.current as any)._timeframeInterval) {
          clearInterval((playerRef.current as any)._timeframeInterval);
        }
        playerRef.current.destroy();
      }
    };
  }, []);

  if (!videoId) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-600">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={handleReady}
        onStateChange={handleStateChange}
        className="w-full h-full"
      />
    </div>
  );
};

export default YouTubePlayer;
