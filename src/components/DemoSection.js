import React from "react";

export default function DemoSection() {
  return (
    <section className="demo-section bg-white">
      <h2 className="home-h2 !font-poppins font-bold">
        <span className="brand">Form Buddy AI</span> makes complex forms simple
      </h2>
      <div className="demo-video-container demo-video-bottom-border" style={{ position: 'relative' }}>
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/J54FyoAW4TQ"
          title="Form Buddy AI Demo"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '2rem'
          }}
        ></iframe>
      </div>
    </section>
  );
}
