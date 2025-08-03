import { NextResponse } from 'next/server';
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

export async function POST(request) {
  try {
    const body = await request.json();
    const db = getFirestore();

    // Handle Stripe webhook format
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Invalid Stripe webhook format' },
        { status: 400 }
      );
    }

    console.log(`Stripe webhook received: ${type}`);

    switch (type) {
      case 'checkout.session.completed':
        await handleStripeCheckoutCompleted(db, data.object);
        break;
        
      case 'invoice.payment_succeeded':
        await handleStripePaymentSucceeded(db, data.object);
        break;
        
      case 'invoice.payment_failed':
        await handleStripePaymentFailed(db, data.object);
        break;
        
      case 'customer.subscription.deleted':
        await handleStripeSubscriptionDeleted(db, data.object);
        break;
        
      default:
        console.log(`Unhandled Stripe webhook event: ${type}`);
        return NextResponse.json({ message: 'Event not handled' }, { status: 200 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Stripe webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleStripeCheckoutCompleted(db, session) {
  try {
    const userId = session.client_reference_id;
    const customerEmail = session.customer_email;
    
    if (!userId) {
      console.error('No client_reference_id found in checkout session');
      return;
    }

    // Determine plan type from the amount or product
    const amount = session.amount_total / 100; // Convert from cents
    let planType = 'basic';
    
    if (amount >= 49) {
      planType = 'pro';
    } else if (amount >= 9) {
      planType = 'basic';
    }

    // Update user's plan
    const userRef = db.collection('users').doc(userId);
    
    // Get current user data
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      throw new Error(`User ${userId} not found`);
    }

    // Determine upload quota based on plan
    let uploadQuota;
    switch (planType) {
      case 'basic':
        uploadQuota = 15;
        break;
      case 'pro':
        uploadQuota = Infinity;
        break;
      default:
        uploadQuota = 3; // fallback to free
    }

    // Update user plan
    await userRef.update({
      planType: planType,
      planStatus: 'active',
      planStartDate: new Date(),
      planExpiryDate: null, // For subscriptions
      uploadQuota: uploadQuota,
      stripeCustomerId: session.customer,
      stripeSubscriptionId: session.subscription,
      lastUpdated: new Date(),
    });

    // Create transaction record
    await db.collection('transactions').add({
      userId: userId,
      stripeSessionId: session.id,
      amount: amount,
      currency: session.currency || 'usd',
      status: 'succeeded',
      description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan Subscription`,
      planType: planType,
      createdAt: new Date(),
      paidAt: new Date(),
    });

    // Update any pending payment attempts
    const paymentAttemptsQuery = await db.collection('payment_attempts')
      .where('userId', '==', userId)
      .where('status', '==', 'pending')
      .limit(1)
      .get();

    if (!paymentAttemptsQuery.empty) {
      await paymentAttemptsQuery.docs[0].ref.update({
        status: 'completed',
        stripeSessionId: session.id,
        updatedAt: new Date()
      });
    }

    console.log(`Stripe checkout completed for user ${userId}, upgraded to ${planType}`);

  } catch (error) {
    console.error('Error processing Stripe checkout completion:', error);
    throw error;
  }
}

async function handleStripePaymentSucceeded(db, invoice) {
  try {
    const customerId = invoice.customer;
    
    // Find user by Stripe customer ID
    const usersQuery = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();

    if (usersQuery.empty) {
      console.error(`No user found for Stripe customer ${customerId}`);
      return;
    }

    const userDoc = usersQuery.docs[0];
    const userId = userDoc.id;
    const amount = invoice.amount_paid / 100; // Convert from cents

    // Create transaction record for recurring payment
    await db.collection('transactions').add({
      userId: userId,
      stripeInvoiceId: invoice.id,
      amount: amount,
      currency: invoice.currency,
      status: 'succeeded',
      description: invoice.lines.data[0]?.description || 'Subscription payment',
      createdAt: new Date(invoice.created * 1000),
      paidAt: new Date(),
    });

    console.log(`Stripe payment succeeded for user ${userId}, amount: ${amount}`);

  } catch (error) {
    console.error('Error processing Stripe payment success:', error);
    throw error;
  }
}

async function handleStripePaymentFailed(db, invoice) {
  try {
    const customerId = invoice.customer;
    
    // Find user by Stripe customer ID
    const usersQuery = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();

    if (usersQuery.empty) {
      console.error(`No user found for Stripe customer ${customerId}`);
      return;
    }

    const userDoc = usersQuery.docs[0];
    const userId = userDoc.id;
    const amount = invoice.amount_due / 100; // Convert from cents

    // Create failed transaction record
    await db.collection('transactions').add({
      userId: userId,
      stripeInvoiceId: invoice.id,
      amount: amount,
      currency: invoice.currency,
      status: 'failed',
      description: invoice.lines.data[0]?.description || 'Subscription payment',
      createdAt: new Date(invoice.created * 1000),
      failedAt: new Date(),
    });

    console.log(`Stripe payment failed for user ${userId}`);

  } catch (error) {
    console.error('Error processing Stripe payment failure:', error);
    throw error;
  }
}

async function handleStripeSubscriptionDeleted(db, subscription) {
  try {
    const customerId = subscription.customer;
    
    // Find user by Stripe customer ID
    const usersQuery = await db.collection('users')
      .where('stripeCustomerId', '==', customerId)
      .limit(1)
      .get();

    if (usersQuery.empty) {
      console.error(`No user found for Stripe customer ${customerId}`);
      return;
    }

    const userDoc = usersQuery.docs[0];
    const userId = userDoc.id;

    // Downgrade user back to free plan
    await userDoc.ref.update({
      planType: 'free',
      planStatus: 'cancelled',
      planExpiryDate: new Date(),
      uploadQuota: 3,
      lastUpdated: new Date(),
    });

    // Create cancellation record
    await db.collection('transactions').add({
      userId: userId,
      stripeSubscriptionId: subscription.id,
      amount: 0,
      currency: 'usd',
      status: 'cancelled',
      description: 'Subscription cancelled',
      createdAt: new Date(),
    });

    console.log(`Stripe subscription cancelled for user ${userId}, downgraded to free plan`);

  } catch (error) {
    console.error('Error processing Stripe subscription cancellation:', error);
    throw error;
  }
}