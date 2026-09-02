import assert from "node:assert/strict";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
let importSequence = 0;

async function render(pathname = "/", accept = "text/html", method = "GET") {
  const workerUrl = new URL("dist/server/index.js", projectRoot);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${importSequence++}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      method,
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

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

function assertFinalCard(html) {
  assert.match(html, /<title>Mike Lu \| LUDUN Group Digital Business Card<\/title>/i);
  assert.match(html, /Mike Lu/);
  assert.match(html, /陆建伟/);
  assert.match(html, /General Manager/);
  assert.match(html, /JIASHAN KAIDUN GARMENTS CO\.,LTD/);

  for (const href of [
    "tel:+8613506839182",
    "tel:+85297153535",
    "tel:+8657384466850",
    "tel:+8657384465580",
  ]) {
    assert.match(html, new RegExp(`href="${href.replace("+", "\\+")}"`));
  }

  assert.match(html, /aria-label="Call \+86 135 0683 9182"/);
  assert.match(html, /href="mailto:mike@lu-dun\.com"/);
  assert.match(html, /href="http:\/\/www\.lu-dun\.com"/);
  assert.match(html, /uri\.amap\.com\/search/);
  assert.match(html, /google\.com\/maps\/search/);
  assert.match(html, /Copy ID \/ 复制微信号/);
  assert.match(html, /<a class="save-button" href="\/mike-lu\.vcf">/);
  assert.doesNotMatch(html, /\bdownload(?:=|\s|>)/i);

  assert.match(html, /Sikandar Park in the Suez Canal Special Economic Zone, Egypt/);
  assert.match(html, /19 Brookbridge Road, Great Neck, NY, New York 11021/);
  assert.match(
    html,
    /https:\/\/ludun-mike-digital-card\.mike020124\.chatgpt\.site\/og\.png/,
  );
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/ludun-mike-digital-card\.mike020124\.chatgpt\.site\/?"/,
  );
  assert.match(
    html,
    /<meta property="og:url" content="https:\/\/ludun-mike-digital-card\.mike020124\.chatgpt\.site\/?"/,
  );
  for (const anchor of html.match(/<a\b[^>]*href="https?:[^>]*>/g) ?? []) {
    assert.match(anchor, /target="_blank"/);
    assert.match(anchor, /rel="noreferrer"/);
  }
  assert.doesNotMatch(html, /Three Digital Card Concepts|3 CONCEPTS|三版方案/);
  assert.doesNotMatch(html, /href="\/v1"/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/);
}

test("renders the final digital card directly at the public root", async () => {
  assertFinalCard(await htmlFor("/"));
});

test("keeps /v2 as a compatible alias of the final card", async () => {
  assertFinalCard(await htmlFor("/v2"));
});

test("removes the discarded first-version route", async () => {
  const response = await render("/v1");
  assert.equal(response.status, 404);
});

test("serves a standards-friendly, contact-importable vCard", async () => {
  const response = await render("/mike-lu.vcf", "text/vcard");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/vcard\b/i);
  assert.match(
    response.headers.get("content-disposition") ?? "",
    /^inline; filename="mike-lu\.vcf"$/i,
  );
  assert.match(response.headers.get("cache-control") ?? "", /\bno-store\b/i);

  const body = await response.text();
  const unfolded = body.replace(/\r\n[ \t]/g, "");
  assert.ok(body.endsWith("END:VCARD\r\n"), "vCard must end with CRLF");
  assert.doesNotMatch(body.replaceAll("\r\n", ""), /[\r\n]/, "vCard must not contain bare CR or LF");

  const expectedLines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "UID:0a5fbcc9-0b53-4e06-a6d1-f29ef9ea77f7",
    "N:Lu;Mike;;;",
    "FN:Mike Lu 陆建伟",
    "ORG:JIASHAN KAIDUN GARMENTS CO.\\,LTD",
    "TITLE:General Manager",
    "TEL;TYPE=CELL,VOICE,PREF:+8613506839182",
    "TEL;TYPE=CELL,VOICE:+85297153535",
    "TEL;TYPE=WORK,VOICE:+8657384466850",
    "TEL;TYPE=WORK,VOICE:+8657384465580",
    "EMAIL;TYPE=INTERNET,PREF:mike@lu-dun.com",
    "ADR;TYPE=WORK:;;No.155 Kaiyuan Avenue\\, Xitang Town;Jiashan County;Zhejiang Province;;China",
    "URL:http://www.lu-dun.com",
    "NOTE:WeChat: ludun123321",
    "END:VCARD",
  ];

  assert.deepEqual(unfolded.split("\r\n").filter(Boolean), expectedLines);

  for (const line of body.split("\r\n").filter(Boolean)) {
    assert.ok(
      Buffer.byteLength(line, "utf8") <= 75,
      `vCard physical line exceeds 75 bytes: ${line}`,
    );
  }
});

test("supports HEAD checks for the stable vCard URL", async () => {
  const response = await render("/mike-lu.vcf", "text/vcard", "HEAD");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/vcard\b/i);
  assert.match(response.headers.get("content-disposition") ?? "", /^inline;/i);
  assert.match(response.headers.get("cache-control") ?? "", /\bno-store\b/i);
  assert.equal((await response.text()).length, 0);
});
