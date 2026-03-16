import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import './basex-animations.css';
import { Inter } from 'next/font/google';
import { BaseXThemeSync } from '@/components/basex-theme-sync';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=TikTok+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <RootProvider>
          <BaseXThemeSync />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
