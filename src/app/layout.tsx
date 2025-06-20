
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Toaster can be here or in Client, but globals.css is here.
import { Inter, Alegreya } from 'next/font/google';
import RootLayoutClient from './RootLayoutClient';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Client portal for accessing services and managing information.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${alegreya.variable}`} suppressHydrationWarning>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="font-body antialiased flex flex-col min-h-screen">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
