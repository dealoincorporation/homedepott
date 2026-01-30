# Environment Variables Setup Guide

## Required Variables

Add these to your `.env.local` file in the project root:

```bash
# MongoDB Connection (You already have this!)
MONGODB_URI="mongodb+srv://tajaappshop_db_user:kXMJLKisA3GrzEx2@hemedepot.c0whf8e.mongodb.net/homedepot"

# JWT Secret (Generated secure random string)
JWT_SECRET="a54cb949626ef19cb6cac3cf7e4707a933866e79d3986fe8cca6164105a7aef148fe061b77c1d86b76696c4b82317515bec22015c37b2b21c0669b5c64aaf437"

# Admin Emails (Comma-separated - users with these emails will be admins)
# Replace with your actual admin email(s)
ADMIN_EMAILS="admin@homedepot.ca"

# Resend - For password reset emails (OPTIONAL)
# Get your API key at https://resend.com/api-keys
RESEND_API_KEY="re_xxxxxxxxxxxx"
# RESEND_FROM_EMAIL="The Home Depot Careers <noreply@yourdomain.com>"  # Optional, defaults to onboarding@resend.dev

# Legacy SMTP (OPTIONAL - for other email features)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="Home Depot Careers <no-reply@homedepot.ca>"
```

## Quick Setup Steps

1. **Copy the JWT_SECRET above** - This is a secure random string generated for you
2. **Set ADMIN_EMAILS** - Add the email(s) that should have admin access (comma-separated)
3. **Email (Optional)** - Only configure if you want to send emails:
   - For Gmail: Use an App Password (not your regular password)
   - For other providers: Update SMTP_HOST and SMTP_PORT accordingly

## Minimum Required Setup

For the app to work, you only need:
- ✅ `MONGODB_URI` (you have this)
- ✅ `JWT_SECRET` (generated above)
- ✅ `ADMIN_EMAILS` (set to your admin email)

The email variables are **optional** - the app will work without them, but won't send notification emails.

## Testing

After setting up `.env.local`:
1. Run `npm run dev`
2. Go to `http://localhost:3000/applicant-login`
3. Create an account with an email in `ADMIN_EMAILS` to get admin access
4. Or create a regular user account

## Notes

- **Admin Access**: Any user who signs up with an email in `ADMIN_EMAILS` will automatically get `role=admin`
- **Password Reset**: Uses Resend for forgot-password emails. See `RESEND_SETUP.md` for detailed setup.
- **Email Notifications**: If SMTP is not configured, applications will still be saved but no emails will be sent
- **Security**: Never commit `.env.local` to git (it should be in `.gitignore`)
