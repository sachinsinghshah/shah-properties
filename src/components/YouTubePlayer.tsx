"use client";

import { useEffect, useRef } from "react";
import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoUrl: string;
  startTime?: number;
  endTime?: number;
  className?: string;
  onReady?: (event: { target: YT.Player }) => void;
  onStateChange?: (event: { target: YT.Player; data: number }) => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoUrl,
  startTime,
  endTime,
  className = "",
  onReady,
  onStateChange,
}) => {
  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const handleReady = (event: { target: YT.Player }) => {
    playerRef.current = event.target;

    if (startTime) {
      event.target.seekTo(startTime, true);
      setTimeout(() => {
        event.target.playVideo();
      }, 200);
    }

    if (onReady) {
      onReady(event);
    }
  };

  const handleStateChange = (event: { target: YT.Player; data: number }) => {
    if (event.data === 1) {
      const monitorTimeframe = () => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          if (startTime && currentTime < startTime) {
            playerRef.current.seekTo(startTime, true);
          }
          if (endTime && currentTime >= endTime) {
            playerRef.current.seekTo(startTime || 0, true);
          }
        }
      };

      intervalRef.current = setInterval(monitorTimeframe, 100);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    if (onStateChange) {
      onStateChange(event);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      if (playerRef.current) {
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
