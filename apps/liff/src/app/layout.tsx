import './globals.css';
import '@sommhai/ui/styles.css';
import 'leaflet/dist/leaflet.css';

import { GoogleOAuthProvider } from '@react-oauth/google';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { StrictMode } from 'react';

import AppLayout from '@/components/common/layout';
import AuthProvider from '@/contexts/global/auth';
import { LiffProvider } from '@/contexts/global/liff';
import { QueryProvider } from '@/contexts/global/query';
import { CLIENT_ID } from '@/env';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Sommhai',
  description:
    'Invite your friends all at the same time. No more group chats. No more hassle. Sommhai, make event organizing easy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${poppins.variable} antialiased`}>
        <StrictMode>
          <AuthProvider>
            <QueryProvider>
              <LiffProvider>
                <GoogleOAuthProvider clientId={CLIENT_ID}>
                  <AppLayout>{children}</AppLayout>
                </GoogleOAuthProvider>
              </LiffProvider>
            </QueryProvider>
          </AuthProvider>
        </StrictMode>
      </body>
    </html>
  );
}
