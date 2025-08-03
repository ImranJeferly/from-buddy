"use client";

import React, { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import getStripe from '@/lib/stripe';

export default function PaymentButton({ 
  priceId, 
  planType, 
  planName, 
  planPrice, 
  className = '',
  children 
}) {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          planType,
          userId: currentUser.uid,
        }),
      });

      const { sessionId, url } = await response.json();

      if (response.ok) {
        // Redirect to Stripe Checkout
        if (url) {
          window.location.href = url;
        } else {
          // Fallback to Stripe.js
          const stripe = await getStripe();
          const { error } = await stripe.redirectToCheckout({
            sessionId,
          });

          if (error) {
            console.error('Stripe error:', error);
            alert('Payment failed. Please try again.');
          }
        }
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Processing...</span>
        </div>
      ) : (
        children || `Subscribe to ${planName} - $${planPrice}/month`
      )}
    </button>
  );
}