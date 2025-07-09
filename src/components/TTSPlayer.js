"use client";

import { useState, useRef } from 'react';
import { PlayIcon, PauseIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

export default function TTSPlayer({ audioUrl, userName, className = "" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef(null);

  const handlePlayPause = async () => {
    if (!audioUrl) return;

    setIsLoading(true);
    
    try {
      if (isPlaying) {
        // Pause audio
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Play audio
        if (!audioRef.current) {
          audioRef.current = new Audio(audioUrl);
          audioRef.current.addEventListener('ended', () => {
            setIsPlaying(false);
          });
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!audioUrl) {
    return null;
  }

  return (
    <div className={`flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 ${className}`}>
      <div className="flex-shrink-0">
        <button
          onClick={handlePlayPause}
          disabled={isLoading}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : isPlaying ? (
            <PauseIcon className="w-6 h-6" />
          ) : (
            <PlayIcon className="w-6 h-6 ml-0.5" />
          )}
        </button>
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <SpeakerWaveIcon className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-800">
            Personal Welcome Message
          </h3>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {userName ? `Your personalized greeting from Form Buddy AI` : 'Your personalized greeting'}
        </p>
      </div>
    </div>
  );
}
