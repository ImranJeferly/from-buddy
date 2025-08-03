"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PaymentSuccessPage() {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to profile after 5 seconds
    const timer = setTimeout(() => {
      router.push('/profile');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Success Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Payment Successful! 🎉
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Your subscription is being processed and will be activated shortly.
              </p>
            </div>

            {/* What happens next */}
            <div className="bg-white rounded-3xl shadow-xl border-2 border-green-100 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next?</h2>
              
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Payment Confirmation</h3>
                    <p className="text-gray-600">We're processing your payment and will send you a confirmation email shortly.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Account Upgrade</h3>
                    <p className="text-gray-600">Your account will be automatically upgraded within a few minutes.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Start Using Features</h3>
                    <p className="text-gray-600">Access all your new features and increased upload limits immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => router.push('/profile')}
                className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                Go to Profile
              </button>
              
              <div>
                <button
                  onClick={() => router.push('/upload')}
                  className="w-full md:w-auto px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors"
                >
                  Start Uploading Forms
                </button>
              </div>
              
              <p className="text-sm text-gray-500">
                Redirecting to your profile in 5 seconds...
              </p>
            </div>

            {/* Support */}
            <div className="mt-12 p-6 bg-gray-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm">
                If you have any questions about your subscription or need assistance, 
                please contact our support team.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}