"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function FormHelpFrenchPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <section className="bg-gradient-to-b from-white to-blue-50 py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="flex justify-center mb-6">
              <Image
                src="/flags/fr.webp"
                alt="French flag"
                width={96}
                height={64}
                className="rounded-lg shadow-md"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
              Aide pour Remplir les Formulaires en Français
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Comprenez n'importe quel formulaire complexe avec des explications claires en français. Obtenez de l'aide pour l'immigration, les impôts, l'assurance maladie et plus encore.
            </p>
            <Link href="/upload">
              <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                Télécharger Mon Formulaire
              </button>
            </Link>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Assistance Spécialisée pour les Francophones</h2>
            <p className="text-lg text-gray-600 mb-8">
              Que ce soit pour les demandes d'immigration, les déclarations fiscales ou l'ouverture de comptes bancaires, nous expliquons chaque champ et ses exigences en français clair.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Formulaires d'Immigration</h3>
                <p className="text-gray-600">Visa, carte verte, naturalisation</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Documents Fiscaux</h3>
                <p className="text-gray-600">Déclarations d'impôts</p>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">Services Bancaires</h3>
                <p className="text-gray-600">Ouverture de comptes et prêts</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}