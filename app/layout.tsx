import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Selvam D — AI and Data Analytics | Junior Data Analyst',
  description:
    'Portfolio of Selvam D, fresher AI and Data Analytics professional and Junior Data Analyst specializing in Power BI dashboards, Excel modeling, DAX measures, SQL queries, and business intelligence.',
  keywords: [
    'Selvam D',
    'Data Analyst',
    'Junior Data Analyst',
    'AI and Data Analytics',
    'Power BI',
    'DAX',
    'Excel Analyst',
    'SQL',
    'Business Intelligence',
    'Portfolio',
  ],
  authors: [{ name: 'Selvam D' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Selvam D — AI and Data Analytics | Junior Data Analyst',
    description:
      'Explore Power BI dashboards, manufacturing intelligence models, Excel leakage analyses, and business insights built by Selvam D.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Selvam D Portfolio',
    images: [
      {
        url: '/images/novatech-overview.png',
        width: 1200,
        height: 630,
        alt: 'NovaTech MFG Intelligence Power BI Dashboard by Selvam D',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selvam D — AI and Data Analytics | Junior Data Analyst',
    description:
      'Explore Power BI dashboards, manufacturing intelligence models, Excel leakage analyses, and business insights built by Selvam D.',
    images: ['/images/novatech-overview.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased selection:bg-accent-plum selection:text-white`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
