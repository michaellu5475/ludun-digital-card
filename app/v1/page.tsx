import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Version 1 — Classic Card | Mike Lu",
  description: "A classic LUDUN business card with one-tap contact saving.",
  openGraph: { images: [] },
  twitter: { images: [] },
};

export default function VersionOne() {
  return (
    <main className="simple-page">
      <nav className="version-nav" aria-label="版本导航">
        <Link href="/">← 三版方案</Link>
        <span>VERSION 01 · CLASSIC CARD</span>
      </nav>

      <section className="simple-stage">
        <div className="uploaded-card">
          <Image
            className="uploaded-card-image"
            src="/mike-business-card.jpg"
            width={3169}
            height={1063}
            sizes="(max-width: 960px) calc(100vw - 24px), 920px"
            alt="Mike Lu 陆建伟的原始双面商务名片"
            priority
            unoptimized
          />
        </div>

        <div className="simple-save-panel">
          <a className="save-button simple-save-button" href="/mike-lu.vcf">
            <span className="save-plus" aria-hidden="true">＋</span>
            <span>
              <strong>Save to contacts</strong>
              <small>保存到通讯录</small>
            </span>
          </a>
          <p>手机会自动填入资料，最后一步由用户确认保存。</p>
        </div>
      </section>
    </main>
  );
}
