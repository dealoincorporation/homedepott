'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isApplyRoute = pathname?.startsWith('/apply/');
  const isApplicationRoute = pathname?.startsWith('/application/');
  const isApplicantLoginRoute = pathname === '/applicant-login';
  const isAuthPage =
    pathname === '/forgot-password' || pathname === '/verify-email' || pathname === '/reset-password';
  const shouldHideHeader = isApplyRoute || isApplicationRoute || isApplicantLoginRoute || isAuthPage;

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
      {!shouldHideHeader && <Footer />}
    </>
  );
}
