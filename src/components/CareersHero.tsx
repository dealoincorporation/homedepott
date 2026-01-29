// components/CareersHero.tsx
import type { FC } from 'react';
import Link from 'next/link';

const CareersHero: FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      {/* Top utility bar - overlaid on desktop */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-black text-white text-xs sm:text-sm py-2 px-4 md:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-end items-center gap-5 sm:gap-8 md:gap-10">
          <Link href="#" className="hover:underline transition-colors">
            ACCESSIBILITY
          </Link>
          <Link href="#" className="hover:underline transition-colors">
            APPLICANT LOGIN
          </Link>
          <Link href="/job-search" className="hover:underline transition-colors">
            START YOUR REMOTE CAREER
          </Link>
          <Link
            href="#"
            className="border border-white/40 px-2.5 py-1 rounded hover:bg-white/10 transition-colors"
          >
            FRANÇAIS
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center bg-gradient-to-b from-black/60 via-black/70 to-black/80">
        {/* Background image from public folder */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
             style={{ backgroundImage: "url('/images/hero/warehouse-hero.jpg')" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-32 pb-16 md:pb-20 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8">
            Find Your Remote Career
            <br className="hidden sm:block" />
            <span className="text-orange-500">at The Home Depot Canada & USA</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light mb-10 md:mb-14 max-w-4xl mx-auto leading-relaxed">
            Where you&apos;re empowered to make a real impact from home—foster growth,
            <br className="hidden md:block" />
            build your career, and shape the future of home improvement through remote work.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8">
            <Link
              href="/job-search"
              className="inline-block px-10 py-5 bg-orange-600 hover:bg-orange-700 text-white text-lg md:text-xl font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Search All Jobs
            </Link>

            <Link
              href="/job-search"
              className="inline-block px-10 py-5 border-2 border-white/80 hover:bg-white/10 text-white text-lg md:text-xl font-semibold rounded-lg transition-all duration-300 text-center"
            >
              Start Your Remote Career
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersHero;