import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

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
        
        // Log the full session object for debugging
        console.log('Full session object:', JSON.stringify(session, null, 2));
        console.log('Session client_reference_id:', session.client_reference_id);
        console.log('Session metadata:', session.metadata);
        
        // Extract user info from client_reference_id (format: "userId|planType")
        let userId, planType;
        
        if (session.client_reference_id && session.client_reference_id.includes('|')) {
          [userId, planType] = session.client_reference_id.split('|');
        } else if (session.metadata) {
          // Fallback to metadata if available
          userId = session.metadata.userId;
          planType = session.metadata.planType;
        } else {
          // Last resort: try to find user by email and guess plan from amount
          const customerEmail = session.customer_details?.email;
          if (customerEmail) {
            console.log('Trying to find user by email:', customerEmail);
            
            // Determine plan type from amount (in cents)
            const amount = session.amount_total;
            if (amount === 900) { // $9.00
              planType = 'basic';
            } else if (amount === 2900) { // $29.00
              planType = 'pro';
            }
            
            // We'll need to query Firebase to find the user by email
            // For now, log this case and we'll handle it
            console.log('Need to find user by email:', customerEmail, 'Amount:', amount, 'Guessed plan:', planType);
          }
        }
        
        // If we don't have userId but have email and planType, try to find user by email
        if (!userId && planType && session.customer_details?.email) {
          try {
            const usersQuery = query(collection(db, 'users'), where('email', '==', session.customer_details.email));
            const querySnapshot = await getDocs(usersQuery);
            
            if (!querySnapshot.empty) {
              userId = querySnapshot.docs[0].id;
              console.log('Found user by email:', userId);
            } else {
              console.warn('User not found by email:', session.customer_details.email);
            }
          } catch (error) {
            console.error('Error finding user by email:', error);
          }
        }

        console.log('Final user info:', { userId, planType });

        if (userId && planType) {
          try {
            // Update user's plan in Firebase using client SDK
            // This works because we updated Firestore rules to allow webhook updates
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
              planType: planType,
              planStatus: 'active',
              planStartDate: serverTimestamp(),
              planExpiryDate: null, // For subscriptions, this is managed by Stripe
              stripeCustomerId: session.customer,
              stripeSubscriptionId: session.subscription,
              lastUpdated: serverTimestamp(),
              lastPlanUpdate: serverTimestamp(),
            });

            console.log(`✅ User ${userId} successfully upgraded to ${planType} plan`);
          } catch (error) {
            console.error(`❌ Failed to update user ${userId} plan:`, error);
          }
        } else {
          console.error('❌ Missing userId or planType in session metadata:', { userId, planType });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        try {
          // Find user by Stripe customer ID and update subscription status
          const usersQuery = query(collection(db, 'users'), where('stripeCustomerId', '==', customerId));
          const querySnapshot = await getDocs(usersQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];

            await updateDoc(userDoc.ref, {
              planStatus: subscription.status,
              lastUpdated: serverTimestamp(),
            });

            console.log(`📝 Subscription updated for customer ${customerId}, status: ${subscription.status}`);
          } else {
            console.warn(`⚠️ User not found for Stripe customer: ${customerId}`);
          }
        } catch (error) {
          console.error(`❌ Failed to update subscription for customer ${customerId}:`, error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        try {
          // Find user by Stripe customer ID and revert to free plan
          const usersQuery = query(collection(db, 'users'), where('stripeCustomerId', '==', customerId));
          const querySnapshot = await getDocs(usersQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];

            await updateDoc(userDoc.ref, {
              planType: 'free',
              planStatus: 'cancelled',
              planExpiryDate: serverTimestamp(),
              lastUpdated: serverTimestamp(),
              lastPlanUpdate: serverTimestamp(),
            });

            console.log(`🚫 Subscription cancelled for customer ${customerId}, reverted to free plan`);
          } else {
            console.warn(`⚠️ User not found for Stripe customer: ${customerId}`);
          }
        } catch (error) {
          console.error(`❌ Failed to cancel subscription for customer ${customerId}:`, error);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        try {
          // Find user by Stripe customer ID and log transaction
          const usersQuery = query(collection(db, 'users'), where('stripeCustomerId', '==', customerId));
          const querySnapshot = await getDocs(usersQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];

            // Store transaction record
            await addDoc(collection(db, 'transactions'), {
              userId: userDoc.id,
              stripeInvoiceId: invoice.id,
              amount: invoice.amount_paid / 100, // Convert from cents
              currency: invoice.currency,
              status: 'succeeded',
              description: invoice.lines.data[0]?.description || 'Subscription payment',
              createdAt: new Date(invoice.created * 1000),
              paidAt: serverTimestamp(),
            });

            console.log(`💰 Payment recorded for customer ${customerId}: ${invoice.amount_paid / 100} ${invoice.currency}`);
          } else {
            console.warn(`⚠️ User not found for payment record, customer: ${customerId}`);
          }
        } catch (error) {
          console.error(`❌ Failed to record payment for customer ${customerId}:`, error);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const customerId = invoice.customer;

        try {
          // Find user by Stripe customer ID and log failed transaction
          const usersQuery = query(collection(db, 'users'), where('stripeCustomerId', '==', customerId));
          const querySnapshot = await getDocs(usersQuery);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];

            // Store failed transaction record
            await addDoc(collection(db, 'transactions'), {
              userId: userDoc.id,
              stripeInvoiceId: invoice.id,
              amount: invoice.amount_due / 100, // Convert from cents
              currency: invoice.currency,
              status: 'failed',
              description: invoice.lines.data[0]?.description || 'Subscription payment',
              createdAt: new Date(invoice.created * 1000),
              failedAt: serverTimestamp(),
            });

            console.log(`❌ Payment failed for customer ${customerId}: ${invoice.amount_due / 100} ${invoice.currency}`);
          } else {
            console.warn(`⚠️ User not found for failed payment record, customer: ${customerId}`);
          }
        } catch (error) {
          console.error(`❌ Failed to record payment failure for customer ${customerId}:`, error);
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