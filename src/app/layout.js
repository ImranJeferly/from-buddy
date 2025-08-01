import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  icons: {
    icon: '/ico.png',
    apple: '/ico.png',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://formbuddy.ai'),
  openGraph: {
    title: 'Form Buddy AI - Understand Forms Easily',
    description: 'FormBuddy AI helps you understand complex forms with clear explanations. Upload any form and let AI guide you through every field.',
    images: ['/ico.png'],
    url: 'https://formbuddy.ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Form Buddy AI - Understand Forms Easily',
    description: 'FormBuddy AI helps you understand complex forms with clear explanations. Upload any form and let AI guide you through every field.',
    images: ['/ico.png'],
    creator: '@jafarliimran1',
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
        </AuthProvider>
      </body>
    </html>
  );
}
