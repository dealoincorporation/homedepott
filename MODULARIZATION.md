# Codebase Modularization

This document describes the modular structure of the Home Depot careers application.

## Data Layer (`src/data/`)

- **`jobs.ts`** – Shared job data: `JOB_IMAGES`, `JOB_TITLES`, `USA_LOCATIONS`, `CANADA_LOCATIONS`, `JOB_SEARCH_LOCATIONS`, `JOB_TYPES`, `WORK_TYPES`, `CAREER_AREAS`, `hashString()`, `getLocationDisplayName()`
- **`featured-jobs.ts`** – `featuredJobsData`, `FEATURED_JOB_SLUGS`, `FeaturedJobSlug` type
- **`index.ts`** – Re-exports all data modules

## Auth Components (`src/components/auth/`)

- **`AuthPageLayout.tsx`** – Shared layout for forgot-password, reset-password, verify-email (header + main wrapper)

## Lib Utilities (`src/lib/`)

- **`api.ts`** – `parseJsonBody()`, `apiError()`, `apiSuccess()` for API routes
- **`auth.ts`** – JWT, password hashing, session helpers
- **`sendEmail.ts`** – `sendVerificationCodeEmail()` (Gmail/nodemailer)
- **`mongoose.ts`** – MongoDB connection
- **`email.ts`** – Generic SMTP email (legacy)

## Dynamic Routes

### Featured Jobs

- **Before:** 14 separate page/layout pairs (`data-entry`, `payroll-clerk`, etc.)
- **After:** Single dynamic route `featured-jobs/[slug]/page.tsx` + `layout.tsx`
- URLs unchanged: `/featured-jobs/data-entry`, `/featured-jobs/virtual-assistant`, etc.
- Valid slugs from `FEATURED_JOB_SLUGS`

## Components Using Shared Data

| Component            | Imports From      |
|----------------------|-------------------|
| `JobSearchResults`   | `@/data/jobs`     |
| `JobDetail`          | `@/data/jobs`     |
| `FeaturedJobs`       | `@/data/featured-jobs` |
| `forgot-password`    | `AuthPageLayout`  |
| `reset-password`     | `AuthPageLayout`  |
| `verify-email`       | `AuthPageLayout`  |

## Constants & Types (`src/constants/`, `src/types/`)

- Career areas, store locations, navigation, theme colors
- Shared TypeScript interfaces
