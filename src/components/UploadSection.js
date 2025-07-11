"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UploadSection() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  // Function to navigate to the upload page
  const navigateToUploadPage = () => {
    router.push('/upload');
  };
  return (
    <section id="upload" className="upload-section py-24 bg-gradient-to-b from-white to-blue-50 relative">
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
        <div className="mb-8 text-center">
          <h2 className="home-h2 mb-6 text-center !font-poppins font-bold">
            Upload Your Form
          </h2>
        </div>
        
        {/* Upload Area - Now a Redirect Button */}
        <div 
          onClick={navigateToUploadPage}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full cursor-pointer flex flex-col items-center justify-center border-4 border-dashed rounded-2xl py-16 px-4 transition-all duration-500 mb-6 relative overflow-hidden ${
            isHovered
              ? 'border-blue-300 bg-blue-50 scale-[1.02]'
              : 'border-blue-200 bg-white hover:bg-blue-50'
          }`}
        >
          <div className="relative z-10">
            <div className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
              <svg 
                width="64" 
                height="64" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className={`text-[#2196F3] mb-6 mx-auto transition-all ${
                  isHovered ? 'animate-bounce-gentle' : ''
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
                <span className={`text-[#2196F3] font-semibold text-xl mb-2 block transition-all duration-300`}>
                  Click to upload your form
                </span>
                <span className="text-gray-500 text-sm block mt-2">
                  Supports PDF, DOCX, JPG, and PNG formats
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
