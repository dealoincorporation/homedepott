import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Gmail credentials not configured');
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}

export async function sendVerificationCodeEmail(
  to: string,
  code: string,
  purpose: 'email_verification' | 'password_reset',
  name?: string
) {
  const transporter = getTransporter();
  const fromName = process.env.EMAIL_FROM_NAME || 'The Home Depot Careers';

  const subject =
    purpose === 'email_verification'
      ? 'Verify Your Email - The Home Depot Careers'
      : 'Your Password Reset Code - The Home Depot Careers';

  const title =
    purpose === 'email_verification' ? 'Verify Your Email' : 'Reset Your Password';

  const body =
    purpose === 'email_verification'
      ? 'Use the code below to verify your email address and activate your account.'
      : 'Use the code below to reset your password.';

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ff6600;">${title}</h2>
      <p>Hi${name ? ` ${name}` : ''},</p>
      <p>${body}</p>
      <p style="margin: 24px 0; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #212529;">${code}</p>
      <p style="color: #666; font-size: 14px;">This code expires in 15 minutes. If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `${fromName} <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
