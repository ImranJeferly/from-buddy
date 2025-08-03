"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Payment links - replace these with your actual payment links
const PAYMENT_LINKS = {
  basic: "https://buy.stripe.com/test_7sY8wRajdeImbdk0vW0x201", // Replace with your Basic plan payment link  
  pro: "https://buy.stripe.com/test_dRm14pbnhcAe2GOfqQ0x200" // Replace with your Pro plan payment link
};

const plans = {
  basic: {
    name: "Basic Plan",
    price: "$9.99",
    interval: "/month",
    features: [
      "15 form uploads per month",
      "Multi-language support", 
      "Audio explanations",
      "Priority support"
    ],
    color: "blue"
  },
  premium: {
    name: "Premium Plan", 
    price: "$19.99",
    interval: "/month",
    features: [
      "100 form uploads per month",
      "Multi-language support",
      "Audio explanations", 
      "Priority support",
      "Advanced AI features"
    ],
    color: "purple"
  },
  pro: {
    name: "Pro Plan",
    price: "$49.99", 
    interval: "/month",
    features: [
      "Unlimited form uploads",
      "Multi-language support",
      "Audio explanations",
      "Priority support", 
      "Advanced AI features",
      "API access",
      "Custom integrations"
    ],
    color: "gold"
  }
};

export default function PaymentPage() {
  const { currentUser, userData } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Get plan from URL parameters
    const plan = searchParams.get('plan');
    if (plan && plans[plan]) {
      setSelectedPlan(plan);
    } else {
      // Redirect to pricing if no valid plan selected
      router.push('/#pricing');
    }
  }, [searchParams, router]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  const handlePayment = async () => {
    if (!selectedPlan || !currentUser) return;

    setIsProcessing(true);

    try {
      // Redirect directly to external payment provider
      const paymentUrl = `${PAYMENT_LINKS[selectedPlan]}?user_id=${currentUser.uid}&email=${currentUser.email}&plan=${selectedPlan}`;
      window.location.href = paymentUrl;

    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to redirect to payment. Please try again.');
      setIsProcessing(false);
    }
  };

  if (!selectedPlan || !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const plan = plans[selectedPlan];
  const colorClasses = {
    blue: {
      gradient: "from-blue-600 to-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      button: "bg-blue-600 hover:bg-blue-700"
    },
    purple: {
      gradient: "from-purple-600 to-purple-700", 
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-800",
      button: "bg-purple-600 hover:bg-purple-700"
    },
    gold: {
      gradient: "from-yellow-500 to-yellow-600",
      bg: "bg-yellow-50", 
      border: "border-yellow-200",
      text: "text-yellow-800",
      button: "bg-yellow-600 hover:bg-yellow-700"
    }
  };

  const colors = colorClasses[plan.color];

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "80px" }}>
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Complete Your Subscription
              </h1>
              <p className="text-gray-600 text-lg">
                You're one step away from unlocking all features
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Plan Details */}
              <div className={`${colors.bg} ${colors.border} border-2 rounded-3xl p-8`}>
                <div className="text-center mb-6">
                  <h2 className={`text-3xl font-bold ${colors.text} mb-2`}>
                    {plan.name}
                  </h2>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.interval}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">What's included:</h3>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Payment Form */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h3>
                
                {/* User Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-2">Account Information</h4>
                  <p className="text-gray-600">
                    <strong>Email:</strong> {currentUser.email}
                  </p>
                  <p className="text-gray-600">
                    <strong>Name:</strong> {currentUser.displayName || 'Not set'}
                  </p>
                  <p className="text-gray-600">
                    <strong>Current Plan:</strong> {userData?.planType || 'Free'}
                  </p>
                </div>

                {/* Payment Summary */}
                <div className="mb-6 p-4 border border-gray-200 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900">{plan.name}</span>
                    <span className="font-bold text-gray-900">{plan.price}{plan.interval}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Billed monthly • Cancel anytime</span>
                  </div>
                </div>

                {/* Payment Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-200 ${
                    isProcessing 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : `${colors.button} transform hover:scale-105 shadow-lg hover:shadow-xl`
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    `Subscribe to ${plan.name}`
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 mt-4">
                  Secure payment powered by our payment provider. 
                  You can cancel your subscription at any time.
                </p>
              </div>
            </div>

            {/* Back to Pricing */}
            <div className="text-center mt-8">
              <button
                onClick={() => router.push('/#pricing')}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to pricing plans
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}