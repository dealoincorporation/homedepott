'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') ?? '';

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (emailParam) setEmail(decodeURIComponent(emailParam));
  }, [emailParam]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || code.length !== 6) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), code }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? 'Invalid or expired code');
      }

      toast.success('Email verified! Welcome.');
      const redirectParam = searchParams.get('redirect');
      const apply = searchParams.get('apply');
      if (apply === 'true' && redirectParam) {
        const jobIdMatch = redirectParam.match(/\/(?:application|apply)\/([^/?]+)/);
        router.push(jobIdMatch?.[1] ? `/application/${jobIdMatch[1]}` : redirectParam);
      } else {
        router.push(data?.user?.role === 'admin' ? '/admin' : '/dashboard');
      }
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
      const res = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), purpose: 'email_verification' }),
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
            <h1 className="text-2xl font-bold text-black mb-2 text-center">Verify Your Email</h1>
            <p className="text-gray-600 text-sm text-center mb-6">
              Enter the 6-digit code we sent to your email.
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
              </div>

              <button
                type="submit"
                disabled={loading || code.length !== 6}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-3 rounded"
              >
                {loading ? 'Verifying…' : 'Verify Email'}
              </button>

              <button
                type="button"
                onClick={onResend}
                disabled={resendLoading}
                className="w-full text-orange-600 hover:underline text-sm disabled:opacity-50"
              >
                {resendLoading ? 'Sending…' : "Didn't receive a code? Resend"}
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

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
