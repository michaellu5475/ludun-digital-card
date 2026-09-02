import type { Metadata } from "next";
import Link from "next/link";
import { CopyWechatRow } from "../components/CopyWechatRow";
import { amapHref, mapHref, offices, person, phoneNumbers } from "../lib/contact";

export const metadata: Metadata = {
  title: "Version 2 — Digital Profile | Mike Lu",
  description: "Call, email, visit, map, or save Mike Lu's contact details.",
  openGraph: { images: [] },
  twitter: { images: [] },
};

function Arrow() {
  return <span className="row-arrow" aria-hidden="true">→</span>;
}

export default function VersionTwo() {
  const primaryMapUrl = amapHref(offices[0].address);

  return (
    <main className="page-shell">
      <nav className="version-nav profile-version-nav" aria-label="版本导航">
        <Link href="/">← 三版方案</Link>
        <span>VERSION 02 · DIGITAL PROFILE</span>
      </nav>

      <article className="profile-card">
        <header className="hero">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="brand-mark" role="img" aria-label="LUDUN Group" />
          <p className="eyebrow">LUDUN GROUP · DIGITAL CARD</p>
          <h1>{person.name} <span lang="zh-CN">{person.chineseName}</span></h1>
          <p className="role">{person.role}</p>
          <p className="company">{person.company}</p>
        </header>

        <nav className="quick-actions" aria-label="Contact shortcuts">
          <a href={phoneNumbers[0].href} className="quick-action">
            <span className="quick-icon" aria-hidden="true">TEL</span>
            <span>Call</span>
          </a>
          <a href={`mailto:${person.email}`} className="quick-action">
            <span className="quick-icon quick-icon-large" aria-hidden="true">@</span>
            <span>Email</span>
          </a>
          <a href={primaryMapUrl} target="_blank" rel="noreferrer" className="quick-action">
            <span className="quick-icon" aria-hidden="true">LOC</span>
            <span>Map</span>
          </a>
        </nav>

        <div className="content">
          <section className="section" aria-labelledby="contact-heading">
            <div className="section-heading">
              <p>CONTACT</p>
              <h2 id="contact-heading">Get in touch</h2>
            </div>
            <div className="info-list">
              {phoneNumbers.map((phone) => (
                <a className="info-row" href={phone.href} key={phone.label}>
                  <span className="row-mark" aria-hidden="true">{phone.mark}</span>
                  <span className="row-copy">
                    <span className="row-label">{phone.label}</span>
                    <span className="row-value">{phone.value}</span>
                  </span>
                  <Arrow />
                </a>
              ))}

              <a className="info-row" href={`mailto:${person.email}`}>
                <span className="row-mark row-mark-email" aria-hidden="true">@</span>
                <span className="row-copy">
                  <span className="row-label">Email</span>
                  <span className="row-value">{person.email}</span>
                </span>
                <Arrow />
              </a>

              <a
                className="info-row"
                href={person.websiteHref}
                target="_blank"
                rel="noreferrer"
              >
                <span className="row-mark" aria-hidden="true">WEB</span>
                <span className="row-copy">
                  <span className="row-label">Website</span>
                  <span className="row-value">{person.websiteLabel}</span>
                </span>
                <Arrow />
              </a>

              <CopyWechatRow value={person.wechat} />
            </div>
          </section>

          <section className="section" aria-labelledby="offices-heading">
            <div className="section-heading">
              <p>GLOBAL PRESENCE</p>
              <h2 id="offices-heading">Our offices</h2>
            </div>
            <div className="office-list">
              {offices.map((office, index) => (
                <details className="office" key={office.city}>
                  <summary>
                    <span className="city-index">0{index + 1}</span>
                    <span className="city-name">{office.city}</span>
                    <span className="summary-plus" aria-hidden="true">+</span>
                  </summary>
                  <div className="office-details">
                    <strong>{office.name}</strong>
                    <p>{office.address}</p>
                    <div className="office-map-links">
                      {index === 0 && (
                        <a href={amapHref(office.address)} target="_blank" rel="noreferrer">
                          高德地图 <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      <a href={mapHref(office.address)} target="_blank" rel="noreferrer">
                        Google Maps <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <footer className="brand-footer">
            <span>China</span><span>Egypt</span><span>Hong Kong</span><span>New York</span>
          </footer>
        </div>

        <div className="save-dock">
          <a className="save-button" href="/mike-lu.vcf">
            <span className="save-plus" aria-hidden="true">＋</span>
            <span>
              <strong>Save to contacts</strong>
              <small>保存到通讯录</small>
            </span>
          </a>
          <p>Your phone will prefill the details. Please confirm to save.</p>
        </div>
      </article>
    </main>
  );
}
