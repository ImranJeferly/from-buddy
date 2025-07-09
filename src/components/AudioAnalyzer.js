"use client";

// NOTE: This component is currently not being used in the application.
// We've simplified the VideoAudioPlayer to use the audio element's playing state
// instead of analyzing audio volume. Keeping this file for reference only.

import { useEffect, useRef, useState } from 'react';

const AudioAnalyzer = ({ audioUrl, onVolumeChange, isPlaying, existingAudioElement = null }) => {
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const audioRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if ((!audioUrl && !existingAudioElement) || !isPlaying) {
      cleanup();
      return;
    }

    setupAudioAnalysis();
    return cleanup;
  }, [audioUrl, existingAudioElement, isPlaying]);

  const setupAudioAnalysis = async () => {
    try {
      // Make sure we clean up any previous analysis first
      await cleanup();

      // Create fresh audio context
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      console.log('Audio context created:', audioContextRef.current.state);
      
      // Use existing audio element or create a new one
      if (existingAudioElement) {
        audioRef.current = existingAudioElement;
        console.log('Using existing audio element');
      } else if (audioUrl) {
        // Create new audio element only if we don't have an existing one
        audioRef.current = new Audio(audioUrl);
        audioRef.current.crossOrigin = "anonymous";
        console.log('Created new audio element from URL');
      } else {
        console.error('No audio source provided');
        return;
      }
      
      // Log audio element state
      console.log('Audio element readyState:', audioRef.current.readyState);
      console.log('Audio element paused:', audioRef.current.paused);
      
      // Wait for audio context to be running
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
        console.log('Audio context resumed');
      }
      
      // Create analyser with refined settings
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048; // Use maximum FFT size for best resolution
      analyserRef.current.minDecibels = -90;
      analyserRef.current.maxDecibels = -10;
      analyserRef.current.smoothingTimeConstant = 0.2; // Lower smoothing for more responsive detection
      
      // Create source and connect to analyser
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);
      console.log('Audio pipeline connected');
      
      // Start analysis
      setIsAnalyzing(true);
      analyzeAudio();
      console.log('Audio analysis started');
      
      // Only play audio if we created it (not if we're using an existing element)
      if (!existingAudioElement && audioRef.current) {
        console.log('Playing audio from internal element');
        await audioRef.current.play();
      }
      
    } catch (error) {
      console.error('Error setting up audio analysis:', error);
    }
  };

  const analyzeAudio = () => {
    if (!analyserRef.current || !isAnalyzing) return;

    // Create both frequency and time domain data arrays
    const bufferLength = analyserRef.current.frequencyBinCount;
    const freqDataArray = new Uint8Array(bufferLength);
    const timeDataArray = new Uint8Array(bufferLength);
    
    // Use a counter to occasionally log data for debugging
    let frameCount = 0;
    
    const analyze = () => {
      if (!isAnalyzing || !analyserRef.current) return;
      
      // Get both frequency and time domain data
      try {
        analyserRef.current.getByteFrequencyData(freqDataArray);
        analyserRef.current.getByteTimeDomainData(timeDataArray);
        
        // Calculate volume from time domain data (more accurate for overall volume)
        let sumTime = 0;
        for (let i = 0; i < bufferLength; i++) {
          // In time domain data, silence is represented by values of 128
          // So we calculate distance from 128 to measure signal strength
          const distance = Math.abs(timeDataArray[i] - 128);
          sumTime += distance;
        }
        const timeVol = sumTime / bufferLength / 128; // Normalize to 0-1 range
        
        // Calculate volume from frequency domain with speech focus
        let sumFreq = 0;
        let count = 0;
        
        // Adjust frequency range to focus more on human speech
        // For 2048 FFT size and 44.1kHz sample rate:
        // - ~300Hz starts around bin 14
        // - ~3000Hz ends around bin 140
        const lowBin = Math.floor(bufferLength * 0.01); // ~1% of spectrum
        const highBin = Math.floor(bufferLength * 0.15); // ~15% of spectrum
        
        // Focus more on speech frequencies
        for (let i = 0; i < bufferLength; i++) {
          if (i >= lowBin && i <= highBin) {
            // Higher weight for speech range
            sumFreq += freqDataArray[i] * 2.0;
            count += 2.0;
          } else {
            sumFreq += freqDataArray[i] * 0.5;
            count += 0.5;
          }
        }
        const freqVol = sumFreq / count / 255; // Normalize to 0-1 range
        
        // Combined approach: use the higher of the two measurements for better detection
        const combinedVolume = Math.max(timeVol, freqVol);
        
        // Apply threshold based on observed audio characteristics
        const threshold = 0.005; // Lower threshold to catch subtle sounds
        
        // Determine if there's sound based on the combined volume
        const hasSound = combinedVolume > threshold;
        
        // Periodic debug logging (every ~60 frames, about once per second)
        frameCount++;
        if (frameCount % 60 === 0) {
          console.log(`Audio debug: Time vol: ${timeVol.toFixed(5)}, Freq vol: ${freqVol.toFixed(5)}, Combined: ${combinedVolume.toFixed(5)}, HasSound: ${hasSound}`);
        }
        
        // Call the callback with volume info
        if (onVolumeChange) {
          onVolumeChange({
            volume: combinedVolume,
            hasSound,
            rawVolume: sumFreq / count
          });
        }
      } catch (error) {
        console.error('Error during audio analysis:', error);
      }
      
      animationFrameRef.current = requestAnimationFrame(analyze);
    };
    
    analyze();
  };

  const cleanup = async () => {
    console.log('Cleaning up audio analyzer');
    setIsAnalyzing(false);
    
    // Cancel any pending animation frames
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    // Handle audio element reference
    if (audioRef.current) {
      // Only pause if it's our own audio element (not one provided externally)
      if (!existingAudioElement) {
        console.log('Pausing internal audio element');
        try {
          audioRef.current.pause();
        } catch (e) {
          console.error('Error pausing audio:', e);
        }
      } else {
        console.log('Not pausing external audio element');
      }
      
      // Always nullify the reference
      audioRef.current = null;
    }
    
    // Clean up Web Audio API nodes
    try {
      // Disconnect source node if it exists
      if (sourceRef.current) {
        console.log('Disconnecting audio source');
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      
      // Disconnect analyzer node if it exists
      if (analyserRef.current) {
        console.log('Disconnecting audio analyzer');
        analyserRef.current.disconnect();
        analyserRef.current = null;
      }
      
      // Close audio context
      if (audioContextRef.current) {
        console.log('Closing audio context');
        if (audioContextRef.current.state !== 'closed') {
          await audioContextRef.current.close();
        }
        audioContextRef.current = null;
      }
    } catch (error) {
      console.error('Error during audio cleanup:', error);
    }
    
    console.log('Audio analyzer cleanup complete');
  };

  return null; // This component doesn't render anything
};

export default AudioAnalyzer;
