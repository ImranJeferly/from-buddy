import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Form Buddy AI - Understand Forms Easily",
  description: "FormBuddy AI helps you understand complex forms with clear explanations. Upload any form and let AI guide you through every field.",
  keywords: "form buddy, AI form assistant, document analysis, form explanation, PDF reader, form help, document understanding, AI assistant",
  authors: [{ name: "Form Buddy AI" }],
  creator: "Form Buddy AI",
  publisher: "Form Buddy AI",
  icons: {
    icon: '/ico.png',
    apple: '/ico.png',
    shortcut: '/ico.png',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://formbuddyai.com'),
  alternates: {
    canonical: 'https://formbuddyai.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Form Buddy AI - Understand Forms Easily',
    description: 'FormBuddy AI helps you understand complex forms with clear explanations. Upload any form and let AI guide you through every field.',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI Logo',
      }
    ],
    url: 'https://formbuddyai.com',
    siteName: 'Form Buddy AI',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form Buddy AI - Understand Forms Easily',
    description: 'FormBuddy AI helps you understand complex forms with clear explanations. Upload any form and let AI guide you through every field.',
    images: ['/ico.png'],
    creator: '@jafarliimran1',
    site: '@jafarliimran1',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

import { AuthProvider } from "@/lib/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Coiny&family=DynaPuff:wght@400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/ico.png" sizes="any" />
        <link rel="apple-touch-icon" href="/ico.png" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Form Buddy AI",
              "url": "https://formbuddyai.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://formbuddyai.com/ico.png",
                "width": 512,
                "height": 512
              },
              "description": "FormBuddy AI helps you understand complex forms with clear explanations. Upload any form and let AI guide you through every field.",
              "sameAs": [
                "https://twitter.com/jafarliimran1"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "support@formbuddy.ai"
              }
            })
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Add global event listener to prevent context menu on images and videos
              document.addEventListener('contextmenu', function(e) {
                if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.tagName === 'SVG') {
                  e.preventDefault();
                }
              });
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
