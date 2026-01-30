import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { VerificationCodeModel } from '@/models/VerificationCode';
import { sendVerificationCodeEmail } from '@/lib/sendEmail';

const BodySchema = z.object({
  email: z.string().email(),
  purpose: z.enum(['email_verification', 'password_reset']),
});

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
    }

    const { email, purpose } = parsed.data;
    const emailLower = email.toLowerCase();

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    await connectMongo();

    if (purpose === 'password_reset') {
      const user = await UserModel.findOne({ email: emailLower });
      if (!user) {
        return NextResponse.json({
          ok: true,
          message: 'If an account exists with this email, you will receive a verification code shortly.',
        });
      }
    } else {
      // email_verification - user must exist (from registration)
      const user = await UserModel.findOne({ email: emailLower });
      if (!user) {
        return NextResponse.json({ error: 'No account found with this email.' }, { status: 404 });
      }
      if (user.emailVerified) {
        return NextResponse.json({ error: 'Email is already verified.' }, { status: 400 });
      }
    }

    // Delete any existing codes for this email + purpose
    await VerificationCodeModel.deleteMany({ email: emailLower, purpose });

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await VerificationCodeModel.create({
      email: emailLower,
      code,
      purpose,
      expiresAt,
    });

    const user = await UserModel.findOne({ email: emailLower });

    try {
      await sendVerificationCodeEmail(email, code, purpose, user?.name);
    } catch (emailError) {
      console.error('Email send error:', emailError);
      await VerificationCodeModel.deleteOne({ email: emailLower, purpose, code });
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message:
        purpose === 'password_reset'
          ? 'If an account exists with this email, you will receive a verification code shortly.'
          : 'Verification code sent. Check your email.',
    });
  } catch (err: unknown) {
    console.error('Send code error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
