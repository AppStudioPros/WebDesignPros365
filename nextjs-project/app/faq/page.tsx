import { Metadata } from 'next'
import FAQPageClient from './FAQPageClient'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Web Design Pros 365 services, pricing, and process.',
}

export default function FAQPage() {
  return <FAQPageClient />
}
