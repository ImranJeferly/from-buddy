import { NextResponse } from 'next/server';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Helper function to get client IP address
function getClientIP(request) {
  try {
    // Try different headers for IP address (common in various hosting environments)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const cfConnectingIP = request.headers.get('cf-connecting-ip'); // Cloudflare
    const trueClientIP = request.headers.get('true-client-ip');
    
    if (forwarded) {
      // x-forwarded-for can contain multiple IPs, get the first one
      const ip = forwarded.split(',')[0].trim();
      if (ip && ip !== 'undefined') return ip;
    }
    
    if (realIP && realIP !== 'undefined') return realIP;
    if (cfConnectingIP && cfConnectingIP !== 'undefined') return cfConnectingIP;
    if (trueClientIP && trueClientIP !== 'undefined') return trueClientIP;
    
    // Fallback for development
    return '127.0.0.1';
  } catch (error) {
    console.error('Error getting client IP:', error);
    return '127.0.0.1';
  }
}

// POST: Track IP address during registration
export async function POST(request) {
  try {
    console.log('IP tracking API called');
    
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    
    const { userId, action } = body;
    
    if (!userId) {
      console.error('No userId provided');
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const clientIP = getClientIP(request);
    console.log('Client IP detected:', clientIP, 'for user:', userId);
    
    if (action === 'register') {
      try {
        // Track IP during user registration - save to users collection
        const userRef = doc(db, 'users', userId);
        await setDoc(userRef, {
          registrationIP: clientIP,
          registrationDate: serverTimestamp(),
          lastUpdated: serverTimestamp()
        }, { merge: true });
        
        console.log('Successfully saved IP to user document:', userId, clientIP);

        return NextResponse.json({ 
          success: true, 
          ip: clientIP, 
          userId: userId,
          message: 'IP tracked successfully' 
        });
      } catch (firestoreError) {
        console.error('Firestore error:', firestoreError);
        return NextResponse.json({ 
          error: 'Database error', 
          details: firestoreError.message 
        }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Error in IP tracking API:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}

// GET: Just return the client IP for testing
export async function GET(request) {
  try {
    const clientIP = getClientIP(request);
    console.log('GET IP request - Client IP:', clientIP);
    
    return NextResponse.json({ 
      ip: clientIP,
      message: 'IP retrieved successfully'
    });

  } catch (error) {
    console.error('Error in GET IP endpoint:', error);
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: error.message 
    }, { status: 500 });
  }
}