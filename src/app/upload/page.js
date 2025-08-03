"use client";

import { handleImageFile } from "../../handlers/imageHandler";
import { getFileType } from "../../handlers/fileTypeHelper";
import { checkUploadPermission } from "@/lib/ipRestrictions";
import { useUploadQuota } from "@/hooks/useUploadQuota";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";
import VideoAudioPlayer from "@/components/VideoAudioPlayer";
import RestrictionModal from "@/components/RestrictionModal";

export default function UploadPage() {
  const { currentUser, userData, loading } = useAuth();
  const router = useRouter();
  const { quotaInfo, isRestricted, restrictionReason, restrictionType, remaining } = useUploadQuota(userData, currentUser?.uid);
  const [isClient, setIsClient] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState('');
  const [processingItem, setProcessingItem] = useState(''); // File name being processed
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [restrictionModal, setRestrictionModal] = useState({ isOpen: false, type: '', title: '', message: '' });
  // Removed tab and url input state, only upload section is shown

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!loading && !currentUser && isClient) {
      router.push("/");
    }
  }, [currentUser, loading, router, isClient]);

  // Cleanup audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioElement) {
        // Remove all event listeners before cleaning up
        audioElement.onplay = null;
        audioElement.onpause = null;
        audioElement.onended = null;
        audioElement.pause();
        audioElement.currentTime = 0;
        setAudioElement(null);
      }
    };
  }, [audioElement]);

  // Auto-expand video section for new users (only once)
  useEffect(() => {
    if (!loading && userData && currentUser && isClient) {
      // Check if this is the user's first visit after registration AND we haven't auto-expanded already in this session
      if (userData.isFirstVisit && userData.greetingAudioUrl && !isVideoExpanded && !hasAutoExpanded) {
        console.log('Detected first visit for new user, auto-expanding video section...');
        
        // Mark that we've attempted auto-expand for this session
        setHasAutoExpanded(true);
        
        // Add a small delay before auto-expanding to ensure page is fully loaded
        const timer = setTimeout(() => {
          // Auto-expand the video section
          setIsVideoExpanded(true);
          
          // Play the greeting audio after expansion completes
          setTimeout(() => {
            playTTSAudio();
            
            // Update the user document to mark that the first visit has happened
            try {
              const userRef = doc(db, "users", currentUser.uid);
              setDoc(userRef, { isFirstVisit: false }, { merge: true });
              console.log('Updated user document: first visit completed');
            } catch (error) {
              console.error('Error updating first visit status:', error);
            }
          }, 800);
        }, 1500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [loading, userData, currentUser, isClient, isVideoExpanded, hasAutoExpanded]);

  // File handling functions
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Store the selected file for later processing
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileUpload = async (file) => {
    // Check upload permissions including IP restrictions
    try {
      const permission = await checkUploadPermission(currentUser?.uid, userData);
      
      if (!permission.canUpload) {
        let message = permission.reason;
        
        if (permission.restrictionType === 'ip_overuse') {
          message = "Multiple free accounts detected from your location. Upgrade to Pro to continue uploading.";
        }
        
        setRestrictionModal({
          isOpen: true,
          type: permission.restrictionType === 'ip_overuse' ? 'ip_overuse' : 'limit_reached',
          title: permission.restrictionType === 'ip_overuse' ? 'Upload Restricted' : 'Upload Limit Reached',
          message: message
        });
        return;
      }
    } catch (error) {
      console.error('Error checking upload permission:', error);
      // Continue with fallback validation if IP check fails
      if (userData?.planType !== 'pro' && 
          (userData?.uploadCount || 0) >= (userData?.planType === 'basic' ? 15 : 3)) {
        setRestrictionModal({
          isOpen: true,
          type: 'limit_reached',
          title: 'Upload Limit Reached',
          message: "You've reached your upload limit. Please upgrade your plan to continue uploading."
        });
        return;
      }
    }
    
    // Determine file type using our helper function
    const fileType = getFileType(file);
    console.log(`File uploaded: ${file.name} (${fileType})`);
    
    // If it's an unsupported file type, alert the user
    if (fileType === 'unknown') {
      console.warn('Unsupported file type:', file.type);
      setRestrictionModal({
        isOpen: true,
        type: 'unsupported_file',
        title: 'Unsupported File Type',
        message: 'Sorry, this file type is not supported. Please try a PDF, image, or document file.'
      });
      return;
    }
    
    // Store file details but don't process yet - only store the file and show its status
    setFileName(file.name);
    setSelectedFile(file);
    setUploadStatus('uploaded');
    console.log('File stored and ready for processing when user clicks "Generate Explanation"');
  };

  const triggerFileInput = () => {
    document.getElementById('file-upload').click();
  };

  const handleLanguageChange = (languageCode) => {
    setSelectedLanguage(languageCode);
  };



  const handleGenerateExplanation = async () => {
    // Check upload permissions including IP restrictions
    try {
      const permission = await checkUploadPermission(currentUser?.uid, userData);
      
      if (!permission.canUpload) {
        let message = permission.reason;
        
        if (permission.restrictionType === 'ip_overuse') {
          message = "Multiple free accounts detected from your location. Upgrade to Pro to continue.";
        }
        
        setRestrictionModal({
          isOpen: true,
          type: permission.restrictionType === 'ip_overuse' ? 'ip_overuse' : 'limit_reached',
          title: permission.restrictionType === 'ip_overuse' ? 'Upload Restricted' : 'Upload Limit Reached',
          message: message
        });
        return;
      }
    } catch (error) {
      console.error('Error checking upload permission:', error);
      // Continue with fallback validation if IP check fails
      if (userData?.planType !== 'pro' && 
          (userData?.uploadCount || 0) >= (userData?.planType === 'basic' ? 15 : 3)) {
        setRestrictionModal({
          isOpen: true,
          type: 'limit_reached',
          title: 'Upload Limit Reached',
          message: "You've reached your upload limit. Please upgrade your plan to continue."
        });
        return;
      }
    }
    
    // Only process uploaded file
    if (selectedFile && fileName) {
      console.log('Processing file:', fileName, 'in language:', selectedLanguage);
      setProcessingItem(fileName);
      setUploadStatus('processing');
      setOverlayMessage('Processing your file... Please wait');
      setShowOverlay(true);
      const fileType = getFileType(selectedFile);
      const processFile = async () => {
        try {
          setShowOverlay(true);
          setProcessingItem(selectedFile.name);
          switch (fileType) {
            case 'image':
              console.log("Sending to image handler...");
              setOverlayMessage('Processing your image...');
              setUploadStatus('processing');
              const keepOverlayVisible = () => {
                setShowOverlay(true);
                return true;
              };
              await handleImageFile(
                selectedFile, 
                setFileName, 
                setUploadStatus, 
                setOverlayMessage, 
                keepOverlayVisible,
                userData,
                currentUser?.uid,
                selectedLanguage
              );
              break;
            case 'pdf':
              console.log("Sending to PDF handler...");
              await handlePdfFile(selectedFile, setFileName, setUploadStatus);
              break;
            case 'document':
              console.log("Sending to document handler...");
              await handleDocumentFile(selectedFile, setFileName, setUploadStatus);
              break;
            default:
              throw new Error("Unsupported file type");
          }
          setOverlayMessage('Success! Your file has been processed.');
        } catch (error) {
          console.error("Error calling file handler:", error);
          setOverlayMessage(`Error: ${error.message || "Processing failed"}`);
        }
      };
      setTimeout(() => {
        processFile();
      }, 500);
    }
  };

  const toggleVideoSection = () => {
    const wasExpanded = isVideoExpanded;
    
    if (wasExpanded) {
      // First stop any playing audio when collapsing
      console.log("User explicitly collapsed video section, stopping audio");
      stopExistingAudio();
    }
    
    // Update expanded state after audio handling
    setIsVideoExpanded(!wasExpanded);
    
    // Ensure we mark hasAutoExpanded as true to prevent auto re-opening
    if (!hasAutoExpanded) {
      setHasAutoExpanded(true);
    }
    
    // Play TTS audio when video is expanded by user
    if (!wasExpanded && userData?.greetingAudioUrl) {
      console.log("User explicitly expanded video section...");
      
      // Give time for the animation to complete and components to mount
      setTimeout(() => {
        console.log("Section expanded, preparing to play audio...");
        playTTSAudio();
        
        // If this was the first visit, mark it as complete since the user has now interacted with it
        if (userData?.isFirstVisit) {
          try {
            const userRef = doc(db, "users", currentUser.uid);
            setDoc(userRef, { isFirstVisit: false }, { merge: true });
            console.log('Updated user document: first visit completed after user toggle');
          } catch (error) {
            console.error('Error updating first visit status:', error);
          }
        }
      }, 800); // Increased delay to ensure all components are ready
    }
  };

  // Function to stop and clean up any existing audio
  const stopExistingAudio = () => {
    if (audioElement) {
      console.log('Stopping and cleaning up existing audio');
      
      // First set the playing state to false immediately
      setIsAudioPlaying(false);
      
      // Remove all event listeners
      audioElement.onplay = null;
      audioElement.onpause = null;
      audioElement.onended = null;
      audioElement.onerror = null;
      
      // Stop the playback
      try {
        audioElement.pause();
        audioElement.currentTime = 0;
      } catch (error) {
        console.error('Error stopping audio:', error);
      }
      
      // Clear the reference after a short delay to ensure cleanup
      setTimeout(() => {
        setAudioElement(null);
      }, 100);
    }
  };
  
  const playTTSAudio = () => {
    if (!userData?.greetingAudioUrl) {
      console.error('No greeting audio URL available');
      return;
    }
    
    // First stop any existing audio
    stopExistingAudio();
    
    console.log('Creating new audio element');
    
    // Create a new audio element after a short delay
    setTimeout(() => {
      try {
        // Create a single audio element for both playback and analysis
        const audio = new Audio(userData.greetingAudioUrl);
        
        // Set up event listeners with robust error handling
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
        
        audio.onerror = (error) => {
          console.error('Audio playback error:', error);
          setIsAudioPlaying(false);
        };
        
        // Update the audio element state
        setAudioElement(audio);
        
        // Wait for the state update before playing
        setTimeout(() => {
          if (audio) {
            console.log('Starting TTS audio playback');
            audio.play().catch(error => {
              console.error('Error playing TTS audio:', error);
              setIsAudioPlaying(false);
            });
          }
        }, 300);
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    }, 500);
  };

  // Show loading while checking authentication
  if (loading || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated
  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Navbar showUpgradeButton={true} />
      <div style={{ paddingTop: "80px" }}> {/* Add padding to account for fixed navbar */}
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center py-12 relative">
          {/* Right Side Video Section */}
          <div className={`fixed right-8 bottom-8 z-40 transition-all duration-700 ease-in-out mobile-video-section ${
            isVideoExpanded ? 'h-auto' : 'h-16'
          }`}>
            {/* Toggle Button */}
            <button
              onClick={toggleVideoSection}
              className="absolute top-0 right-6 w-14 h-14 bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 z-50 flex items-center justify-center mobile-video-toggle"
              style={{ transform: 'translateY(-50%)' }}
            >
              <svg 
                className={`w-7 h-7 transition-transform duration-300 ${isVideoExpanded ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 15l7-7 7 7" 
                />
              </svg>
            </button>

            {/* Video Container */}
            <div className={`w-96 bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden transition-all duration-700 mobile-video-container ${
              isVideoExpanded ? 'opacity-100' : 'opacity-0 h-0'
            }`}>
              {/* Video Content */}
              <div className="relative bg-white rounded-3xl overflow-hidden p-6">
                {/* Video wrapper with VideoAudioPlayer */}
                <VideoAudioPlayer
                  audioUrl={userData?.greetingAudioUrl}
                  audioElement={audioElement}
                  videoSrc="/talk.mp4"
                  staticImageSrc="/talk_static.png"
                  isPlaying={isAudioPlaying}
                  isExpanded={isVideoExpanded}
                />
                
                {/* Video Caption */}
                {isVideoExpanded && (
                  <div className="mt-4 text-center">
                    <p className="text-gray-700 text-sm font-medium">
                      Hi! I'm your Form Buddy
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Ready to help you understand any document
                    </p>
                   
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            {/* Welcome Section */}
            <div className="text-center mb-6 md:mb-6 mb-10">
              <div className="mb-4">
                <h2 className="text-base md:text-3xl font-bold text-gray-900 font-poppins text-center">
                  Welcome, {currentUser?.displayName || 'User'}!{' '}
                  <Image
                    src="/hand.png"
                    alt="Waving hand"
                    width={28}
                    height={28}
                    className="waving-hand md:w-8 md:h-8 w-7 h-7 inline-block"
                    style={{
                      animation: 'wave 1.5s ease-in-out infinite',
                      transformOrigin: '70% 70%',
                      verticalAlign: 'baseline'
                    }}
                  />
                </h2>
              </div>
              <p className="text-gray-600 text-base md:text-lg">
                Ready to upload and analyze your forms? Let's get started!
              </p>
            </div>

            {/* Add spacing between welcome and upload/explanation section on mobile only */}
            <div className="block md:hidden h-8"></div>

            {/* Usage Limit Bar - With IP Restrictions */}
            {userData?.planType !== 'pro' && (
              <div className="mb-6">
                {isRestricted && restrictionType === 'ip_overuse' && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-red-700">
                        <span className="font-medium">Uploads blocked:</span> Multiple free accounts detected from your location.
                      </p>
                    </div>
                    <div className="mt-2 text-xs text-red-600">
                      <a href="/#pricing" className="font-medium underline hover:text-red-800">Upgrade to Pro</a> to continue uploading.
                    </div>
                  </div>
                )}
                
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1 items-center">
                      <span className="text-xs font-medium text-gray-600">
                        {userData?.uploadCount || 0}/{quotaInfo?.quota === Infinity ? '∞' : (quotaInfo?.quota || (userData?.planType === 'basic' ? 15 : 3))} forms
                        {isRestricted && restrictionType === 'ip_overuse' && (
                          <span className="ml-2 text-red-500">(Blocked)</span>
                        )}
                      </span>
                      {(isRestricted || (userData?.uploadCount || 0) >= (quotaInfo?.quota || (userData?.planType === 'basic' ? 15 : 3))) && (
                        <a href="/#pricing" className="text-xs font-medium text-blue-600">Upgrade →</a>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          isRestricted && restrictionType === 'ip_overuse'
                            ? 'bg-red-500'
                            : userData?.planType === 'basic' 
                            ? 'bg-blue-500' 
                            : ((userData?.uploadCount || 0) >= (quotaInfo?.quota || 3)) 
                              ? 'bg-red-500' 
                              : 'bg-green-500'
                        }`}
                        style={{ 
                          width: isRestricted && restrictionType === 'ip_overuse' 
                            ? '100%' 
                            : `${Math.min(100, ((userData?.uploadCount || 0) / (quotaInfo?.quota || (userData?.planType === 'basic' ? 15 : 3))) * 100)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Language Selector */}
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />



            {/* Only show the upload section */}
            <div className="relative overflow-hidden transition-all duration-500 ease-in-out max-h-[400px]">
              <div className="flex">
                <div className="w-full flex-shrink-0">
                  <div className={`w-full relative transition-all duration-300 ${uploadStatus === 'success' ? 'scale-105' : ''}`}>
                    <div 
                      onDragEnter={uploadStatus === 'uploaded' ? null : handleDragEnter}
                      onDragOver={uploadStatus === 'uploaded' ? null : handleDragOver}
                      onDragLeave={uploadStatus === 'uploaded' ? null : handleDragLeave}
                      onDrop={uploadStatus === 'uploaded' ? null : handleDrop}
                      onClick={uploadStatus === 'uploaded' ? null : triggerFileInput}
                      onMouseEnter={() => !uploadStatus && setIsHovered(true)}
                      onMouseLeave={() => !uploadStatus && setIsHovered(false)}
                      className={`w-full cursor-pointer flex flex-col items-center justify-center border-4 border-dashed rounded-2xl py-16 px-4 transition-all duration-500 mb-6 relative overflow-hidden ${
                        isDragging 
                          ? 'border-[#2196F3] bg-blue-100 scale-[1.02]' 
                          : uploadStatus === 'processing'
                          ? 'border-yellow-300 bg-blue-50'
                          : uploadStatus === 'uploaded'
                          ? 'border-blue-400 bg-blue-50'
                          : uploadStatus === 'success'
                          ? 'border-green-400 bg-green-50'
                          : isHovered
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-blue-200 bg-white hover:bg-blue-50'
                      }`}
                    >
                      {/* Upload icon and content */}
                      <div className="relative z-10">
                        {!uploadStatus && (
                          <div className={`transition-transform duration-300 ${isDragging || isHovered ? 'scale-110' : ''}`}>
                            <svg 
                              width="64" 
                              height="64" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              className={`text-[#2196F3] mb-6 mx-auto transition-all ${
                                isDragging || isHovered ? 'animate-bounce' : ''
                              }`}
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" 
                              />
                            </svg>
                            
                            <div className="text-center">
                              <span className={`text-[#2196F3] font-semibold text-xl mb-2 block transition-all duration-300 ${isDragging ? 'scale-110' : ''}`}>
                                {isDragging ? 'Drop your file here!' : 'Click or drag file to upload'}
                              </span>
                              <span className="text-gray-500 text-sm block mt-2">
                                Supports PDF, DOCX, JPG, and PNG formats
                              </span>
                              <span className="text-xs text-gray-400 block mt-1">
                                Max file size: 10MB
                              </span>
                            </div>
                          </div>
                        )}
                        
                        {uploadStatus === 'uploaded' && (
                          <div className="text-center">
                            <svg className="w-16 h-16 mb-4 mx-auto text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-[#2196F3] font-semibold text-lg block mb-1">File ready!</span>
                            <span className="text-sm text-gray-500 block">{fileName}</span>
                            <span className="text-xs text-gray-400 mt-3 block font-medium">Click "Generate Explanation" below to process</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering parent click
                                // Reset file selection
                                setUploadStatus(null);
                                setFileName('');
                                setSelectedFile(null);
                              }}
                              className="mt-3 text-xs text-red-500 hover:text-red-700 font-medium underline"
                            >
                              Remove file
                            </button>
                          </div>
                        )}
                        
                        {uploadStatus === 'processing' && (
                          <div className="text-center">
                            <svg className="animate-spin w-16 h-16 mb-4 mx-auto text-[#2196F3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-[#2196F3] font-semibold text-lg block mb-1">Processing file...</span>
                            <span className="text-sm text-gray-500 block">{fileName}</span>
                          </div>
                        )}
                        
                        {uploadStatus === 'success' && (
                          <div className="text-center">
                            <svg className="w-16 h-16 mb-4 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-green-600 font-semibold text-lg block mb-1">Upload complete!</span>
                            <span className="text-sm text-gray-500 block">{fileName}</span>
                          </div>
                        )}
                        
                        {uploadStatus === 'error' && (
                          <div className="text-center">
                            <svg className="w-16 h-16 mb-4 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span className="text-red-600 font-semibold text-lg block mb-1">Processing failed</span>
                            <span className="text-sm text-gray-500 block">{fileName}</span>
                          </div>
                        )}
                      </div>
                      
                      <input 
                        id="file-upload" 
                        type="file" 
                        onChange={handleFileInput}
                        className="hidden" 
                        accept=".pdf,.docx,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Explanation Button - Only for upload */}
            <div className="mt-6">
              <button
                onClick={handleGenerateExplanation}
                disabled={!selectedFile || uploadStatus === 'processing'}
                className={`relative w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                  selectedFile && uploadStatus !== 'processing'
                    ? 'bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white hover:from-[#1976D2] hover:to-[#1565C0] hover:scale-105 hover:shadow-2xl shadow-lg border-2 border-transparent hover:border-white/20'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                } ${selectedFile && uploadStatus !== 'processing' ? 'active:scale-95' : ''}`}
                style={{ fontFamily: 'var(--font-text)' }}
              >
                <span className="flex items-center justify-center space-x-3">
                  <svg 
                    className="w-6 h-6" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                  <span>Generate Explanation</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer hideVideo={true} />

      {/* Processing Overlay - always show during processing, success, or error states */}
      {showOverlay && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center">
          {/* Backdrop - dark blurred overlay that covers everything including navbar */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md animate-blurIn"></div>
          
          {/* Popup Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 mx-4 transform transition-all duration-300 scale-100 animate-fadeIn border border-gray-100/50">
            <div className="flex flex-col items-center text-center">
              {uploadStatus === 'processing' && (
                <>
                  <div className="rounded-full bg-gradient-to-br from-blue-50 to-blue-100 p-7 mb-7 shadow-lg border border-blue-200/50">
                    <svg className="animate-spin w-20 h-20 text-[#2196F3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">Processing</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                    {overlayMessage || "Please wait while we analyze your content"}
                  </p>
                </>
              )}

              {uploadStatus === 'success' && (
                <>
                  <div className="rounded-full bg-gradient-to-br from-green-50 to-green-100 p-7 mb-7 shadow-lg border border-green-200/50">
                    <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">Success!</h3>
                  <p className="text-gray-600 mb-2 text-lg">
                    {overlayMessage || "Your content has been processed successfully"}
                  </p>
                  <div className="text-sm text-gray-500 mt-2">
                    Redirecting to results...
                  </div>
                  <button 
                    onClick={() => { window.location.href = '/explanation'; }}
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                    Go to Results
                  </button>
                </>
              )}

              {uploadStatus === 'error' && (
                <>
                  <div className="rounded-full bg-gradient-to-br from-red-50 to-red-100 p-7 mb-7 shadow-lg border border-red-200/50">
                    <svg className="w-20 h-20 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-3">Error</h3>
                  {overlayMessage.includes('FILE_TOO_LARGE') ? (
                    <>
                      <p className="text-gray-600 mb-4 text-lg">
                        This file is too large to analyze
                      </p>
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-3">
                        <p className="text-gray-600 mb-2 text-md">
                          <strong>Tip:</strong> Try taking screenshots of the important parts of your form and uploading those images instead.
                        </p>
                        <p className="text-gray-500 text-sm">
                          Screenshots are easier to process and will give you faster results.
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-2 text-lg">
                        {overlayMessage.replace('Error: ', '')}
                      </p>
                      <button 
                        onClick={() => { setShowOverlay(false); }}
                        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors">
                        Close
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Restriction Modal */}
      <RestrictionModal
        isOpen={restrictionModal.isOpen}
        onClose={() => setRestrictionModal({ ...restrictionModal, isOpen: false })}
        type={restrictionModal.type}
        title={restrictionModal.title}
        message={restrictionModal.message}
      />
    </>
  );
}
