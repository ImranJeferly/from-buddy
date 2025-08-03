import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Validate required environment variables
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('STRIPE_SECRET_KEY is not configured');
}

if (!process.env.STRIPE_WEBHOOK_SECRET) {
  console.error('STRIPE_WEBHOOK_SECRET is not configured');
}

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
}) : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
    // Early validation
    if (!stripe) {
      console.error('Stripe not initialized - missing STRIPE_SECRET_KEY');
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    if (!webhookSecret) {
      console.error('Webhook secret not configured');
      return NextResponse.json(
        { error: 'Webhook not configured' },
        { status: 500 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }

    // Log the webhook event (simplified since Firebase is not configured)
    console.log('Stripe webhook received:', event.type);
    
    // Handle critical events with basic logging
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, planType } = session.metadata || {};
        console.log(`Payment completed - User: ${userId}, Plan: ${planType}, Customer: ${session.customer}`);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        console.log(`Subscription updated - Customer: ${subscription.customer}, Status: ${subscription.status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        console.log(`Subscription cancelled - Customer: ${subscription.customer}`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        console.log(`Payment succeeded - Customer: ${invoice.customer}, Amount: ${invoice.amount_paid / 100} ${invoice.currency}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.log(`Payment failed - Customer: ${invoice.customer}, Amount: ${invoice.amount_due / 100} ${invoice.currency}`);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}