import { autoMetadata } from '@/lib/metadata';
import AutoSchema from '@/components/AutoSchema';

export const metadata = autoMetadata('/services/ai-saas-platforms');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoSchema path="/services/ai-saas-platforms" />
      {children}
    </>
  );
}
