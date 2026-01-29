'use client';

import { useState } from 'react';
import type { FC } from 'react';
import JobListingCard from '@/components/job/JobListingCard';

interface Job {
  id: string;
  title: string;
  location: string;
  address: string;
  reqId: string;
  jobType: string;
  workArrangement: string;
  isNew?: boolean;
}

const RetailStoreJobListings: FC = () => {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const handleSave = (jobId: string) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const jobs: Job[] = [
    {
      id: '1',
      title: 'OVERNIGHT FREIGHT ASSOCIATE PART TIME (ST.JOHN\'S)',
      location: 'St. Johns, NL',
      address: '70 Kelsey Drive, St. Johns, NL A1B 5C7, Canada',
      reqId: 'Req164191',
      jobType: 'Part Time',
      workArrangement: 'Onsite'
    },
    {
      id: '2',
      title: 'ELECTRICAL/PLUMBING SALES PART TIME (ST.JOHN\'S)',
      location: 'St. Johns, NL',
      address: '70 Kelsey Drive, St. Johns, NL A1B 5C7, Canada',
      reqId: 'Req164345',
      jobType: 'Part Time',
      workArrangement: 'Onsite',
      isNew: true
    },
    {
      id: '3',
      title: 'CASHIER PART TIME (SYDNEY)',
      location: 'Sydney, NS',
      address: '50 Sydney Port Access Road, Sydney, NS B1P 7H2, Canada',
      reqId: 'Req164116',
      jobType: 'Part Time',
      workArrangement: 'Onsite'
    },
    {
      id: '4',
      title: 'LOT ASSOCIATE PART TIME (SYDNEY)',
      location: 'Sydney, NS',
      address: '50 Sydney Port Access Road, Sydney, NS B1P 7H2, Canada',
      reqId: 'Req164115',
      jobType: 'Part Time',
      workArrangement: 'Onsite'
    }
  ];

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobListingCard
          key={job.id}
          id={job.id}
          title={job.title}
          address={job.address}
          reqId={job.reqId}
          jobType={job.jobType}
          workArrangement={job.workArrangement}
          isNew={job.isNew}
          isSaved={savedJobs.has(job.id)}
          onSave={handleSave}
        />
      ))}
    </div>
  );
};

export default RetailStoreJobListings;
