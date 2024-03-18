import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '@/context/youtubeContext';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: 'Youtube downloader video',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppContextProvider>
      <html lang="pt-BR">
        <body className={roboto.className}>{children}</body>
      </html>
    </AppContextProvider>
  );
}
