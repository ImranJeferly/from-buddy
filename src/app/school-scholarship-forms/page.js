export const metadata = {
  title: "School & Scholarship Forms AI Help - FAFSA, College Applications | Form Buddy AI",
  description: "Get AI assistance with FAFSA, college applications, scholarship forms, and education paperwork. Understand requirements, deadlines, and maximize your chances of acceptance and financial aid.",
  keywords: "FAFSA help, college application forms, scholarship applications, education forms AI, student aid forms, university applications, financial aid assistance, college paperwork help",
  alternates: {
    canonical: 'https://formbuddyai.com/school-scholarship-forms',
  },
  openGraph: {
    title: 'School & Scholarship Forms AI Help - FAFSA, College Applications',
    description: 'Get AI assistance with FAFSA, college applications, scholarship forms, and education paperwork. Understand requirements and maximize your chances.',
    url: 'https://formbuddyai.com/school-scholarship-forms',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - School & Scholarship Forms Assistant',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'School & Scholarship Forms AI Help - FAFSA, College Applications',
    description: 'Get AI assistance with FAFSA, college applications, scholarship forms, and education paperwork.',
    images: ['/ico.png'],
  },
};

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function SchoolScholarshipFormsPage() {
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
                  School & Scholarship Forms Simplified
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Navigate college applications, financial aid forms, and scholarship paperwork with confidence. Get clear guidance on every requirement and deadline.
                </p>
                <Link href="/upload">
                  <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Upload Your Education Form
                  </button>
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <Image
                  src="/section_5.png"
                  alt="School & Scholarship Forms illustration"
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

        {/* Common Education Forms */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Education Forms We Help With
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  form: "FAFSA",
                  title: "Free Application for Federal Student Aid",
                  description: "Complete federal financial aid applications for college funding"
                },
                {
                  form: "College Applications",
                  title: "University Admission Forms",
                  description: "Navigate Common App, UC applications, and school-specific forms"
                },
                {
                  form: "Scholarship Applications",
                  title: "Merit & Need-Based Scholarships",
                  description: "Complete scholarship essays, requirements, and eligibility forms"
                },
                {
                  form: "Transcripts",
                  title: "Academic Record Requests",
                  description: "Request official transcripts and academic documentation"
                },
                {
                  form: "Student Loans",
                  title: "Educational Loan Applications",
                  description: "Understand loan terms, promissory notes, and repayment options"
                },
                {
                  form: "Housing Forms",
                  title: "Dormitory & Campus Housing",
                  description: "Complete residence hall applications and roommate preferences"
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
              How Form Buddy Helps with Education Forms
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Upload Education Form</h3>
                <p className="text-gray-600">Upload FAFSA, applications, or scholarship forms</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Get Smart Analysis</h3>
                <p className="text-gray-600">Understand requirements, deadlines, and eligibility criteria</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Maximize Your Chances</h3>
                <p className="text-gray-600">Complete applications accurately to improve acceptance odds</p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Form Features */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Use Form Buddy for Education Forms?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Financial Aid Expertise</h3>
                  <p className="text-gray-600">Navigate FAFSA, CSS Profile, and state aid applications with confidence</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a4 4 0 118 0v4m-4 12a5 5 0 01-5-5v-2a5 5 0 015-5h10a5 5 0 015 5v2a5 5 0 01-5 5H12z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Deadline Tracking</h3>
                  <p className="text-gray-600">Never miss important application deadlines and priority dates</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Privacy Protected</h3>
                  <p className="text-gray-600">Your sensitive financial and academic information stays secure</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Essay & Application Tips</h3>
                  <p className="text-gray-600">Get guidance on personal statements and application essays</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Success Tips */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Education Form Success Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Start Early</h3>
                <p className="text-gray-600">Begin applications well before deadlines. Many forms require weeks to complete properly.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Gather Documents</h3>
                <p className="text-gray-600">Collect tax returns, bank statements, and transcripts before starting applications.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Get Help</h3>
                <p className="text-gray-600">Don't hesitate to ask school counselors, parents, or financial aid offices for assistance.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#2196F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-3">Double-Check Everything</h3>
                <p className="text-gray-600">Review all information carefully. Small errors can delay processing or affect eligibility.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Tackle Your Education Forms?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get the education funding and opportunities you deserve with proper form completion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Upload Education Form
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