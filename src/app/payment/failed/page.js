"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PaymentFailedPage() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Payment Failed
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                We couldn't process your payment. Don't worry, no charges were made.
              </p>
            </div>

            {/* Common reasons */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-red-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common reasons for payment failure</h2>
              
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Insufficient Funds</h3>
                    <p className="text-gray-600">Your card may not have sufficient balance for this transaction.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Card Declined</h3>
                    <p className="text-gray-600">Your bank or card issuer may have declined the transaction.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Incorrect Details</h3>
                    <p className="text-gray-600">There might be an error in your card details or billing information.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => router.push('/#pricing')}
                className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              
              <div>
                <button
                  onClick={() => router.push('/')}
                  className="w-full md:w-auto px-8 py-4 bg-gray-600 text-white rounded-xl font-bold text-lg hover:bg-gray-700 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Still Having Issues?</h3>
              <p className="text-gray-600 text-sm mb-4">
                If you continue to experience payment issues, please contact our support team for assistance.
              </p>
              <div className="text-sm text-gray-500">
                <p>• Check with your bank about the transaction</p>
                <p>• Try using a different payment method</p>
                <p>• Contact our support if the problem persists</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}