import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request) {
  try {
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

    const db = getFirestore();

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, planType } = session.metadata;

        if (userId && planType) {
          // Update user's plan in Firebase
          await db.collection('users').doc(userId).update({
            planType: planType,
            planStatus: 'active',
            planStartDate: new Date(),
            planExpiryDate: null, // For subscriptions, this is managed by Stripe
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            lastUpdated: new Date(),
          });

          // Update upload quota based on plan
          let uploadQuota;
          switch (planType) {
            case 'basic':
              uploadQuota = 15;
              break;
            case 'premium':
              uploadQuota = 100;
              break;
            case 'pro':
              uploadQuota = Infinity;
              break;
            default:
              uploadQuota = 3;
          }

          await db.collection('users').doc(userId).update({
            uploadQuota: uploadQuota,
          });

          console.log(`User ${userId} upgraded to ${planType} plan`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Find user by Stripe customer ID
        const usersQuery = await db.collection('users')
          .where('stripeCustomerId', '==', customerId)
          .limit(1)
          .get();

        if (!usersQuery.empty) {
          const userDoc = usersQuery.docs[0];
          const planType = subscription.metadata.planType || 'free';

          await userDoc.ref.update({
            planStatus: subscription.status,
            lastUpdated: new Date(),
          });

          console.log(`Subscription updated for customer ${customerId}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Find user by Stripe customer ID
        const usersQuery = await db.collection('users')
          .where('stripeCustomerId', '==', customerId)
          .limit(1)
          .get();

        if (!usersQuery.empty) {
          const userDoc = usersQuery.docs[0];

          await userDoc.ref.update({
            planType: 'free',
            planStatus: 'cancelled',
            planExpiryDate: new Date(),
            uploadQuota: 3,
            lastUpdated: new Date(),
          });

          console.log(`Subscription cancelled for customer ${customerId}`);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        // Find user by Stripe customer ID
        const usersQuery = await db.collection('users')
          .where('stripeCustomerId', '==', customerId)
          .limit(1)
          .get();

        if (!usersQuery.empty) {
          const userDoc = usersQuery.docs[0];

          // Store transaction record
          await db.collection('transactions').add({
            userId: userDoc.id,
            stripeInvoiceId: invoice.id,
            amount: invoice.amount_paid / 100, // Convert from cents
            currency: invoice.currency,
            status: 'succeeded',
            description: invoice.lines.data[0]?.description || 'Subscription payment',
            createdAt: new Date(invoice.created * 1000),
            paidAt: new Date(),
          });

          console.log(`Payment recorded for customer ${customerId}`);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        // Find user by Stripe customer ID
        const usersQuery = await db.collection('users')
          .where('stripeCustomerId', '==', customerId)
          .limit(1)
          .get();

        if (!usersQuery.empty) {
          const userDoc = usersQuery.docs[0];

          // Store failed transaction record
          await db.collection('transactions').add({
            userId: userDoc.id,
            stripeInvoiceId: invoice.id,
            amount: invoice.amount_due / 100, // Convert from cents
            currency: invoice.currency,
            status: 'failed',
            description: invoice.lines.data[0]?.description || 'Subscription payment',
            createdAt: new Date(invoice.created * 1000),
            failedAt: new Date(),
          });

          console.log(`Payment failed for customer ${customerId}`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
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