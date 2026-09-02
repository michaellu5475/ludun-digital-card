import assert from "node:assert/strict";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(pathname = "/", accept = "text/html") {
  const workerUrl = new URL("dist/server/index.js", projectRoot);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders Mike Lu's digital business card", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Mike Lu \| LUDUN Group<\/title>/i);
  assert.match(html, /Mike Lu/);
  assert.match(html, /General Manager/);
  assert.match(html, /href="\/mike-lu\.vcf"/);
  assert.match(html, /Save to contacts/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/);
});

test("serves a contact-importable vCard", async () => {
  const response = await render("/mike-lu.vcf", "text/vcard");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/vcard\b/i);
  assert.match(
    response.headers.get("content-disposition") ?? "",
    /filename="mike-lu\.vcf"/i,
  );

  const body = await response.text();
  assert.match(body, /^BEGIN:VCARD\r?$/m);
  assert.match(body, /^FN:Mike Lu 陆建伟\r?$/m);
  assert.match(body, /^TEL;TYPE=CELL:\+86-13506839182\r?$/m);
  assert.match(body, /^END:VCARD$/m);
});
