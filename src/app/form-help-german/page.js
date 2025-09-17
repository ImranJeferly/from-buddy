export const metadata = {
  title: "Hilfe beim Ausfüllen von Formularen auf Deutsch - Einwanderung, Steuern | Form Buddy AI",
  description: "Verstehen Sie jedes komplexe Formular mit klaren Erklärungen auf Deutsch. Hilfe bei Einwanderung, Steuern, Krankenversicherung und mehr mit deutscher Sprachausgabe.",
  keywords: "deutsche Formularhilfe, Einwanderung deutsch, Steuern deutsch, Formular Hilfe deutsch, deutsche Erklärungen, form buddy deutsch, deutsche Sprachunterstützung",
  alternates: {
    canonical: 'https://formbuddyai.com/form-help-german',
  },
  openGraph: {
    title: 'Hilfe beim Ausfüllen von Formularen auf Deutsch - Einwanderung, Steuern',
    description: 'Verstehen Sie jedes komplexe Formular mit klaren Erklärungen auf Deutsch. Hilfe bei Einwanderung, Steuern, Krankenversicherung und mehr.',
    url: 'https://formbuddyai.com/form-help-german',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Deutsche Hilfe',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hilfe beim Ausfüllen von Formularen auf Deutsch',
    description: 'Verstehen Sie jedes komplexe Formular mit klaren Erklärungen auf Deutsch. Deutsche Sprachausgabe.',
    images: ['/ico.png'],
  },
};

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function FormHelpGermanPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <section className="bg-gradient-to-b from-white to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/flags/de.webp"
                alt="German flag"
                width={96}
                height={64}
                className="rounded-lg shadow-md"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
              Hilfe beim Ausfüllen von Formularen auf Deutsch
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Verstehen Sie jedes komplexe Formular mit klaren Erklärungen auf Deutsch. Erhalten Sie Hilfe bei Einwanderung, Steuern, Krankenversicherung und mehr.
            </p>
            <Link href="/upload">
              <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                Mein Formular Hochladen
              </button>
            </Link>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Spezialisierte Hilfe für Deutschsprachige</h2>
            <p className="text-lg text-gray-600 mb-8">
              Ob Einwanderungsanträge, Steuererklärungen oder Bankkontoeröffnungen - wir erklären Ihnen jedes Feld und seine Anforderungen auf klarem Deutsch.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Einwanderungsformulare</h3>
                <p className="text-gray-600">Visa, Green Card, Einbürgerung</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Steuerdokumente</h3>
                <p className="text-gray-600">Steuererklärungen und ITIN</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Bankdienstleistungen</h3>
                <p className="text-gray-600">Kontoeröffnung und Kredite</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}