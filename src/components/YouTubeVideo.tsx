import React from "react";

interface YouTubeVideoProps {
  videoUrl: string;
  title?: string;
  className?: string;
  startTime?: number; // in seconds
  endTime?: number; // in seconds
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoUrl,
  title,
  className = "",
  startTime,
  endTime,
}) => {
  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : "";
  };

  const videoId = getVideoId(videoUrl);

  // Build embed URL with timeframe parameters
  const buildEmbedUrl = (id: string): string => {
    let embedUrl = `https://www.youtube.com/embed/${id}`;
    const params = new URLSearchParams();

    if (startTime) {
      params.set("start", startTime.toString());
    }
    if (endTime) {
      params.set("end", endTime.toString());
    }

    if (params.toString()) {
      embedUrl += `?${params.toString()}`;
    }

    return embedUrl;
  };

  const embedUrl = buildEmbedUrl(videoId);

  if (!videoId) {
    return (
      <div className={`bg-gray-100 rounded-lg p-8 text-center ${className}`}>
        <p className="text-gray-600">Invalid YouTube URL</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          src={embedUrl}
          title={title || "Property Video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default YouTubeVideo;
