// Shared constants and data

import type { CareerArea, Store, CareerOption } from '@/types';

// Career Areas Data
export const CAREER_AREAS: CareerArea[] = [
  {
    title: "Retail Store Opportunities",
    href: "/career-areas/retail-store-opportunities",
    image: "/retail-store.c2bf574d.webp"
  },
  {
    title: "Field Opportunities",
    href: "/career-areas/field",
    image: "/images/distribution.14eaa417.webp"
  },
  {
    title: "Corporate Careers",
    href: "/career-areas/corporate-opportunities",
    image: "/images/corporate.a41e37c0.webp"
  }
];

// Career Options for Dropdown
export const CAREER_OPTIONS: CareerOption[] = [
  { value: "", text: "Browse All Our Career Areas" },
  { value: "/career-areas/corporate-opportunities", text: "Corporate Careers" },
  { value: "/career-areas/early-talent", text: "Early Talent Program" },
  { value: "/career-areas/field", text: "Field Opportunities" },
  { value: "/career-areas/retail-management-opportunities", text: "Retail Management" },
  { value: "/career-areas/retail-store-opportunities", text: "Retail Store" }
];

// Store Locations Data (Canada & USA only)
export const STORE_LOCATIONS: Store[] = [
  {
    id: 7151,
    name: "SYDNEY STORE",
    location: "1234 Main Street, Sydney, NY 13160, USA",
    href: "/store/7151"
  },
  {
    id: 7126,
    name: "HALIFAX STORE",
    location: "368 Lacewood Drive, Halifax, NS B3M 0A1, Canada",
    href: "/store/7126"
  },
  {
    id: 7261,
    name: "NEW MINAS STORE",
    location: "21 Silver Fox Ave, New Minas, NS B4N 3K7, Canada",
    href: "/store/7261",
    hiddenOnMedium: true
  }
];

// Navigation Items
export const NAVIGATION_ITEMS = [
  {
    name: "Careers",
    href: "/careers",
    children: [
      { name: "Retail Store", href: "/career-areas/retail-store-opportunities" },
      { name: "Field Opportunities", href: "/career-areas/field" },
      { name: "Corporate Careers", href: "/career-areas/corporate-opportunities" }
    ]
  },
  {
    name: "Locations",
    href: "/locations"
  },
  {
    name: "About",
    href: "/about"
  }
];

// Social Media Links
export const SOCIAL_LINKS = [
  { name: "Facebook", href: "#", icon: "fab fa-facebook-f" },
  { name: "Twitter", href: "#", icon: "fab fa-twitter" },
  { name: "Instagram", href: "#", icon: "fab fa-instagram" },
  { name: "LinkedIn", href: "#", icon: "fab fa-linkedin-in" }
];

// Theme Colors
export const THEME_COLORS = {
  primary: "#ff6600",
  secondary: "#000000",
  accent: "#ffffff",
  background: "#ffffff",
  text: "#333333"
};

// Breakpoints
export const BREAKPOINTS = {
  mobile: "768px",
  tablet: "992px",
  desktop: "1200px",
  wide: "1440px"
};

// API Endpoints
export const API_ENDPOINTS = {
  jobs: "/api/jobs",
  locations: "/api/locations",
  contact: "/api/contact"
};

// Content
export const CONTENT = {
  hero: {
    title: "Careers at The Home Depot Canada",
    subtitle: "Build Your Future With Us",
    description: "Join our team and discover endless opportunities for growth and development."
  },
  about: {
    title: "Why Choose The Home Depot Canada?",
    description: "We're committed to providing our employees with competitive benefits, ongoing training, and a supportive work environment."
  }
};