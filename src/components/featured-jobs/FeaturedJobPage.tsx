import Link from 'next/link';
import Image from 'next/image';

interface FeaturedJobData {
  title: string;
  heroTitle: string;
  featuredJobLabel: string;
  roleOverview: string;
  whyJoin: {
    title: string;
    benefits: string[];
  };
  aboutRole: string;
  whatYoullDo: string[];
  typicalDay?: string[];
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  preferredQualifications?: string[];
  whatWereLookingFor?: string[];
  // Job attributes
  reqId?: string;
  jobLocation?: string;
  jobType?: string;
  careerArea?: string;
  type?: string;
  image?: string;
  // Job description fields
  description?: string;
  positionOverview?: string;
  keyResponsibilities?: string[];
  qualifications?: string[];
}

interface FeaturedJobPageProps {
  jobData: FeaturedJobData;
}

export default function FeaturedJobPage({ jobData }: FeaturedJobPageProps) {
  // Get job slug from title for apply link
  const jobSlug = jobData.title.toLowerCase().replace(/\s+/g, '-');

  // Generate tailored hero description based on job title
  const getHeroDescription = (title: string, aboutRole?: string, positionOverview?: string) => {
    const titleLower = title.toLowerCase();
    
    // Use positionOverview or aboutRole if available, otherwise generate tailored description
    if (positionOverview) {
      return positionOverview;
    }
    
    if (aboutRole) {
      return aboutRole;
    }
    
    // Generate tailored descriptions
    if (titleLower.includes('data entry')) {
      return 'Join our team as a Data Entry professional and help maintain accurate records and databases that drive our business forward.';
    } else if (titleLower.includes('payroll')) {
      return 'Become part of our Payroll team and ensure our associates receive accurate and timely compensation.';
    } else if (titleLower.includes('customer representative') || titleLower.includes('customer service')) {
      return 'Help us deliver exceptional customer experiences as a Customer Representative, where every interaction matters.';
    } else if (titleLower.includes('virtual assistant') || titleLower.includes('remote assistant')) {
      return 'Support our team remotely as a Virtual Assistant and help keep our operations running smoothly from anywhere.';
    } else if (titleLower.includes('merchandising') && titleLower.includes('met')) {
      return 'Join our Merchandising Execution Team and ensure our products are properly displayed, priced, and organized for customers.';
    } else if (titleLower.includes('receiving associate')) {
      return 'Help process incoming shipments and maintain inventory accuracy as a Receiving Associate, ensuring our stores are well-stocked.';
    } else if (titleLower.includes('order picker')) {
      return 'Accurately select and prepare customer orders as an Order Picker, ensuring timely fulfillment of online and in-store orders.';
    } else {
      return `Join The Home Depot Canada as a ${title} and be part of something bigger.`;
    }
  };

  const heroDescription = getHeroDescription(
    jobData.title,
    jobData.aboutRole,
    jobData.positionOverview
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Back button - Above hero */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6">
        <Link 
          href="/job-search"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Job Search</span>
        </Link>
      </div>

      {/* Hero Image Section */}
      <section className="relative w-full bg-white">
        <div className="relative w-full">
          <div className="relative overflow-hidden">
            <img
              src="/general_top_image_mobile.67e5322f (1).webp"
              alt={`${jobData.title} at The Home Depot Canada`}
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
                  {jobData.title}
                </h1>
                <p className="text-base md:text-lg text-white mb-4 leading-relaxed opacity-95">
                  {heroDescription}
                </p>
                <Link
                  href={`/apply/${jobSlug}`}
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
            {jobData.title}
          </h1>
          <p className="text-base text-gray-700 mb-4 leading-relaxed text-left">
            {heroDescription}
          </p>
          <Link
            href={`/apply/${jobSlug}`}
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
                {jobData.reqId && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Req ID</div>
                    <div className="text-base text-black">{jobData.reqId}</div>
                  </div>
                )}

                {jobData.jobLocation && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Job Location</div>
                    <div className="text-base text-black">{jobData.jobLocation}</div>
                  </div>
                )}

                {jobData.jobType && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Job Type</div>
                    <div className="text-base text-black">{jobData.jobType}</div>
                  </div>
                )}

                {jobData.careerArea && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Career Area</div>
                    <div className="text-base text-black">{jobData.careerArea}</div>
                  </div>
                )}

                {jobData.type && (
                  <div>
                    <div className="text-sm font-semibold text-gray-600 mb-1">Type</div>
                    <div className="text-base text-black">{jobData.type}</div>
                  </div>
                )}
              </div>

              <Link
                href={`/apply/${jobSlug}`}
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
              {jobData.description && (
                <p className="text-base text-black leading-relaxed">
                  {jobData.description}
                </p>
              )}

              {jobData.positionOverview && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Position Overview</h3>
                  <p className="text-base text-black leading-relaxed">
                    {jobData.positionOverview}
                  </p>
                </div>
              )}

              {jobData.keyResponsibilities && jobData.keyResponsibilities.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Key Responsibilities</h3>
                  <ul className="space-y-2">
                    {jobData.keyResponsibilities.map((responsibility, index) => (
                      <li key={index} className="text-base text-black leading-relaxed flex items-start">
                        <span className="text-orange-600 mr-2">•</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {jobData.qualifications && jobData.qualifications.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-black mb-4">Qualifications</h3>
                  <ul className="space-y-2">
                    {jobData.qualifications.map((qualification, index) => (
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
}
