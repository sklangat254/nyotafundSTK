# M-Pesa Payment Gateway - Vercel Edition

A modern, serverless M-Pesa payment gateway built with Node.js serverless functions, designed to run on Vercel. Integrates with PayHero to process M-Pesa STK Push payments.

## ✨ Features

- 🚀 **Serverless Architecture** - Runs on Vercel's edge network
- 💳 **M-Pesa STK Push** - Direct payment prompts to user's phone
- 🎨 **Beautiful UI** - Modern, professional payment interface
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔒 **Secure** - Environment variables, input validation
- ⚡ **Fast** - Edge-optimized serverless functions
- 🔔 **Webhooks** - Real-time payment notifications
- 📊 **Transaction Logging** - Track all payments

## 📁 Project Structure

```
mpesa-payment-vercel/
├── public/
│   └── index.html          # Payment form (frontend)
├── api/
│   ├── payment.js          # Payment processing serverless function
│   └── callback.js         # Webhook handler serverless function
├── package.json            # Node.js dependencies
├── vercel.json             # Vercel configuration
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Clone/Download this project**
   ```bash
   cd mpesa-payment-vercel
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```

5. **Add Environment Variables**
   After first deployment, add your secrets:
   ```bash
   vercel env add PAYHERO_USERNAME
   vercel env add PAYHERO_PASSWORD
   vercel env add PAYHERO_CHANNEL_ID
   vercel env add PAYHERO_CALLBACK_URL
   ```
   
   For each variable, paste your value and select:
   - `Production` ✓
   - `Preview` ✓
   - `Development` ✓

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**: https://vercel.com/new

2. **Import Git Repository**
   - Click "Add New..." → "Project"
   - Import your GitHub/GitLab/Bitbucket repository
   - OR upload the project folder directly

3. **Configure Project**
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `public`

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   ```
   PAYHERO_USERNAME = your_api_username
   PAYHERO_PASSWORD = your_api_password
   PAYHERO_CHANNEL_ID = 4519
   PAYHERO_CALLBACK_URL = https://your-project.vercel.app/api/callback
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

## 🔧 Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create Environment File**
   ```bash
   cp .env.example .env.local
   ```

3. **Edit `.env.local`** with your credentials:
   ```env
   PAYHERO_USERNAME=your_api_username
   PAYHERO_PASSWORD=your_api_password
   PAYHERO_CHANNEL_ID=4519
   PAYHERO_CALLBACK_URL=http://localhost:3000/api/callback
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   vercel dev
   ```

5. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 🔐 Getting PayHero Credentials

1. **Sign up/Login** at https://app.payhero.co.ke/

2. **Get API Credentials**
   - Go to Menu → API Keys
   - Generate new API key if needed
   - Copy your:
     - API Username
     - API Password

3. **Get Channel ID**
   - Go to Menu → Payment Channels
   - Find your M-Pesa Till/Paybill
   - Copy the Channel ID

4. **Link M-Pesa Account**
   - Ensure your M-Pesa Till (6253624) or Paybill is connected
   - Verify it's active in PayHero dashboard

## 🌐 Setting Up Webhooks

### For Production (After Deployment)

1. Go to PayHero Dashboard → Settings → Webhooks

2. Add your callback URL:
   ```
   https://your-project.vercel.app/api/callback
   ```

3. Save the webhook URL

### For Local Testing (Using ngrok)

1. **Install ngrok**: https://ngrok.com/download

2. **Start your local server**:
   ```bash
   vercel dev
   ```

3. **In another terminal, run ngrok**:
   ```bash
   ngrok http 3000
   ```

4. **Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

5. **Update your callback URL**:
   - In `.env.local`: `PAYHERO_CALLBACK_URL=https://abc123.ngrok.io/api/callback`
   - In PayHero dashboard: Add `https://abc123.ngrok.io/api/callback`

6. **Restart your dev server**

## 📱 Testing Payments

1. **Open your deployed site** or `http://localhost:3000`

2. **Enter test payment details**:
   - Name: Test User
   - Phone: 254712345678 (use your actual M-Pesa number)
   - Amount: 10 (minimum test amount)

3. **Click "Pay Now"**

4. **Check your phone** for M-Pesa prompt

5. **Enter PIN** to complete payment

6. **Check logs**:
   - Vercel Dashboard → Your Project → Functions → Logs
   - Or local console if testing locally

## 🔍 Monitoring & Logs

### View Logs in Vercel Dashboard

1. Go to your project in Vercel Dashboard
2. Click on "Functions" tab
3. Select the function you want to inspect
4. View real-time logs

### View Logs Locally

When running `vercel dev`, all logs appear in your terminal.

## 🛠️ Customization

### Change Colors/Theme

Edit the CSS variables in `public/index.html`:

```css
:root {
    --primary: #0a4d3c;      /* Main brand color */
    --accent: #d4af37;       /* Accent color */
    --text-dark: #1a1a1a;    /* Text color */
}
```

### Add Database Storage

Replace console.log in `api/callback.js` with actual database:

```javascript
// Example with Vercel KV (Redis)
import { kv } from '@vercel/kv';

await kv.hset(`payment:${data.reference}`, {
  amount: data.amount,
  phone: data.phone,
  status: 'success',
  timestamp: new Date().toISOString()
});
```

