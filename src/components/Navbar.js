import React from "react";
import BrandButton from "./BrandButton";
import "../app/globals.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <svg width="48" height="48" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(0,1024) scale(0.1,-0.1)" fill="var(--brand-blue)" stroke="none">
            <path d="M4629 8481 c-102 -33 -184 -103 -236 -204 -25 -48 -28 -63 -30 -177 c-3 -158 -7 -182 -40 -214 -39 -39 -107 -54 -328 -71 -331 -26 -511 -64 -694 -146 -35 -16 -74 -29 -86 -29 -34 0 -69 49 -89 121 -85 309 -199 482 -381 572 -122 60 -283 63 -401 8 -210 -98 -330 -285 -328 -511 1 -71 6 -111 23 -160 44 -127 149 -272 296 -407 l84 -77 -123 -126 c-322 -333 -621 -760 -836 -1195 -212 -429 -327 -813 -392 -1305 -19 -143 -15 -547 6 -700 54 -393 177 -735 373 -1034 392 -601 1003 -992 1726 -1108 194 -31 484 -30 661 1 404 71 724 233 1166 590 171 138 207 155 340 159 100 3 115 1 320 -52 378 -97 538 -119 855 -120 840 -1 1538 271 2057 800 373 381 560 830 560 1344 0 315 -70 602 -204 837 -237 415 -631 649 -1402 834 -116 28 -292 71 -392 95 -390 94 -693 218 -817 334 -78 73 -105 126 -117 229 -12 104 -22 142 -63 222 -115 227 -391 498 -665 653 -116 66 -231 113 -354 146 -47 12 -91 26 -98 30 -8 5 -1 23 23 62 71 111 95 204 77 305 -13 76 -29 111 -77 170 -48 60 -116 104 -192 125 -82 22 -150 22 -222 -1z"/>
          </g>
        </svg>
        <span className="navbar-title">Form Budd AI</span>
      </div>
      <div className="navbar-actions">
        <button className="login-btn">Login</button>
        <BrandButton style={{ minWidth: 80, fontSize: '0.95rem', padding: '0.5rem 1.2rem', margin: '0 0.5rem' }}>Register</BrandButton>
      </div>
    </nav>
  );
}
