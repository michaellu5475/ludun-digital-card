import assert from "node:assert/strict";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const siteOrigin = "https://ludun-mike-digital-card.mike020124.chatgpt.site";
let importSequence = 0;

const sharedVCardLines = {
  begin: ["BEGIN:VCARD", "VERSION:3.0"],
  company: "ORG:JIASHAN KAIDUN GARMENTS CO.\\,LTD",
  website: "URL:http://www.lu-dun.com",
  chinaAddress:
    "ADR;TYPE=WORK:;;No.155 Kaiyuan Avenue\\, Xitang Town;Jiashan County;Zhejiang Province;;China",
  end: "END:VCARD",
};

const officeContracts = [
  {
    name: "JIASHAN KAIDUN GARMENTS CO.,LTD",
    address: "No.155 Kaiyuan Avenue, Xitang Town, Jiashan County, Zhejiang Province, China",
  },
  {
    name: "VISKAI GARMENT ACCESSORIES EGYPT CO.,LTD",
    address: "Sikandar Park in the Suez Canal Special Economic Zone, Egypt",
  },
  {
    name: "BRILLIANT ACCESSORIES INTERNATIONAL COMPANY LIMITED",
    address: "Flat A, 16/F, Manley House, 86 Canton Road, TST, Hong Kong",
  },
  {
    name: "NEW YORK REPRESENTATIVE OFFICE",
    address: "19 Brookbridge Road, Great Neck, NY, New York 11021",
  },
];

const contactContracts = [
  {
    key: "mike",
    pagePath: "/",
    vcardPath: "/mike-lu.vcf",
    filename: "mike-lu.vcf",
    name: "Mike Lu",
    chineseName: "陆建伟",
    role: "General Manager",
    email: "mike@lu-dun.com",
    wechat: "ludun123321",
    phoneHrefs: [
      "tel:+8613506839182",
      "tel:+85297153535",
      "tel:+8657384466850",
      "tel:+8657384465580",
    ],
    phoneLabels: ["China mobile", "Hong Kong mobile", "Direct line 1", "Direct line 2"],
    phoneValues: [
      "+86 135 0683 9182",
      "+852 9715 3535",
      "+86 573 8446 6850",
      "+86 573 8446 5580",
    ],
    primaryPhoneValue: "+86 135 0683 9182",
    expectedVCardLines: [
      ...sharedVCardLines.begin,
      "UID:0a5fbcc9-0b53-4e06-a6d1-f29ef9ea77f7",
      "N:Lu;Mike;;;",
      "FN:Mike Lu 陆建伟",
      sharedVCardLines.company,
      "TITLE:General Manager",
      "TEL;TYPE=CELL,VOICE,PREF:+8613506839182",
      "TEL;TYPE=CELL,VOICE:+85297153535",
      "TEL;TYPE=WORK,VOICE:+8657384466850",
      "TEL;TYPE=WORK,VOICE:+8657384465580",
      "EMAIL;TYPE=INTERNET,PREF:mike@lu-dun.com",
      sharedVCardLines.chinaAddress,
      sharedVCardLines.website,
      "NOTE:WeChat: ludun123321",
      sharedVCardLines.end,
    ],
  },
  {
    key: "chloe",
    pagePath: "/chloe",
    vcardPath: "/chloe-chun.vcf",
    filename: "chloe-chun.vcf",
    name: "Chloe Chun",
    chineseName: "秦皓怡",
    role: "Sales representative",
    email: "chloe@lu-dun.com",
    phoneHrefs: ["tel:+15515748887"],
    phoneLabels: ["Telephone"],
    phoneValues: ["+1 551 574 8887"],
    primaryPhoneValue: "+1 551 574 8887",
    expectedVCardLines: [
      ...sharedVCardLines.begin,
      "UID:bb5ba67c-b5c4-4c6b-8450-f87f9ac1f382",
      "N:Chun;Chloe;;;",
      "FN:Chloe Chun 秦皓怡",
      sharedVCardLines.company,
      "TITLE:Sales representative",
      "TEL;TYPE=VOICE,PREF:+15515748887",
      "EMAIL;TYPE=INTERNET,PREF:chloe@lu-dun.com",
      sharedVCardLines.website,
      sharedVCardLines.end,
    ],
  },
  {
    key: "jana",
    pagePath: "/jana",
    vcardPath: "/jana.vcf",
    filename: "jana.vcf",
    name: "Jana",
    chineseName: "卓静娟",
    role: "Marketing Manager",
    email: "jana@lu-dun.com",
    wechat: "ludun13857313982",
    phoneHrefs: [
      "tel:+8613857313982",
      "tel:+8657384466850",
      "tel:+8657384465580",
    ],
    phoneLabels: ["China mobile", "Direct line 1", "Direct line 2"],
    phoneValues: [
      "+86 138 5731 3982",
      "+86 573 8446 6850",
      "+86 573 8446 5580",
    ],
    primaryPhoneValue: "+86 138 5731 3982",
    expectedVCardLines: [
      ...sharedVCardLines.begin,
      "UID:baf967a2-34a5-48e2-b2db-a5975ebef067",
      "N:;Jana;;;",
      "FN:Jana 卓静娟",
      sharedVCardLines.company,
      "TITLE:Marketing Manager",
      "TEL;TYPE=CELL,VOICE,PREF:+8613857313982",
      "TEL;TYPE=WORK,VOICE:+8657384466850",
      "TEL;TYPE=WORK,VOICE:+8657384465580",
      "EMAIL;TYPE=INTERNET,PREF:jana@lu-dun.com",
      sharedVCardLines.chinaAddress,
      sharedVCardLines.website,
      "NOTE:WeChat: ludun13857313982",
      sharedVCardLines.end,
    ],
  },
  {
    key: "deavy",
    pagePath: "/deavy",
    vcardPath: "/deavy-chun.vcf",
    filename: "deavy-chun.vcf",
    name: "Deavy Chun",
    chineseName: "秦国良",
    role: "Director",
    email: "deavyc@hotmail.com",
    phoneHrefs: ["tel:+85290180433"],
    phoneLabels: ["Telephone"],
    phoneValues: ["+852 9018 0433"],
    primaryPhoneValue: "+852 9018 0433",
    expectedVCardLines: [
      ...sharedVCardLines.begin,
      "UID:482684a8-19d3-49be-bfe0-37a507cff808",
      "N:Chun;Deavy;;;",
      "FN:Deavy Chun 秦国良",
      sharedVCardLines.company,
      "TITLE:Director",
      "TEL;TYPE=VOICE,PREF:+85290180433",
      "EMAIL;TYPE=INTERNET,PREF:deavyc@hotmail.com",
      sharedVCardLines.website,
      sharedVCardLines.end,
    ],
  },
];

