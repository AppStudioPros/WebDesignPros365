import { NextResponse } from 'next/server'

// Manifest for PWA capabilities
export async function GET() {
  const manifest = {
    name: 'Web Design Pros 365',
    short_name: 'WDP365',
    description: 'Premium web design agency specializing in Next.js development and AI integration.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1419',
    theme_color: '#0066cc',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }

  return NextResponse.json(manifest)
}
