// components/JsonLd.tsx
// Reusable server-side JSON-LD structured data injector
// Sanitizes output to prevent script injection via < escaping

interface JsonLdProps {
  data: Record<string, any>
}

export default function JsonLd({ data }: JsonLdProps) {
  const sanitizedJson = JSON.stringify(data).replace(/</g, '\\u003c')

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizedJson }}
    />
  )
}
