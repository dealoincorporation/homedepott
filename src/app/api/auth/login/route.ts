import { NextResponse } from 'next/server';
import { z } from 'zod';
import { cookies } from 'next/headers';

import { connectMongo } from '@/lib/mongoose';
import { UserModel } from '@/models/User';
import { setSessionCookie, signSession, verifyPassword } from '@/lib/auth';

const BodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => null);
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { email, password } = parsed.data;

    try {
      await connectMongo();
    } catch (mongoError: any) {
      console.error('MongoDB connection error:', mongoError);
      return NextResponse.json({ 
        error: 'Database connection failed. Please try again later or contact support if the problem persists.' 
      }, { status: 500 });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Require email verification (treat undefined as verified for backward compatibility)
    if (user.emailVerified === false) {
      return NextResponse.json(
        { error: 'Please verify your email before signing in. Check your inbox for the verification code.', needsVerification: true, email: user.email },
        { status: 403 }
      );
    }

    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

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
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      error: error?.message ?? 'An unexpected error occurred. Please try again later.' 
    }, { status: 500 });
  }
}

