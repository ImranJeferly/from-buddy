import React from "react";
import "../app/globals.css";

export default function BrandButton({ children, ...props }) {
  return (
    <button className="brand-btn" {...props}>
      {children}
    </button>
  );
}
