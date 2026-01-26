import { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore our comprehensive web development services including GEO, AI Integration, Next.js Development, SEO, and more.',
}

export default function ServicesPage() {
  return <ServicesPageClient />
}
