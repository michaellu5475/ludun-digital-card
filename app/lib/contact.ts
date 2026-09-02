export const person = {
  name: "Mike Lu",
  chineseName: "陆建伟",
  role: "General Manager",
  company: "JIASHAN KAIDUN GARMENTS CO., LTD",
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
  },
  {
    mark: "HK",
    label: "Hong Kong mobile",
    value: "+852 9715 3535",
    href: "tel:+85297153535",
  },
  {
    mark: "01",
    label: "Direct line 1",
    value: "+86 573 8446 6850",
    href: "tel:+8657384466850",
  },
  {
    mark: "02",
    label: "Direct line 2",
    value: "+86 573 8446 5580",
    href: "tel:+8657384465580",
  },
] as const;

export const offices = [
  {
    city: "China",
    name: "JIASHAN KAIDUN GARMENTS CO., LTD",
    address:
      "No. 155 Kaiyuan Avenue, Xitang Town, Jiashan County, Zhejiang Province, China",
  },
  {
    city: "Egypt",
    name: "VISKAI GARMENT ACCESSORIES EGYPT CO., LTD",
    address: "Sikandar Park, Suez Canal Special Economic Zone, Egypt",
  },
  {
    city: "Hong Kong",
    name: "BRILLIANT ACCESSORIES INTERNATIONAL COMPANY LIMITED",
    address: "Flat A, 16/F, Manley House, 86 Canton Road, TST, Hong Kong",
  },
  {
    city: "New York",
    name: "NEW YORK REPRESENTATIVE OFFICE",
    address: "19 Brookbridge Road, Great Neck, NY 11021, United States",
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
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:Lu;Mike;;;",
    "FN:Mike Lu 陆建伟",
    "ORG:JIASHAN KAIDUN GARMENTS CO.\\,LTD",
    "TITLE:General Manager",
    "TEL;TYPE=WORK,VOICE:+86-573-84466850",
    "TEL;TYPE=WORK,VOICE:+86-573-84465580",
    "TEL;TYPE=CELL:+86-13506839182",
    "TEL;TYPE=CELL:+852-97153535",
    "EMAIL;TYPE=INTERNET,WORK:mike@lu-dun.com",
    "ADR;TYPE=WORK:;;No.155 Kaiyuan Avenue\\, Xitang Town;Jiashan County;Zhejiang Province;;China",
    "URL:http://www.lu-dun.com",
    "NOTE:WeChat: ludun123321",
    "END:VCARD",
  ];

  return `${lines.flatMap(foldVCardLine).join("\r\n")}\r\n`;
}
