import { createMikeVCard } from "../lib/contact";

export async function GET() {
  return new Response(createMikeVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="mike-lu.vcf"',
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
