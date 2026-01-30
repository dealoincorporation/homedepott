'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import { FEATURED_JOB_SLUGS, featuredJobsData } from '@/data/featured-jobs';

const FeaturedJobs: FC = () => {
  const featuredJobs = FEATURED_JOB_SLUGS.slice(0, 4).map((slug) => {
    const job = featuredJobsData[slug];
    return {
      title: job?.title ?? slug,
      image: job?.image ?? '/images/assistant-store-manager-fj.dd1dc314.webp',
      href: `/featured-jobs/${slug}`,
    };
  });

  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-10 md:mb-12 uppercase tracking-tight">
          Featured Jobs
        </h2>

        {/* Grid Layout - 2x4 for Jobs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8">
          {featuredJobs.map((job) => (
            <Link
              key={job.href}
              href={job.href}
              className="group relative block aspect-square overflow-hidden border border-black shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={job.image}
                  alt={`${job.title} Image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                />
                
                {/* Gradient Overlay - Bottom Left */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Job Title - Bottom Left */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <h3 className="text-white text-base md:text-lg lg:text-xl font-bold uppercase leading-tight tracking-tight">
                    {job.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Information Box - Full Width */}
        <div className="w-full border border-black bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md">
          {/* Title */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-3">
              Contact Our Hiring Team
            </h2>
            <div className="h-px bg-black w-full"></div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Hiring Manager Section */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="w-full max-w-48 sm:max-w-56 md:max-w-64 lg:max-w-72 aspect-[3/4] mb-3 sm:mb-4 rounded-lg border-2 border-black overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src="/images/hr.jpeg"
                  alt="Hiring Manager"
                  width={288}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-1 sm:mb-2 text-center sm:text-left">
                Hiring Manager
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-black text-center sm:text-left">
                Available for inquiries and applications
              </p>
            </div>

            {/* HR Manager 1 Section */}
            <div className="flex flex-col items-center sm:items-start">
              <div className="w-full max-w-48 sm:max-w-56 md:max-w-64 lg:max-w-72 aspect-[3/4] mb-3 sm:mb-4 rounded-lg border-2 border-black overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src="/images/hr_2.jpeg"
                  alt="HR Manager"
                  width={288}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-1 sm:mb-2 text-center sm:text-left">
                HR Manager
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-black text-center sm:text-left">
                Human Resources
              </p>
            </div>

            {/* HR Coordinator Section */}
            <div className="flex flex-col items-center sm:items-start md:col-span-2 lg:col-span-1">
              <div className="w-full max-w-48 sm:max-w-56 md:max-w-64 lg:max-w-72 aspect-[3/4] mb-3 sm:mb-4 rounded-lg border-2 border-black overflow-hidden bg-gray-200 flex-shrink-0">
                <Image
                  src="/images/hr_3.jpeg"
                  alt="HR Coordinator"
                  width={288}
                  height={384}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-black mb-1 sm:mb-2 text-center sm:text-left">
                HR Coordinator
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-black text-center sm:text-left">
                Human Resources
              </p>
            </div>
          </div>

          {/* Contact Details - Full Width Below */}
          <div className="mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-6 border-t border-gray-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-black mb-1 sm:mb-2">
                  Email:
                </p>
                <a 
                  href="mailto:support@thehomedepott.com" 
                  className="text-sm sm:text-base md:text-lg text-black hover:text-orange-600 underline break-all"
                >
                  support@thehomedepott.com
                </a>
              </div>
              
              <div>
                <p className="text-xs sm:text-sm md:text-base font-semibold text-black mb-1 sm:mb-2">
                  Phone:
                </p>
                <p className="text-sm sm:text-base md:text-lg text-black">
                  [Phone Number - To Be Updated]
                </p>
              </div>
              
              <div className="sm:col-span-2 lg:col-span-1">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-black mb-1 sm:mb-2">
                  International:
                </p>
                <p className="text-sm sm:text-base md:text-lg text-black">
                  [International Number - To Be Updated]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;