Or use:
- **Vercel Postgres** - Built-in PostgreSQL
- **MongoDB Atlas** - Cloud MongoDB
- **PlanetScale** - Serverless MySQL
- **Supabase** - Open-source Firebase alternative

### Add Email Notifications

```javascript
// Example with Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: 'customer@email.com',
  subject: 'Payment Received',
  html: `Payment of KES ${amount} received successfully!`
});
```

### Add SMS Notifications

```javascript
// Example with Africa's Talking
const credentials = {
  apiKey: process.env.AT_API_KEY,
  username: process.env.AT_USERNAME
};

const AfricasTalking = require('africastalking')(credentials);
const sms = AfricasTalking.SMS;

await sms.send({
  to: [phone],
  message: `Payment of KES ${amount} received. Receipt: ${receiptNumber}`
});
```

## 🔒 Security Best Practices

- ✅ **Use Environment Variables** - Never hardcode credentials
- ✅ **HTTPS Only** - Vercel provides this automatically
- ✅ **Input Validation** - Already implemented in API routes
- ✅ **CORS Headers** - Configured in serverless functions
- ✅ **Rate Limiting** - Consider adding with Vercel Edge Middleware
- ✅ **Webhook Verification** - Validate PayHero IP addresses

### Add Rate Limiting (Optional)

Create `middleware.js` in project root:

```javascript
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export default async function middleware(request) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return new Response('Too Many Requests', { status: 429 });
  }
}

export const config = {
  matcher: '/api/:path*',
};
```

## 🐛 Troubleshooting

### Payment Request Fails

1. **Check environment variables** in Vercel dashboard
2. **Verify API credentials** are correct
3. **Check Vercel function logs** for errors
4. **Test with PayHero API** directly (use Postman)

### Webhook Not Receiving Callbacks

1. **Verify callback URL** is publicly accessible (HTTPS)
2. **Check it's registered** in PayHero dashboard
3. **View function logs** in Vercel for incoming requests
4. **Test webhook** using curl or Postman
5. **For ngrok**: Make sure ngrok is running and URL is updated

### Phone Not Receiving STK Push

1. **Verify phone format**: 254XXXXXXXXX
2. **Check phone has M-Pesa** registered
3. **Ensure Till/Paybill** is active in PayHero
4. **Check PayHero dashboard** for transaction status

### Deployment Issues

1. **Clear Vercel cache**:
   ```bash
   vercel --force
   ```

2. **Check Node version** (must be 18.x or higher)

3. **Verify all files** are committed (if using Git)

4. **Check build logs** in Vercel dashboard

## 📊 Database Integration Examples

### Option 1: Vercel KV (Redis)

```bash
npm install @vercel/kv
```

```javascript
import { kv } from '@vercel/kv';

// Save payment
await kv.hset(`payment:${reference}`, data);

// Get payment
const payment = await kv.hget(`payment:${reference}`);
```

### Option 2: Vercel Postgres

```bash
npm install @vercel/postgres
```

```javascript
import { sql } from '@vercel/postgres';

// Create table
await sql`
  CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(255) UNIQUE,
    amount DECIMAL(10,2),
    phone VARCHAR(20),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
  )
`;

// Insert payment
await sql`
  INSERT INTO payments (reference, amount, phone, status)
  VALUES (${reference}, ${amount}, ${phone}, ${status})
`;
```

### Option 3: MongoDB Atlas

```bash
npm install mongodb
```

```javascript
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db('payments');

await db.collection('transactions').insertOne({
  reference,
  amount,
  phone,
  status,
  createdAt: new Date()
});
```

## 📚 API Reference

### POST /api/payment

**Request Body:**
```json
{
  "name": "John Doe",
  "phone": "254712345678",
  "amount": 100
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Payment request sent successfully!",
  "data": {
    "reference": "TXN1234567890",
    "amount": 100,
    "phone": "254712***678"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error message here"
}
```

### POST /api/callback

Receives webhooks from PayHero:

```json
{
  "reference": "TXN1234567890",
  "status": "success",
  "amount": 100,
  "phone_number": "254712345678",
  "receipt_number": "ABC123XYZ",
  "metadata": {
    "customer_name": "John Doe"
  }
}
```

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PAYHERO_USERNAME` | PayHero API username | `your_username` |
| `PAYHERO_PASSWORD` | PayHero API password | `your_password` |
| `PAYHERO_CHANNEL_ID` | Payment channel ID | `4519` |
| `PAYHERO_PROVIDER` | Payment provider | `m-pesa` |
| `PAYHERO_CALLBACK_URL` | Webhook URL | `https://yoursite.vercel.app/api/callback` |

## 🆘 Support

- **PayHero Docs**: https://docs.payhero.co.ke/
- **Vercel Docs**: https://vercel.com/docs
- **PayHero Support**: Contact via dashboard
- **M-Pesa Support**: https://www.safaricom.co.ke/mpesa

## 📄 License

MIT License - feel free to use this for your projects!

## 🎉 You're All Set!

Your M-Pesa payment gateway is ready to go. Deploy to Vercel and start accepting payments!

```bash
vercel --prod
```

Happy coding! 🚀
