"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import VideoAudioPlayer from "@/components/VideoAudioPlayer";
import '@/styles/paginated-form.css';

/**
 * Component that displays form inputs as a step-by-step wizard in full-screen mode
 * @param {Object} props
 * @param {Array} props.fields - The array of field objects from the explanation
 */
const PaginatedFormView = ({ fields = [], formTitle, formSource }) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('explanation'); // For explanation/examples tabs
  const activeButtonRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const audioRef = useRef(null);
  const [audioElement, setAudioElement] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(true); // Always expanded in this view
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  
  // Initialize the component and handle loading state
  useEffect(() => {
    // Simulate loading of assets
    console.log('Initializing PaginatedFormView component');
    
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      console.log('PaginatedFormView component loaded');
    }, 500);
    
    return () => clearTimeout(loadTimer);
  }, []);
  
  // Scroll active button into view when step changes
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeButton = activeButtonRef.current;
      
      // Calculate position to scroll to center the button
      const containerWidth = container.clientWidth;
      const buttonLeft = activeButton.offsetLeft;
      const buttonWidth = activeButton.clientWidth;
      
      // Scroll to center the button
      container.scrollTo({
        left: buttonLeft - containerWidth / 2 + buttonWidth / 2,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  if (!fields || fields.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto text-center">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-gray-700 text-lg font-medium">
            No form fields were detected in this document.
          </p>
          <button 
            onClick={() => router.push('/upload')} 
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload Another Form
          </button>
        </div>
      </div>
    );
  }

  // Get the current field based on step
  const currentField = fields ? fields[currentStep] : null;
  
  // Play audio when step changes
  useEffect(() => {
    if (currentField?.audioData && audioRef.current) {
      // Reset audio to beginning
      audioRef.current.currentTime = 0;
      
      // Try to play audio - browser policies may prevent autoplay
      audioRef.current.play().catch(err => {
        console.log('Auto-play prevented due to browser policy:', err);
      });
    }
  }, [currentStep, currentField]);

  // Go to next field
  const handleNext = () => {
    // Don't allow changing steps while audio is playing
    if (isAudioPlaying) {
      console.log('Cannot go to next question while audio is playing');
      return;
    }
    
    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to previous field
  const handlePrev = () => {
    // Don't allow changing steps while audio is playing
    if (isAudioPlaying) {
      console.log('Cannot go to previous question while audio is playing');
      return;
    }
    
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Go to a specific step
  const goToStep = (stepIndex) => {
    // Don't allow changing steps while audio is playing
    if (isAudioPlaying) {
      console.log('Cannot change question while audio is playing');
      return;
    }
    
    if (stepIndex >= 0 && stepIndex < fields.length) {
      setCurrentStep(stepIndex);
    }
  };

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioElement) {
        console.log('Cleaning up audio element');
        // Remove all event listeners
        audioElement.onplay = null;
        audioElement.onpause = null;
        audioElement.onended = null;
        audioElement.onerror = null;
        audioElement.onabort = null;
        
        // Stop playback
        try {
          audioElement.pause();
          audioElement.currentTime = 0;
        } catch (error) {
          console.error('Error cleaning up audio element:', error);
        }
        
        // Update state
        setIsAudioPlaying(false);
        setAudioElement(null);
      }
    };
  }, [audioElement]);

  // Create and setup new audio element when step changes
  useEffect(() => {
    console.log(`Setting up audio for step ${currentStep}, field:`, currentField?.label);
    
    // Always clean up previous audio if any, regardless of whether new field has audio
    if (audioElement) {
      console.log('Cleaning up previous audio element');
      audioElement.onplay = null;
      audioElement.onpause = null;
      audioElement.onended = null;
      audioElement.onerror = null;
      audioElement.onabort = null;
      try {
        audioElement.pause();
        audioElement.currentTime = 0;
      } catch (e) {
        console.error("Error cleaning up audio:", e);
      }
      setIsAudioPlaying(false); // Ensure playing state is reset
      setAudioElement(null);
    }

    // Force a small delay to ensure proper cleanup between steps
    const setupTimer = setTimeout(() => {
      if (currentField?.audioData) {
        try {
          console.log(`Creating audio for ${currentField.label} with data:`, currentField.audioData.slice(0, 50) + '...');
          
          // Create a new audio element with preload
          const audio = new Audio();
          audio.preload = 'auto';
          
          // Set up event listeners before setting source
          audio.onplay = () => {
            console.log('Audio started playing');
            setIsAudioPlaying(true);
          };
          
          audio.onpause = () => {
            console.log('Audio paused');
            setIsAudioPlaying(false);
          };
          
          audio.onended = () => {
            console.log('Audio playback ended');
            setIsAudioPlaying(false);
          };
          
          audio.onerror = (event) => {
            console.error('Audio playback error:', event);
            setIsAudioPlaying(false);
          };
          
          audio.onloadeddata = () => {
            console.log('Audio data loaded successfully');
          };
          
          // Set the source after attaching event listeners
          audio.src = currentField.audioData;
          
          // Update the audio element state
          setAudioElement(audio);
          
          // Wait for the state update before playing
          const playTimer = setTimeout(() => {
            if (audio) {
              console.log('Starting TTS audio playback');
              audio.play().catch(error => {
                console.error('Error playing TTS audio:', error);
                setIsAudioPlaying(false);
              });
            }
          }, 300);
          
          return () => clearTimeout(playTimer);
        } catch (error) {
          console.error('Error setting up audio:', error);
          setIsAudioPlaying(false);
        }
      } else {
        console.log('No audio data available for this question');
      }
    }, 100);
    
    return () => clearTimeout(setupTimer);
  }, [currentStep, currentField]);
  
  // No dynamic height calculation needed

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation with step indicators */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="overflow-x-auto scrollbar-hide" ref={scrollContainerRef}>
            <div className="flex space-x-3 py-2 min-w-max">
              {fields.map((field, index) => (
                <button
                  key={index}
                  ref={index === currentStep ? activeButtonRef : null}
                  onClick={() => !isAudioPlaying && goToStep(index)}
                  disabled={isAudioPlaying}
                  className={`question-indicator ${
                    index === currentStep
                      ? 'question-indicator-active'
                      : index < currentStep
                      ? 'question-indicator-completed'
                      : 'question-indicator-pending'
                  } ${isAudioPlaying ? 'cursor-not-allowed opacity-50' : ''}`}
                  title={isAudioPlaying ? "Please wait for the audio to finish" : `Go to question ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - takes all available space and centers content */}
      <div className="form-container flex items-center justify-center py-8" style={{ minHeight: 'calc(100vh - 160px)' }}>
        <div className="form-two-column">
          {/* Left column with name and explanation */}
          <div className="left-column">
            {/* Name section with icon and description */}
            <div className="name-section">
              <div className="name-section-content">
                <div className="name-icon">
                  {(() => {
                    // Display different icons based on field type
                    switch(currentField.type) {
                      case 'email':
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        );
                      case 'date':
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        );
                      case 'tel':
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        );
                      case 'select':
                      case 'checkbox':
                      case 'radio':
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                          </svg>
                        );
                      default:
                        return (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        );
                    }
                  })()}
                </div>
                <div>
                  <h2>{currentField.label || "Field Name"}</h2>
                  <p className="name-description">
                    {currentField.shortDescription || 
                     currentField.description || 
                     (currentField.required 
                       ? "This is a required field" 
                       : "This field is optional")}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Explanation section with tabs */}
            <div className="explanation-section">
              {/* Tabs navigation */}
              <div className="tabs-container">
                <button 
                  onClick={() => setActiveTab('explanation')}
                  className={`tab-button ${activeTab === 'explanation' ? 'active-tab' : ''}`}
                >
                  Explanation & Hints
                </button>
                <button 
                  onClick={() => setActiveTab('examples')}
                  className={`tab-button ${activeTab === 'examples' ? 'active-tab' : ''}`}
                >
                  Examples
                </button>
              </div>
              
              {/* Tab content container */}
              <div className="explanation-content-container">
                {/* Explanation tab */}
                {activeTab === 'explanation' && (
                  <div className="explanation-content w-full">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Understanding this field</h4>
                    <div className="text-gray-600 mb-4">
                      {currentField.explanation ? (
                        <div className="prose max-w-none">
                          {currentField.explanation}
                        </div>
                      ) : (
                        <p>
                          This is a {currentField.type} field that collects {currentField.label?.toLowerCase() || "information"}. 
                          {currentField.required ? ' This field is required.' : ' This field is optional.'}
                          {currentField.description ? ` ${currentField.description}` : ''}
                        </p>
                      )}
                    </div>
                    
                    {(currentField.tip || currentField.hint) && (
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mt-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-blue-700">
                              {currentField.tip || currentField.hint}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentField.validationRules && currentField.validationRules.length > 0 && (
                      <div className="mt-6">
                        <h5 className="text-sm font-medium text-gray-800 uppercase tracking-wider mb-3">Format Requirements</h5>
                        <ul className="space-y-2 text-sm">
                          {currentField.validationRules.map((rule, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Examples tab */}
                {activeTab === 'examples' && (
                  <div className="examples-content w-full">
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Example entries</h4>
                    
                    <div className="space-y-4">
                      {/* Examples based on field type */}
                      {currentField?.examples && Array.isArray(currentField.examples) && currentField.examples.length > 0 ? (
                        currentField.examples.map((example, index) => (
                          <div key={index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                            <p className="text-gray-700">{example}</p>
                          </div>
                        ))
                      ) : (
                        <>
                          {currentField.type === 'text' && (
                            <>
                              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-gray-700">John Smith</p>
                              </div>
                              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-gray-700">Jane Doe</p>
                              </div>
                            </>
                          )}
                          {currentField.type === 'email' && (
                            <>
                              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-gray-700">john.smith@example.com</p>
                              </div>
                              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-gray-700">contact@yourbusiness.com</p>
                              </div>
                            </>
                          )}
                          {currentField.type === 'date' && (
                            <>
                              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-gray-700">01/15/2023</p>
                              </div>
                              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <p className="text-gray-700">12/31/2022</p>
                              </div>
                            </>
                          )}
                          {currentField.type !== 'text' && currentField.type !== 'email' && currentField.type !== 'date' && (
                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-yellow-700">Examples for {currentField.type} fields will appear here.</p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-gray-800 uppercase tracking-wider mb-3">Tips</h5>
                      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                        <p className="text-sm text-gray-600">
                          {currentField.tip || currentField.exampleTip || `For best results, enter your ${currentField.label?.toLowerCase() || "information"} exactly as shown on your official documents.`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Video section with character and speech bubble */}
          <div className="right-column">
            <div className="video-section">
              <div className="video-container">
                <div className="video-content-wrapper">
                  {/* Character image and speech bubble */}
                  <div className="relative flex flex-col h-full overflow-visible">
                    {/* VideoAudioPlayer component */}
                    <div className="flex-grow flex items-center justify-center rounded-xl relative">
                      <VideoAudioPlayer
                        audioUrl={currentField?.audioData || ""}
                        audioElement={audioElement}
                        videoSrc="/talk.mp4"
                        staticImageSrc="/talk_static.png"
                        isPlaying={isAudioPlaying}
                        isExpanded={isVideoExpanded}
                        key={`video-player-${currentStep}`} // Force re-render on step change
                      />
                    </div>
                    
                    {/* Speech bubble with audio controls */}
                    {currentField?.characterVoiceText && (
                      <div className="character-speech-bubble" style={{ zIndex: 1000 }}>
                        <div className="audio-controls">
                          <p className="speech-text">{currentField.characterVoiceText}</p>
                          
                          {/* Play button for audio */}
                          {currentField?.audioData && (                              <button 
                                className="play-audio-btn" 
                                onClick={(e) => {
                                  e.preventDefault();
                                  console.log("Play button clicked, audioElement:", audioElement ? "exists" : "missing");
                                  
                                  if (audioElement) {
                                    // Stop any current playback
                                    audioElement.pause();
                                    
                                    // Reset audio to beginning
                                    audioElement.currentTime = 0;
                                    
                                    // Small delay to ensure UI updates
                                    setTimeout(() => {
                                      // Play the audio - this will trigger the onPlay event
                                      // which updates isAudioPlaying state
                                      console.log("Starting audio playback from button click");
                                      audioElement.play().catch(error => {
                                        console.error('Error playing audio:', error);
                                        setIsAudioPlaying(false);
                                      });
                                    }, 50);
                                  } else if (currentField?.audioData) {
                                    // Recreate the audio element if it doesn't exist
                                    console.log("Creating new audio element on button click");
                                    const audio = new Audio(currentField.audioData);
                                    
                                    // Set up event listeners
                                    audio.onplay = () => {
                                      console.log('Audio started playing from button click');
                                      setIsAudioPlaying(true);
                                    };
                                    
                                    audio.onpause = () => setIsAudioPlaying(false);
                                    audio.onended = () => setIsAudioPlaying(false);
                                    audio.onerror = () => setIsAudioPlaying(false);
                                    
                                    // Store the audio element
                                    setAudioElement(audio);
                                    
                                    // Play with a small delay
                                    setTimeout(() => {
                                      audio.play().catch(error => {
                                        console.error('Error playing audio:', error);
                                        setIsAudioPlaying(false);
                                      });
                                    }, 100);
                                  }
                                }}
                                aria-label="Play audio explanation"
                              >
                              {/* Play/audio icon from Heroicons */}
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Audio playing indicator */}
      {isAudioPlaying && (
        <div className="audio-playing-indicator">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465l-2.172-2.171a1 1 0 010-1.415l8.9-8.9a1 1 0 011.414 0l2.172 2.172m-1.415 1.414L5.586 15.465a1 1 0 001.415 0l7.07-7.07a1 1 0 000-1.415" />
          </svg>
          Audio playing - please wait
          <button 
            onClick={() => {
              if (audioElement) {
                audioElement.pause();
                audioElement.currentTime = 0;
                setIsAudioPlaying(false);
              }
            }}
            className="text-white hover:text-red-100 underline text-xs ml-2 font-medium"
            title="Stop audio playback"
          >
            Stop
          </button>
        </div>
      )}
      
      {/* Bottom navigation fixed bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-4 px-6 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0 || isAudioPlaying}
            className={`nav-button ${
              currentStep === 0 || isAudioPlaying ? 'nav-button-disabled' : 'nav-button-secondary'
            }`}
            title={isAudioPlaying ? "Please wait for the audio to finish" : "Go to previous question"}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          
          <div className="flex gap-2">
            {currentStep < fields.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={isAudioPlaying}
                className={`nav-button ${isAudioPlaying ? 'nav-button-disabled' : 'nav-button-primary'}`}
                title={isAudioPlaying ? "Please wait for the audio to finish" : "Go to next question"}
              >
                Next
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => router.push('/upload')}
                disabled={isAudioPlaying}
                className={`nav-button ${isAudioPlaying ? 'nav-button-disabled' : 'nav-button-primary'}`}
                title={isAudioPlaying ? "Please wait for the audio to finish" : "Complete the form"}
              >
                Complete
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginatedFormView;
