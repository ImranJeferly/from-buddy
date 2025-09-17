export const metadata = {
  title: "Privacy Policy - Form Buddy AI | Data Protection & Security",
  description: "Learn how Form Buddy AI protects your privacy and data. Our comprehensive privacy policy covers data collection, security measures, your rights, and GDPR compliance for all users.",
  keywords: "privacy policy, data protection, GDPR compliance, data security, user privacy, form buddy privacy, AI privacy, document security, data rights",
  alternates: {
    canonical: 'https://formbuddyai.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy - Form Buddy AI | Data Protection & Security',
    description: 'Learn how Form Buddy AI protects your privacy and data. Comprehensive privacy policy covering data collection, security measures, and your rights.',
    url: 'https://formbuddyai.com/privacy',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Privacy Policy',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Form Buddy AI | Data Protection & Security',
    description: 'Learn how Form Buddy AI protects your privacy and data. Comprehensive privacy policy covering data collection and security.',
    images: ['/ico.png'],
  },
};

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        {/* Header Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                Your privacy is important to us. This policy explains how Form Buddy collects, uses, and protects your information.
              </p>
              <p className="text-sm text-gray-500">
                Last updated: January 1, 2025
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="prose prose-lg max-w-none">
              
              {/* Overview */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
                  <p className="text-gray-700 mb-4">
                    <strong>Form Buddy</strong> is an AI-powered service that helps users understand and complete various forms by providing explanations, translations, and guidance. We are committed to protecting your privacy and handling your data with care and transparency.
                  </p>
                  <p className="text-gray-700">
                    This Privacy Policy applies to all users of our website, mobile applications, and services (collectively, "Services").
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Information We Collect</h2>
                
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Personal Information</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Account Information:</strong> Name, email address, password, and profile preferences</li>
                  <li><strong>Payment Information:</strong> Billing details, payment method information (processed securely through third-party providers)</li>
                  <li><strong>Communication Data:</strong> Messages, support tickets, and feedback you send to us</li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Document and Form Data</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Uploaded Documents:</strong> Forms, images, PDFs, and other files you upload for analysis</li>
                  <li><strong>Form Content:</strong> Text, data, and information extracted from your documents</li>
                  <li><strong>Processing Results:</strong> AI-generated explanations, translations, and guidance</li>
                  <li><strong>Language Preferences:</strong> Your selected languages for explanations and translations</li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Information</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Usage Data:</strong> How you interact with our Services, features used, time spent</li>
                  <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
                  <li><strong>Cookies and Tracking:</strong> Session data, preferences, and analytics information</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Core Services</h3>
                    <ul className="text-green-700 space-y-2">
                      <li>• Process and analyze your uploaded documents</li>
                      <li>• Generate AI-powered explanations and guidance</li>
                      <li>• Provide multi-language translations</li>
                      <li>• Create personalized user experiences</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">Account Management</h3>
                    <ul className="text-blue-700 space-y-2">
                      <li>• Create and manage your account</li>
                      <li>• Process payments and subscriptions</li>
                      <li>• Provide customer support</li>
                      <li>• Send important service updates</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 mb-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Service Improvement</h3>
                  <ul className="text-purple-700 space-y-2">
                    <li>• Improve AI accuracy and performance</li>
                    <li>• Develop new features and services</li>
                    <li>• Conduct research and analytics</li>
                    <li>• Ensure security and prevent fraud</li>
                  </ul>
                </div>
              </div>

              {/* Data Security and Protection */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Data Security and Protection</h2>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg mb-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">🔒 Security Measures</h3>
                  <ul className="text-red-700 space-y-2">
                    <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
                    <li><strong>Access Controls:</strong> Strict authentication and authorization for all system access</li>
                    <li><strong>Regular Audits:</strong> Ongoing security assessments and vulnerability testing</li>
                    <li><strong>Data Centers:</strong> Secure, certified cloud infrastructure with multiple redundancies</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-6">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">⏰ Data Retention</h3>
                  <ul className="text-amber-700 space-y-2">
                    <li><strong>Uploaded Documents:</strong> Automatically deleted after 7 days</li>
                    <li><strong>Processing Results:</strong> Stored for 30 days, then archived or deleted</li>
                    <li><strong>Account Data:</strong> Retained while your account is active, plus 2 years after closure</li>
                    <li><strong>Payment Records:</strong> Kept for 7 years for legal and tax compliance</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Information Sharing</h2>
                
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">We DO NOT sell, rent, or trade your personal information.</h3>
                  <p className="text-gray-700 mb-4">We may share information only in these limited circumstances:</p>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-400 pl-4">
                    <h4 className="font-semibold text-gray-800">Service Providers</h4>
                    <p className="text-gray-700">Trusted third-party providers who help us operate our services (cloud hosting, payment processing, customer support)</p>
                  </div>
                  
                  <div className="border-l-4 border-green-400 pl-4">
                    <h4 className="font-semibold text-gray-800">Legal Requirements</h4>
                    <p className="text-gray-700">When required by law, court order, or to protect rights, property, or safety</p>
                  </div>
                  
                  <div className="border-l-4 border-purple-400 pl-4">
                    <h4 className="font-semibold text-gray-800">Business Transfers</h4>
                    <p className="text-gray-700">In connection with a merger, acquisition, or sale of assets (with user notification)</p>
                  </div>
                  
                  <div className="border-l-4 border-orange-400 pl-4">
                    <h4 className="font-semibold text-gray-800">With Your Consent</h4>
                    <p className="text-gray-700">Any other sharing will only occur with your explicit permission</p>
                  </div>
                </div>
              </div>

              {/* Your Rights and Choices */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Data Access & Control</h3>
                    <ul className="text-blue-700 space-y-2 text-sm">
                      <li>• View and download your data</li>
                      <li>• Update your information</li>
                      <li>• Delete your account</li>
                      <li>• Export your processing history</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">Communication Preferences</h3>
                    <ul className="text-green-700 space-y-2 text-sm">
                      <li>• Opt out of marketing emails</li>
                      <li>• Choose notification settings</li>
                      <li>• Set language preferences</li>
                      <li>• Manage cookie preferences</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mt-6">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Some data processing is necessary for core service functionality. 
                    Opting out of certain data collection may limit service features.
                  </p>
                </div>
              </div>

              {/* International Users */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">International Users</h2>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 mb-4">
                    Form Buddy operates globally and may transfer your information to countries outside your residence. 
                    We ensure appropriate safeguards are in place for international transfers.
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li><strong>GDPR Compliance:</strong> Full compliance with European data protection regulations</li>
                    <li><strong>CCPA Compliance:</strong> California residents have additional privacy rights</li>
                    <li><strong>Global Standards:</strong> We follow international best practices for data protection</li>
                  </ul>
                </div>
              </div>

              {/* Children's Privacy */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                  <p className="text-red-800 font-semibold mb-2">
                    Form Buddy is not intended for users under 13 years of age.
                  </p>
                  <p className="text-red-700">
                    We do not knowingly collect personal information from children under 13. 
                    If you believe we have collected information from a child under 13, please contact us immediately.
                  </p>
                </div>
              </div>

              {/* Changes to Privacy Policy */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to This Privacy Policy</h2>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <p className="text-blue-800 mb-4">
                    We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws.
                  </p>
                  <ul className="text-blue-700 space-y-2">
                    <li><strong>Notification:</strong> We'll notify users of material changes via email or service notices</li>
                    <li><strong>Effective Date:</strong> Changes take effect 30 days after notification</li>
                    <li><strong>Review:</strong> We encourage you to review this policy regularly</li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
                  <p className="text-gray-700 mb-6">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Email</h4>
                      <p className="text-blue-600">privacy@formbuddy.ai</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Data Protection Officer</h4>
                      <p className="text-blue-600">dpo@formbuddy.ai</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Support Team</h4>
                      <p className="text-blue-600">support@formbuddy.ai</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Response Time</h4>
                      <p className="text-gray-700">
                        We respond to privacy inquiries within 30 days.<br />
                        EU residents: 72 hours for GDPR requests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Top */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Link href="/register" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Registration
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}