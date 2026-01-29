import Link from 'next/link';
import type { FC } from 'react';

const StoreLocations: FC = () => {
  const stores = [
    { name: 'SYDNEY STORE', address: '1234 Main Street, Sydney, NY 13160, USA' },
    { name: 'HALIFAX STORE', address: '368 Lacewood Drive, Halifax, NS B3M 0A1, Canada' },
    { name: 'NEW MINAS STORE', address: '21 Silver Fox Ave, New Minas, NS B4N 3K7, Canada' }
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Full Gray Background */}
      <div className="absolute inset-0 bg-[#212529]"></div>
      
      {/* Split Background Container */}
      <div className="relative flex flex-col lg:flex-row">
        {/* Left Section - Dark Gray Background Content */}
        <div className="flex-1 px-8 md:px-12 lg:px-16 xl:px-20 py-12 md:py-16 lg:py-20 flex flex-col justify-center relative z-10">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 md:mb-12 leading-tight tracking-tight">
            Join Our Store Team In A Location Near You
          </h2>

          {/* Store Cards - Horizontal Layout */}
          <div className="flex flex-row md:flex-row gap-4 md:gap-5 mb-10 md:mb-12">
            {stores.map((store, index) => (
              <div
                key={index}
                className={`bg-white px-6 md:px-7 py-5 md:py-6 flex-1 min-w-0 rounded-lg flex flex-col ${
                  index === 2 ? 'hidden md:block' : ''
                }`}
              >
                <div className="font-bold text-black text-base md:text-lg lg:text-xl uppercase mb-2 leading-tight tracking-tight">
                  {store.name}
                </div>
                <div className="text-black text-sm md:text-base lg:text-lg leading-relaxed flex-grow">
                  {store.address}
                </div>
              </div>
            ))}
          </div>

          {/* Corporate/Field Link */}
          <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed">
            Interested in{' '}
            <Link
              href="/career-areas/corporate-opportunities"
              className="underline hover:no-underline decoration-white decoration-2 underline-offset-2"
            >
              Corporate
            </Link>{' '}
            or{' '}
            <Link
              href="/career-areas/field"
              className="underline hover:no-underline decoration-white decoration-2 underline-offset-2"
            >
              Field
            </Link>{' '}
            opportunities?
          </p>

          {/* Diagonal Separator - White Line */}
          <div 
            className="hidden lg:block absolute top-0 right-0 w-[3px] h-full bg-white z-10"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 0 100%)',
              transform: 'skewX(-12deg)',
              transformOrigin: 'top right',
              marginRight: '-1.5px'
            }}
          />
        </div>

        {/* Right Section - Orange Background with Slanted Edge */}
        <div 
          className="w-full lg:w-[380px] xl:w-[420px] bg-orange-600 flex flex-col items-center justify-center px-8 md:px-10 py-12 md:py-16 gap-5 md:gap-6 relative z-20"
          style={{
            clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)'
          }}
        >
          {/* View All Locations Button */}
          <Link
            href="/location"
            className="w-full max-w-[300px] bg-transparent border-2 border-white text-white px-8 py-5 hover:bg-[#212529] transition-colors flex items-center gap-4 font-bold text-base md:text-lg tracking-wide"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              <circle cx="8" cy="6" r="1.5" fill="currentColor" />
              <circle cx="8" cy="12" r="1.5" fill="currentColor" />
              <circle cx="8" cy="18" r="1.5" fill="currentColor" />
            </svg>
            <span>View All Locations</span>
          </Link>

          {/* View Jobs On A Map Button */}
          <Link
            href="/jobs-on-a-map"
            className="w-full max-w-[300px] bg-transparent border-2 border-white text-white px-8 py-5 hover:bg-[#212529] transition-colors flex items-center gap-4 font-bold text-base md:text-lg tracking-wide"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>View Jobs on a Map</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StoreLocations;