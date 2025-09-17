export const metadata = {
  title: "Multilingual Form Help - 50+ Languages Support | Form Buddy AI",
  description: "Get form explanations in your native language! Form Buddy AI supports 50+ languages including Spanish, Chinese, Arabic, French, German, and more. Voice narration and cultural context included.",
  keywords: "multilingual form help, form explanations in multiple languages, Spanish form help, Chinese form assistance, Arabic form support, multilingual AI, native language form help, international form assistance",
  alternates: {
    canonical: 'https://formbuddyai.com/form-explanation-in-your-language',
  },
  openGraph: {
    title: 'Multilingual Form Help - 50+ Languages Support',
    description: 'Get form explanations in your native language! Support for 50+ languages including Spanish, Chinese, Arabic, French, German, and more.',
    url: 'https://formbuddyai.com/form-explanation-in-your-language',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Multilingual Form Help',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multilingual Form Help - 50+ Languages Support',
    description: 'Get form explanations in your native language! Support for 50+ languages with voice narration and cultural context.',
    images: ['/ico.png'],
  },
};

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function FormExplanationInYourLanguagePage() {
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
                  Form Explanations in Your Language
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Understanding forms shouldn't require perfect English. Get clear explanations of any document in over 50 languages with voice narration and cultural context.
                </p>
                <Link href="/upload">
                  <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Get Help in Your Language
                  </button>
                </Link>
              </div>
              <div className="flex-1 flex justify-center">
                <Image
                  src="/section_3.png"
                  alt="Form Explanations in Your Language illustration"
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

        {/* Supported Languages */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              50+ Languages Supported
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "English", flag: "/flags/gb.webp", users: "1.5B+" },
                { name: "Chinese (Mandarin)", flag: "/flags/cn.webp", users: "918M+" },
                { name: "Hindi", flag: "/flags/in.webp", users: "600M+" },
                { name: "Spanish", flag: "/flags/es.webp", users: "500M+" },
                { name: "Arabic", flag: "/flags/sa.webp", users: "422M+" },
                { name: "French", flag: "/flags/fr.webp", users: "280M+" },
                { name: "Russian", flag: "/flags/ru.webp", users: "258M+" },
                { name: "Portuguese", flag: "/flags/pt.webp", users: "260M+" },
                { name: "Japanese", flag: "/flags/jp.webp", users: "125M+" },
                { name: "German", flag: "/flags/de.webp", users: "100M+" },
                { name: "Vietnamese", flag: "/flags/vn.webp", users: "95M+" },
                { name: "Korean", flag: "/flags/kr.webp", users: "77M+" },
                { name: "Italian", flag: "/flags/it.webp", users: "65M+" },
                { name: "Turkish", flag: "/flags/tr.webp", users: "88M+" },
                { name: "Polish", flag: "/flags/pl.webp", users: "45M+" },
                { name: "Thai", flag: "/flags/th.webp", users: "69M+" }
              ].map((lang, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={lang.flag}
                      alt={`${lang.name} flag`}
                      width={48}
                      height={32}
                      className="rounded-md object-cover shadow-sm"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{lang.name}</h3>
                  <p className="text-sm text-gray-600">{lang.users} speakers worldwide</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-600">And many more languages including Thai, Turkish, Polish, Dutch, Swedish, and others!</p>
            </div>
          </div>
        </section>

        {/* How Multilingual Support Works */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              How Multilingual Form Help Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Upload Any Form</h3>
                <p className="text-gray-600">Upload forms in any language - English, Spanish, Chinese, or others</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12l2 7-2 7H3V5zm9 5V8" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Choose Your Language</h3>
                <p className="text-gray-600">Select from 50+ languages for explanations and voice narration</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Get Native Explanations</h3>
                <p className="text-gray-600">Receive clear explanations with audio narration in your preferred language</p>
              </div>
            </div>
          </div>
        </section>

        {/* Language Features */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why Choose Multilingual Form Support?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12l2 7-2 7H3V5zm0 0l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Native Language Clarity</h3>
                  <p className="text-gray-600">Understand complex forms in your mother tongue without translation confusion</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Voice Narration</h3>
                  <p className="text-gray-600">Listen to explanations with natural-sounding speech in your language</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Cultural Context</h3>
                  <p className="text-gray-600">Get explanations that consider cultural differences and local practices</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Technical Term Translation</h3>
                  <p className="text-gray-600">Complex legal, medical, and technical terms explained in simple language</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Types by Community */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Popular Forms by Community
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900">Spanish Speakers</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Immigration forms (I-485, I-130, N-400)</li>
                  <li>• Tax returns and ITIN applications</li>
                  <li>• Medical insurance forms</li>
                  <li>• School enrollment documents</li>
                  <li>• Driver's license applications</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900">Chinese Speakers</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Visa and green card applications</li>
                  <li>• Bank account opening forms</li>
                  <li>• Real estate purchase contracts</li>
                  <li>• College admission applications</li>
                  <li>• Business registration documents</li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-bold text-xl mb-4 text-gray-900">Arabic Speakers</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Refugee and asylum forms</li>
                  <li>• Employment authorization documents</li>
                  <li>• Healthcare enrollment forms</li>
                  <li>• Social services applications</li>
                  <li>• Court and legal documents</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              What Our Multilingual Users Say
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Maria Rodriguez</h4>
                    <p className="text-sm text-gray-600">Spanish Speaker</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Finally, I can understand immigration forms in Spanish! The voice explanations make everything so clear."
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#2196F3] rounded-full flex items-center justify-center text-white font-bold">
                    L
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">Li Wei</h4>
                    <p className="text-sm text-gray-600">Chinese Speaker</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "The Chinese explanations helped me complete my tax forms correctly. Much better than online translators!"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pro Plan Notice */}
        <section className="py-12 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Multilingual Support Requires Pro Plan</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Get form explanations in 50+ languages with our Pro plan. Free and Basic plans include English-only explanations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/#pricing">
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                    Upgrade to Pro
                  </button>
                </Link>
                <Link href="/upload">
                  <button className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors">
                    Try English Version Free
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Get Help in Your Language?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands who've successfully completed forms with native language support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/upload">
                <button className="bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Get Started Today
                </button>
              </Link>
              <Link href="/#pricing">
                <button className="border-2 border-[#2196F3] text-[#2196F3] px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#2196F3] hover:text-white transition-all duration-300">
                  View Pro Plans
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