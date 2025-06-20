
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
  const isDashboardRoute = pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardRoute && <Header />}
      <main className={`flex-grow ${!isDashboardRoute ? 'container mx-auto px-4 py-8' : ''}`}>
        {children}
      </main>
      {!isDashboardRoute && <Footer />}
      <Toaster />
    </>
  );
}
