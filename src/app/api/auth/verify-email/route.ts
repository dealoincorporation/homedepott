import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { VerificationCodeModel } from '@/models/VerificationCode';
import { setSessionCookie, signSession } from '@/lib/auth';

const BodySchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'Code must be 6 digits'),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues?.[0]?.message ?? 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, code } = parsed.data;
    const emailLower = email.toLowerCase();

    await connectMongo();

    const verification = await VerificationCodeModel.findOne({
      email: emailLower,
      purpose: 'email_verification',
      code,
      expiresAt: { $gt: new Date() },
    });

    if (!verification) {
      return NextResponse.json(
        { error: 'Invalid or expired code. Please request a new one.' },
        { status: 400 }
      );
    }

    const user = await UserModel.findOneAndUpdate(
      { email: emailLower },
      { emailVerified: true },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    await VerificationCodeModel.deleteOne({ _id: verification._id });

    const token = signSession({
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    });
    const cookieStore = await cookies();
    setSessionCookie(cookieStore, token);

    return NextResponse.json({
      ok: true,
      user: { id: user._id.toString(), email: user.email, name: user.name, role: user.role },
    });
  } catch (err: unknown) {
    console.error('Verify email error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
