import FeaturedJobPage from '@/components/featured-jobs/FeaturedJobPage';
import { featuredJobsData } from '@/data/featured-jobs';

export default function VirtualAssistantPage() {
  const jobData = featuredJobsData['virtual-assistant'];

  if (!jobData) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Job Not Found</h1>
          <p className="text-gray-600">The requested job page could not be found.</p>
        </div>
      </main>
    );
  }

  return <FeaturedJobPage jobData={jobData} />;
}
