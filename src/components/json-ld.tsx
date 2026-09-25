/**
 * Renders schema.org JSON-LD. Uses a plain <script> (not next/script) as the
 * Next.js docs recommend, escaping "<" so user-visible copy can never close
 * the script tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
