const vcard = `BEGIN:VCARD
VERSION:3.0
N:Lu;Mike;;;
FN:Mike Lu 陆建伟
ORG:JIASHAN KAIDUN GARMENTS CO.\\,LTD
TITLE:General Manager
TEL;TYPE=WORK,VOICE:+86-573-84466850
TEL;TYPE=WORK,VOICE:+86-573-84465580
TEL;TYPE=CELL:+86-13506839182
TEL;TYPE=CELL:+852-97153535
EMAIL;TYPE=INTERNET,WORK:mike@lu-dun.com
ADR;TYPE=WORK:;;No.155 Kaiyuan Avenue\\, Xitang Town;Jiashan County;Zhejiang Province;;China
URL:http://www.lu-dun.com
NOTE:WeChat: ludun123321
END:VCARD`;

export async function GET() {
  return new Response(vcard.replace(/\n/g, "\r\n"), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="mike-lu.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
