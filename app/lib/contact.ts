export const person = {
  firstName: "Mike",
  lastName: "Lu",
  name: "Mike Lu",
  chineseName: "陆建伟",
  role: "General Manager",
  company: "JIASHAN KAIDUN GARMENTS CO.,LTD",
  email: "mike@lu-dun.com",
  websiteLabel: "www.lu-dun.com",
  websiteHref: "http://www.lu-dun.com",
  wechat: "ludun123321",
} as const;

export const phoneNumbers = [
  {
    mark: "CN",
    label: "China mobile",
    value: "+86 135 0683 9182",
    href: "tel:+8613506839182",
    vcardTypes: "CELL,VOICE,PREF",
  },
  {
    mark: "HK",
    label: "Hong Kong mobile",
    value: "+852 9715 3535",
    href: "tel:+85297153535",
    vcardTypes: "CELL,VOICE",
  },
  {
    mark: "01",
    label: "Direct line 1",
    value: "+86 573 8446 6850",
    href: "tel:+8657384466850",
    vcardTypes: "WORK,VOICE",
  },
  {
    mark: "02",
    label: "Direct line 2",
    value: "+86 573 8446 5580",
    href: "tel:+8657384465580",
    vcardTypes: "WORK,VOICE",
  },
] as const;

const primaryAddress = {
  street: "No.155 Kaiyuan Avenue, Xitang Town",
  locality: "Jiashan County",
  region: "Zhejiang Province",
  postalCode: "",
  country: "China",
} as const;

export const offices = [
  {
    city: "China",
    name: "JIASHAN KAIDUN GARMENTS CO.,LTD",
    address: [
      primaryAddress.street,
      primaryAddress.locality,
      primaryAddress.region,
      primaryAddress.country,
    ].join(", "),
  },
  {
    city: "Egypt",
    name: "VISKAI GARMENT ACCESSORIES EGYPT CO.,LTD",
    address: "Sikandar Park in the Suez Canal Special Economic Zone, Egypt",
  },
  {
    city: "Hong Kong",
    name: "BRILLIANT ACCESSORIES INTERNATIONAL COMPANY LIMITED",
    address: "Flat A, 16/F, Manley House, 86 Canton Road, TST, Hong Kong",
  },
  {
    city: "New York",
    name: "NEW YORK REPRESENTATIVE OFFICE",
    address: "19 Brookbridge Road, Great Neck, NY, New York 11021",
  },
] as const;

export function mapHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function amapHref(address: string) {
  return `https://uri.amap.com/search?keyword=${encodeURIComponent(address)}&view=map&src=ludun.digital.card`;
}

function utf8Length(value: string) {
  return new TextEncoder().encode(value).length;
}

function escapeVCardText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function foldVCardLine(line: string) {
  const chunks: string[] = [];
  let chunk = "";

  for (const character of line) {
    const continuationPrefixBytes = chunks.length === 0 ? 0 : 1;
    if (
      chunk &&
      utf8Length(chunk + character) + continuationPrefixBytes > 75
    ) {
      chunks.push(chunk);
      chunk = character;
    } else {
      chunk += character;
    }
  }

  chunks.push(chunk);
  return chunks.map((part, index) => (index === 0 ? part : ` ${part}`));
}

export function createMikeVCard() {
  const chinaAddress = [
    "",
    "",
    primaryAddress.street,
    primaryAddress.locality,
    primaryAddress.region,
    primaryAddress.postalCode,
    primaryAddress.country,
  ].map(escapeVCardText).join(";");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "UID:0a5fbcc9-0b53-4e06-a6d1-f29ef9ea77f7",
    `N:${escapeVCardText(person.lastName)};${escapeVCardText(person.firstName)};;;`,
    `FN:${escapeVCardText(`${person.name} ${person.chineseName}`)}`,
    `ORG:${escapeVCardText(person.company)}`,
    `TITLE:${escapeVCardText(person.role)}`,
    ...phoneNumbers.map(
      (phone) => `TEL;TYPE=${phone.vcardTypes}:${phone.href.slice("tel:".length)}`,
    ),
    `EMAIL;TYPE=INTERNET,PREF:${person.email}`,
    `ADR;TYPE=WORK:${chinaAddress}`,
    `URL:${person.websiteHref}`,
    `NOTE:${escapeVCardText(`WeChat: ${person.wechat}`)}`,
    "END:VCARD",
  ];

  return `${lines.flatMap(foldVCardLine).join("\r\n")}\r\n`;
}
