import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/store/queryProvider';
import SideBar from './_components/SideBar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: '가취뽀',
  description: '기술면접 연습과 이력서 피드백을 받으며 취업을 준비해요!'
};

export type Props = { points: 0; setPoints: (value: number) => void };

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex flex-row">
            <SideBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
