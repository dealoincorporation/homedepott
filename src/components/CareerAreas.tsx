'use client';

import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import Link from 'next/link';
import { Card } from '@/components/common';
import { CAREER_AREAS, CAREER_OPTIONS } from '@/constants';

const CareerAreas: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const careerLinks = CAREER_OPTIONS.filter(option => option.value !== '');

  return (
    <div className="content-wrapper mainPage">
      <div className="main-container">
        <div className="holder">
          <div className="content">
            <div className="joinUsRight">
              <div className="card-container">
                {CAREER_AREAS.map((area) => (
                  <Card
                    key={area.href}
                    title={area.title}
                    href={area.href}
                    image={area.image}
                  />
                ))}
              </div>
            </div>
            <div className="joinUsLeft">
              <h3 className="text-gray-600">Join Us Today!</h3>
              <h2 className="text-black">
                Discover Your Opportunity at The Home Depot Canada
                <label className="ada-information">Press ENTER to read the content or TAB to skip.</label>
              </h2>
              <div className="copy">
                <p>At The Home Depot, there's a job opportunity for everyone. Whether you're looking for part-time work, a long-term career, in-store or beyond, we're always searching for talented individuals to join our team. Once you're here, you'll discover endless possibilities to explore new roles, learn new skills, and grow your career.</p>
              </div>
              
              {/* Custom Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full md:w-auto min-w-[280px] flex items-center justify-between gap-3 px-5 py-3 bg-white border-2 border-gray-300 rounded-lg text-gray-800 font-medium hover:border-orange-600 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                  aria-haspopup="listbox"
                >
                  <span>Browse All Our Career Areas</span>
                  <svg 
                    className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute top-full left-0 mt-2 w-full md:w-auto min-w-[280px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    {careerLinks.map((option) => (
                      <Link
                        key={option.value}
                        href={option.value}
                        className="block px-5 py-3 text-gray-800 hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-gray-100 last:border-b-0"
                        onClick={() => setIsOpen(false)}
                      >
                        {option.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerAreas;