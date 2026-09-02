import assert from "node:assert/strict";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
let importSequence = 0;

async function render(pathname = "/", accept = "text/html") {
  const workerUrl = new URL("dist/server/index.js", projectRoot);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${importSequence++}`);
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

async function htmlFor(pathname) {
  const response = await render(pathname);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders the three-version chooser", async () => {
  const html = await htmlFor("/");

  assert.match(html, /<title>Three Digital Card Concepts \| LUDUN Group<\/title>/i);
  assert.match(html, /href="\/v1"/);
  assert.match(html, /href="\/v2"/);
  assert.match(html, /href="\/mike-lu\.vcf"/);
  assert.match(html, /名片 \+ 保存按钮/);
  assert.match(html, /完整电子名片/);
  assert.match(html, /直接进入保存确认/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview/);
});

test("renders version one as a classic card with one save action", async () => {
  const html = await htmlFor("/v1");

  assert.match(html, /Mike Lu/);
  assert.match(html, /陆建伟/);
  assert.match(html, /src="\/mike-business-card\.jpg"/);
  assert.match(html, /class="uploaded-card-image"/);
  assert.match(html, /href="\/mike-lu\.vcf"/);
  assert.match(html, /Save to contacts/);
});

test("renders version two with correct phone, email, web, map and save actions", async () => {
  const html = await htmlFor("/v2");

  for (const href of [
    "tel:+8613506839182",
    "tel:+85297153535",
    "tel:+8657384466850",
    "tel:+8657384465580",
  ]) {
    assert.match(html, new RegExp(`href="${href.replace("+", "\\+")}"`));
  }

  assert.match(html, /href="mailto:mike@lu-dun\.com"/);
  assert.match(html, /href="http:\/\/www\.lu-dun\.com"/);
  assert.match(html, /uri\.amap\.com\/search/);
  assert.match(html, /google\.com\/maps\/search/);
  assert.match(html, /Copy ID \/ 复制微信号/);
  assert.match(html, /href="\/mike-lu\.vcf"/);
});

test("serves a standards-friendly, contact-importable vCard", async () => {
  const response = await render("/mike-lu.vcf", "text/vcard");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/vcard\b/i);
  assert.match(
    response.headers.get("content-disposition") ?? "",
    /inline; filename="mike-lu\.vcf"/i,
  );

  const body = await response.text();
  const unfolded = body.replace(/\r\n[ \t]/g, "");
  assert.ok(body.endsWith("END:VCARD\r\n"), "vCard must end with CRLF");
  assert.match(unfolded, /^BEGIN:VCARD\r?$/m);
  assert.match(unfolded, /^FN:Mike Lu 陆建伟\r?$/m);
  assert.match(unfolded, /^TITLE:General Manager\r?$/m);
  assert.match(unfolded, /^TEL;TYPE=CELL:\+86-13506839182\r?$/m);
  assert.match(unfolded, /^TEL;TYPE=CELL:\+852-97153535\r?$/m);
  assert.match(unfolded, /^EMAIL;TYPE=INTERNET,WORK:mike@lu-dun\.com\r?$/m);
  assert.match(unfolded, /^NOTE:WeChat: ludun123321\r?$/m);

  for (const line of body.split("\r\n").filter(Boolean)) {
    assert.ok(
      Buffer.byteLength(line, "utf8") <= 75,
      `vCard physical line exceeds 75 bytes: ${line}`,
    );
  }
});
