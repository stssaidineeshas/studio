
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal Login',
  description: 'Sign in to the Client Portal.',
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
