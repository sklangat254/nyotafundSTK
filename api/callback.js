/**
 * Vercel Serverless Function - PayHero Webhook Handler
 * Endpoint: /api/callback
 * This receives payment notifications from PayHero
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      status: 'error',
      message: 'Method not allowed'
    });
  }

  try {
    // Get callback data
    const callbackData = req.body;

    // Log the incoming callback
    console.log('Received PayHero callback:', JSON.stringify(callbackData, null, 2));

    // Validate that we received data
    if (!callbackData || Object.keys(callbackData).length === 0) {
      console.error('No callback data received');
      return res.status(400).json({
        status: 'error',
        message: 'No data received'
      });
    }

    // Extract payment information
    const {
      reference,
      status,
      amount,
      phone_number,
      receipt_number,
      metadata = {},
      failure_reason
    } = callbackData;

    console.log(`Payment ${reference} - Status: ${status}`);

    // Process based on payment status
    switch (status?.toLowerCase()) {
      case 'success':
      case 'completed':
        await handleSuccessfulPayment({
          reference,
          amount,
          phone: phone_number,
          receiptNumber: receipt_number,
          metadata
        });
        break;

      case 'failed':
      case 'cancelled':
        await handleFailedPayment({
          reference,
          amount,
          phone: phone_number,
          reason: failure_reason || 'Unknown'
        });
        break;

      case 'pending':
        await handlePendingPayment({
          reference,
          amount,
          phone: phone_number
        });
        break;

      default:
        console.log(`Unknown payment status: ${status}`);
    }

    // Always respond with 200 to acknowledge receipt
    return res.status(200).json({
      status: 'received',
      message: 'Callback processed successfully'
    });

  } catch (error) {
    console.error('Callback processing error:', error);
    
    // Still return 200 to PayHero to prevent retries
    return res.status(200).json({
      status: 'error',
      message: 'Callback received but processing failed'
    });
  }
}

/**
 * Handle successful payment
 */
async function handleSuccessfulPayment(data) {
  console.log('✅ SUCCESS: Payment completed', data);
  
  // TODO: Add your business logic here:
  // - Save to database (use Vercel KV, PostgreSQL, MongoDB, etc.)
  // - Send confirmation email (use SendGrid, Resend, etc.)
  // - Send SMS notification (use Africa's Talking, Twilio, etc.)
  // - Update user account/credits
  // - Trigger webhooks to other services
  // - Generate receipt/invoice
  
  // Example: Log to console (replace with actual database save)
  const record = {
    timestamp: new Date().toISOString(),
    reference: data.reference,
    amount: data.amount,
    phone: data.phone,
    receiptNumber: data.receiptNumber,
    status: 'success',
    metadata: data.metadata
  };
  
  console.log('Payment record:', JSON.stringify(record, null, 2));
  
  // Example: Send notification (implement your own notification service)
  // await sendNotification(data.phone, `Payment of KES ${data.amount} received. Receipt: ${data.receiptNumber}`);
}

/**
 * Handle failed payment
 */
async function handleFailedPayment(data) {
  console.log('❌ FAILED: Payment failed', data);
  
  // TODO: Add your business logic here:
  // - Log the failure to database
  // - Notify customer of failure
  // - Send alert to admin if needed
  
  const record = {
    timestamp: new Date().toISOString(),
    reference: data.reference,
    amount: data.amount,
    phone: data.phone,
    status: 'failed',
    reason: data.reason
  };
  
  console.log('Failed payment record:', JSON.stringify(record, null, 2));
}

/**
 * Handle pending payment
 */
async function handlePendingPayment(data) {
  console.log('⏳ PENDING: Payment pending', data);
  
  // TODO: Add your business logic here:
  // - Update status to pending in database
  // - Set up timeout check (e.g., mark as failed after 5 minutes)
  
  const record = {
    timestamp: new Date().toISOString(),
    reference: data.reference,
    amount: data.amount,
    phone: data.phone,
    status: 'pending'
  };
  
  console.log('Pending payment record:', JSON.stringify(record, null, 2));
}
