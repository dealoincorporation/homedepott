# Resend Email Setup for Password Reset

This guide walks you through setting up [Resend](https://resend.com) to send password reset emails to users.

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up (free tier includes 3,000 emails/month).
2. Verify your email address.

## 2. Get Your API Key

1. Log in to the [Resend Dashboard](https://resend.com/api-keys).
2. Click **Create API Key**.
3. Give it a name (e.g. "Home Depot Careers") and select permissions (e.g. **Sending access**).
4. Copy the API key (it starts with `re_`). You won't be able to see it again after closing.

## 3. Configure Environment Variables

Add these to your `.env.local` file (or your deployment environment):

```env
# Required for sending password reset emails
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Optional: Custom "from" address (see step 4)
# RESEND_FROM_EMAIL="The Home Depot Careers <noreply@yourdomain.com>"

# Optional: App URL for reset links (auto-detected on Vercel)
# NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

## 4. Sender Email (From Address)

### Development / Testing
- Resend allows sending from `onboarding@resend.dev` to **your own verified email** on the free tier.
- No extra setup needed—the app defaults to this if `RESEND_FROM_EMAIL` is not set.

### Production
- Add and verify your domain in Resend: [Domains](https://resend.com/domains).
- Add the DNS records Resend provides (SPF, DKIM, etc.).
- Set `RESEND_FROM_EMAIL` to use your domain, e.g.:
  ```env
  RESEND_FROM_EMAIL="The Home Depot Careers <noreply@yourdomain.com>"
  ```

## 5. Deploy URL for Reset Links

- **Vercel**: `VERCEL_URL` is set automatically. Reset links will use `https://your-app.vercel.app`.
- **Custom domain**: Set `NEXT_PUBLIC_APP_URL=https://careers.yourdomain.com` in your env.

## 6. Test the Flow

1. Create an account at `/applicant-login` (Create Account).
2. Click **Forgot your password?** and enter your email.
3. Check your inbox for the reset email (and spam folder if needed).
4. Click the link and set a new password.

## Troubleshooting

- **"Email service is not configured"**: Ensure `RESEND_API_KEY` is set.
- **Emails not arriving**: Check Resend dashboard → Logs for delivery status.
- **Domain not verified**: Use `onboarding@resend.dev` for testing, or verify your domain for production.
