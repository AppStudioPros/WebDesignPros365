import type { Metadata, Viewport } from 'next'
import { Poppins, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://webdesignpros365.com'),
  title: {
    default: 'Web Design Pros 365 | Crafting Next-Gen Web Experiences',
    template: '%s | Web Design Pros 365',
  },
  description:
    'Premium web design agency specializing in Next.js development, GEO (Generative Engine Optimization), AI integration, and high-performance digital experiences. Transform your online presence with cutting-edge technology.',
  keywords: [
    'web design',
    'web development',
    'Next.js',
    'Vercel',
    'GEO',
    'Generative Engine Optimization',
    'AI integration',
    'headless CMS',
    'Sanity',
    'SEO',
    'digital marketing',
    'e-commerce',
    'custom software',
  ],
  authors: [{ name: 'Web Design Pros 365' }],
  creator: 'Web Design Pros 365',
  publisher: 'Web Design Pros 365',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://webdesignpros365.com',
    siteName: 'Web Design Pros 365',
    title: 'Web Design Pros 365 | Crafting Next-Gen Web Experiences',
    description:
      'Premium web design agency specializing in Next.js development, GEO, AI integration, and high-performance digital experiences.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Web Design Pros 365',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web Design Pros 365 | Crafting Next-Gen Web Experiences',
    description:
      'Premium web design agency specializing in Next.js development, GEO, AI integration, and high-performance digital experiences.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0f1419',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${plusJakarta.variable}`}>
      <head>
        {/* Google reCAPTCHA v3 Script */}
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
