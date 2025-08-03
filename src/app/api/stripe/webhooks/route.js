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

    if (!webhookSecret || webhookSecret === 'whsec_...') {
      console.error('Webhook secret not properly configured:', webhookSecret);
      return NextResponse.json(
        { error: 'Webhook secret not configured properly' },
        { status: 500 }
      );
    }

    // For now, we'll just log webhook events and handle plan updates client-side
    // This avoids Firebase Admin complexity while still tracking payment events

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', {
        error: err.message,
        signature: signature ? 'present' : 'missing',
        webhookSecret: webhookSecret ? `${webhookSecret.substring(0, 10)}...` : 'missing',
        bodyLength: body.length
      });
      return NextResponse.json(
        { error: 'Webhook signature verification failed', details: err.message },
        { status: 400 }
      );
    }

    console.log('Stripe webhook received:', event.type);
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, planType } = session.metadata || {};

        if (userId && planType) {
          // Log successful payment - the client app will handle plan updates
          console.log(`✅ Payment completed - User: ${userId}, Plan: ${planType}, Customer: ${session.customer}, Subscription: ${session.subscription}`);
          
          // Store the payment info for client-side plan update
          // We could use a simple key-value store or just rely on Stripe's API for verification
        } else {
          console.error('❌ Missing userId or planType in session metadata:', { userId, planType });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        console.log(`📝 Subscription updated - Customer: ${customerId}, Status: ${subscription.status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        console.log(`🚫 Subscription cancelled - Customer: ${customerId}`);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        console.log(`💰 Payment succeeded - Customer: ${customerId}, Amount: ${invoice.amount_paid / 100} ${invoice.currency}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        console.log(`❌ Payment failed - Customer: ${customerId}, Amount: ${invoice.amount_due / 100} ${invoice.currency}`);
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