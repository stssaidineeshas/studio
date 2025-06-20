
'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/toaster";

export default function RootLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isFullPageLayoutRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/request-by-email');

  return (
    <>
      {!isFullPageLayoutRoute && <Header />}
      <main className={`flex-grow ${!isFullPageLayoutRoute ? 'container mx-auto px-4 py-8' : ''}`}>
        {children}
      </main>
      {!isFullPageLayoutRoute && <Footer />}
      <Toaster />
    </>
  );
}
