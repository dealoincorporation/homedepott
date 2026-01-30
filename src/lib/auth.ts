import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export type AuthRole = 'user' | 'admin';

export type SessionPayload = {
  sub: string; // user id
  email: string;
  role: AuthRole;
};

export const SESSION_COOKIE_NAME = 'hd_session';

function requireJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('Missing JWT_SECRET env var');
  return secret;
}

export function signSession(payload: SessionPayload) {
  const secret = requireJwtSecret();
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifySession(token: string): SessionPayload {
  const secret = requireJwtSecret();
  return jwt.verify(token, secret) as SessionPayload;
}

export function setSessionCookie(cookies: ReadonlyRequestCookies, token: string) {
  cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearSessionCookie(cookies: ReadonlyRequestCookies) {
  cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

/** Password reset token: expires in 1 hour */
export function signPasswordResetToken(userId: string) {
  const secret = requireJwtSecret();
  return jwt.sign({ sub: userId, purpose: 'password-reset' }, secret, { expiresIn: '1h' });
}

export function verifyPasswordResetToken(token: string): string {
  const secret = requireJwtSecret();
  const payload = jwt.verify(token, secret) as { sub: string; purpose?: string };
  if (payload.purpose !== 'password-reset') throw new Error('Invalid token');
  return payload.sub;
}

export function parseAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? '';
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

