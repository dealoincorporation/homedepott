'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { featuredJobsData } from '@/data/featured-jobs';

interface JobDetailProps {
  jobId: string;
}

interface JobData {
  id: string;
  title: string;
  address: string;
  reqId: string;
  jobType: string;
  workType?: string;
  workArrangement?: string;
  careerArea: string;
  description: string;
  overview: string;
  responsibilities: string[];
  qualifications?: string[];
}

const JobDetail: React.FC<JobDetailProps> = ({ jobId }) => {
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate job data dynamically - matches JobSearchResults logic
    const generateJobData = (id: string): JobData | null => {
      // Map job IDs to featured jobs data
      const featuredJobMap: Record<string, keyof typeof featuredJobsData> = {
        '1': 'data-entry',
        '2': 'payroll-clerk',
        '3': 'customer-representative',
        '4': 'virtual-assistant',
      };

      // Check if this job ID maps to a featured job
      const featuredJobKey = featuredJobMap[id];
      if (featuredJobKey && featuredJobsData[featuredJobKey]) {
        const featuredJob = featuredJobsData[featuredJobKey];
        return {
          id,
          title: featuredJob.title.toUpperCase(),
          address: featuredJob.jobLocation || 'Virtual, AB',
          reqId: featuredJob.reqId || `Req${160000 + parseInt(id)}`,
          jobType: featuredJob.jobType || 'Full Time',
          workType: featuredJob.type || 'Virtual',
          careerArea: featuredJob.careerArea || 'Corporate',
          description: featuredJob.description || 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: featuredJob.positionOverview || featuredJob.aboutRole || '',
          responsibilities: featuredJob.keyResponsibilities || featuredJob.whatYoullDo || [],
          qualifications: featuredJob.qualifications || featuredJob.whatWereLookingFor || [],
        };
      }

      // Base jobs with detailed information (for other job types)
      const baseJobs: Record<string, JobData> = {
        '5': {
          id: '5',
          title: 'DATA ENTRY SPECIALIST',
          address: '2450 Victoria Park Ave, Toronto, ON M2J 4A2, Canada',
          reqId: 'Req164117',
          jobType: 'Part Time',
          workType: 'Virtual',
          careerArea: 'Corporate',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: featuredJobsData['data-entry']?.positionOverview || 'As a Data Entry Specialist, you\'ll be responsible for accurately entering and maintaining data in our systems.',
          responsibilities: featuredJobsData['data-entry']?.keyResponsibilities || [],
          qualifications: featuredJobsData['data-entry']?.qualifications || [],
        },
        '6': {
          id: '6',
          title: 'PAYROLL SPECIALIST',
          address: '2450 Marine Dr, Vancouver, BC V7V 1J2, Canada',
          reqId: 'Req164118',
          jobType: 'Full Time',
          workType: 'Virtual',
          careerArea: 'Corporate',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: featuredJobsData['payroll-clerk']?.positionOverview || 'As a Payroll Specialist, you\'ll be responsible for processing employee payroll accurately and on time.',
          responsibilities: featuredJobsData['payroll-clerk']?.keyResponsibilities || [],
          qualifications: featuredJobsData['payroll-clerk']?.qualifications || [],
        },
        '7': {
          id: '7',
          title: 'CUSTOMER SERVICE REPRESENTATIVE',
          address: '2450 32 Ave NE, Calgary, AB T2E 6T8, Canada',
          reqId: 'Req164119',
          jobType: 'Full Time',
          workType: 'Virtual',
          careerArea: 'Corporate',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: featuredJobsData['customer-representative']?.positionOverview || 'As a Customer Service Representative, you\'ll be the primary point of contact for our customers.',
          responsibilities: featuredJobsData['customer-representative']?.keyResponsibilities || [],
          qualifications: featuredJobsData['customer-representative']?.qualifications || [],
        },
        '8': {
          id: '8',
          title: 'REMOTE ASSISTANT',
          address: '2450 Rue Sherbrooke O, Montreal, QC H3H 1E8, Canada',
          reqId: 'Req164120',
          jobType: 'Part Time',
          workType: 'Virtual',
          careerArea: 'Corporate',
          description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
          overview: featuredJobsData['virtual-assistant']?.positionOverview || featuredJobsData['virtual-assistant']?.aboutRole || 'As a Remote Assistant, you\'ll provide administrative and support services remotely.',
          responsibilities: featuredJobsData['virtual-assistant']?.whatYoullDo || [],
          qualifications: featuredJobsData['virtual-assistant']?.whatWereLookingFor || [],
        },
      };

      // If it's a base job, return it
      if (baseJobs[id]) {
        return baseJobs[id];
      }

      // Generate job data for other IDs (matching JobSearchResults logic)
      const jobTitles = [
        'DATA ENTRY', 'DATA ENTRY SPECIALIST', 'DATA ENTRY CLERK', 'DATA PROCESSING ASSOCIATE',
        'PAYROLL CLERK', 'PAYROLL SPECIALIST', 'PAYROLL ADMINISTRATOR', 'PAYROLL ASSISTANT',
        'CUSTOMER REPRESENTATIVE', 'CUSTOMER SERVICE REPRESENTATIVE', 'CUSTOMER SUPPORT REPRESENTATIVE', 'CUSTOMER CARE REPRESENTATIVE',
        'VIRTUAL ASSISTANT', 'REMOTE ASSISTANT', 'ADMINISTRATIVE ASSISTANT', 'EXECUTIVE ASSISTANT',
        'SALES ASSOCIATE', 'CASHIER', 'LOT ASSOCIATE', 'FREIGHT ASSOCIATE',
        'DEPARTMENT SUPERVISOR', 'ASSISTANT STORE MANAGER', 'STORE MANAGER',
        'MERCHANDISING ASSOCIATE', 'CUSTOMER SERVICE ASSOCIATE', 'PRO ASSOCIATE'
      ];
      const locations = [
        { city: 'Toronto', province: 'ON', address: '123 Main St, Toronto, ON M1A 1A1' },
        { city: 'Vancouver', province: 'BC', address: '456 Oak Ave, Vancouver, BC V1B 2C2' },
        { city: 'Calgary', province: 'AB', address: '789 Pine Rd, Calgary, AB T1A 2B3' },
        { city: 'Montreal', province: 'QC', address: '321 Maple St, Montreal, QC H1A 2B3' },
        { city: 'Ottawa', province: 'ON', address: '654 Elm Dr, Ottawa, ON K1A 2B3' }
      ];
      const jobTypes = ['Full Time', 'Part Time', 'Seasonal'];
      const workTypes = ['Onsite', 'Hybrid', 'Multiple Locations', 'Virtual'];
      const careerAreas = ['Corporate', 'Field', 'Retail Management', 'Retail Store'];

      // Deterministic hash function
      const hash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        return Math.abs(hash);
      };

      const titleIndex = hash(`title-${id}`) % jobTitles.length;
      const locationIndex = hash(`location-${id}`) % locations.length;
      const jobTypeIndex = hash(`jobType-${id}`) % jobTypes.length;
      const workTypeIndex = hash(`workType-${id}`) % workTypes.length;
      const careerAreaIndex = hash(`careerArea-${id}`) % careerAreas.length;

      const title = `${jobTitles[titleIndex]} - ${locations[locationIndex].city.toUpperCase()}`;
      const jobType = jobTypes[jobTypeIndex];
      const workType = workTypes[workTypeIndex];
      const careerArea = careerAreas[careerAreaIndex];
      const location = `${locations[locationIndex].city}, ${locations[locationIndex].province}`;
      const address = locations[locationIndex].address;
      const numericId = parseInt(id) || 0;
      const reqId = `Req${160000 + numericId}`;

      // Generic job descriptions based on title
      const getJobOverview = (title: string, careerArea: string) => {
        // Check for Data Entry related jobs
        if (title.includes('DATA ENTRY') || title.includes('DATA PROCESSING')) {
          return featuredJobsData['data-entry']?.positionOverview || 'As a Data Entry Specialist, you\'ll be responsible for accurately entering and maintaining data in our systems.';
        }
        // Check for Payroll related jobs
        if (title.includes('PAYROLL')) {
          return featuredJobsData['payroll-clerk']?.positionOverview || 'As a Payroll Clerk, you\'ll be responsible for processing employee payroll accurately and on time.';
        }
        // Check for Customer Representative related jobs
        if (title.includes('CUSTOMER REPRESENTATIVE') || title.includes('CUSTOMER SERVICE') || title.includes('CUSTOMER SUPPORT') || title.includes('CUSTOMER CARE')) {
          return featuredJobsData['customer-representative']?.positionOverview || 'As a Customer Representative, you\'ll be the primary point of contact for our customers, providing exceptional service and support.';
        }
        // Check for Virtual/Remote Assistant jobs
        if (title.includes('VIRTUAL ASSISTANT') || title.includes('REMOTE ASSISTANT') || title.includes('ADMINISTRATIVE ASSISTANT') || title.includes('EXECUTIVE ASSISTANT')) {
          return featuredJobsData['virtual-assistant']?.positionOverview || featuredJobsData['virtual-assistant']?.aboutRole || 'As a Virtual Assistant, you\'ll provide administrative and support services remotely to help our team operate efficiently.';
        }
        // Other job types
        if (title.includes('SALES ASSOCIATE')) {
          return 'Sales Associates provide excellent customer service by helping customers find the right products for their projects, answering questions, and maintaining department organization.';
        } else if (title.includes('CASHIER')) {
          return 'Cashiers are the face of The Home Depot, providing fast, friendly, and accurate service to our customers. They ensure a safe and organized checkout area and assist customers with transactions.';
        } else if (title.includes('LOT ASSOCIATE')) {
          return 'Lot Associates are the first point of contact for customers arriving at our stores. You\'ll assist customers with loading purchases, maintain the parking lot and store entrance, and provide exceptional customer service.';
        } else if (title.includes('FREIGHT ASSOCIATE')) {
          return 'Freight Associates are essential to keeping our stores stocked and ready for customers. You\'ll unload trucks, organize merchandise, and ensure products are properly displayed and available for customers.';
        } else if (title.includes('DEPARTMENT SUPERVISOR')) {
          return 'Department Supervisors lead a team of associates in delivering exceptional customer service and driving department performance. You\'ll be responsible for managing inventory, training associates, and ensuring your department meets sales and operational goals.';
        } else if (title.includes('ASSISTANT STORE MANAGER') || title.includes('STORE MANAGER')) {
          return 'Store Managers are key leaders in driving store performance and delivering an exceptional customer experience. You\'ll coach and develop associates, solve problems, and help implement strategies that support sales and operational excellence.';
        } else {
          return `Join The Home Depot team as a ${title.split(' - ')[0]} and be part of something bigger. We're looking for dedicated individuals who are passionate about customer service and teamwork.`;
        }
      };

      const getResponsibilities = (title: string) => {
        // Check for Data Entry related jobs
        if (title.includes('DATA ENTRY') || title.includes('DATA PROCESSING')) {
          return featuredJobsData['data-entry']?.keyResponsibilities || featuredJobsData['data-entry']?.whatYoullDo || [];
        }
        // Check for Payroll related jobs
        if (title.includes('PAYROLL')) {
          return featuredJobsData['payroll-clerk']?.keyResponsibilities || featuredJobsData['payroll-clerk']?.whatYoullDo || [];
        }
        // Check for Customer Representative related jobs
        if (title.includes('CUSTOMER REPRESENTATIVE') || title.includes('CUSTOMER SERVICE') || title.includes('CUSTOMER SUPPORT') || title.includes('CUSTOMER CARE')) {
          return featuredJobsData['customer-representative']?.keyResponsibilities || featuredJobsData['customer-representative']?.whatYoullDo || [];
        }
        // Check for Virtual/Remote Assistant jobs
        if (title.includes('VIRTUAL ASSISTANT') || title.includes('REMOTE ASSISTANT') || title.includes('ADMINISTRATIVE ASSISTANT') || title.includes('EXECUTIVE ASSISTANT')) {
          return featuredJobsData['virtual-assistant']?.whatYoullDo || [];
        }
        // Other job types
        if (title.includes('SALES ASSOCIATE')) {
          return [
            'Assist customers with product selection and provide expert advice.',
            'Maintain department organization and product displays.',
            'Process transactions and handle customer inquiries.',
            'Stay current on product knowledge and industry trends.',
            'Work collaboratively with team members.',
          ];
        } else if (title.includes('CASHIER')) {
          return [
            'Process customer transactions accurately and efficiently.',
            'Maintain a clean and organized checkout area.',
            'Assist customers with questions and product location.',
            'Handle returns and exchanges according to store policy.',
            'Provide excellent customer service at all times.',
          ];
        } else if (title.includes('LOT ASSOCIATE')) {
          return [
            'Assist customers with loading purchases into vehicles.',
            'Maintain a clean and organized parking lot.',
            'Provide directions and answer customer questions.',
            'Monitor shopping carts and ensure availability.',
            'Follow safety procedures when handling merchandise.',
          ];
        } else if (title.includes('FREIGHT ASSOCIATE')) {
          return [
            'Unload merchandise from trucks and organize in the stockroom.',
            'Stock shelves to full capacity and maintain organized displays.',
            'Ensure store is clean, safe, and ready for customers.',
            'Operate equipment such as forklifts and pallet jacks safely.',
            'Follow safety procedures and guidelines.',
          ];
        } else {
          return [
            'Provide excellent customer service.',
            'Maintain a clean and organized work area.',
            'Follow all safety procedures and guidelines.',
            'Work collaboratively with team members.',
            'Complete assigned tasks efficiently and accurately.',
          ];
        }
      };

      // Get qualifications based on job title
      const getQualifications = (title: string) => {
        if (title.includes('DATA ENTRY') || title.includes('DATA PROCESSING')) {
          return featuredJobsData['data-entry']?.qualifications || featuredJobsData['data-entry']?.whatWereLookingFor || [];
        }
        if (title.includes('PAYROLL')) {
          return featuredJobsData['payroll-clerk']?.qualifications || featuredJobsData['payroll-clerk']?.whatWereLookingFor || [];
        }
        if (title.includes('CUSTOMER REPRESENTATIVE') || title.includes('CUSTOMER SERVICE') || title.includes('CUSTOMER SUPPORT') || title.includes('CUSTOMER CARE')) {
          return featuredJobsData['customer-representative']?.qualifications || featuredJobsData['customer-representative']?.whatWereLookingFor || [];
        }
        if (title.includes('VIRTUAL ASSISTANT') || title.includes('REMOTE ASSISTANT') || title.includes('ADMINISTRATIVE ASSISTANT') || title.includes('EXECUTIVE ASSISTANT')) {
          return featuredJobsData['virtual-assistant']?.whatWereLookingFor || [];
        }
        return [
          'High school diploma or equivalent preferred.',
          'Previous retail or customer service experience is an asset.',
          'Strong communication and interpersonal skills.',
          'Ability to work flexible schedules including evenings and weekends.',
          'Physical ability to lift and move merchandise as required.',
        ];
      };

      return {
        id,
        title,
        address,
        reqId,
        jobType,
        workType,
        careerArea,
        description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
        overview: getJobOverview(title, careerArea),
        responsibilities: getResponsibilities(title),
        qualifications: getQualifications(title),
      };
    };

    // Simulate API call
    setTimeout(() => {
      const jobData = generateJobData(jobId);
      setJob(jobData);
      setLoading(false);
    }, 300);
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Job Not Found</h1>
          <Link href="/job-search" className="text-orange-600 hover:underline">
            Return to Job Search
          </Link>
        </div>
      </div>
    );
  }

  const displayWorkType = job.workType || job.workArrangement || '';

  // Generate tailored description based on job title
  const getJobHeroDescription = (title: string, careerArea: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('data entry')) {
      return 'Join our team as a Data Entry professional and help maintain accurate records and databases that drive our business forward.';
    } else if (titleLower.includes('payroll')) {
      return 'Become part of our Payroll team and ensure our associates receive accurate and timely compensation.';
    } else if (titleLower.includes('customer representative') || titleLower.includes('customer service')) {
      return 'Help us deliver exceptional customer experiences as a Customer Representative, where every interaction matters.';
    } else if (titleLower.includes('virtual assistant') || titleLower.includes('remote assistant') || titleLower.includes('administrative assistant')) {
      return 'Support our team remotely as a Virtual Assistant and help keep our operations running smoothly from anywhere.';
    } else if (careerArea === 'Corporate') {
      return 'Explore corporate career opportunities at The Home Depot Canada and be part of a team that drives innovation and growth.';
    } else if (careerArea === 'Field') {
      return 'Join our Field Operations team and help maintain equipment and services across our locations.';
    } else if (careerArea === 'Retail Store') {
      return 'Work in our retail stores and help customers find the right products for their home improvement projects.';
    } else if (careerArea === 'Retail Management') {
      return 'Lead a team in our retail stores and help create exceptional shopping experiences for our customers.';
    } else {
      return `Join The Home Depot Canada as a ${title.split(' - ')[0]} and be part of something bigger.`;
    }
  };

  const heroDescription = getJobHeroDescription(job.title, job.careerArea);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image Section */}
      <section className="relative w-full bg-white">
        <div className="relative w-full">
          <div className="relative overflow-hidden">
            <img
              src="/general_top_image_mobile.67e5322f (1).webp"
              alt={`${job.title} at The Home Depot Canada`}
              className="w-full h-[220px] md:h-[280px] lg:h-[320px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-600"></div>
          </div>
          
          {/* Dark overlay for text readability */}
          <div className="hidden md:block absolute inset-0 bg-black/50"></div>
          
          {/* Desktop: Content overlaid on image, aligned left */}
          <div className="hidden md:block absolute inset-0 z-10">
            <div className="absolute left-6 lg:left-8 top-[55%] -translate-y-1/2 w-[85%] max-w-7xl ml-10">
              <div className="max-w-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {job.title}
                </h1>
                <p className="text-base md:text-lg text-white mb-4 leading-relaxed opacity-95">
                  {heroDescription}
                </p>
                <Link
                  href={`/apply/${jobId}`}
                  className="inline-block px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold transition-colors duration-300 text-center"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Content below image, aligned left */}
        <div className="md:hidden bg-white px-4 py-6">
          <h1 className="text-2xl font-bold text-black mb-3 leading-tight text-left">
            {job.title}
          </h1>
          <p className="text-base text-gray-700 mb-4 leading-relaxed text-left">
            {heroDescription}
          </p>
          <Link
            href={`/apply/${jobId}`}
            className="inline-block px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-base font-semibold transition-colors duration-300 text-center w-full"
          >
            Apply Now
          </Link>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Job Attributes */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-bold text-black mb-6 uppercase">JOB ATTRIBUTES</h2>
              
              <div className="space-y-4 mb-8">
                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Req ID</div>
                  <div className="text-base text-black">{job.reqId}</div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Job Location</div>
                  <div className="text-base text-black">{job.address}</div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Job Type</div>
                  <div className="text-base text-black">{job.jobType}</div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-600 mb-1">Career Area</div>
                  <div className="text-base text-black">{job.careerArea}</div>
                </div>

                {displayWorkType && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Type</div>
                    <div className="text-base text-black">{displayWorkType}</div>
                  </div>
                )}
              </div>

              <Link
                href={`/apply/${jobId}`}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-6 text-center block transition-colors duration-300 uppercase"
              >
                APPLY NOW
              </Link>
            </div>
          </div>

          {/* Right Column - Job Description */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-black mb-6 uppercase">JOB DESCRIPTION</h2>
            
            <div className="space-y-6">
              <p className="text-base text-black leading-relaxed">
                {job.description}
              </p>

              <div>
                <h3 className="text-lg font-bold text-black mb-4">Position Overview</h3>
                <p className="text-base text-black leading-relaxed">
                  {job.overview}
                </p>
              </div>

              {job.responsibilities && job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, index) => (
                      <li key={index} className="text-base text-black leading-relaxed flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {job.qualifications && job.qualifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Qualifications</h3>
                  <ul className="space-y-2">
                    {job.qualifications.map((qualification, index) => (
                      <li key={index} className="text-base text-black leading-relaxed flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>{qualification}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
