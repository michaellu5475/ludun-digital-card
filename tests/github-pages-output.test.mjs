import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesRoot = path.join(projectRoot, "docs");
const basePath = "/ludun-digital-card";
const siteUrl = `https://michaellu5475.github.io${basePath}`;

const contacts = [
  {
    slug: "mike",
    name: "Mike Lu",
    chineseName: "陆建伟",
    role: "General Manager",
    email: "mike@lu-dun.com",
    vcard: "mike-lu.vcf",
    vcardHash: "b155b7e68723879c4981fdce7987d7d5c798e73225025a9c824d09779b4061d1",
  },
  {
    slug: "chloe",
    name: "Chloe Chun",
    chineseName: "秦皓怡",
    role: "Sales representative",
    email: "chloe@lu-dun.com",
    vcard: "chloe-chun.vcf",
    vcardHash: "2fbb4ccff02c0d9e3e47ed7d93c8317a7c149ec19fdb302d9e41ed1770099657",
  },
  {
    slug: "jana",
    name: "Jana",
    chineseName: "卓静娟",
    role: "Marketing Manager",
    email: "jana@lu-dun.com",
    vcard: "jana.vcf",
    vcardHash: "99795a2cd00a8dabbbd6473e1392ee68136b7fc0fa37d50da82a6bdee035d932",
  },
  {
    slug: "deavy",
    name: "Deavy Chun",
    chineseName: "秦国良",
    role: "Director",
    email: "deavyc@hotmail.com",
    vcard: "deavy-chun.vcf",
    vcardHash: "9d758bb0595df230939b58c927a5d4345d83383330beeaa49369f89f8dabd21e",
  },
];

function escapeRegex(value) {
  return value.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
}

for (const contact of contacts) {
  test(`exports ${contact.name} at /${contact.slug}/ with repository-safe links`, async () => {
    const html = await readFile(
      path.join(pagesRoot, contact.slug, "index.html"),
      "utf8",
    );
    const pageUrl = `${siteUrl}/${contact.slug}/`;

    assert.match(html, new RegExp(`<title>${escapeRegex(contact.name)} \\| LUDUN Group Digital Business Card</title>`));
    assert.match(html, new RegExp(escapeRegex(contact.chineseName)));
    assert.match(html, new RegExp(escapeRegex(contact.role)));
    assert.match(html, new RegExp(`mailto:${escapeRegex(contact.email)}`));
    assert.match(html, new RegExp(`href="${escapeRegex(basePath)}/${escapeRegex(contact.vcard)}"`));
    assert.match(html, new RegExp(`rel="canonical" href="${escapeRegex(pageUrl)}"`));
    assert.match(html, new RegExp(`property="og:url" content="${escapeRegex(pageUrl)}"`));
    assert.doesNotMatch(html, /chatgpt\.site/);
    assert.doesNotMatch(html, /(?:href|src)="\/(?!ludun-digital-card(?:\/|"))/);

    for (const other of contacts.filter(({ slug }) => slug !== contact.slug)) {
      assert.doesNotMatch(html, new RegExp(escapeRegex(other.email)));
      assert.doesNotMatch(html, new RegExp(escapeRegex(other.vcard)));
    }
  });

  test(`exports ${contact.name}'s exact vCard bytes`, async () => {
    const body = await readFile(path.join(pagesRoot, contact.vcard));
    assert.equal(createHash("sha256").update(body).digest("hex"), contact.vcardHash);
    assert.ok(body.toString("utf8").endsWith("END:VCARD\r\n"));
    for (const line of body.toString("utf8").split("\r\n").filter(Boolean)) {
      assert.ok(Buffer.byteLength(line, "utf8") <= 75);
    }
  });
}

test("exports GitHub Pages support files and prefixed assets", async () => {
  await readFile(path.join(pagesRoot, ".nojekyll"));
  await readFile(path.join(pagesRoot, "404.html"), "utf8");
  await readFile(path.join(pagesRoot, "ludun-logo.png"));

  const rootHtml = await readFile(path.join(pagesRoot, "index.html"), "utf8");
  const assetPath = rootHtml.match(/(?:href|src)="(\/ludun-digital-card\/_next\/static\/[^"]+)"/)?.[1];
  assert.ok(assetPath, "expected a repository-prefixed static asset");
  await readFile(path.join(pagesRoot, assetPath.slice(basePath.length + 1)));
  assert.doesNotMatch(rootHtml, /chatgpt\.site/);
});
