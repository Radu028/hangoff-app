import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'

import Footer from './ui/footer'
import NavBar from './ui/nav-bar'
import PromoBar from './ui/promo-bar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | hangOFF',
    default: 'hangOFF',
  },
  description:
    'hangOFF – Suplimente funcționale elvețiene pentru o viață socială activă fără compromisuri. Bucură-te de seară, simte-te bine a doua zi.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
    other: {
      rel: 'icon',
      url: '/icon.png',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, 'antialiased')}>
        <div className="flex flex-col">
          <div className="flex h-svh shrink-0 flex-col">
            <PromoBar />
            <NavBar />
            <main className="relative flex min-h-0 flex-1 flex-col">{children}</main>
          </div>

          <Footer />
        </div>
      </body>
    </html>
  )
}
