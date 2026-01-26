import { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Web Design Pros 365. Start your project today!',
}

export default function ContactPage() {
  return <ContactPageClient />
}
