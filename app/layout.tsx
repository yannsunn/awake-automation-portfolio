import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Awake Automation Portfolio',
  description: 'AI × 自動化で業務を変革 — n8n自動化ソリューション',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja' className='dark'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}>
        <div className='flex min-h-screen'>
          <Sidebar />
          <main className='flex-1 p-6 pt-16 md:pt-6 overflow-auto md:ml-64'>{children}</main>
        </div>
      </body>
    </html>
  );
}
