import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request) {
  try {
    const { priceId, planType, userId } = await request.json();

    // Log received data for debugging
    console.log('Create checkout request:', { priceId, planType, userId });

    // Validate required fields
    if (!priceId || !planType || !userId) {
      console.error('Missing required fields:', { priceId, planType, userId });
      return NextResponse.json(
        { error: 'Missing required fields: priceId, planType, or userId' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/payment/cancelled`,
      metadata: {
        userId: userId,
        planType: planType,
      },
      // This ensures the customer info is passed to the webhook
      customer_creation: 'always',
    });

    // Log the created session for debugging
    console.log('Created Stripe session:', {
      id: session.id,
      metadata: session.metadata,
      customer_creation: session.customer_creation
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}