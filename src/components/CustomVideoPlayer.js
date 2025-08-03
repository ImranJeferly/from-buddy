"use client";

import React, { useState, useRef, useEffect } from "react";

export default function CustomVideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl">
      {/* Video Element */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          preload="metadata"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(true)}
        >
          {/* Since we can't directly use YouTube URLs, we'll need to either:
              1. Download and host the video ourselves, or
              2. Use a different approach
              For now, I'll create a placeholder that can be easily updated */}
          <source src="/demo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {/* Custom Controls Overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setTimeout(() => setShowControls(false), 2000)}
        >
          {/* Play/Pause Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlayPause}
              className="w-20 h-20 bg-black bg-opacity-60 rounded-full flex items-center justify-center text-white hover:bg-opacity-80 transition-all duration-200 hover:scale-110"
            >
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.5 4.5l8 5.5-8 5.5v-11z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
            {/* Progress Bar */}
            <div 
              className="w-full h-2 bg-white bg-opacity-30 rounded-full cursor-pointer mb-3 hover:h-3 transition-all duration-200"
              onClick={handleProgressClick}
            >
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-200"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-4">
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlayPause}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 4h2v12H6V4zm6 0h2v12h-2V4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.5 4.5l8 5.5-8 5.5v-11z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                >
                  {isMuted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.783L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.783a1 1 0 011.617-.141zM12 8.414l1.414-1.414L15 8.586 16.586 7 18 8.414 16.586 10 18 11.586 16.586 13 15 11.414 13.414 13 12 11.586 13.414 10 12 8.414z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.783L4.828 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.828l3.555-3.783a1 1 0 011.617-.141zM12 8h.01a7 7 0 010 4H12v-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Time Display */}
                <div className="text-sm font-medium">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>

              {/* Title */}
              <div className="text-sm font-medium opacity-90">
                Form Buddy AI Demo
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fallback for when video can't load */}
      <div className="hidden video-fallback absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.5 4.5l8 5.5-8 5.5v-11z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Form Buddy AI Demo</h3>
          <p className="text-blue-100">See how AI makes complex forms simple</p>
        </div>
      </div>
    </div>
  );
}