'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';

function ApplicantLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false,
    minLength: false,
  });

  useEffect(() => {
    if (mode === 'register' && password) {
      setPasswordRequirements({
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        numeric: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        minLength: password.length >= 8,
      });
    }
  }, [password, mode]);

  const canSubmit = useMemo(() => {
    if (!email.trim() || !password) return false;
    if (mode === 'register' && !name.trim()) return false;
    if (mode === 'register') {
      const allRequirementsMet = Object.values(passwordRequirements).every(req => req);
      if (!allRequirementsMet) return false;
    }
    return true;
  }, [email, password, name, mode, passwordRequirements]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(mode === 'login' ? '/api/auth/login' : '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          mode === 'login'
            ? { email, password }
            : { name: name.trim(), email: email.trim(), password },
        ),
      });
      
      let errorMessage = 'Something went wrong';
      try {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
          user?: { role?: string };
          needsVerification?: boolean;
          email?: string;
        };
        if (!res.ok) {
          // Redirect to verify-email if login failed due to unverified email
          if (res.status === 403 && data.needsVerification && data.email) {
            router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
            return;
          }
          errorMessage = data?.error ?? 'Something went wrong';
          throw new Error(errorMessage);
        }

        // Register: redirect to verify-email with code input
        if (data.needsVerification && data.email) {
          toast.success('Check your email for the verification code.');
          const params = new URLSearchParams({ email: data.email });
          const redirectParam = searchParams.get('redirect');
          const apply = searchParams.get('apply');
          if (redirectParam) params.set('redirect', redirectParam);
          if (apply) params.set('apply', apply);
          router.push(`/verify-email?${params.toString()}`);
          return;
        }

        const role = data?.user?.role as string | undefined;

        toast.success(mode === 'login' ? 'Successfully signed in!' : 'Account created successfully!');

        const apply = searchParams.get('apply');
        const redirectParam = searchParams.get('redirect');

        if (apply === 'true' && redirectParam) {
          const jobIdMatch = redirectParam.match(/\/(?:application|apply)\/([^/?]+)/);
          if (jobIdMatch?.[1]) {
            router.push(`/application/${jobIdMatch[1]}`);
            return;
          }
          router.push(redirectParam);
          return;
        }

        router.push(role === 'admin' ? '/admin' : '/dashboard');
      } catch (parseError: unknown) {
        if (parseError instanceof Error && parseError.message !== 'Something went wrong') {
          errorMessage = parseError.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err: any) {
      const errorMsg = err?.message ?? 'An unexpected error occurred. Please try again.';
      setError(errorMsg);
      // Show toast notification for all errors
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Dark Grey Header */}
      <header className="bg-[#2a2a2a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left Side - Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/icons/logo.8eb14c19.png"
                  alt="The Home Depot Logo"
                  width={60}
                  height={60}
                  className="object-contain mr-2"
                />
                <span className="text-white text-sm md:text-base font-bold">CAREERS</span>
              </Link>
            </div>

            {/* Right Side - Language, Sign In, Navigation */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 002 2h2.945M21 12a9.002 9.002 0 01-9 9m9-9a9.002 9.002 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9a9.002 9.002 0 01-9-9m9 9c0 5-4 9-9 9s-9-4-9-9m9-9c0-5 4-9 9-9s9 4 9 9" />
                </svg>
                <span>English</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="hover:underline">Sign In</span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Link href="/" className="text-sm hover:underline">Home</Link>
                <Link href="/introduce-yourself" className="text-sm hover:underline">Introduce Yourself</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-black">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </h1>
            </div>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Jane Doe"
                      autoComplete="name"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-400 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="you@example.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-400 rounded px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <i className="fas fa-eye-slash"></i>
                      ) : (
                        <i className="fas fa-eye"></i>
                      )}
                    </button>
                  </div>
                  {mode === 'register' && (
                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-semibold text-gray-800 mb-2">Password Requirements:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className={`flex items-center ${passwordRequirements.lowercase ? 'text-green-600' : ''}`}>
                          <span className="mr-2">{passwordRequirements.lowercase ? '✓' : '•'}</span>
                          A lowercase character
                        </li>
                        <li className={`flex items-center ${passwordRequirements.uppercase ? 'text-green-600' : ''}`}>
                          <span className="mr-2">{passwordRequirements.uppercase ? '✓' : '•'}</span>
                          An uppercase character
                        </li>
                        <li className={`flex items-center ${passwordRequirements.numeric ? 'text-green-600' : ''}`}>
                          <span className="mr-2">{passwordRequirements.numeric ? '✓' : '•'}</span>
                          A numeric character
                        </li>
                        <li className={`flex items-center ${passwordRequirements.special ? 'text-green-600' : ''}`}>
                          <span className="mr-2">{passwordRequirements.special ? '✓' : '•'}</span>
                          A special character
                        </li>
                        <li className={`flex items-center ${passwordRequirements.minLength ? 'text-green-600' : ''}`}>
                          <span className="mr-2">{passwordRequirements.minLength ? '✓' : '•'}</span>
                          A minimum of 8 characters
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-300 text-white font-bold py-3 rounded transition-colors"
                >
                  {loading ? 'Please wait…' : mode === 'login' ? 'Sign In' : 'Create Account'}
                </button>

                <div className="text-center text-sm text-gray-700 space-y-3">
                  {mode === 'login' ? (
                    <div>
                      Don&apos;t have an account yet?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('register');
                          setShowPassword(false);
                        }}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Create Account
                      </button>
                    </div>
                  ) : (
                    <div>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setShowPassword(false);
                        }}
                        className="text-blue-600 hover:underline font-semibold"
                      >
                        Sign In
                      </button>
                    </div>
                  )}

                  <div>
                    <Link href="/forgot-password" className="text-blue-600 hover:underline font-semibold">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            {/* Follow Us Section */}
            <div className="mb-6">
              <h3 className="text-black font-semibold mb-4">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.facebook.com/homedepotcanada"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.youtube.com/homedepotcanada"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="https://twitter.com/homedepotcanada"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                >
                  <i className="fab fa-x-twitter"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/the-home-depot-canada/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  aria-label="Reviews"
                  className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-black hover:bg-gray-300 transition-colors"
                >
                  <i className="fas fa-comment"></i>
                </a>
              </div>
            </div>

            {/* Privacy Policy Link */}
            <div className="mb-6">
              <Link
                href="/associate-privacy-statement"
                className="text-blue-600 hover:underline font-semibold"
              >
                Associate Privacy Policy
              </Link>
            </div>

            {/* Workday Logo */}
            <div className="flex justify-center">
              <div className="text-gray-400 text-sm font-light">
                workday
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function ApplicantLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ApplicantLoginContent />
    </Suspense>
  );
}
