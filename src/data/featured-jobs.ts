export interface FeaturedJobData {
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

export const FEATURED_JOB_SLUGS = [
  'data-entry',
  'payroll-clerk',
  'customer-representative',
  'virtual-assistant',
  'merchandising-met-associate',
  'order-picker',
  'receiving-associate',
  'sales-associate',
] as const;

export type FeaturedJobSlug = (typeof FEATURED_JOB_SLUGS)[number];

export const featuredJobsData: Record<string, FeaturedJobData> = {
  'data-entry': {
    title: 'Data Entry',
    heroTitle: `Data Entry
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Data Entry Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `As a Data Entry Specialist, you'll be responsible for accurately entering and maintaining data in our systems. You'll work with various documents, forms, and databases to ensure information is properly recorded and organized.`,
    whatYoullDo: [
      'Enter data from various sources into computer systems',
      'Verify accuracy of data by comparing it to source documents',
      'Update and maintain database records',
      'Perform data quality checks and corrections',
      'Organize and file documents appropriately',
      'Generate reports and summaries as needed',
      'Maintain confidentiality of sensitive information',
      'Meet productivity and accuracy targets',
    ],
    whatWereLookingFor: [
      'Excellent typing speed and accuracy',
      'Strong attention to detail',
      'Proficiency with Microsoft Office and data entry software',
      'Ability to work independently and meet deadlines',
      'Good organizational skills',
      'Basic computer literacy',
      'High school diploma or equivalent',
    ],
    reqId: 'Req163351',
    jobLocation: '2450 32 Ave NE, Calgary, AB T2E 6T8, Canada',
    jobType: 'Full Time',
    careerArea: 'Field',
    type: 'Virtual',
    image: '/images/assistant-store-manager-fj.dd1dc314.webp',
    description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
    positionOverview: `As a Data Entry Specialist, you'll be responsible for accurately entering and maintaining data in our systems. You'll work with various documents, forms, and databases to ensure information is properly recorded and organized. This role requires attention to detail, strong organizational skills, and the ability to work efficiently in a fast-paced environment.`,
    keyResponsibilities: [
      'Enter data from various sources into computer systems',
      'Verify accuracy of data by comparing it to source documents',
      'Update and maintain database records',
      'Perform data quality checks and corrections',
      'Organize and file documents appropriately',
      'Generate reports and summaries as needed',
      'Maintain confidentiality of sensitive information',
      'Meet productivity and accuracy targets',
    ],
    qualifications: [
      'Excellent typing speed and accuracy',
      'Strong attention to detail',
      'Proficiency with Microsoft Office and data entry software',
      'Ability to work independently and meet deadlines',
      'Good organizational skills',
      'Basic computer literacy',
      'High school diploma or equivalent',
    ],
  },
  'payroll-clerk': {
    title: 'Payroll Clerk',
    heroTitle: `Payroll Clerk
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Payroll Clerk Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `As a Payroll Clerk, you'll be responsible for processing employee payroll accurately and on time. You'll handle time records, calculate wages, process deductions, and ensure compliance with payroll regulations.`,
    whatYoullDo: [
      'Process bi-weekly and monthly payroll for employees',
      'Calculate wages, overtime, and deductions accurately',
      'Maintain employee payroll records',
      'Process new hires, terminations, and status changes',
      'Handle payroll inquiries from employees',
      'Prepare and distribute pay statements',
      'Ensure compliance with federal and provincial payroll regulations',
      'Reconcile payroll accounts and prepare reports',
    ],
    whatWereLookingFor: [
      'Previous payroll or accounting experience preferred',
      'Strong mathematical and analytical skills',
      'Proficiency with payroll software and Excel',
      'Attention to detail and accuracy',
      'Understanding of payroll regulations',
      'Excellent organizational and time management skills',
      'Ability to maintain confidentiality',
    ],
    reqId: 'Req164191',
    jobLocation: '2450 Victoria Park Ave, Toronto, ON M2J 4A2, Canada',
    jobType: 'Full Time',
    careerArea: 'Corporate',
    type: 'Remote',
    image: '/images/cashier-fj.dd6cbaeb.webp',
    description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
    positionOverview: `As a Payroll Clerk, you'll be responsible for processing employee payroll accurately and on time. You'll handle time records, calculate wages, process deductions, and ensure compliance with payroll regulations. This role requires strong attention to detail, mathematical skills, and knowledge of payroll processes.`,
    keyResponsibilities: [
      'Process bi-weekly and monthly payroll for employees',
      'Calculate wages, overtime, and deductions accurately',
      'Maintain employee payroll records',
      'Process new hires, terminations, and status changes',
      'Handle payroll inquiries from employees',
      'Prepare and distribute pay statements',
      'Ensure compliance with federal and provincial payroll regulations',
      'Reconcile payroll accounts and prepare reports',
    ],
    qualifications: [
      'Previous payroll or accounting experience preferred',
      'Strong mathematical and analytical skills',
      'Proficiency with payroll software and Excel',
      'Attention to detail and accuracy',
      'Understanding of payroll regulations',
      'Excellent organizational and time management skills',
      'Ability to maintain confidentiality',
    ],
  },
  'customer-representative': {
    title: 'Customer Representative',
    heroTitle: `Customer Representative
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Customer Representative Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `As a Customer Representative, you'll be the primary point of contact for our customers, providing exceptional service and support. You'll handle inquiries, resolve issues, and ensure customers have a positive experience with our company.`,
    whatYoullDo: [
      'Respond to customer inquiries via phone, email, and chat',
      'Resolve customer complaints and issues promptly',
      'Process orders, returns, and exchanges',
      'Provide product information and recommendations',
      'Maintain accurate customer records',
      'Escalate complex issues to appropriate departments',
      'Follow up with customers to ensure satisfaction',
      'Meet customer service quality and productivity standards',
    ],
    whatWereLookingFor: [
      'Excellent communication and interpersonal skills',
      'Strong problem-solving abilities',
      'Customer-focused mindset',
      'Ability to work in a fast-paced environment',
      'Proficiency with customer service software',
      'Patience and empathy when dealing with customers',
      'Ability to work flexible schedules including evenings and weekends',
    ],
    reqId: 'Req164345',
    jobLocation: '2450 Marine Dr, Vancouver, BC V7V 1J2, Canada',
    jobType: 'Full Time',
    careerArea: 'Corporate',
    type: 'Virtual',
    image: '/images/department-supervisor-fj.33264519.webp',
    description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
    positionOverview: `As a Customer Representative, you'll be the primary point of contact for our customers, providing exceptional service and support. You'll handle inquiries, resolve issues, and ensure customers have a positive experience with our company. This role requires excellent communication skills, patience, and a customer-focused approach.`,
    keyResponsibilities: [
      'Respond to customer inquiries via phone, email, and chat',
      'Resolve customer complaints and issues promptly',
      'Process orders, returns, and exchanges',
      'Provide product information and recommendations',
      'Maintain accurate customer records',
      'Escalate complex issues to appropriate departments',
      'Follow up with customers to ensure satisfaction',
      'Meet customer service quality and productivity standards',
    ],
    qualifications: [
      'Excellent communication and interpersonal skills',
      'Strong problem-solving abilities',
      'Customer-focused mindset',
      'Ability to work in a fast-paced environment',
      'Proficiency with customer service software',
      'Patience and empathy when dealing with customers',
      'Ability to work flexible schedules including evenings and weekends',
    ],
  },
  'virtual-assistant': {
    title: 'Virtual Assistant',
    heroTitle: `Virtual Assistant
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Virtual Assistant Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `As a Virtual Assistant, you'll provide administrative and support services remotely to help our team operate efficiently. You'll handle various tasks including scheduling, communication, data management, and research.`,
    whatYoullDo: [
      'Manage calendars and schedule appointments',
      'Handle email correspondence and communication',
      'Prepare documents, reports, and presentations',
      'Conduct research and compile information',
      'Coordinate meetings and events',
      'Maintain digital filing systems',
      'Perform data entry and database management',
      'Provide general administrative support as needed',
    ],
    whatWereLookingFor: [
      'Strong organizational and time management skills',
      'Proficiency with office software (Microsoft Office, Google Workspace)',
      'Excellent written and verbal communication skills',
      'Ability to work independently and remotely',
      'Tech-savvy with good internet connectivity',
      'Attention to detail and accuracy',
      'Previous administrative or virtual assistant experience preferred',
    ],
    reqId: 'Req164116',
    jobLocation: '2450 Rue Sherbrooke O, Montreal, QC H3H 1E8, Canada',
    jobType: 'Full Time',
    careerArea: 'Corporate',
    type: 'Virtual',
    image: '/images/freight-associate-fj.235589f6.webp',
    description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
    positionOverview: `As a Virtual Assistant, you'll provide administrative and support services remotely to help our team operate efficiently. You'll handle various tasks including scheduling, communication, data management, and research. This role requires strong organizational skills, proficiency with office software, and the ability to work independently in a remote environment.`,
    keyResponsibilities: [
      'Manage calendars and schedule appointments',
      'Handle email correspondence and communication',
      'Prepare documents, reports, and presentations',
      'Conduct research and compile information',
      'Coordinate meetings and events',
      'Maintain digital filing systems',
      'Perform data entry and database management',
      'Provide general administrative support as needed',
    ],
    qualifications: [
      'Strong organizational and time management skills',
      'Proficiency with office software (Microsoft Office, Google Workspace)',
      'Excellent written and verbal communication skills',
      'Ability to work independently and remotely',
      'Tech-savvy with good internet connectivity',
      'Attention to detail and accuracy',
      'Previous administrative or virtual assistant experience preferred',
    ],
  },
  'merchandising-met-associate': {
    title: 'Merchandising MET Associate',
    heroTitle: `Merchandising MET Associate
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Merchandising MET Associate Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Merchandising Execution Team (MET) Associates ensure our products are properly displayed, priced, and organized. You'll work with a team to set up displays, maintain planograms, and ensure the store looks its best for customers.`,
    whatYoullDo: [
      'Set up and maintain product displays according to planograms',
      'Install and update pricing and signage',
      'Organize and restock merchandise',
      'Work with store associates to ensure proper product placement',
      'Maintain display standards and visual merchandising',
      'Assist with store resets and remodels',
      'Ensure products are properly labeled and priced',
    ],
    whatWereLookingFor: [
      'Attention to detail and organizational skills',
      'Ability to read and follow planograms',
      'Previous retail or merchandising experience preferred',
      'Ability to work early morning shifts',
      'Physical ability to lift and move merchandise',
    ],
    reqId: 'Req164200',
    jobLocation: 'Multiple Locations',
    jobType: 'Full Time',
    careerArea: 'Retail Store',
    type: 'Onsite',
    image: '/images/department-supervisor-fj.33264519.webp',
    description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
    positionOverview: `Merchandising Execution Team (MET) Associates ensure our products are properly displayed, priced, and organized. You'll work with a team to set up displays, maintain planograms, and ensure the store looks its best for customers. This role requires attention to detail, organizational skills, and the ability to work early morning shifts.`,
    keyResponsibilities: [
      'Set up and maintain product displays according to planograms',
      'Install and update pricing and signage',
      'Organize and restock merchandise',
      'Work with store associates to ensure proper product placement',
      'Maintain display standards and visual merchandising',
      'Assist with store resets and remodels',
      'Ensure products are properly labeled and priced',
    ],
    qualifications: [
      'Attention to detail and organizational skills',
      'Ability to read and follow planograms',
      'Previous retail or merchandising experience preferred',
      'Ability to work early morning shifts',
      'Physical ability to lift and move merchandise',
    ],
  },
  'order-picker': {
    title: 'Order Picker',
    heroTitle: `Order Picker
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Order Picker Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Order Pickers are responsible for accurately selecting and preparing customer orders for pickup or delivery. You'll work in our distribution centers or stores to fulfill online and in-store orders efficiently.`,
    whatYoullDo: [
      'Pick and pack customer orders accurately',
      'Use handheld devices to locate and verify products',
      'Prepare orders for customer pickup or delivery',
      'Maintain inventory accuracy',
      'Operate equipment such as forklifts and pallet jacks',
      'Work efficiently to meet productivity goals',
      'Follow safety procedures and quality standards',
    ],
    whatWereLookingFor: [
      'Ability to lift heavy items (up to 50 lbs)',
      'Attention to detail and accuracy',
      'Previous warehouse or order fulfillment experience preferred',
      'Ability to work in a fast-paced environment',
      'Forklift certification is an asset',
    ],
    reqId: 'Req164201',
    jobLocation: 'Multiple Locations',
    jobType: 'Full Time',
    careerArea: 'Retail Store',
    type: 'Onsite',
    image: '/images/freight-associate-fj.235589f6.webp',
    description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
    positionOverview: `Order Pickers are responsible for accurately selecting and preparing customer orders for pickup or delivery. You'll work in our distribution centers or stores to fulfill online and in-store orders efficiently. This role requires attention to detail, physical ability, and the ability to work in a fast-paced environment.`,
    keyResponsibilities: [
      'Pick and pack customer orders accurately',
      'Use handheld devices to locate and verify products',
      'Prepare orders for customer pickup or delivery',
      'Maintain inventory accuracy',
      'Operate equipment such as forklifts and pallet jacks',
      'Work efficiently to meet productivity goals',
      'Follow safety procedures and quality standards',
    ],
    qualifications: [
      'Ability to lift heavy items (up to 50 lbs)',
      'Attention to detail and accuracy',
      'Previous warehouse or order fulfillment experience preferred',
      'Ability to work in a fast-paced environment',
      'Forklift certification is an asset',
      'High school diploma or equivalent preferred',
      'Strong work ethic and reliability',
    ],
  },
  'receiving-associate': {
    title: 'Receiving Associate',
    heroTitle: `Receiving Associate
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Receiving Associate Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Receiving Associates are responsible for processing incoming shipments, verifying deliveries, and ensuring merchandise is properly received and documented. You'll work closely with vendors and store teams to maintain inventory accuracy.`,
    whatYoullDo: [
      'Receive and verify incoming shipments',
      'Check merchandise against purchase orders',
      'Document and process receiving paperwork',
      'Organize received merchandise for stocking',
      'Operate receiving equipment and tools',
      'Maintain accurate inventory records',
      'Coordinate with vendors and store departments',
    ],
    whatWereLookingFor: [
      'Attention to detail and accuracy',
      'Ability to lift heavy items',
      'Previous receiving or warehouse experience preferred',
      'Strong organizational skills',
      'Ability to work flexible schedules',
    ],
    reqId: 'Req164202',
    jobLocation: 'Multiple Locations',
    jobType: 'Full Time',
    careerArea: 'Retail Store',
    type: 'Onsite',
    image: '/images/freight-associate-fj.235589f6.webp',
    description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
    positionOverview: `Receiving Associates are responsible for processing incoming shipments, verifying deliveries, and ensuring merchandise is properly received and documented. You'll work closely with vendors and store teams to maintain inventory accuracy. This role requires attention to detail, organizational skills, and the ability to work flexible schedules.`,
    keyResponsibilities: [
      'Receive and verify incoming shipments',
      'Check merchandise against purchase orders',
      'Document and process receiving paperwork',
      'Organize received merchandise for stocking',
      'Operate receiving equipment and tools',
      'Maintain accurate inventory records',
      'Coordinate with vendors and store departments',
    ],
    qualifications: [
      'Attention to detail and accuracy',
      'Ability to lift heavy items',
      'Previous receiving or warehouse experience preferred',
      'Strong organizational skills',
      'Ability to work flexible schedules',
    ],
  },
  'sales-associate': {
    title: 'Sales Associate',
    heroTitle: `Sales Associate
Opportunities at The
Home Depot Canada`,
    featuredJobLabel: 'Featured Job',
    roleOverview: 'Sales Associate Role Overview',
    whyJoin: {
      title: 'Why Join The Home Depot Canada Family?',
      benefits: [
        'Profit Sharing Bonuses',
        'Discounted Stock Purchase Plan',
        'Paid Training & Career Development',
        'Health & Dental Benefits',
        'Retirement Savings Plan & Paid Vacation',
        'Career Growth Opportunities',
      ],
    },
    aboutRole: `Sales Associates are product experts who help customers find the right solutions for their projects. You'll provide knowledgeable assistance, answer questions, and ensure customers have everything they need for their home improvement projects.`,
    whatYoullDo: [
      'Assist customers with product selection and questions',
      'Provide expert advice on home improvement projects',
      'Maintain product knowledge and stay current on promotions',
      'Process sales transactions and handle returns',
      'Maintain department organization and cleanliness',
      'Build relationships with customers',
      'Support store sales goals and initiatives',
    ],
    whatWereLookingFor: [
      'Excellent customer service skills',
      'Interest in home improvement and DIY projects',
      'Strong communication and interpersonal skills',
      'Ability to learn product knowledge quickly',
      'Ability to work flexible schedules including evenings and weekends',
    ],
    reqId: 'Req164203',
    jobLocation: 'Multiple Locations',
    jobType: 'Full Time',
    careerArea: 'Retail Store',
    type: 'Onsite',
    image: '/images/department-supervisor-fj.33264519.webp',
    description: 'With a career at The Home Depot, you can be yourself and also be part of something bigger.',
    positionOverview: `Sales Associates are product experts who help customers find the right solutions for their projects. You'll provide knowledgeable assistance, answer questions, and ensure customers have everything they need for their home improvement projects. This role requires excellent customer service skills, product knowledge, and the ability to work in a fast-paced retail environment.`,
    keyResponsibilities: [
      'Assist customers with product selection and questions',
      'Provide expert advice on home improvement projects',
      'Maintain product knowledge and stay current on promotions',
      'Process sales transactions and handle returns',
      'Maintain department organization and cleanliness',
      'Build relationships with customers',
      'Support store sales goals and initiatives',
    ],
    qualifications: [
      'Excellent customer service skills',
      'Interest in home improvement and DIY projects',
      'Strong communication and interpersonal skills',
      'Ability to learn product knowledge quickly',
      'Ability to work flexible schedules including evenings and weekends',
      'High school diploma or equivalent preferred',
      'Previous retail or sales experience is an asset',
    ],
  },
};
