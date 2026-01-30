import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { VerificationCodeModel } from '@/models/VerificationCode';
import { hashPassword } from '@/lib/auth';

const BodySchema = z
  .object({
    email: z.string().email(),
    code: z.string().length(6, 'Code must be 6 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  })
  .refine((data) => /[a-z]/.test(data.password), {
    message: 'Password must contain a lowercase letter',
    path: ['password'],
  })
  .refine((data) => /[A-Z]/.test(data.password), {
    message: 'Password must contain an uppercase letter',
    path: ['password'],
  })
  .refine((data) => /[0-9]/.test(data.password), {
    message: 'Password must contain a number',
    path: ['password'],
  })
  .refine((data) => /[!@#$%^&*(),.?":{}|<>]/.test(data.password), {
    message: 'Password must contain a special character',
    path: ['password'],
  });

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      const msg = parsed.error.issues?.[0]?.message ?? 'Invalid input';
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const { email, code, password } = parsed.data;
    const emailLower = email.toLowerCase();

    await connectMongo();

    const verification = await VerificationCodeModel.findOne({
      email: emailLower,
      purpose: 'password_reset',
      code,
      expiresAt: { $gt: new Date() },
    });

    if (!verification) {
      return NextResponse.json(
        { error: 'Invalid or expired code. Please request a new one.' },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email: emailLower });
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    const passwordHash = await hashPassword(password);
    user.passwordHash = passwordHash;
    await user.save();

    await VerificationCodeModel.deleteOne({ _id: verification._id });

    return NextResponse.json({
      ok: true,
      message: 'Your password has been reset. You can now sign in with your new password.',
    });
  } catch (err: unknown) {
    console.error('Reset password error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
