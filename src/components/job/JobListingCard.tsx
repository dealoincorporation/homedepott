'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

export interface JobListingCardProps {
  id: string;
  title: string;
  address: string;
  reqId: string;
  jobType: string;
  workType?: string;
  workArrangement?: string;
  isNew?: boolean;
  onShare?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
  isSaved?: boolean;
}

const JobListingCard: FC<JobListingCardProps> = ({
  id,
  title,
  address,
  reqId,
  jobType,
  workType,
  workArrangement,
  isNew = false,
  onShare,
  onSave,
  isSaved = false,
}) => {
  const router = useRouter();
  const [saved, setSaved] = useState(isSaved);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onShare?.(id);
  };

  const handleCardClick = () => {
    router.push(`/job/${id}`);
  };

  // Use workType if available, otherwise fall back to workArrangement
  const displayWorkType = workType || workArrangement || '';

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white lg:border lg:border-gray-200 lg:rounded-lg lg:hover:border-orange-600 lg:hover:shadow-[0_2px_8px_rgba(255,102,0,0.1)] transition-all duration-200 relative cursor-pointer"
    >
      {/* NEW Banner */}
      {isNew && (
        <div className="absolute top-0 left-0 bg-black text-white text-xs font-bold px-3 py-1 transform -rotate-12 origin-top-left z-10">
          NEW
        </div>
      )}

      <div className="flex gap-3 lg:gap-4 items-start p-4 lg:p-5 md:p-6">
        {/* Home Depot Logo - same on mobile and desktop */}
        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 relative flex items-center justify-center">
          <Image
            src="/images/icons/logo.8eb14c19.png"
            alt="The Home Depot Logo"
            width={80}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Job Details */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-sm lg:text-base md:text-lg font-bold text-black uppercase mb-2 lg:mb-1.5 leading-snug">
            {title}
          </h3>
          
          {/* Mobile Layout: Stacked vertically */}
          <div className="lg:hidden space-y-1.5">
            {/* Location */}
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-700">{address}</span>
            </div>

            {/* Req ID */}
            <div className="flex items-center">
              <span className="text-sm text-gray-700 font-medium">#{reqId}</span>
            </div>

            {/* Job Type and Work Arrangement in a row */}
            <div className="flex items-center gap-4">
              {/* Job Type */}
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-700">{jobType}</span>
              </div>

              {/* Work Type/Arrangement */}
              {displayWorkType && (
                <div className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm text-gray-700">{displayWorkType}</span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Layout: Horizontal with icons */}
          <div className="hidden lg:flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600 md:text-gray-700">
            {/* Location */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <i className="fas fa-map-marker-alt text-red-600 md:text-gray-600 text-sm w-4"></i>
              <span>{address}</span>
            </div>

            {/* Req ID */}
            <div className="flex items-center">
              <span className="font-medium">Req ID: {reqId}</span>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-1.5 md:gap-2">
              <i className="fas fa-calendar text-gray-600 text-sm w-4"></i>
              <span>{jobType}</span>
            </div>

            {/* Work Type/Arrangement */}
            {displayWorkType && (
              <div className="flex items-center gap-1.5 md:gap-2">
                <i className="fas fa-user text-gray-600 text-sm w-4"></i>
                <span>{displayWorkType}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Icons - Desktop only */}
        <div className="hidden lg:flex flex-shrink-0 flex-row gap-3 items-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 p-2 bg-transparent border-none cursor-pointer text-gray-600 text-[11px] font-semibold uppercase hover:text-orange-600 transition-colors"
            aria-label={`Share ${title}`}
          >
            <i className="fas fa-share-alt text-lg mb-0.5"></i>
            <span>SHARE</span>
          </button>
          <button
            onClick={handleSave}
            className={`flex flex-col items-center gap-1 p-2 bg-transparent border-none cursor-pointer text-[11px] font-semibold uppercase transition-colors ${
              saved
                ? 'text-orange-600'
                : 'text-gray-600 hover:text-orange-600'
            }`}
            aria-label={saved ? `Unsave ${title}` : `Save ${title}`}
          >
            <i className={`fas fa-bookmark text-lg mb-0.5 ${saved ? 'fill-current' : ''}`}></i>
            <span>SAVE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
