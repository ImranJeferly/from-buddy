"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { SparklesIcon, CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { SparklesIcon as SparklesOutlineIcon } from '@heroicons/react/24/outline';
import BrandButton from "./BrandButton";
import "../app/globals.css";
import { useAuth } from "@/lib/AuthContext";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Navbar({ showUpgradeButton = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFeatureDropdownOpen, setIsFeatureDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Initial scroll position check
    setIsScrolled(window.scrollY > 20);
    
    const handleScroll = () => {
      // Only update state if needed to prevent unnecessary re-renders
      const shouldBeScrolled = window.scrollY > 20;
      if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  // Fetch user data when currentUser changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserData(userSnap.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [currentUser]);

  const scrollToSection = (sectionId) => {
    // Check if we're on the home page
    if (window.location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        setIsMobileMenuOpen(false);
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // If we're on a different page, navigate to home page with the section hash
      setIsMobileMenuOpen(false);
      router.push(`/#${sectionId}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className={`navbar-container ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar">
        <Link href="/" className="navbar-logo">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 1024 1024" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="navbar-logo-icon"
          >
            <g transform="translate(0,1024) scale(0.1,-0.1)" fill="var(--brand-blue)" stroke="none">
              <path d="M4629 8481 c-102 -33 -184 -103 -236 -204 -25 -48 -28 -63 -30 -177 c-3 -158 -7 -182 -40 -214 -39 -39 -107 -54 -328 -71 -331 -26 -511 -64 -694 -146 -35 -16 -74 -29 -86 -29 -34 0 -69 49 -89 121 -85 309 -199 482 -381 572 -122 60 -283 63 -401 8 -210 -98 -330 -285 -328 -511 1 -71 6 -111 23 -160 44 -127 149 -272 296 -407 l84 -77 -123 -126 c-322 -333 -621 -760 -836 -1195 -212 -429 -327 -813 -392 -1305 -19 -143 -15 -547 6 -700 54 -393 177 -735 373 -1034 392 -601 1003 -992 1726 -1108 194 -31 484 -30 661 1 404 71 724 233 1166 590 171 138 207 155 340 159 100 3 115 1 320 -52 378 -97 538 -119 855 -120 840 -1 1538 271 2057 800 373 381 560 830 560 1344 0 315 -70 602 -204 837 -237 415 -631 649 -1402 834 -116 28 -292 71 -392 95 -390 94 -693 218 -817 334 -78 73 -105 126 -117 229 -12 104 -22 142 -63 222 -115 227 -391 498 -665 653 -116 66 -231 113 -354 146 -47 12 -91 26 -98 30 -8 5 -1 23 23 62 71 111 95 204 77 305 -13 76 -29 111 -77 170 -48 60 -116 104 -192 125 -82 22 -150 22 -222 -1z"/>
            </g>
          </svg>
          <span className="navbar-title">Form Buddy AI</span>
        </Link>
        
        {/* Desktop Menu - hidden on mobile */}
        <div className="navbar-menu desktop-menu">
          <div className="relative">
            <button 
              onClick={() => setIsFeatureDropdownOpen(!isFeatureDropdownOpen)}
              onMouseEnter={() => setIsFeatureDropdownOpen(true)}
              className="navbar-menu-item flex items-center gap-1"
            >
              Features
              <svg 
                className={`w-4 h-4 transition-transform ${isFeatureDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {isFeatureDropdownOpen && (
              <div 
                className="absolute top-full left-0 mt-2 py-3 w-72 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
                onMouseLeave={() => setIsFeatureDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm">Form Types</h3>
                </div>
                <Link href="/immigration-forms" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  Immigration Forms
                </Link>
                <Link href="/medical-forms" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  Medical Forms
                </Link>
                <Link href="/legal-forms" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  Legal Forms
                </Link>
                <Link href="/school-scholarship-forms" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  School & Scholarship Forms
                </Link>
                <Link href="/business-forms" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  Business Forms
                </Link>
                
                <div className="px-4 py-2 border-b border-t border-gray-100 mt-2">
                  <h3 className="font-bold text-gray-900 text-sm">Language Support</h3>
                </div>
                <Link href="/form-explanation-in-your-language" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  50+ Languages Available
                </Link>
                <Link href="/form-help-spanish" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/flags/es.webp"
                      alt="Spanish flag"
                      width={20}
                      height={14}
                      className="rounded-sm object-cover"
                    />
                    <span>Spanish / Español</span>
                  </div>
                </Link>
                <Link href="/form-help-chinese" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/flags/cn.webp"
                      alt="Chinese flag"
                      width={20}
                      height={14}
                      className="rounded-sm object-cover"
                    />
                    <span>Chinese / 中文</span>
                  </div>
                </Link>
                <Link href="/form-help-arabic" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/flags/sa.webp"
                      alt="Arabic flag"
                      width={20}
                      height={14}
                      className="rounded-sm object-cover"
                    />
                    <span>Arabic / العربية</span>
                  </div>
                </Link>
                <Link href="/form-help-french" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/flags/fr.webp"
                      alt="French flag"
                      width={20}
                      height={14}
                      className="rounded-sm object-cover"
                    />
                    <span>French / Français</span>
                  </div>
                </Link>
                <Link href="/form-help-german" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-[#2196F3] text-sm">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/flags/de.webp"
                      alt="German flag"
                      width={20}
                      height={14}
                      className="rounded-sm object-cover"
                    />
                    <span>German / Deutsch</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => scrollToSection("upload")}
            className="navbar-menu-item"
          >
            Upload
          </button>
          <button 
            onClick={() => scrollToSection("pricing")}
            className="navbar-menu-item"
          >
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection("faq")}
            className="navbar-menu-item"
          >
            FAQ
          </button>
        </div>

        {/* Desktop Actions - hidden on mobile */}
        <div className="navbar-actions desktop-only">
          {currentUser ? (
            <div className="flex items-center">
              <div className="relative">
                <button 
                  className="login-btn hover-effect flex items-center gap-2" 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span>{currentUser.displayName || currentUser.email.split('@')[0]}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-xl shadow-lg z-50">
                    {userData && (
                      <>
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm text-gray-600">Plan</p>
                          <p className="font-medium text-brand-blue capitalize">{userData.planType || 'Free'}</p>
                        </div>
                      </>
                    )}
                    <Link href="/upload" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-brand-blue">
                      Upload
                    </Link>
                    <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-brand-blue">
                      Profile
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              
              {/* Upload/Upgrade Icon Button - desktop only */}
              {showUpgradeButton && userData?.planType !== 'pro' ? (
                <Link href="/#pricing" className="ml-3">
                  <button 
                    className="flex items-center justify-center px-4 py-2 text-white rounded-full transition-all gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #FFA500, #FF8C00)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #FFD700, #FFA500)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <span>Upgrade</span>
                    <SparklesIcon className="h-4 w-4" />
                  </button>
                </Link>
              ) : (
                <Link href="/upload" className="ml-3">
                  <button 
                    className="flex items-center justify-center px-4 py-2 text-white rounded-full transition-all gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #64B5F6, #2196F3)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #64B5F6, #2196F3)';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <span>Upload</span>
                    <CloudArrowUpIcon className="h-4 w-4" />
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="login-btn hover-effect" style={{ minWidth: 100 }}>
                Login
              </Link>
              <Link href="/register">
                <BrandButton 
                  style={{ 
                    minWidth: 100, 
                    fontSize: '0.95rem', 
                    padding: '0.5rem 1.2rem', 
                    margin: '0 0.5rem' 
                  }}
                >
                  Register
                </BrandButton>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions - Only visible on mobile */}
        <div className="mobile-navbar-actions">
          {currentUser ? (
            showUpgradeButton && userData?.planType !== 'pro' ? (
              <Link href="/#pricing">
                <button 
                  className="mobile-navbar-btn-with-text"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    boxShadow: '0 2px 8px rgba(255, 215, 0, 0.3)',
                  }}
                >
                  <SparklesIcon className="h-4 w-4" />
                  <span>Upgrade</span>
                </button>
              </Link>
            ) : (
              <Link href="/upload">
                <button 
                  className="mobile-navbar-btn-with-text"
                  style={{
                    background: 'linear-gradient(135deg, #64B5F6, #2196F3)',
                    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                  }}
                >
                  <CloudArrowUpIcon className="h-4 w-4" />
                  <span>Upload</span>
                </button>
              </Link>
            )
          ) : (
            <Link href="/register">
              <button 
                className="mobile-navbar-btn-with-text"
                style={{
                  background: 'linear-gradient(135deg, #64B5F6, #2196F3)',
                  boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Register</span>
              </button>
            </Link>
          )}
          
          {/* Mobile Menu Button - Always visible */}
          <button 
            className={`mobile-menu-button ${isMobileMenuOpen ? "active" : ""}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className={`hamburger ${isMobileMenuOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-section">
          <h3 className="mobile-menu-section-title">Navigation</h3>
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 px-4">Form Types</h4>
            <Link href="/immigration-forms" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Immigration Forms
            </Link>
            <Link href="/medical-forms" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Medical Forms
            </Link>
            <Link href="/legal-forms" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
              Legal Forms
            </Link>
            <Link href="/school-scholarship-forms" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              School & Scholarships
            </Link>
            <Link href="/business-forms" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Business Forms
            </Link>
          </div>
          
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2 px-4">Languages</h4>
            <Link href="/form-explanation-in-your-language" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12l2 7-2 7H3V5zm0 0l7 7-7 7" />
              </svg>
              50+ Languages
            </Link>
            <Link href="/form-help-spanish" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-2">
                <Image
                  src="/flags/es.webp"
                  alt="Spanish flag"
                  width={20}
                  height={14}
                  className="rounded-sm object-cover"
                />
                <span>Spanish</span>
              </div>
            </Link>
            <Link href="/form-help-chinese" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="flex items-center space-x-2">
                <Image
                  src="/flags/cn.webp"
                  alt="Chinese flag"
                  width={20}
                  height={14}
                  className="rounded-sm object-cover"
                />
                <span>Chinese</span>
              </div>
            </Link>
          </div>
          <button 
            onClick={() => scrollToSection("upload")}
            className="mobile-menu-item"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload
          </button>
          <button 
            onClick={() => scrollToSection("pricing")}
            className="mobile-menu-item"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pricing
          </button>
          <button 
            onClick={() => scrollToSection("faq")}
            className="mobile-menu-item"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            FAQ
          </button>
        </div>
        
        <div className="mobile-actions">
          {currentUser ? (
              <>
                <div className="mobile-user-info">
                  <div className="user-avatar">
                    {currentUser.photoURL ? (
                      <img 
                        src={currentUser.photoURL}
                        alt="User Avatar"
                        className="avatar-image"
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        {(currentUser.displayName || currentUser.email.split('@')[0]).charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="user-details">
                    <p className="font-medium text-gray-800">
                      {currentUser.displayName || currentUser.email.split('@')[0]}
                    </p>
                    {userData && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-brand-blue capitalize">{userData.planType || 'Free'}</span> plan
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mobile-menu-section">
                  <h3 className="mobile-menu-section-title">Account</h3>
                  <Link href="/upload" className="mobile-menu-item">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Forms
                  </Link>
                  <Link href="/profile" className="mobile-menu-item">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>
                </div>
                
                {showUpgradeButton && userData?.planType !== 'pro' ? (
                  <Link href="/#pricing" className="w-full mb-4">
                    <button 
                      className="w-full flex items-center justify-center py-3 px-4 text-white rounded-full transition-all gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                        fontSize: '14px',
                        fontWeight: '600',
                        margin: "0.5rem 0"
                      }}
                    >
                      <SparklesIcon className="h-4 w-4" />
                      <span>Upgrade Plan</span>
                    </button>
                  </Link>
                ) : (
                  <Link href="/upload" className="w-full mb-4">
                    <button 
                      className="w-full flex items-center justify-center py-3 px-4 text-white rounded-full transition-all gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #64B5F6, #2196F3)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                        fontSize: '14px',
                        fontWeight: '600',
                        margin: "0.5rem 0"
                      }}
                    >
                      <CloudArrowUpIcon className="h-4 w-4" />
                      <span>Upload Form</span>
                    </button>
                  </Link>
                )}
                
                <div className="border-t border-gray-200 pt-3 mt-2">
                  <button 
                    className="w-full flex items-center justify-center py-3 px-4 text-red-600 rounded-full transition-all gap-2"
                    style={{
                      background: 'white',
                      border: '2px solid #dc2626',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(220, 38, 38, 0.2)',
                      fontSize: '14px',
                      fontWeight: '600',
                      margin: "0.5rem 0"
                    }}
                    onClick={handleLogout}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#fef2f2';
                      e.target.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'white';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign Out</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mobile-menu-section">
                  <h3 className="mobile-menu-section-title">Account</h3>
                  <Link href="/login" className="w-full mb-2">
                    <button 
                      className="w-full flex items-center justify-center py-3 px-4 text-brand-blue rounded-full transition-all gap-2"
                      style={{
                        background: 'white',
                        border: '2px solid var(--brand-blue)',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(33, 150, 243, 0.2)',
                        fontSize: '14px',
                        fontWeight: '600',
                        margin: "0.5rem 0"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#f0f8ff';
                        e.target.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'white';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Login</span>
                    </button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <button 
                      className="w-full flex items-center justify-center py-3 px-4 text-white rounded-full transition-all gap-2"
                      style={{
                        background: 'linear-gradient(135deg, #64B5F6, #2196F3)',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                        fontSize: '14px',
                        fontWeight: '600',
                        margin: "0.5rem 0"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
                        e.target.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #64B5F6, #2196F3)';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Register</span>
                    </button>
                  </Link>
                </div>
              </>
            )}
        </div>
      </div>
    </nav>
  );
}
