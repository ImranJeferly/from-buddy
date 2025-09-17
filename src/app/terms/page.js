export const metadata = {
  title: "Terms of Service - Form Buddy AI | User Agreement & Service Terms",
  description: "Read Form Buddy AI's terms of service covering user responsibilities, subscription plans, data privacy, and service usage guidelines. Learn about our AI-powered form assistance platform.",
  keywords: "terms of service, user agreement, form buddy terms, AI service terms, subscription terms, user responsibilities, service agreement, platform rules",
  alternates: {
    canonical: 'https://formbuddyai.com/terms',
  },
  openGraph: {
    title: 'Terms of Service - Form Buddy AI | User Agreement & Service Terms',
    description: 'Read Form Buddy AI\'s terms of service covering user responsibilities, subscription plans, data privacy, and service usage guidelines.',
    url: 'https://formbuddyai.com/terms',
    images: [
      {
        url: '/ico.png',
        width: 1200,
        height: 630,
        alt: 'Form Buddy AI - Terms of Service',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Form Buddy AI | User Agreement & Service Terms',
    description: 'Read Form Buddy AI\'s terms of service covering user responsibilities, subscription plans, and service usage guidelines.',
    images: ['/ico.png'],
  },
};

"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        {/* Header Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                These terms govern your use of Form Buddy's AI-powered form assistance services.
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
              
              {/* Agreement Overview */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Agreement Overview</h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
                  <p className="text-gray-700 mb-4">
                    Welcome to <strong>Form Buddy</strong>! By using our services, you agree to these Terms of Service ("Terms"). 
                    These Terms form a legally binding agreement between you and Form Buddy Inc.
                  </p>
                  <p className="text-gray-700">
                    <strong>Please read these Terms carefully before using our services.</strong> If you don't agree with these Terms, 
                    please don't use Form Buddy.
                  </p>
                </div>
              </div>

              {/* Service Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Services</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Core Features</h3>
                    <ul className="text-green-700 space-y-2">
                      <li>• AI-powered form analysis and explanation</li>
                      <li>• Multi-language translation services</li>
                      <li>• Document upload and processing</li>
                      <li>• Voice narration and audio explanations</li>
                      <li>• Form completion guidance</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">Service Categories</h3>
                    <ul className="text-blue-700 space-y-2">
                      <li>• Medical forms and healthcare documents</li>
                      <li>• Legal contracts and court forms</li>
                      <li>• Immigration and visa applications</li>
                      <li>• Business and tax forms</li>
                      <li>• Education and scholarship applications</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">⚠️ Important Disclaimer</h3>
                  <p className="text-amber-700">
                    Form Buddy provides <strong>informational assistance only</strong>. We do not provide legal, medical, financial, 
                    or professional advice. Always consult qualified professionals for specific guidance related to your forms and documents.
                  </p>
                </div>
              </div>

              {/* User Responsibilities */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Responsibilities</h2>
                
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Account Requirements</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Age Requirement:</strong> You must be at least 13 years old to use Form Buddy</li>
                  <li><strong>Accurate Information:</strong> Provide truthful and current information when creating your account</li>
                  <li><strong>Account Security:</strong> Keep your login credentials secure and notify us of unauthorized access</li>
                  <li><strong>Single Account:</strong> Maintain only one account per person</li>
                </ul>

                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Acceptable Use</h3>
                <div className="bg-green-50 p-6 rounded-xl mb-6">
                  <h4 className="font-semibold text-green-800 mb-3">✅ You May:</h4>
                  <ul className="text-green-700 space-y-2">
                    <li>• Upload legitimate forms and documents for analysis</li>
                    <li>• Use our explanations to better understand your documents</li>
                    <li>• Share Form Buddy with others who might benefit</li>
                    <li>• Provide feedback to help us improve our services</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-6 rounded-xl mb-6">
                  <h4 className="font-semibold text-red-800 mb-3">❌ You May Not:</h4>
                  <ul className="text-red-700 space-y-2">
                    <li>• Upload illegal, fraudulent, or harmful content</li>
                    <li>• Attempt to reverse engineer or copy our AI technology</li>
                    <li>• Use our services for spamming or automated bulk processing</li>
                    <li>• Share your account credentials with others</li>
                    <li>• Upload documents containing malware or viruses</li>
                    <li>• Violate any applicable laws or regulations</li>
                  </ul>
                </div>
              </div>

              {/* Subscription and Pricing */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Subscription and Pricing</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gray-50 p-6 rounded-xl text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Free Plan</h3>
                    <p className="text-gray-600 text-sm mb-3">3 forms per month</p>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• English explanations only</li>
                      <li>• Basic form analysis</li>
                      <li>• Standard support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl text-center border-2 border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Basic Plan</h3>
                    <p className="text-blue-600 text-sm mb-3">15 forms per month</p>
                    <ul className="text-blue-600 text-sm space-y-1">
                      <li>• English explanations</li>
                      <li>• Advanced form analysis</li>
                      <li>• Priority support</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-xl text-center border-2 border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Pro Plan</h3>
                    <p className="text-purple-600 text-sm mb-3">Unlimited forms</p>
                    <ul className="text-purple-600 text-sm space-y-1">
                      <li>• 50+ languages</li>
                      <li>• Voice explanations</li>
                      <li>• Premium support</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payment Terms</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Billing:</strong> Subscriptions are billed monthly or annually in advance</li>
                  <li><strong>Auto-Renewal:</strong> Subscriptions automatically renew unless cancelled</li>
                  <li><strong>Cancellation:</strong> You can cancel anytime; service continues until the end of your billing period</li>
                  <li><strong>Refunds:</strong> Pro-rated refunds available within 30 days of purchase</li>
                  <li><strong>Price Changes:</strong> We'll notify you 30 days before any price increases</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
                
                <div className="bg-purple-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-purple-800 mb-3">Our Rights</h3>
                  <p className="text-purple-700 mb-3">
                    Form Buddy owns all rights to our platform, including:
                  </p>
                  <ul className="text-purple-700 space-y-2">
                    <li>• AI algorithms and machine learning models</li>
                    <li>• Software, website, and mobile applications</li>
                    <li>• Trademarks, logos, and branding</li>
                    <li>• Content, explanations, and translations we generate</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3">Your Rights</h3>
                  <ul className="text-green-700 space-y-2">
                    <li>• You retain ownership of documents you upload</li>
                    <li>• You can use our explanations for your personal needs</li>
                    <li>• You may share our explanations with relevant parties (lawyers, doctors, etc.)</li>
                    <li>• You can export and save your processing history</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
                  <h4 className="font-semibold text-yellow-800 mb-2">License to Use Our Services</h4>
                  <p className="text-yellow-700">
                    We grant you a limited, non-exclusive, non-transferable license to use Form Buddy for personal or business purposes, 
                    subject to these Terms and our subscription limits.
                  </p>
                </div>
              </div>

              {/* Data and Privacy */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Data and Privacy</h2>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Data Processing</h3>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Your uploaded documents are processed by our AI systems</li>
                    <li>• We extract text and analyze content to provide explanations</li>
                    <li>• All processing occurs on secure, encrypted servers</li>
                    <li>• Uploaded documents are automatically deleted after 7 days</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700">
                    <strong>Privacy Policy:</strong> Our data practices are detailed in our{" "}
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium underline">
                      Privacy Policy
                    </Link>
                    , which is incorporated into these Terms by reference.
                  </p>
                </div>
              </div>

              {/* Disclaimers and Limitations */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Disclaimers and Limitations</h2>
                
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-red-800 mb-3">⚠️ Service Disclaimers</h3>
                  <ul className="text-red-700 space-y-3">
                    <li>
                      <strong>Not Professional Advice:</strong> Form Buddy provides informational assistance only. 
                      We are not a substitute for lawyers, doctors, accountants, or other professionals.
                    </li>
                    <li>
                      <strong>AI Limitations:</strong> Our AI technology may make errors or provide incomplete information. 
                      Always verify important details independently.
                    </li>
                    <li>
                      <strong>Form Accuracy:</strong> We cannot guarantee that form explanations cover all requirements 
                      or legal implications specific to your situation.
                    </li>
                    <li>
                      <strong>Service Availability:</strong> We strive for 99.9% uptime but cannot guarantee uninterrupted service.
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h3>
                  <p className="text-gray-700 mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW:
                  </p>
                  <ul className="text-gray-700 space-y-2">
                    <li>• Form Buddy's liability is limited to the amount you paid in the last 12 months</li>
                    <li>• We are not liable for indirect, consequential, or punitive damages</li>
                    <li>• You use our services at your own risk</li>
                    <li>• Some jurisdictions don't allow these limitations, so they may not apply to you</li>
                  </ul>
                </div>
              </div>

              {/* Termination */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Account Termination</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">You Can:</h3>
                    <ul className="text-blue-700 space-y-2">
                      <li>• Cancel your subscription anytime</li>
                      <li>• Delete your account from settings</li>
                      <li>• Export your data before leaving</li>
                      <li>• Resume service by creating a new account</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-red-800 mb-3">We May Terminate If:</h3>
                    <ul className="text-red-700 space-y-2">
                      <li>• You violate these Terms</li>
                      <li>• You use our services illegally</li>
                      <li>• Your account shows suspicious activity</li>
                      <li>• Required by law or court order</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl mt-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">After Termination</h4>
                  <p className="text-yellow-700">
                    Your access ends immediately, but these Terms continue to apply to past use. 
                    We'll delete your data according to our Privacy Policy retention schedule.
                  </p>
                </div>
              </div>

              {/* Legal Provisions */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Provisions</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-blue-400 pl-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Governing Law</h4>
                    <p className="text-gray-700">
                      These Terms are governed by California law, without regard to conflict of law principles. 
                      Any disputes will be resolved in San Francisco County, California.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-400 pl-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Dispute Resolution</h4>
                    <p className="text-gray-700">
                      We prefer to resolve disputes informally. Please contact us first at legal@formbuddy.ai. 
                      If needed, disputes may be resolved through binding arbitration.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-400 pl-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Severability</h4>
                    <p className="text-gray-700">
                      If any part of these Terms is found unenforceable, the rest remains in full effect.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-400 pl-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Entire Agreement</h4>
                    <p className="text-gray-700">
                      These Terms, along with our Privacy Policy, constitute the complete agreement between us.
                    </p>
                  </div>
                </div>
              </div>

              {/* Changes to Terms */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Changes to These Terms</h2>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <p className="text-blue-800 mb-4">
                    We may update these Terms to reflect changes in our services or legal requirements.
                  </p>
                  <ul className="text-blue-700 space-y-2">
                    <li><strong>Notification:</strong> We'll email you about material changes 30 days in advance</li>
                    <li><strong>Effective Date:</strong> Changes take effect on the date specified in the notice</li>
                    <li><strong>Your Options:</strong> Continued use means acceptance; you can cancel if you disagree</li>
                    <li><strong>Version History:</strong> Previous versions are available upon request</li>
                  </ul>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200">
                  <p className="text-gray-700 mb-6">
                    Questions about these Terms? We're here to help:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">General Inquiries</h4>
                      <p className="text-blue-600 mb-4">support@formbuddy.ai</p>
                      
                      <h4 className="font-semibold text-gray-800 mb-2">Legal Questions</h4>
                      <p className="text-blue-600">legal@formbuddy.ai</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Technical Support</h4>
                      <p className="text-blue-600 mb-4">help@formbuddy.ai</p>
                      
                      <h4 className="font-semibold text-gray-800 mb-2">Business Inquiries</h4>
                      <p className="text-blue-600">business@formbuddy.ai</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600">
                      <strong>Response Time:</strong> We typically respond to inquiries within 24-48 hours. 
                      Legal questions may take up to 5 business days for comprehensive responses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Registration */}
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