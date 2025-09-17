export const metadata = {
  title: "Legal Forms AI Assistant - Contract & Court Document Help | Form Buddy AI",
  description: "Get expert AI explanations for legal documents, contracts, court forms, and legal paperwork. Understand complex legal terminology, clauses, and requirements in plain English. Secure and confidential analysis.",
  keywords: "legal forms AI, legal documents, contract analysis, court forms, legal paperwork, legal terminology, AI legal assistant, legal document help, contract explanation, legal advice",
  alternates: {
    canonical: 'https://formbuddyai.com/legal-forms',
  },
  openGraph: {
    title: 'Legal Forms AI Assistant - Contract & Court Document Help',
    description: 'Get expert AI explanations for legal documents, contracts, court forms, and legal paperwork. Understand complex legal terminology in plain English.',
    url: 'https://formbuddyai.com/legal-forms',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Legal Forms Assistant',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Forms AI Assistant - Contract & Court Document Help',
    description: 'Get expert AI explanations for legal documents, contracts, court forms, and legal paperwork. Understand complex legal terminology in plain English.',
    images: ['/ico.png'],
  },
};

"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function LegalFormsPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
                  Legal Forms Made Understandable
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Navigate complex legal documents with confidence. Get clear explanations of legal terminology, requirements, and procedures in plain English.
                </p>
                <Link href="/upload">
                  <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Upload Your Legal Form
                  </button>
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <Image
                  src="/section_4.png"
                  alt="Legal Forms illustration"
                  width={500}
                  height={400}
                  className="select-none pointer-events-none image-protected"
                  style={{ 
                    width: '80%', 
                    height: 'auto', 
                    borderRadius: '1rem', 
                    objectFit: 'contain',
                    userSelect: 'none'
                  }}
                  draggable={false}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            </div>
          </div>
        </section>

        {/* Common Legal Forms */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Legal Documents We Help Explain
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  form: "Contracts",
                  title: "Service & Employment Contracts",
                  description: "Understand terms, conditions, and obligations in legal agreements"
                },
                {
                  form: "Court Forms",
                  title: "Civil & Family Court Documents",
                  description: "Navigate divorce, custody, and small claims court paperwork"
                },
                {
                  form: "Power of Attorney",
                  title: "Legal Authorization Forms",
                  description: "Understand authority delegation and legal representation documents"
                },
                {
                  form: "Wills & Estates",
                  title: "Estate Planning Documents",
                  description: "Comprehend inheritance, probate, and estate administration forms"
                },
                {
                  form: "Property Forms",
                  title: "Real Estate & Rental Documents",
                  description: "Understand lease agreements, purchase contracts, and property deeds"
                },
                {
                  form: "Legal Notices",
                  title: "Official Legal Communications",
                  description: "Decode summons, subpoenas, and official legal correspondence"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-[#2196F3] font-bold text-lg mb-2">{item.form}</div>
                  <h3 className="font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              How Form Buddy Helps with Legal Documents
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Upload Legal Document</h3>
                <p className="text-gray-600">Securely upload contracts, court forms, or legal notices</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Legal Analysis</h3>
                <p className="text-gray-600">Get plain English explanations of legal terms and clauses</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Informed Decisions</h3>
                <p className="text-gray-600">Make confident legal decisions with clear understanding</p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Form Features */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Choose Form Buddy for Legal Documents?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Legal Terminology Simplified</h3>
                  <p className="text-gray-600">Complex legal jargon translated into everyday language you can understand</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Confidential & Secure</h3>
                  <p className="text-gray-600">Your sensitive legal documents are encrypted and automatically deleted</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Risk Identification</h3>
                  <p className="text-gray-600">Highlights important clauses, deadlines, and potential concerns</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Jurisdiction Aware</h3>
                  <p className="text-gray-600">Understands different legal systems and regional requirements</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Disclaimer */}
        <section className="py-12 bg-yellow-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Important Legal Notice</h3>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Form Buddy provides explanations for informational purposes only and does not constitute legal advice.</strong>
              </p>
              <ul className="text-gray-600 space-y-2 mb-4">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Always consult with a qualified attorney for legal advice specific to your situation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Legal requirements vary by jurisdiction and change over time</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Form Buddy does not create attorney-client relationships</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>For complex legal matters, professional legal counsel is recommended</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Understand Your Legal Documents?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get clear explanations of complex legal language and requirements
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Analyze Legal Document
                </button>
              </Link>
              <Link href="/#pricing">
                <button className="border-2 border-[#2196F3] text-[#2196F3] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#2196F3] hover:text-white transition-all duration-300">
                  View Pricing
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}