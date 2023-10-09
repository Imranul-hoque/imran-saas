import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ModalProvider from '@/components/modal-provider';
import ToastProvider from '@/components/toast-provider';
import { CrispProvider } from '@/components/crisp-provider';

const font = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "imranSass",
  description : "imranSass provider by ai"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ModalProvider />
          <ToastProvider />
          <CrispProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
