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
    answer: "Form Buddy AI supports PDF, PNG, JPG, JPEG, TIFF, and DOCX formats. For best results, we recommend clear scans or digital forms rather than handwritten documents, though our AI can handle both types."
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
    answer: "Free plans allow for 3 form explanations per month with basic text explanations. Paid plans offer unlimited forms, voice explanations, priority processing, document storage, and specialized form templates for immigration, taxes, and legal documents."
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

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="home-h2 mb-12 text-center w-full !font-poppins font-bold">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-0">
          {faqItems.map((faq, index) => (
            <div key={index}>
              <div 
                className="faq-item bg-white overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex justify-between items-center focus:outline-none"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className={`text-lg font-medium transition-colors ${
                    openIndex === index ? 'text-[#2196F3]' : 'text-gray-700'
                  }`}>
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#2196F3] transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
              {index < faqItems.length - 1 && (
                <div className="mx-4 h-0.5 bg-[#2196F3] rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
