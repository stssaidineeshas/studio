
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal Dashboard',
  description: 'Manage your activities, payouts, and settings.',
};

export default function DashboardLayout({
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
