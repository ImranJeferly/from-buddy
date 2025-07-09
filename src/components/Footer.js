"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer({ hideVideo = false }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="footer-container relative">
      {/* Footer video - absolute positioned with right margin */}
      {!hideVideo && (
        <div className="hidden md:block absolute right-8 bottom-full z-10 rounded-lg overflow-hidden">
          <video 
            src="/footer.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="select-none pointer-events-none w-[350px]"
            style={{ 
              userSelect: 'none',
              objectFit: 'cover'
            }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}
      
      <footer className="text-white py-16 relative" style={{
        background: "linear-gradient(to bottom right, #2196F3, #1565C0)"
      }}>
        <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between mb-12 gap-10">
            {/* Logo and Description */}
            <div className="md:w-1/3">
                <div className="mb-6 flex items-center">
                <Image 
                    src="/logo-white.png" 
                    alt="Form Buddy Logo" 
                    width={50} 
                    height={50} 
                    className="select-none pointer-events-none image-protected"
                    style={{ 
                      height: 'auto',
                      userSelect: 'none'
                    }}
                    draggable={false}
                />
                <span className="ml-3 brand text-white text-2xl" style={{color: "white"}}>Form Buddy AI</span>
                </div>
                <p className="text-white/80 mb-6">
                FormBuddy AI helps you understand complex forms with clear explanations. Upload any form and let AI guide you through every field.
                </p>
                <div className="flex space-x-4">
                <a 
                    href="https://www.youtube.com/@imranjeferly" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                </a>
                <a 
                    href="https://x.com/jafarliimran1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                </a>
                </div>
            </div>

            {/* Navigation */}
            <div>
                <h3 className="font-brand text-white font-normal text-xl mb-6">Navigation</h3>
                <ul className="space-y-3">
                <li><button onClick={() => scrollToSection('top')} className="text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Home</button></li>
                <li><button onClick={() => scrollToSection('features')} className="text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer">Pricing</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="text-white/80 hover:text-white transition-colors bg-transparent border-0 cursor-pointer">FAQ</button></li>
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h3 className="font-brand text-white font-normal text-xl mb-6">Contact</h3>
                <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/80">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:imranjeferly@gmail.com" className="hover:text-white transition-colors">
                    imranjeferly@gmail.com
                    </a>
                </li>
                </ul>
            </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-white/20 text-center md:text-left text-sm text-white/80">
            <p>© {new Date().getFullYear()} Form Buddy AI. All rights reserved.</p>
            </div>
        </div>
        </footer>
    </div>
    );
};
