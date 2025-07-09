"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

export default function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef(null);
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files[0]);
    }
  };

  const handleFiles = (file) => {
    // Show file name
    setFileName(file.name);
    
    // Simulate upload progress
    setUploadStatus('uploading');
    
    setTimeout(() => {
      setUploadStatus('success');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFileName(null);
        setUploadStatus(null);
      }, 3000);
    }, 2000);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files[0]);
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // useEffect removed since we no longer need initial animations
  
  return (
    <section className="upload-section py-24 bg-gradient-to-b from-white to-blue-50 relative">
      {/* Left Image - Absolutely positioned */}
      <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10" style={{ left: '5%' }}>
        <Image
          src="/upload1.png"
          alt="Upload illustration 1"
          width={300}
          height={400}
          className="select-none pointer-events-none image-protected"
          style={{ 
            height: 'auto', 
            borderRadius: '1rem', 
            objectFit: 'contain',
            userSelect: 'none'
          }}
          draggable={false}
        />
      </div>
      
      {/* Right Image - Absolutely positioned */}
      <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10" style={{ right: '5%' }}>
        <Image
          src="/upload2.png"
          alt="Upload illustration 2"
          width={300}
          height={400}
          className="select-none pointer-events-none image-protected" 
          style={{ 
            height: 'auto', 
            borderRadius: '1rem', 
            objectFit: 'contain',
            userSelect: 'none'
          }}
          draggable={false}
        />
      </div>
      
      <div className="max-w-3xl mx-auto px-6 relative z-20">
        <div className="mb-12 text-center">
          <h2 className="home-h2 mb-6 text-center !font-poppins font-bold">
            Upload Your Form
          </h2>
        </div>
        
        {/* Upload Area - Center */}
        <div className={`w-full relative transition-all duration-300 ${uploadStatus === 'success' ? 'scale-105' : ''}`}>
            <div 
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`w-full cursor-pointer flex flex-col items-center justify-center border-4 border-dashed rounded-2xl py-16 px-4 transition-all duration-500 mb-6 relative overflow-hidden ${
                isDragging 
                  ? 'border-[#2196F3] bg-blue-100 scale-[1.02]' 
                  : uploadStatus === 'uploading'
                  ? 'border-yellow-300 bg-blue-50'
                  : uploadStatus === 'success'
                  ? 'border-green-400 bg-green-50'
                  : isHovered
                  ? 'border-blue-300 bg-blue-50'
                  : 'border-blue-200 bg-white hover:bg-blue-50'
              }`}
          >
            {/* Upload area - background circles removed */}
            
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
                      isDragging || isHovered ? 'animate-bounce-gentle' : ''
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
                  </div>
                </div>
              )}
              
              {uploadStatus === 'uploading' && (
                <div className="text-center">
                  <svg className="animate-spin w-16 h-16 mb-4 mx-auto text-[#2196F3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-[#2196F3] font-semibold text-lg block mb-1">Uploading file...</span>
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
            </div>
            
            <input 
              id="file-upload" 
              ref={fileInputRef}
              type="file" 
              onChange={handleFileInput}
              className="hidden" 
              accept=".pdf,.docx,.jpg,.jpeg,.png"
            />
          </div>
          
          <div className="text-center px-2">
            <span className="text-xs text-gray-400">Max file size: 10MB</span>
          </div>
        </div>
      </div>
    </section>
  );
}
