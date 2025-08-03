import { NextResponse } from 'next/server';
import { getFirestore } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp({
    credential: cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(request) {
  try {
    const { userId, planType, userEmail } = await request.json();

    if (!userId || !planType || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const db = getFirestore();

    // Create a pending payment record
    const paymentAttempt = {
      userId: userId,
      userEmail: userEmail,
      planType: planType,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store the payment attempt
    const paymentRef = await db.collection('payment_attempts').add(paymentAttempt);

    console.log(`Payment attempt created for user ${userId}, plan ${planType}, ID: ${paymentRef.id}`);

    return NextResponse.json({ 
      success: true, 
      paymentAttemptId: paymentRef.id 
    });

  } catch (error) {
    console.error('Error initiating payment:', error);
    return NextResponse.json(
      { error: 'Failed to initiate payment' },
      { status: 500 }
    );
  }
}