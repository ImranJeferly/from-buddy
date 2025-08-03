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

    // Try to initialize Firebase Admin
    let adminDb = null;
    try {
      if (process.env.FIREBASE_PROJECT_ID && 
          process.env.FIREBASE_CLIENT_EMAIL && 
          process.env.FIREBASE_PRIVATE_KEY) {
        const { adminDb: db } = await import('@/lib/firebaseAdmin');
        adminDb = db;
      }
    } catch (error) {
      console.warn('Firebase Admin not available, webhook will only log events:', error.message);
    }

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
          if (adminDb) {
            try {
              // Update user's plan in Firebase
              await adminDb.collection('users').doc(userId).update({
                planType: planType,
                planStatus: 'active',
                planStartDate: new Date(),
                planExpiryDate: null, // For subscriptions, this is managed by Stripe
                stripeCustomerId: session.customer,
                stripeSubscriptionId: session.subscription,
                lastUpdated: new Date(),
                lastPlanUpdate: new Date(),
              });

              console.log(`User ${userId} successfully upgraded to ${planType} plan`);
            } catch (error) {
              console.error(`Failed to update user ${userId} plan:`, error);
            }
          } else {
            console.log(`Payment completed - User: ${userId}, Plan: ${planType}, Customer: ${session.customer} (Firebase not configured)`);
          }
        } else {
          console.error('Missing userId or planType in session metadata:', { userId, planType });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        if (adminDb) {
          try {
            // Find user by Stripe customer ID
            const usersQuery = await adminDb.collection('users')
              .where('stripeCustomerId', '==', customerId)
              .limit(1)
              .get();

            if (!usersQuery.empty) {
              const userDoc = usersQuery.docs[0];
              const planType = subscription.metadata?.planType || 'free';

              await userDoc.ref.update({
                planStatus: subscription.status,
                lastUpdated: new Date(),
              });

              console.log(`Subscription updated for customer ${customerId}, status: ${subscription.status}`);
            } else {
              console.warn(`User not found for Stripe customer: ${customerId}`);
            }
          } catch (error) {
            console.error(`Failed to update subscription for customer ${customerId}:`, error);
          }
        } else {
          console.log(`Subscription updated - Customer: ${customerId}, Status: ${subscription.status} (Firebase not configured)`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        if (adminDb) {
          try {
            // Find user by Stripe customer ID
            const usersQuery = await adminDb.collection('users')
              .where('stripeCustomerId', '==', customerId)
              .limit(1)
              .get();

            if (!usersQuery.empty) {
              const userDoc = usersQuery.docs[0];

              await userDoc.ref.update({
                planType: 'free',
                planStatus: 'cancelled',
                planExpiryDate: new Date(),
                lastUpdated: new Date(),
                lastPlanUpdate: new Date(),
              });

              console.log(`Subscription cancelled for customer ${customerId}, reverted to free plan`);
            } else {
              console.warn(`User not found for Stripe customer: ${customerId}`);
            }
          } catch (error) {
            console.error(`Failed to cancel subscription for customer ${customerId}:`, error);
          }
        } else {
          console.log(`Subscription cancelled - Customer: ${customerId} (Firebase not configured)`);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        if (adminDb) {
          try {
            // Find user by Stripe customer ID
            const usersQuery = await adminDb.collection('users')
              .where('stripeCustomerId', '==', customerId)
              .limit(1)
              .get();

            if (!usersQuery.empty) {
              const userDoc = usersQuery.docs[0];

              // Store transaction record
              await adminDb.collection('transactions').add({
                userId: userDoc.id,
                stripeInvoiceId: invoice.id,
                amount: invoice.amount_paid / 100, // Convert from cents
                currency: invoice.currency,
                status: 'succeeded',
                description: invoice.lines.data[0]?.description || 'Subscription payment',
                createdAt: new Date(invoice.created * 1000),
                paidAt: new Date(),
              });

              console.log(`Payment recorded for customer ${customerId}: ${invoice.amount_paid / 100} ${invoice.currency}`);
            } else {
              console.warn(`User not found for payment record, customer: ${customerId}`);
            }
          } catch (error) {
            console.error(`Failed to record payment for customer ${customerId}:`, error);
          }
        } else {
          console.log(`Payment succeeded - Customer: ${customerId}, Amount: ${invoice.amount_paid / 100} ${invoice.currency} (Firebase not configured)`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        if (adminDb) {
          try {
            // Find user by Stripe customer ID
            const usersQuery = await adminDb.collection('users')
              .where('stripeCustomerId', '==', customerId)
              .limit(1)
              .get();

            if (!usersQuery.empty) {
              const userDoc = usersQuery.docs[0];

              // Store failed transaction record
              await adminDb.collection('transactions').add({
                userId: userDoc.id,
                stripeInvoiceId: invoice.id,
                amount: invoice.amount_due / 100, // Convert from cents
                currency: invoice.currency,
                status: 'failed',
                description: invoice.lines.data[0]?.description || 'Subscription payment',
                createdAt: new Date(invoice.created * 1000),
                failedAt: new Date(),
              });

              console.log(`Payment failed for customer ${customerId}: ${invoice.amount_due / 100} ${invoice.currency}`);
            } else {
              console.warn(`User not found for failed payment record, customer: ${customerId}`);
            }
          } catch (error) {
            console.error(`Failed to record payment failure for customer ${customerId}:`, error);
          }
        } else {
          console.log(`Payment failed - Customer: ${customerId}, Amount: ${invoice.amount_due / 100} ${invoice.currency} (Firebase not configured)`);
        }
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