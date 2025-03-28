import { Auth0Provider } from '@auth0/nextjs-auth0';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FunctionComponent, PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <Auth0Provider>{children}</Auth0Provider>
    </body>
  </html>
);

export default RootLayout;
