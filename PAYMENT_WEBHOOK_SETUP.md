# Payment System & Webhook Setup Guide

## Overview

This payment system uses external payment links and webhooks to handle subscription management. Users are redirected to your payment provider, and webhooks update their plan status.

## 🎯 How It Works

1. **User selects plan** → Redirected to `/payment?plan=basic|premium|pro`
2. **Payment page** → Shows plan details and redirects to your external payment link
3. **External payment** → User completes payment on your payment provider
4. **Webhook notification** → Your payment provider sends status to `/api/payment/webhook`
5. **Plan activation** → System automatically updates user's plan and quota

## 🔗 Payment Links Setup

### Update Payment Links
In `/src/app/payment/page.js`, replace the placeholder URLs with your actual payment links:

```javascript
const PAYMENT_LINKS = {
  basic: "https://your-payment-provider.com/basic-plan",      // $9.99/month
  premium: "https://your-payment-provider.com/premium-plan",  // $19.99/month  
  pro: "https://your-payment-provider.com/pro-plan"          // $49.99/month
};
```

### URL Parameters
The system automatically appends user information to your payment links:
```
https://your-payment-link.com?user_id=firebase_uid&email=user@email.com&plan=basic
```

## 📡 Webhook Configuration

### Webhook Endpoint
Set up your payment provider to send webhooks to:
```
POST https://yourdomain.com/api/payment/webhook
```

### Required Webhook Events

#### 1. Payment Success
```json
{
  "event": "payment.success",
  "user_id": "firebase_user_id",
  "plan": "basic",
  "payment_id": "ext_payment_123",
  "amount": 9.99,
  "currency": "USD",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 2. Payment Failed
```json
{
  "event": "payment.failed", 
  "user_id": "firebase_user_id",
  "plan": "basic",
  "payment_id": "ext_payment_123",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

#### 3. Subscription Cancelled
```json
{
  "event": "subscription.cancelled",
  "user_id": "firebase_user_id", 
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🔐 Security Considerations

### Webhook Verification (Recommended)
Add webhook signature verification to `/src/app/api/payment/webhook/route.js`:

```javascript
// Add this function to verify webhook authenticity
function verifyWebhookSignature(payload, signature, secret) {
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}
```

### Environment Variables
Add webhook secret to your `.env.local`:
```env
WEBHOOK_SECRET=your_webhook_secret_here
```

## 📊 Plan Quotas & Features

The system automatically sets these quotas based on plan:

| Plan | Monthly Uploads | Features |
|------|----------------|----------|
| Free | 3 (lifetime) | English only, basic features |
| Basic | 15 | All languages, audio support |
| Premium | 100 | All features + advanced AI |
| Pro | Unlimited | All features + API access |

## 🎨 User Experience Flow

### Success Flow
1. User completes payment → Payment provider redirects to `/payment/success`
2. Webhook updates plan → User sees confirmation
3. Auto-redirect to profile → User can see new plan active

### Failure Flow  
1. Payment fails → Payment provider redirects to `/payment/failed`
2. Webhook records failure → User sees helpful error message
3. Option to retry → User can try again or contact support

## 🔄 Testing Your Integration

### 1. Test Payment Flow
```bash
# Start your development server
npm run dev

# Navigate to pricing section
http://localhost:3000/#pricing

# Click on a paid plan
# Should redirect to /payment?plan=basic

# Test external redirect
# Should redirect to your payment provider
```

### 2. Test Webhook Locally
Use a tool like ngrok to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3000

# Use the ngrok URL for webhook testing
https://abc123.ngrok.io/api/payment/webhook
```

### 3. Test Webhook Payload
Send test webhook with curl:

```bash
curl -X POST https://yourdomain.com/api/payment/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "event": "payment.success",
    "user_id": "test_user_id", 
    "plan": "basic",
    "payment_id": "test_payment_123",
    "amount": 9.99,
    "currency": "USD",
    "timestamp": "2024-01-01T00:00:00Z"
  }'
```

## 📋 Firebase Collections

### Collections Created
- `payment_attempts` - Track payment initiation
- `transactions` - Store payment history  
- `users` - Updated with plan information

### User Document Updates
When payment succeeds, user document gets:
```javascript
{
  planType: "basic|premium|pro",
  planStatus: "active", 
  planStartDate: new Date(),
  planExpiryDate: null,
  uploadQuota: 15|100|Infinity,
  lastUpdated: new Date()
}
```

## 🚀 Popular Payment Providers

### Stripe
- Webhook events: `checkout.session.completed`, `invoice.payment_succeeded`
- Redirect URLs: Set success/cancel URLs in checkout session

### PayPal
- Webhook events: `PAYMENT.SALE.COMPLETED`, `BILLING.SUBSCRIPTION.CANCELLED`
- IPN/Webhook URL: Configure in PayPal dashboard

### Paddle
- Webhook events: `subscription_created`, `subscription_cancelled`
- Webhook URL: Set in Paddle dashboard

### Square
- Webhook events: `payment.updated`, `subscription.updated` 
- Webhook signature: Use Square's signature verification

## 🛠️ Customization Options

### Custom Success/Failure URLs
Update your payment provider to redirect to:
- Success: `https://yourdomain.com/payment/success`
- Failure: `https://yourdomain.com/payment/failed`

### Custom Plan Features
Modify plan quotas in the webhook handler:
```javascript
// In /src/app/api/payment/webhook/route.js
switch (planType) {
  case 'basic':
    uploadQuota = 15; // Customize as needed
    break;
  // ... other plans
}
```

## 📞 Support & Troubleshooting

### Common Issues
1. **Webhook not receiving**: Check URL and firewall settings
2. **User plan not updating**: Verify user_id matches Firebase UID
3. **Payment not recorded**: Check webhook payload format

### Debug Logs
Monitor these endpoints for issues:
- `/api/payment/webhook` - Webhook processing
- `/api/payment/initiate` - Payment initiation
- Browser console - Client-side errors

### Testing Checklist
- ✅ Payment links redirect correctly
- ✅ Webhook endpoint receives POST requests  
- ✅ User plan updates after payment success
- ✅ Transaction history appears in profile
- ✅ Upload quotas are enforced correctly
- ✅ IP restrictions respect Pro plan status