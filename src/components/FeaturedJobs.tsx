'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
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

        {/* Contact Our Hiring Team - Table cell cards */}
        <div className="w-full">
          <div className="mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-2 sm:mb-3">
              Contact Our Hiring Team
            </h2>
            <div className="h-px bg-black w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Christina Binkley Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 md:p-5 flex items-start gap-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100">
                  <Image
                    src="/chrisina-binkley.jpeg"
                    alt="Christina Binkley"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-black">
                        Christina Binkley
                      </h3>
                      <p className="text-sm text-gray-700 mt-0.5">
                        Human Resources Director at The Home Depot
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                        Atlanta, GA, US
                      </p>
                    </div>
                    <a
                      href="mailto:support@thehomedepott.com"
                      className="flex-shrink-0 px-4 py-3 bg-[#ff6600] hover:bg-[#212529] text-white text-sm font-bold transition-all duration-300 no-underline"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 md:px-5 py-3 pl-[calc(1rem+5rem)] md:pl-[calc(1.25rem+5.25rem)] space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  <span>Email:</span>
                  <a href="mailto:support@thehomedepott.com" className="text-black hover:text-orange-600 underline break-all">
                    support@thehomedepott.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  <span>Phone:</span>
                  <span>[Phone Number - To Be Updated]</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  <span>International:</span>
                  <span>[International Number - To Be Updated]</span>
                </p>
              </div>
            </div>

            {/* Yvonda Jackson Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-4 md:p-5 flex items-start gap-4">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-gray-100">
                  <Image
                    src="/yvonda.jpeg"
                    alt="Yvonda Jackson"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-black">
                        Yvonda Jackson
                      </h3>
                      <p className="text-sm text-gray-700 mt-0.5">
                        Senior Human Resources Manager at The Home Depot
                      </p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
                        Atlanta, GA, US
                      </p>
                    </div>
                    <a
                      href="mailto:support@thehomedepott.com"
                      className="flex-shrink-0 px-4 py-3 bg-[#ff6600] hover:bg-[#212529] text-white text-sm font-bold transition-all duration-300 no-underline"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 md:px-5 py-3 pl-[calc(1rem+5rem)] md:pl-[calc(1.25rem+5.25rem)] space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  <span>Email:</span>
                  <a href="mailto:support@thehomedepott.com" className="text-black hover:text-orange-600 underline break-all">
                    support@thehomedepott.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  <span>Phone:</span>
                  <span>[Phone Number - To Be Updated]</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  <span>International:</span>
                  <span>[International Number - To Be Updated]</span>
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