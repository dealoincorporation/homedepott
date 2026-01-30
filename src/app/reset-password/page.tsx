'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') ?? '';

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false,
    minLength: false,
  });

  useEffect(() => {
    if (emailParam) setEmail(decodeURIComponent(emailParam));
  }, [emailParam]);

  useEffect(() => {
    if (password) {
      setPasswordRequirements({
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numeric: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        minLength: password.length >= 8,
      });
    }
  }, [password]);

  const allMet = Object.values(passwordRequirements).every(Boolean);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const canSubmit = email.trim() && code.length === 6 && allMet && passwordsMatch;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? 'Something went wrong');
      }

      toast.success('Password reset successfully. Sign in with your new password.');
      router.push('/applicant-login');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    if (!email.trim()) return;
    setResendLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? 'Failed to resend');
      }

      toast.success('New code sent. Check your email.');
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <AuthPageLayout>
      <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-black mb-2 text-center">Reset Password</h1>
            <p className="text-gray-600 text-sm text-center mb-6">
              Enter the 6-digit code from your email and choose a new password.
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Verification Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full border border-gray-400 rounded px-4 py-3 text-center text-xl tracking-[0.5em] font-mono"
                  placeholder="000000"
                  maxLength={6}
                  inputMode="numeric"
                />
                <button
                  type="button"
                  onClick={onResend}
                  disabled={resendLoading}
                  className="mt-1 text-sm text-orange-600 hover:underline disabled:opacity-50"
                >
                  {resendLoading ? 'Sending…' : 'Resend code'}
                </button>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-400 rounded px-4 py-3 pr-12"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
                  </button>
                </div>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  {[
                    ['lowercase', 'A lowercase character'],
                    ['uppercase', 'An uppercase character'],
                    ['numeric', 'A number'],
                    ['special', 'A special character'],
                    ['minLength', 'At least 8 characters'],
                  ].map(([key, label]) => (
                    <li key={key} className={passwordRequirements[key as keyof typeof passwordRequirements] ? 'text-green-600' : ''}>
                      {passwordRequirements[key as keyof typeof passwordRequirements] ? '✓' : '•'} {label}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-400 rounded px-4 py-3"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                {confirmPassword && !passwordsMatch && (
                  <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-3 rounded"
              >
                {loading ? 'Resetting…' : 'Reset Password'}
              </button>

              <p className="text-center text-sm">
                <Link href="/applicant-login" className="text-blue-600 hover:underline">
                  Back to Sign In
                </Link>
              </p>
            </form>
          </div>
      </div>
    </AuthPageLayout>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
