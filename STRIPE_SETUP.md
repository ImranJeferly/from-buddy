# Stripe Integration Setup Guide

## 1. Stripe Dashboard Setup

### Step 1: Create Stripe Account
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Create an account or log in
3. Switch to **Test mode** for development

### Step 2: Get API Keys
1. Go to **Developers** → **API keys**
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### Step 3: Create Products and Prices
1. Go to **Products** → **Add Product**
2. Create three products:

#### Basic Plan
- Name: "Form Buddy Basic"
- Description: "15 form uploads per month with audio support"
- Pricing: $9.99/month (recurring)
- Copy the **Price ID** (starts with `price_`)

#### Premium Plan  
- Name: "Form Buddy Premium"
- Description: "100 form uploads per month with advanced features"
- Pricing: $19.99/month (recurring)
- Copy the **Price ID** (starts with `price_`)

#### Pro Plan
- Name: "Form Buddy Pro" 
- Description: "Unlimited form uploads with all features"
- Pricing: $49.99/month (recurring)
- Copy the **Price ID** (starts with `price_`)

### Step 4: Set up Webhooks
1. Go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhooks`
4. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

## 2. Environment Variables Setup

Create a `.env.local` file in your project root with:

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Stripe Price IDs
NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID=price_your_basic_price_id
NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID=price_your_premium_price_id  
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_your_pro_price_id

# Firebase Admin (get from Firebase Console → Project Settings → Service Accounts)
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"

# Application Domain
NEXT_PUBLIC_DOMAIN=http://localhost:3000
```

## 3. Firebase Setup

### Step 1: Enable Firestore Rules
Update your Firestore rules to allow the transactions collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ... existing rules ...
    
    // Transactions collection
    match /transactions/{transactionId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow write: if false; // Only server can write transactions
    }
  }
}
```

### Step 2: Get Service Account Key
1. Go to Firebase Console → Project Settings
2. Go to **Service Accounts** tab
3. Click **Generate new private key**
4. Save the JSON file securely
5. Extract the required fields for your `.env.local`

## 4. Testing

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Test Flow
1. Go to pricing section
2. Click on Basic or Pro plan
3. Complete Stripe checkout (use test card: 4242 4242 4242 4242)
4. Verify user plan updates in Firebase
5. Check billing section in profile page

## 5. Production Deployment

1. Switch to **Live mode** in Stripe Dashboard
2. Create new products/prices for live mode
3. Update environment variables with live keys
4. Set webhook endpoint to production domain
5. Update `NEXT_PUBLIC_DOMAIN` to production URL

## 6. Test Cards

For testing payments, use these Stripe test cards:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Insufficient funds**: 4000 0000 0000 9995

## Troubleshooting

### Common Issues
1. **Webhook verification failed**: Check webhook secret matches
2. **User plan not updating**: Check Firebase rules and service account permissions
3. **Payment not processing**: Verify price IDs are correct
4. **Billing portal not working**: Ensure customer has a Stripe customer ID

### Logs
Check these for debugging:
- Browser console for client-side errors
- Server logs for API errors
- Stripe Dashboard logs for webhook events
- Firebase console for database issues

## Support

If you need help:
1. Check Stripe documentation: https://stripe.com/docs
2. Check Firebase documentation: https://firebase.google.com/docs
3. Review the code comments for implementation details