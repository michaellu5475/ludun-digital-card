import { CopyWechatRow } from "./CopyWechatRow";
import { amapHref, mapHref, offices, type Contact } from "../lib/contact";
import { publicPath } from "../lib/site-url";

function Arrow() {
  return <span className="row-arrow" aria-hidden="true">→</span>;
}

export function DigitalCard({ contact }: { contact: Contact }) {
  const primaryMapUrl = amapHref(offices[0].address);

  return (
    <main className="page-shell">
      <article className="profile-card">
        <header className="hero">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="brand-mark" role="img" aria-label="LUDUN Group" />
          <p className="eyebrow">LUDUN GROUP · DIGITAL CARD</p>
          <h1>{contact.name} <span lang="zh-CN">{contact.chineseName}</span></h1>
          <p className="role">{contact.role}</p>
          <p className="company">{contact.company}</p>
        </header>

        <nav className="quick-actions" aria-label="Contact shortcuts">
          <a
            href={contact.phoneNumbers[0].href}
            className="quick-action"
            aria-label={`Call ${contact.phoneNumbers[0].value}`}
          >
            <span className="quick-icon" aria-hidden="true">TEL</span>
            <span>Call</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="quick-action"
            aria-label={`Email ${contact.email}`}
          >
            <span className="quick-icon quick-icon-large" aria-hidden="true">@</span>
            <span>Email</span>
          </a>
          <a
            href={primaryMapUrl}
            target="_blank"
            rel="noreferrer"
            className="quick-action"
            aria-label="Open China office in Amap"
          >
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
              {contact.phoneNumbers.map((phone) => (
                <a className="info-row" href={phone.href} key={phone.href}>
                  <span className="row-mark" aria-hidden="true">{phone.mark}</span>
                  <span className="row-copy">
                    <span className="row-label">{phone.label}</span>
                    <span className="row-value">{phone.value}</span>
                  </span>
                  <Arrow />
                </a>
              ))}

              <a className="info-row" href={`mailto:${contact.email}`}>
                <span className="row-mark row-mark-email" aria-hidden="true">@</span>
                <span className="row-copy">
                  <span className="row-label">Email</span>
                  <span className="row-value">{contact.email}</span>
                </span>
                <Arrow />
              </a>

              <a
                className="info-row"
                href={contact.websiteHref}
                target="_blank"
                rel="noreferrer"
              >
                <span className="row-mark" aria-hidden="true">WEB</span>
                <span className="row-copy">
                  <span className="row-label">Website</span>
                  <span className="row-value">{contact.websiteLabel}</span>
                </span>
                <Arrow />
              </a>

              {contact.wechat && <CopyWechatRow value={contact.wechat} />}
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
          <a className="save-button" href={publicPath(contact.vcardFilename)}>
            <span className="save-plus" aria-hidden="true">＋</span>
            <span>
              <strong>Save to contacts</strong>
              <small>保存到通讯录</small>
            </span>
          </a>
          <p lang="zh-CN">
            iPhone Safari 通常会显示联系人确认页；Android／华为可能先下载联系人文件。
            若没有自动打开，请打开下载的 VCF 文件；微信内无法打开时，请使用系统浏览器。
          </p>
        </div>
      </article>
    </main>
  );
}
