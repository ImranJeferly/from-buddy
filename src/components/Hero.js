import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-section flex items-center justify-center w-full px-2.5 gap-10" style={{ minHeight: 'calc(100vh - 80px)', height: 'calc(100dvh - 80px)', backgroundColor: '#FDFDFC' }}>
      <div className="hero-content flex flex-col items-start justify-center min-w-[260px] text-left flex-1">
        <h1 className="hero-title text-brand-blue text-5xl font-extrabold mb-5 leading-tight font-poppins">Upload Any Form.<br />Let AI Explain It.</h1>
        <p className="hero-desc font-text text-[#222] text-lg mb-8 max-w-xl">
          Struggling to understand complex forms? <span className="brand">Form Buddy AI</span> analyzes your uploaded forms and provides clear, step-by-step explanations for every input field. No more confusion—just clarity!
        </p>
        <button className="brand-btn hero-btn max-w-xs text-base py-3">Try It Now</button>
      </div>
      <div className="hero-image flex items-center justify-center select-none">
        <video
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full pointer-events-none select-none video-protected"
          style={{ userSelect: 'none' }}
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noremoteplayback nofullscreen"
          draggable={false}
          tabIndex={-1}
          aria-label="Form Buddy Hero Animation"
        />
      </div>
    </section>
  );
}
