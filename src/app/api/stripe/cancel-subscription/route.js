import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request) {
  try {
    const { userId, stripeCustomerId, stripeSubscriptionId } = await request.json();

    // Validate required fields
    if (!userId || !stripeSubscriptionId) {
      return NextResponse.json(
        { error: 'Missing required fields: userId or stripeSubscriptionId' },
        { status: 400 }
      );
    }

    console.log('Cancelling subscription:', { userId, stripeSubscriptionId });

    // Cancel the subscription in Stripe
    try {
      const cancelledSubscription = await stripe.subscriptions.cancel(stripeSubscriptionId);
      console.log('Stripe subscription cancelled:', cancelledSubscription.id);
    } catch (stripeError) {
      console.error('Error cancelling Stripe subscription:', stripeError);
      return NextResponse.json(
        { error: 'Failed to cancel subscription in Stripe' },
        { status: 500 }
      );
    }

    // Update user plan in Firebase
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        planType: 'free',
        planStatus: 'cancelled',
        planExpiryDate: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        lastPlanUpdate: serverTimestamp(),
      });

      console.log('User plan updated to free for userId:', userId);
    } catch (firebaseError) {
      console.error('Error updating user plan:', firebaseError);
      return NextResponse.json(
        { error: 'Subscription cancelled in Stripe but failed to update user plan' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Subscription cancelled successfully'
    });

  } catch (error) {
    console.error('Error in cancel subscription:', error);
    return NextResponse.json(
      { error: 'Failed to cancel subscription', details: error.message },
      { status: 500 }
    );
  }
}