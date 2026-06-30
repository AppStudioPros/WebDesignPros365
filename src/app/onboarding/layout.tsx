import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Client Onboarding | Web Design Pros 365',
  description: 'Complete your client intake form so we can get started on your project.',
  robots: { index: false, follow: false }, // hidden from search engines
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* No site header, footer, chat widget — clean isolated flow */}
      {children}
      <Toaster position="top-right" />
    </>
  );
}
