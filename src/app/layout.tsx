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
        <header className="h-12 bg-dark-grayish-blue">
          <Navigation />
        </header>
        <main className="min-h-screen ">{children}</main>
      </body>
    </html>
  );
}
