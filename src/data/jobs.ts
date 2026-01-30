/** Shared job data used by JobSearchResults, JobDetail, JobListings, etc. */

export const JOB_IMAGES = [
  '/images/assistant-store-manager-fj.dd1dc314.webp',
  '/images/cashier-fj.dd6cbaeb.webp',
  '/images/department-supervisor-fj.33264519.webp',
  '/images/freight-associate-fj.235589f6.webp',
  '/images/lot-associate-fj.833ed9cf.webp',
  '/images/merchandising-met-associate-fj.54d6df36.webp',
  '/images/order-picker-fj.6c712e3d.webp',
] as const;

export const JOB_TITLES = [
  'DATA ENTRY',
  'DATA ENTRY SPECIALIST',
  'DATA ENTRY CLERK',
  'DATA PROCESSING ASSOCIATE',
  'PAYROLL CLERK',
  'PAYROLL SPECIALIST',
  'PAYROLL ADMINISTRATOR',
  'PAYROLL ASSISTANT',
  'CUSTOMER REPRESENTATIVE',
  'CUSTOMER SERVICE REPRESENTATIVE',
  'CUSTOMER SUPPORT REPRESENTATIVE',
  'CUSTOMER CARE REPRESENTATIVE',
  'VIRTUAL ASSISTANT',
  'REMOTE ASSISTANT',
  'ADMINISTRATIVE ASSISTANT',
  'EXECUTIVE ASSISTANT',
  'SALES ASSOCIATE',
  'CASHIER',
  'LOT ASSOCIATE',
  'FREIGHT ASSOCIATE',
  'DEPARTMENT SUPERVISOR',
  'ASSISTANT STORE MANAGER',
  'STORE MANAGER',
  'MERCHANDISING ASSOCIATE',
  'CUSTOMER SERVICE ASSOCIATE',
  'PRO ASSOCIATE',
] as const;

export const USA_LOCATIONS = [
  { city: 'New York', state: 'NY', address: '245 Park Avenue, New York, NY 10167, USA' },
  { city: 'Los Angeles', state: 'CA', address: '2450 W Olympic Blvd, Los Angeles, CA 90064, USA' },
  { city: 'Chicago', state: 'IL', address: '245 N Michigan Ave, Chicago, IL 60601, USA' },
  { city: 'Houston', state: 'TX', address: '2450 Main St, Houston, TX 77002, USA' },
  { city: 'Phoenix', state: 'AZ', address: '2450 E Camelback Rd, Phoenix, AZ 85016, USA' },
  { city: 'Philadelphia', state: 'PA', address: '2450 Market St, Philadelphia, PA 19103, USA' },
  { city: 'San Antonio', state: 'TX', address: '2450 Broadway St, San Antonio, TX 78215, USA' },
  { city: 'San Diego', state: 'CA', address: '2450 Kettner Blvd, San Diego, CA 92101, USA' },
  { city: 'Dallas', state: 'TX', address: '2450 N Pearl St, Dallas, TX 75201, USA' },
  { city: 'San Jose', state: 'CA', address: '2450 N First St, San Jose, CA 95131, USA' },
] as const;

export const CANADA_LOCATIONS = [
  { city: 'Toronto', province: 'ON', address: '2450 Victoria Park Ave, Toronto, ON M2J 4A2, Canada' },
  { city: 'Vancouver', province: 'BC', address: '2450 Marine Dr, Vancouver, BC V7V 1J2, Canada' },
  { city: 'Calgary', province: 'AB', address: '2450 32 Ave NE, Calgary, AB T2E 6T8, Canada' },
  { city: 'Montreal', province: 'QC', address: '2450 Rue Sherbrooke O, Montreal, QC H3H 1E8, Canada' },
  { city: 'Ottawa', province: 'ON', address: '2450 Riverside Dr, Ottawa, ON K1H 8K5, Canada' },
  { city: 'Edmonton', province: 'AB', address: '2450 Jasper Ave, Edmonton, AB T5J 3N9, Canada' },
  { city: 'Winnipeg', province: 'MB', address: '2450 Portage Ave, Winnipeg, MB R3J 0E4, Canada' },
  { city: 'Quebec City', province: 'QC', address: '2450 Boulevard Laurier, Quebec City, QC G1V 2L2, Canada' },
  { city: 'Hamilton', province: 'ON', address: '2450 Main St W, Hamilton, ON L8N 3Z5, Canada' },
  { city: 'Kitchener', province: 'ON', address: '2450 King St E, Kitchener, ON N2A 1A5, Canada' },
] as const;

export const JOB_SEARCH_LOCATIONS = [...USA_LOCATIONS, ...CANADA_LOCATIONS];

export const JOB_TYPES = ['Full Time', 'Part Time', 'Seasonal'] as const;

export const WORK_TYPES = ['Onsite', 'Hybrid', 'Multiple Locations', 'Virtual'] as const;

export const CAREER_AREAS = ['Corporate', 'Field', 'Retail Management', 'Retail Store'] as const;

export type JobLocationItem =
  | { city: string; state: string; address: string }
  | { city: string; province: string; address: string };

export function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    h = ((h << 5) - h) + char;
    h = h & h;
  }
  return Math.abs(h);
}

export function getLocationDisplayName(loc: JobLocationItem): string {
  return 'state' in loc ? `${loc.city}, ${loc.state}` : `${loc.city}, ${loc.province}`;
}
