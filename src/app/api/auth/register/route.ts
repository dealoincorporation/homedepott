import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { hashPassword, parseAdminEmails } from '@/lib/auth';
import { VerificationCodeModel } from '@/models/VerificationCode';
import { sendVerificationCodeEmail } from '@/lib/sendEmail';

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(100).optional(),
});

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { email, password, name } = parsed.data;
    const emailLower = email.toLowerCase();

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    try {
      await connectMongo();
    } catch (mongoError: unknown) {
      console.error('MongoDB connection error:', mongoError);
      return NextResponse.json(
        {
          error: 'Database connection failed. Please try again later or contact support if the problem persists.',
        },
        { status: 500 }
      );
    }

    const existing = await UserModel.findOne({ email: emailLower }).lean();
    if (existing) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    }

    const admins = parseAdminEmails();
    const role = admins.has(emailLower) ? 'admin' : 'user';

    const passwordHash = await hashPassword(password);
    const user = await UserModel.create({
      email: emailLower,
      name,
      passwordHash,
      role,
      emailVerified: false,
    });

    await VerificationCodeModel.deleteMany({
      email: emailLower,
      purpose: 'email_verification',
    });

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await VerificationCodeModel.create({
      email: emailLower,
      code,
      purpose: 'email_verification',
      expiresAt,
    });

    try {
      await sendVerificationCodeEmail(email, code, 'email_verification', name);
    } catch (emailError) {
      console.error('Email send error:', emailError);
      await VerificationCodeModel.deleteOne({ email: emailLower, purpose: 'email_verification' });
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      needsVerification: true,
      email: emailLower,
      message: 'Account created. Check your email for the verification code.',
    });
  } catch (error: unknown) {
    console.error('Register error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
