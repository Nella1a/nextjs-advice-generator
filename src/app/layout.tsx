import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navigation from './components/Nav/nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Advice Generator',
  description: 'Search or get an Advice',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-dark-blue flex flex-col`}>
        <header className="border border-white h-14">
          <Navigation />
        </header>
        <main className="min-h-screen ">{children}</main>
      </body>
    </html>
  );
}
