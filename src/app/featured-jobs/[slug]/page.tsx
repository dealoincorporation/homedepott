import type { Metadata } from 'next';
import FeaturedJobPage from '@/components/featured-jobs/FeaturedJobPage';
import { featuredJobsData, FEATURED_JOB_SLUGS } from '@/data/featured-jobs';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FEATURED_JOB_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = featuredJobsData[slug];
  if (!job) return {};
  return {
    title: `${job.title} | The Home Depot Canada Careers`,
    description: job.positionOverview ?? job.aboutRole ?? `Explore ${job.title} opportunities at The Home Depot Canada.`,
  };
}

export default async function FeaturedJobSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const jobData = featuredJobsData[slug];

  if (!jobData) {
    notFound();
  }

  return <FeaturedJobPage jobData={jobData} />;
}
