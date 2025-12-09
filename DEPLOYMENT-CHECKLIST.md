# ✅ Deployment Checklist

Use this checklist to ensure everything is set up correctly.

## Before You Start
- [ ] I have a PayHero account (https://app.payhero.co.ke/)
- [ ] My M-Pesa Till (6253624) is linked to PayHero
- [ ] I have a Vercel account (https://vercel.com/)
- [ ] I have Node.js installed (for CLI deployment)

## PayHero Setup
- [ ] Logged into PayHero dashboard
- [ ] Generated API credentials (Username & Password)
- [ ] Copied my Channel ID: **4519**
- [ ] My M-Pesa channel is active and verified

## Vercel Deployment
- [ ] Uploaded project to Vercel (or pushed to Git)
- [ ] Added environment variable: PAYHERO_USERNAME
- [ ] Added environment variable: PAYHERO_PASSWORD
- [ ] Added environment variable: PAYHERO_CHANNEL_ID
- [ ] Added environment variable: PAYHERO_CALLBACK_URL
- [ ] Deployed successfully to production
- [ ] Copied my Vercel URL: https://_________________.vercel.app

## Webhook Configuration
- [ ] Opened PayHero Dashboard → Settings → Webhooks
- [ ] Added webhook URL: https://my-project.vercel.app/api/callback
- [ ] Saved webhook configuration
- [ ] Webhook is active in PayHero

## Testing
- [ ] Opened my payment page in browser
- [ ] Entered test details (name, phone, amount)
- [ ] Clicked "Pay Now"
- [ ] Received M-Pesa prompt on phone
- [ ] Entered PIN and completed payment
- [ ] Payment showed as successful
- [ ] Checked Vercel function logs
- [ ] Verified webhook received callback

## Production Readiness
- [ ] Updated PAYHERO_CALLBACK_URL to production URL
- [ ] Tested with real payment
- [ ] Added monitoring/logging (optional)
- [ ] Set up email notifications (optional)
- [ ] Added database for payment records (optional)
- [ ] Reviewed security settings
- [ ] Added custom domain (optional)

## Optional Enhancements
- [ ] Connected a database (Vercel KV, Postgres, MongoDB)
- [ ] Added email notifications (Resend, SendGrid)
- [ ] Added SMS notifications (Africa's Talking)
- [ ] Set up rate limiting
- [ ] Added admin dashboard
- [ ] Created receipts/invoices
- [ ] Set up payment reconciliation

## Troubleshooting Guide

### If payment fails:
1. Check Vercel environment variables
2. Verify PayHero API credentials
3. Review Vercel function logs
4. Test PayHero API directly with Postman
5. Ensure phone number format is correct (254XXXXXXXXX)

### If webhook doesn't work:
1. Verify callback URL is registered in PayHero
2. Check Vercel function logs for incoming requests
3. Ensure URL is HTTPS and publicly accessible
4. Test webhook with curl or Postman

### If deployment fails:
1. Check all files are present
2. Verify package.json is correct
3. Ensure Node version is 18.x or higher
4. Review Vercel build logs
5. Try: `vercel --force`

## Support Resources
- **Full Documentation**: See README.md
- **Quick Start**: See QUICKSTART.md
- **PayHero Docs**: https://docs.payhero.co.ke/
- **Vercel Docs**: https://vercel.com/docs
- **PayHero Support**: Via dashboard
- **Safaricom M-Pesa**: https://www.safaricom.co.ke/mpesa

---

## 🎉 Success!
Once all boxes are checked, you're ready to accept payments!

**Your Live Payment URL**: https://________________________.vercel.app

Share this link with customers to receive M-Pesa payments! 💰