async function render(pathname = "/", accept = "text/html", method = "GET") {
  const workerUrl = new URL("dist/server/index.js", projectRoot);
  workerUrl.searchParams.set(
    "test",
    [process.pid, Date.now(), importSequence++].join("-"),
  );
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost" + pathname, {
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

function escapeRegex(value) {
  return value.replace(/[.*+?^$()|[\]\\]/g, "\\$&");
}

function countOccurrences(value, needle) {
  return value.match(new RegExp(escapeRegex(needle), "g"))?.length ?? 0;
}

function assertContactCard(html, contact, canonicalPath = contact.pagePath) {
  const title = contact.name + " | LUDUN Group Digital Business Card";
  const description =
    "Call, email, find an office, or save " +
    contact.name +
    "&#x27;s contact details.";
  const canonical = siteOrigin + (canonicalPath === "/" ? "" : canonicalPath);

  assert.match(html, new RegExp("<title>" + escapeRegex(title) + "</title>", "i"));
  assert.match(
    html,
    new RegExp('<meta name="description" content="' + escapeRegex(description) + '"'),
  );
  assert.match(
    html,
    new RegExp('<meta property="og:title" content="' + escapeRegex(title) + '"'),
  );
  assert.match(
    html,
    new RegExp('<meta property="og:description" content="' + escapeRegex(description) + '"'),
  );
  assert.match(
    html,
    new RegExp('<meta name="twitter:title" content="' + escapeRegex(title) + '"'),
  );
  assert.match(
    html,
    new RegExp('<meta name="twitter:description" content="' + escapeRegex(description) + '"'),
  );
  assert.match(
    html,
    new RegExp('<link rel="canonical" href="' + escapeRegex(canonical) + '/?"'),
  );
  assert.match(
    html,
    new RegExp('<meta property="og:url" content="' + escapeRegex(canonical) + '/?"'),
  );
  assert.match(html, new RegExp(escapeRegex(contact.name)));
  assert.match(html, new RegExp(contact.chineseName));
  assert.match(html, new RegExp(escapeRegex(contact.role)));
  assert.match(html, /JIASHAN KAIDUN GARMENTS CO\.,LTD/);

  contact.phoneHrefs.forEach((href, index) => {
    assert.equal(
      countOccurrences(html, 'href="' + href + '"'),
      index === 0 ? 2 : 1,
      contact.name + ": unexpected link count for " + href,
    );
  });
  assert.equal(
    (html.match(/href="tel:[^"]+"/g) ?? []).length,
    contact.phoneHrefs.length + 1,
    contact.name + ": unexpected extra telephone link",
  );
  for (const label of contact.phoneLabels) {
    assert.match(html, new RegExp(escapeRegex(label), "i"));
  }
  for (const value of contact.phoneValues) {
    assert.match(html, new RegExp(escapeRegex(value)));
  }
  assert.match(
    html,
    new RegExp('aria-label="Call ' + escapeRegex(contact.primaryPhoneValue) + '"'),
  );
  assert.equal(countOccurrences(html, 'href="mailto:' + contact.email + '"'), 2);
  assert.equal(countOccurrences(html, 'href="' + contact.vcardPath + '"'), 1);
  assert.equal(countOccurrences(html, 'href="http://www.lu-dun.com"'), 1);

  if (contact.wechat) {
    assert.match(html, new RegExp(escapeRegex(contact.wechat)));
    assert.match(html, /Copy ID \/ 复制微信号/);
  } else {
    assert.doesNotMatch(html, /Copy ID \/ 复制微信号/);
    assert.doesNotMatch(html, />WX</);
  }

  for (const other of contactContracts.filter(({ key }) => key !== contact.key)) {
    assert.doesNotMatch(html, new RegExp(escapeRegex(other.name)));
    assert.doesNotMatch(html, new RegExp(other.chineseName));
    assert.doesNotMatch(html, new RegExp(escapeRegex(other.email)));
    assert.doesNotMatch(html, new RegExp(escapeRegex(other.vcardPath)));
    if (other.wechat) {
      assert.doesNotMatch(html, new RegExp(escapeRegex(other.wechat)));
    }
  }

  assert.equal((html.match(/<details\b/g) ?? []).length, 4);
  for (const office of officeContracts) {
    assert.match(html, new RegExp(escapeRegex(office.name)));
    assert.match(html, new RegExp(escapeRegex(office.address)));

    const googleHref = (
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(office.address)
    ).replaceAll("&", "&amp;");
    assert.equal(countOccurrences(html, 'href="' + googleHref + '"'), 1);
  }
  const amapHref = (
    "https://uri.amap.com/search?keyword=" +
    encodeURIComponent(officeContracts[0].address) +
    "&view=map&src=ludun.digital.card"
  ).replaceAll("&", "&amp;");
  assert.equal(countOccurrences(html, 'href="' + amapHref + '"'), 2);
  assert.doesNotMatch(html, /\bdownload(?:=|\s|>)/i);

  for (const anchor of html.match(/<a\b[^>]*href="https?:[^>]*>/g) ?? []) {
    assert.match(anchor, /target="_blank"/);
    assert.match(anchor, /rel="noreferrer"/);
  }
}

for (const contact of contactContracts) {
  test("renders " + contact.name + "'s digital card with isolated contact data", async () => {
    const html = await htmlFor(contact.pagePath);
    assertContactCard(html, contact);

    if (contact.pagePath === "/") {
      assert.match(html, new RegExp(escapeRegex(siteOrigin) + "/og\\.png"));
    } else {
      assert.doesNotMatch(html, /property="og:image"/);
      assert.doesNotMatch(html, /name="twitter:image"/);
    }
  });

  test("serves " + contact.name + "'s standards-friendly vCard", async () => {
    const response = await render(contact.vcardPath, "text/vcard");
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/vcard\b/i);
    assert.equal(
      response.headers.get("content-disposition"),
      'inline; filename="' + contact.filename + '"',
    );
    assert.match(response.headers.get("cache-control") ?? "", /\bno-store\b/i);

    const body = await response.text();
    const unfolded = body.replace(/\r\n[ \t]/g, "");
    assert.ok(body.endsWith("END:VCARD\r\n"), "vCard must end with CRLF");
    assert.doesNotMatch(
      body.replaceAll("\r\n", ""),
      /[\r\n]/,
      "vCard must not contain bare CR or LF",
    );
    assert.deepEqual(
      unfolded.split("\r\n").filter(Boolean),
      contact.expectedVCardLines,
    );

    for (const line of body.split("\r\n").filter(Boolean)) {
      assert.ok(
        Buffer.byteLength(line, "utf8") <= 75,
        "vCard physical line exceeds 75 bytes: " + line,
      );
    }
  });

  test("supports HEAD checks for " + contact.name + "'s vCard URL", async () => {
    const response = await render(contact.vcardPath, "text/vcard", "HEAD");
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/vcard\b/i);
    assert.equal(
      response.headers.get("content-disposition"),
      'inline; filename="' + contact.filename + '"',
    );
    assert.match(response.headers.get("cache-control") ?? "", /\bno-store\b/i);
    assert.equal((await response.text()).length, 0);
  });
}

test("keeps /v2 as a compatible alias of Mike's final card", async () => {
  assertContactCard(await htmlFor("/v2"), contactContracts[0], "/");
});

test("renders Mike at the dedicated /mike route", async () => {
  const html = await htmlFor("/mike");
  assertContactCard(html, contactContracts[0], "/mike");
  assert.doesNotMatch(html, /property="og:image"/);
  assert.doesNotMatch(html, /name="twitter:image"/);
});

test("keeps retired versions unavailable", async () => {
  for (const path of ["/v1", "/v3"]) {
    const response = await render(path);
    assert.equal(response.status, 404);
  }
});

test("uses a unique stable UID for every contact", () => {
  const uids = contactContracts.map(({ expectedVCardLines }) =>
    expectedVCardLines.find((line) => line.startsWith("UID:")),
  );
  assert.equal(new Set(uids).size, contactContracts.length);
});
