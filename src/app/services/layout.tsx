import { autoMetadata } from '@/lib/metadata';
import AutoSchema from '@/components/AutoSchema';

export const metadata = autoMetadata('/services');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AutoSchema path="/services" />
      {children}
    </>
  );
}
