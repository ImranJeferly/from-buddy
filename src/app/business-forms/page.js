export const metadata = {
  title: "Business Forms AI Assistant - Tax, Registration & Corporate Documents | Form Buddy AI",
  description: "Expert AI help for business forms, tax returns, corporate registration, employment paperwork, and business contracts. Understand complex business regulations and compliance requirements with confidence.",
  keywords: "business forms AI, corporate documents, business tax forms, business registration, employment forms, business contracts, business AI assistant, corporate paperwork, business compliance",
  alternates: {
    canonical: 'https://formbuddyai.com/business-forms',
  },
  openGraph: {
    title: 'Business Forms AI Assistant - Tax, Registration & Corporate Documents',
    description: 'Expert AI help for business forms, tax returns, corporate registration, employment paperwork, and business contracts. Understand complex business regulations with confidence.',
    url: 'https://formbuddyai.com/business-forms',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Business Forms Assistant',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Forms AI Assistant - Tax, Registration & Corporate Documents',
    description: 'Expert AI help for business forms, tax returns, corporate registration, employment paperwork, and business contracts.',
    images: ['/ico.png'],
  },
};

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function BusinessFormsPage() {
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
                  Business Forms Made Simple
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Navigate complex business paperwork with confidence. From tax forms to contracts, get clear explanations of every requirement and regulation.
                </p>
                <Link href="/upload">
                  <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Upload Your Business Form
                  </button>
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <Image
                  src="/section_6.png"
                  alt="Business Forms illustration"
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

        {/* Common Business Forms */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Business Forms We Help With
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  form: "Tax Returns",
                  title: "Business Tax Forms (1120, 1065, Schedule C)",
                  description: "Complete corporate, partnership, and sole proprietorship tax returns"
                },
                {
                  form: "Business Registration",
                  title: "LLC, Corporation & Partnership Forms",
                  description: "Register your business entity with state and federal agencies"
                },
                {
                  form: "Employment Forms",
                  title: "HR & Payroll Documentation",
                  description: "Handle W-4s, I-9s, employment contracts, and payroll forms"
                },
                {
                  form: "Permits & Licenses",
                  title: "Business Licensing Applications",
                  description: "Obtain required permits and professional licenses for your industry"
                },
                {
                  form: "Contracts",
                  title: "Service & Vendor Agreements",
                  description: "Understand client contracts, vendor agreements, and service terms"
                },
                {
                  form: "Financial Reports",
                  title: "Bank & Loan Applications",
                  description: "Complete business loan applications and financial documentation"
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
              How Form Buddy Helps with Business Forms
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Upload Business Document</h3>
                <p className="text-gray-600">Upload tax forms, contracts, or business registration documents</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Get Business Analysis</h3>
                <p className="text-gray-600">Understand regulations, compliance requirements, and tax implications</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Grow Your Business</h3>
                <p className="text-gray-600">Complete forms correctly to avoid delays and compliance issues</p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Form Features */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Choose Form Buddy for Business Forms?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tax Compliance</h3>
                  <p className="text-gray-600">Understand tax obligations, deductions, and filing requirements for your business type</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Regulatory Guidance</h3>
                  <p className="text-gray-600">Navigate industry regulations, licensing requirements, and compliance standards</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Confidential Processing</h3>
                  <p className="text-gray-600">Your sensitive business information is encrypted and automatically deleted</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Fast Turnaround</h3>
                  <p className="text-gray-600">Quick analysis to meet business deadlines and filing requirements</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Success Tips */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Business Form Success Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Keep Detailed Records</h3>
                <p className="text-gray-600">Maintain organized financial records and documentation for accurate form completion.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 12a5 5 0 01-5-5v-2a5 5 0 015-5h10a5 5 0 015 5v2a5 5 0 01-5 5H12z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Understand Deadlines</h3>
                <p className="text-gray-600">Track tax filing dates, license renewals, and compliance reporting deadlines.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Consult Professionals</h3>
                <p className="text-gray-600">Work with accountants and lawyers for complex business and tax matters.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Review Before Submitting</h3>
                <p className="text-gray-600">Double-check all information to avoid costly errors and processing delays.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Disclaimer */}
        <section className="py-12 bg-yellow-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Business Advisory Notice</h3>
              </div>
              <p className="text-gray-700 mb-4">
                <strong>Form Buddy provides general information and is not a substitute for professional business, legal, or tax advice.</strong>
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Consult qualified accountants, attorneys, or business advisors for specific guidance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Business regulations and tax laws vary by location and change frequently</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>Always verify current requirements with appropriate government agencies</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Streamline Your Business Forms?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Save time and reduce errors with clear explanations of complex business paperwork
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Upload Business Form
                </button>
              </Link>
              <Link href="/#pricing">
                <button className="border-2 border-[#2196F3] text-[#2196F3] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#2196F3] hover:text-white transition-all duration-300">
                  View Plans
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