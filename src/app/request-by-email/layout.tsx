
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal - Request by Email',
  description: 'Manage vendor W-9 requests by email.',
};

export default function RequestByEmailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
