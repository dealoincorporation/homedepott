import Link from 'next/link';
import Image from 'next/image';

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-[#2a2a2a] text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/icons/logo.8eb14c19.png"
                alt="The Home Depot Logo"
                width={60}
                height={60}
                className="object-contain mr-2"
              />
              <span className="text-white text-sm md:text-base font-bold">CAREERS</span>
            </Link>
            <Link href="/applicant-login" className="text-sm hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12 px-4">{children}</main>
    </div>
  );
}
