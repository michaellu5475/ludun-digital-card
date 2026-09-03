export type PhoneNumber = {
  mark: string;
  label: string;
  value: string;
  href: `tel:${string}`;
  vcardTypes: string;
};

type StructuredAddress = {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
};

export type Contact = {
  key: "mike" | "chloe" | "jana" | "deavy";
  uid: string;
  vcardFilename: string;
  firstName: string;
  lastName: string;
  name: string;
  chineseName: string;
  role: string;
  company: string;
  email: string;
  websiteLabel: string;
  websiteHref: string;
  wechat?: string;
  phoneNumbers: readonly PhoneNumber[];
  vcardOfficeIndex?: 0;
};

const company = "JIASHAN KAIDUN GARMENTS CO.,LTD";
const websiteLabel = "www.lu-dun.com";
const websiteHref = "http://www.lu-dun.com";

export const offices = [
  {
    city: "China",
    name: company,
    address: "No.155 Kaiyuan Avenue, Xitang Town, Jiashan County, Zhejiang Province, China",
    structuredAddress: {
      street: "No.155 Kaiyuan Avenue, Xitang Town",
      locality: "Jiashan County",
      region: "Zhejiang Province",
      postalCode: "",
      country: "China",
    },
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

export const contacts = {
  mike: {
    key: "mike",
    uid: "0a5fbcc9-0b53-4e06-a6d1-f29ef9ea77f7",
    vcardFilename: "mike-lu.vcf",
    firstName: "Mike",
    lastName: "Lu",
    name: "Mike Lu",
    chineseName: "陆建伟",
    role: "General Manager",
    company,
    email: "mike@lu-dun.com",
    websiteLabel,
    websiteHref,
    wechat: "ludun123321",
    phoneNumbers: [
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
    ],
    vcardOfficeIndex: 0,
  },
  chloe: {
    key: "chloe",
    uid: "bb5ba67c-b5c4-4c6b-8450-f87f9ac1f382",
    vcardFilename: "chloe-chun.vcf",
    firstName: "Chloe",
    lastName: "Chun",
    name: "Chloe Chun",
    chineseName: "秦皓怡",
    role: "Sales representative",
    company,
    email: "chloe@lu-dun.com",
    websiteLabel,
    websiteHref,
    phoneNumbers: [
      {
        mark: "US",
        label: "Telephone",
        value: "+1 551 574 8887",
        href: "tel:+15515748887",
        vcardTypes: "VOICE,PREF",
      },
    ],
  },
  jana: {
    key: "jana",
    uid: "baf967a2-34a5-48e2-b2db-a5975ebef067",
    vcardFilename: "jana.vcf",
    firstName: "Jana",
    lastName: "",
    name: "Jana",
    chineseName: "卓静娟",
    role: "Marketing Manager",
    company,
    email: "jana@lu-dun.com",
    websiteLabel,
    websiteHref,
    wechat: "ludun13857313982",
    phoneNumbers: [
      {
        mark: "CN",
        label: "China mobile",
        value: "+86 138 5731 3982",
        href: "tel:+8613857313982",
        vcardTypes: "CELL,VOICE,PREF",
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
    ],
    vcardOfficeIndex: 0,
  },
  deavy: {
    key: "deavy",
    uid: "482684a8-19d3-49be-bfe0-37a507cff808",
    vcardFilename: "deavy-chun.vcf",
    firstName: "Deavy",
    lastName: "Chun",
    name: "Deavy Chun",
    chineseName: "秦国良",
    role: "Director",
    company,
    email: "deavyc@hotmail.com",
    websiteLabel,
    websiteHref,
    phoneNumbers: [
      {
        mark: "HK",
        label: "Telephone",
        value: "+852 9018 0433",
        href: "tel:+85290180433",
        vcardTypes: "VOICE,PREF",
      },
    ],
  },
} as const satisfies Record<string, Contact>;

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

function createAddressLine(address: StructuredAddress) {
  return [
    "",
    "",
    address.street,
    address.locality,
    address.region,
    address.postalCode,
    address.country,
  ].map(escapeVCardText).join(";");
}

export function createVCard(contact: Contact) {
  const vcardOffice = contact.vcardOfficeIndex === undefined
    ? undefined
    : offices[contact.vcardOfficeIndex];
  const structuredAddress = vcardOffice && "structuredAddress" in vcardOffice
    ? vcardOffice.structuredAddress
    : undefined;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `UID:${contact.uid}`,
    `N:${escapeVCardText(contact.lastName)};${escapeVCardText(contact.firstName)};;;`,
    `FN:${escapeVCardText(`${contact.name} ${contact.chineseName}`)}`,
    `ORG:${escapeVCardText(contact.company)}`,
    `TITLE:${escapeVCardText(contact.role)}`,
    ...contact.phoneNumbers.map(
      (phone) => `TEL;TYPE=${phone.vcardTypes}:${phone.href.slice("tel:".length)}`,
    ),
    `EMAIL;TYPE=INTERNET,PREF:${contact.email}`,
    ...(structuredAddress
      ? [`ADR;TYPE=WORK:${createAddressLine(structuredAddress)}`]
      : []),
    `URL:${contact.websiteHref}`,
    ...(contact.wechat
      ? [`NOTE:${escapeVCardText(`WeChat: ${contact.wechat}`)}`]
      : []),
    "END:VCARD",
  ];

  return `${lines.flatMap(foldVCardLine).join("\r\n")}\r\n`;
}

export function createVCardResponse(contact: Contact) {
  return new Response(createVCard(contact), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `inline; filename="${contact.vcardFilename}"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
