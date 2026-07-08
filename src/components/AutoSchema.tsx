/**
 * AutoSchema — Drop-in component that auto-generates the right JSON-LD for any page.
 * 
 * Usage: <AutoSchema path="/services/ai-visibility" />
 * 
 * It auto-detects the page type and generates:
 * - WebPage schema (always)
 * - BreadcrumbList (all pages except home)
 * - Service schema (service pages)
 * - Organization schema (home page)
 */

import { autoSchema } from '@/lib/schema-generator';

export default function AutoSchema({ path }: { path: string }) {
  const schemas = autoSchema(path);

  if (!schemas.length) return null;

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
