'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import AuthPageLayout from '@/components/auth/AuthPageLayout';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error ?? 'Something went wrong');
      }

      setSent(true);
      toast.success('Check your email for the verification code.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthPageLayout>
      <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-black mb-2 text-center">Forgot Password</h1>
            <p className="text-gray-600 text-sm text-center mb-6">
              Enter your email and we&apos;ll send you a 6-digit code to reset your password.
            </p>

            {sent ? (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
                  If an account exists with that email, you should receive a verification code shortly.
                </div>
                <button
                  onClick={() => router.push(`/reset-password?email=${encodeURIComponent(email)}`)}
                  className="block w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded text-center"
                >
                  Enter Code
                </button>
                <Link
                  href="/applicant-login"
                  className="block w-full text-center py-3 text-gray-600 hover:underline"
                >
                  Back to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-3 rounded"
                >
                  {loading ? 'Sending…' : 'Send Code'}
                </button>

                <p className="text-center text-sm">
                  <Link href="/applicant-login" className="text-blue-600 hover:underline">
                    Back to Sign In
                  </Link>
                </p>
              </form>
            )}
          </div>
      </div>
    </AuthPageLayout>
  );
}
