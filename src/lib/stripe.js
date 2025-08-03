import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default getStripe;

// Stripe pricing configuration
export const STRIPE_PLANS = {
  basic: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID, // You'll need to set this
    name: 'Basic Plan',
    price: 9.99,
    currency: 'usd',
    interval: 'month',
    features: [
      '15 form uploads per month',
      'Multi-language support',
      'Priority support',
      'Advanced explanations'
    ]
  },
  premium: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID, // You'll need to set this
    name: 'Premium Plan',
    price: 19.99,
    currency: 'usd',
    interval: 'month',
    features: [
      '100 form uploads per month',
      'Multi-language support',
      'Priority support',
      'Advanced explanations',
      'Bulk processing',
      'API access'
    ]
  },
  pro: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID, // You'll need to set this
    name: 'Pro Plan',
    price: 49.99,
    currency: 'usd',
    interval: 'month',
    features: [
      'Unlimited form uploads',
      'Multi-language support',
      'Priority support',
      'Advanced explanations',
      'Bulk processing',
      'API access',
      'Custom integrations'
    ]
  }
};