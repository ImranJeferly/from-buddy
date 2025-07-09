import React from "react";
import { useState } from "react";

export default function PlayfulButton({ children, gradient = "default", ...props }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const gradients = {
    default: "linear-gradient(135deg, #2196F3 0%, #00BCD4 50%, #1E88E5 100%)",
    pro: "linear-gradient(135deg, #0D47A1 0%, #7E57C2 50%, #5E35B1 100%)",
    basic: "linear-gradient(135deg, #2196F3 0%, #00BCD4 50%, #4FC3F7 100%)",
  };

  const hoverGradients = {
    default: "linear-gradient(135deg, #1E88E5 0%, #00ACC1 50%, #1976D2 100%)",
    pro: "linear-gradient(135deg, #0D47A1 0%, #7E57C2 50%, #512DA8 100%)",
    basic: "linear-gradient(135deg, #1976D2 0%, #00ACC1 50%, #29B6F6 100%)",
  };

  const shadows = {
    default: "0 10px 20px -5px rgba(33, 150, 243, 0.4), 0 4px 10px -5px rgba(0, 0, 0, 0.1)",
    pro: "0 10px 20px -5px rgba(13, 71, 161, 0.5), 0 4px 10px -5px rgba(0, 0, 0, 0.1)",
    basic: "0 10px 20px -5px rgba(33, 150, 243, 0.4), 0 4px 10px -5px rgba(0, 0, 0, 0.1)"
  };

  const hoverShadows = {
    default: "0 15px 25px -5px rgba(33, 150, 243, 0.6), 0 5px 15px -5px rgba(0, 0, 0, 0.15)",
    pro: "0 15px 25px -5px rgba(13, 71, 161, 0.7), 0 5px 15px -5px rgba(0, 0, 0, 0.15)",
    basic: "0 15px 25px -5px rgba(33, 150, 243, 0.6), 0 5px 15px -5px rgba(0, 0, 0, 0.15)"
  };

  return (
    <button
      className="playful-btn relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? hoverGradients[gradient] : gradients[gradient],
        boxShadow: isHovered ? hoverShadows[gradient] : shadows[gradient],
        transform: isHovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
        borderTop: "1px solid rgba(255, 255, 255, 0.3)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
        borderRight: "1px solid rgba(0, 0, 0, 0.05)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        borderRadius: "3rem",
        fontWeight: 700,
        color: "white"
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
          opacity: isHovered ? 0.8 : 0,
          transition: "opacity 0.5s ease",
          borderRadius: "3rem"
        }}
      />
    </button>
  );
}
