# 🚀 Quick Start - Deploy in 5 Minutes!

## Step 1: Download & Extract
Download the `mpesa-payment-vercel` folder and extract it.

## Step 2: Get PayHero Credentials
1. Login to https://app.payhero.co.ke/
2. Go to Menu → API Keys
3. Copy your API Username and Password
4. Go to Payment Channels and copy your Channel ID

## Step 3: Deploy to Vercel

### Using Vercel CLI (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd mpesa-payment-vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variables (paste your PayHero credentials when prompted)
vercel env add PAYHERO_USERNAME
vercel env add PAYHERO_PASSWORD
vercel env add PAYHERO_CHANNEL_ID
vercel env add PAYHERO_CALLBACK_URL

# Deploy to production
vercel --prod
```

### Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Add New..." → "Project"
3. Upload the `mpesa-payment-vercel` folder
4. In "Environment Variables", add:
   ```
   PAYHERO_USERNAME = your_api_username
   PAYHERO_PASSWORD = your_api_password
   PAYHERO_CHANNEL_ID = 4519
   PAYHERO_CALLBACK_URL = https://your-project.vercel.app/api/callback
   ```
5. Click "Deploy"

## Step 4: Register Webhook
1. Once deployed, copy your Vercel URL (e.g., `https://my-payments.vercel.app`)
2. Go to PayHero Dashboard → Settings → Webhooks
3. Add: `https://my-payments.vercel.app/api/callback`
4. Save

## Step 5: Test!
1. Visit your Vercel URL
2. Enter:
   - Name: Test User
   - Phone: 254712345678 (your M-Pesa number)
   - Amount: 10
3. Click "Pay Now"
4. Check your phone for M-Pesa prompt!

## 🎉 Done!
Your payment gateway is live and ready to accept payments!

## Need Help?
- Check the full README.md for detailed instructions
- View Vercel logs for debugging
- Contact PayHero support if having issues

---

**Your PayHero Details:**
- Channel ID: 4519
- Till Number: 6253624
- Network Code: 63902 (Safaricom M-Pesa)
