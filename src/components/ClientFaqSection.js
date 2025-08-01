"use client";

import React, { useState } from "react";

const faqItems = [
  {
    question: "What types of forms can Form Buddy AI help with?",
    answer: "Form Buddy AI can assist with a wide range of forms including immigration forms, legal documents, tax forms, medical paperwork, school applications, business contracts, and government forms. Our AI is designed to explain complex documents in simple language."
  },
  {
    question: "How secure is my data when I upload a form?",
    answer: "Your privacy is our priority. We use enterprise-grade encryption and secure cloud storage. All uploaded documents are automatically deleted after 7 days with free plans or stored securely in your account with paid plans. We never share your data with third parties."
  },
  {
    question: "Can Form Buddy AI fill out forms for me?",
    answer: "Currently, Form Buddy AI focuses on explaining forms rather than filling them out automatically. However, our detailed explanations guide you through completing each field correctly. We're working on adding auto-fill capabilities in future updates."
  },
  {
    question: "Which file formats are supported?",
    answer: "Form Buddy AI currently supports image formats including PNG, JPG, JPEG, and WEBP. Simply take a photo or screenshot of your form and upload it. For best results, we recommend clear, well-lit images with all text visible."
  },
  {
    question: "Do I need to create an account to use Form Buddy AI?",
    answer: "You can try our free demo without an account, but creating an account allows you to access additional features, save explanations, and track your form history. Sign-up is quick and only requires an email address."
  },
  {
    question: "What languages does Form Buddy AI support?",
    answer: "Form Buddy AI currently supports explanations in English, Spanish, French, German, Chinese, Japanese, Korean, Russian, Arabic, and Portuguese. We're continuously adding more languages based on user demand."
  },
  {
    question: "How accurate are the explanations?",
    answer: "Our AI provides highly accurate explanations for standard forms. However, for extremely specialized legal or technical documents, we recommend consulting with a professional. We clearly indicate when a section might benefit from expert review."
  },
  {
    question: "What's the difference between the free and paid plans?",
    answer: "Free plan includes 3 forms lifetime with text-only explanations for up to 5 fields. Basic plan offers 15 forms per month with voice explanations and video avatar for all fields. Pro plan provides unlimited forms, multi-language support (50+ languages), and priority processing."
  },
  {
    question: "Can I use Form Buddy AI on my mobile device?",
    answer: "Yes! Form Buddy AI is fully responsive and works on smartphones, tablets, and desktop computers. We also offer dedicated mobile apps for iOS and Android for an optimized experience on the go."
  },
  {
    question: "How do I get help if Form Buddy AI can't explain my form?",
    answer: "While our AI handles most standard forms effectively, for unusual or highly technical documents, our Pro and Business plans include access to human support. You can also contact our customer service team directly through the Help section."
  }
];

export default function ClientFaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="home-h2 mb-16 text-center w-full !font-poppins font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-8 py-6 flex justify-between items-center focus:outline-none group"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={`text-lg font-semibold transition-colors pr-4 ${
                  openIndex === index ? 'text-[#2196F3]' : 'text-gray-900 group-hover:text-[#2196F3]'
                }`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-[#2196F3] rotate-180' 
                    : 'bg-white border-2 border-gray-200 group-hover:border-[#2196F3] group-hover:bg-blue-50'
                }`}>
                  <svg
                    className={`w-4 h-4 transition-colors duration-300 ${
                      openIndex === index ? 'text-white' : 'text-gray-600 group-hover:text-[#2196F3]'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100 pb-6' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-8 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}