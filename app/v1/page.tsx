import type { Metadata } from "next";
import Link from "next/link";
import { person } from "../lib/contact";

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
        <article className="business-card" aria-label="Mike Lu 的商务名片">
          <div className="business-card-accent" />
          <header className="business-card-head">
            <div className="business-card-name">
              <h1>{person.name} <span lang="zh-CN">{person.chineseName}</span></h1>
              <p>{person.role}</p>
            </div>
            <div className="business-logo" aria-label="LUDUN Group">
              <span>LD</span>
              <small>LUDUN</small>
            </div>
          </header>

          <div className="business-card-body">
            <div className="business-details">
              <p><span>Mobile</span> +86 135 0683 9182</p>
              <p><span>Email</span> {person.email}</p>
              <p><span>Web</span> {person.websiteLabel}</p>
            </div>
            <div className="business-company">
              <strong>{person.company}</strong>
              <p>No. 155 Kaiyuan Avenue, Xitang Town, Jiashan, Zhejiang, China</p>
            </div>
          </div>

          <footer className="business-card-footer">
            <span>China</span><span>Egypt</span><span>Hong Kong</span><span>New York</span>
          </footer>
        </article>

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
