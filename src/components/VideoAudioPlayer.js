"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const VideoAudioPlayer = ({ videoSrc, staticImageSrc, isPlaying, isExpanded, audioElement, audioUrl }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const videoRef = useRef(null);
  
  // Preload video when expanded to ensure it's ready to play
  useEffect(() => {
    if (isExpanded && videoRef.current) {
      // Force video loading
      videoRef.current.load();
    }
  }, [isExpanded]);

  // Update video visibility based on isPlaying state
  useEffect(() => {
    if (isPlaying) {
      // When audio starts playing, show video with a small delay to allow for transition
      console.log('Audio is playing, showing video');
      setShowVideo(true);
    } else {
      console.log('Audio is not playing, showing static image');
      setShowVideo(false);
    }
  }, [isPlaying]);

  // Reset state when component is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setShowVideo(false);
      setIsAudioLoaded(false);
    }
  }, [isExpanded]);

  // Set audio as loaded after a small delay when expanded
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => {
        setIsAudioLoaded(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // Handle video playback when audio state changes
  useEffect(() => {
    if (isExpanded && videoRef.current) {
      console.log('VideoAudioPlayer expanded:', isPlaying ? 'playing' : 'not playing');
      
      if (isPlaying) {
        // Always have the video playing, even when not visible
        // This ensures it's ready when we transition to it
        videoRef.current.play()
          .then(() => console.log('Video started playing successfully'))
          .catch(err => console.log('Video play error:', err));
        
        console.log('Video player ready');
        console.log('AudioElement status:', 
                   audioElement ? 'exists' : 'missing', 
                   audioElement?.paused ? 'paused' : 'playing');
      } else {
        // Keep the video playing but hidden when audio isn't playing
        // This makes the transition seamless when audio starts again
        if (videoRef.current.paused) {
          videoRef.current.play().catch(err => console.log('Video play error:', err));
        }
      }
    } else {
      console.log('VideoAudioPlayer collapsed');
      // Pause video when component is collapsed
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    }
  }, [isExpanded, isPlaying, audioElement]);

  // We don't render anything if the component isn't expanded
  if (!isExpanded) return null;

  return (
    <div className="w-full h-[520px] bg-white flex items-center justify-center rounded-2xl relative overflow-hidden">
      {/* Both elements are always rendered, we just control opacity and z-index */}
      
      {/* Static image layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          opacity: !showVideo || !isAudioLoaded ? 1 : 0,
          zIndex: !showVideo || !isAudioLoaded ? 20 : 10,
          transition: 'opacity 200ms ease-in-out',
        }}
      >
        <Image
          src={staticImageSrc}
          alt="Hippo"
          width={400}
          height={400}
          className="object-contain rounded-2xl max-w-full max-h-full"
          priority
        />
      </div>

      {/* Video layer */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          opacity: showVideo && isAudioLoaded ? 1 : 0,
          zIndex: showVideo && isAudioLoaded ? 20 : 10,
          transition: 'opacity 200ms ease-in-out',
          pointerEvents: showVideo ? 'auto' : 'none',
        }}
      >
        <video
          ref={videoRef}
          className="max-w-full max-h-full object-contain rounded-2xl"
          autoPlay
          muted
          loop
          playsInline
          src={videoSrc}
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Debug info removed for production */}
    </div>
  );
};

export default VideoAudioPlayer;
