'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ApplicationForm from '@/components/application/ApplicationForm';

interface JobData {
  id: string;
  title: string;
  address: string;
  reqId: string;
}

export default function ApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params?.jobId as string;
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!data.user) {
          router.push(`/applicant-login?redirect=/application/${jobId}&apply=true`);
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        router.push(`/applicant-login?redirect=/application/${jobId}&apply=true`);
      }
    };
    checkAuth();
  }, [jobId, router]);

  useEffect(() => {
    // Mock job data - in production, fetch from API
    const mockJobs: Record<string, JobData> = {
      '1': {
        id: '1',
        title: 'Data Entry Specialist',
        address: '2450 32 Ave NE, Calgary, AB T2E 6T8, Canada',
        reqId: 'Req163351',
      },
      '2': {
        id: '2',
        title: 'Overnight Freight Associate Part Time (St.John\'s)',
        address: '70 Kelsey Drive, St. Johns, NL A1B 5C7, Canada',
        reqId: 'Req164191',
      },
      '3': {
        id: '3',
        title: 'Electrical/Plumbing Sales Part Time (St.John\'s)',
        address: '70 Kelsey Drive, St. Johns, NL A1B 5C7, Canada',
        reqId: 'Req164345',
      },
    };

    // Simulate API call
    setTimeout(() => {
      const jobData = mockJobs[jobId] || mockJobs['1'];
      setJob(jobData);
      setLoading(false);
    }, 300);
  }, [jobId]);

  if (loading || isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Job Not Found</h1>
          <Link href="/job-search" className="text-orange-600 hover:underline">
            Return to Job Search
          </Link>
        </div>
      </div>
    );
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
                <Link href="/applicant-login" className="hover:underline">Sign In</Link>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Link href="/" className="text-sm hover:underline">Home</Link>
                <Link href="/introduce-yourself" className="text-sm hover:underline">Introduce Yourself</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back to Job Posting */}
          <Link 
            href={`/job/${jobId}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Job Posting
          </Link>

          {/* Job Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-8">{job.title}</h1>

          {/* Application Form */}
          <ApplicationForm jobId={jobId} jobTitle={job.title} jobAddress={job.address} reqId={job.reqId} />
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
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
