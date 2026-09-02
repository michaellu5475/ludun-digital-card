const officeAddress =
  "No. 155 Kaiyuan Avenue, Xitang Town, Jiashan County, Zhejiang Province, China";

const offices = [
  {
    city: "China",
    name: "JIASHAN KAIDUN GARMENTS CO., LTD",
    address: officeAddress,
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
];

const contactRows = [
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
    mark: "TEL",
    label: "Direct line",
    value: "+86 573 8446 6850",
    href: "tel:+8657384466850",
    secondary: "+86 573 8446 5580",
    secondaryHref: "tel:+8657384465580",
  },
  {
    mark: "@",
    label: "Email",
    value: "mike@lu-dun.com",
    href: "mailto:mike@lu-dun.com",
  },
  {
    mark: "WEB",
    label: "Website",
    value: "www.lu-dun.com",
    href: "http://www.lu-dun.com",
    external: true,
  },
  {
    mark: "WX",
    label: "WeChat",
    value: "ludun123321",
  },
];

function Arrow() {
  return <span className="row-arrow" aria-hidden="true">→</span>;
}

export default function Home() {
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    officeAddress,
  )}`;

  return (
    <main className="page-shell">
      <article className="profile-card">
        <header className="hero">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <div className="brand-mark" role="img" aria-label="LUDUN Group" />
          <p className="eyebrow">LUDUN GROUP · DIGITAL CARD</p>
          <h1>Mike Lu <span>陆建伟</span></h1>
          <p className="role">General Manager</p>
          <p className="company">JIASHAN KAIDUN GARMENTS CO., LTD</p>
        </header>

        <nav className="quick-actions" aria-label="Contact shortcuts">
          <a href="tel:+8613506839182" className="quick-action">
            <span className="quick-icon" aria-hidden="true">TEL</span>
            <span>Call</span>
          </a>
          <a href="mailto:mike@lu-dun.com" className="quick-action">
            <span className="quick-icon quick-icon-large" aria-hidden="true">@</span>
            <span>Email</span>
          </a>
          <a href={mapUrl} target="_blank" rel="noreferrer" className="quick-action">
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
              {contactRows.map((row) => {
                const content = (
                  <>
                    <span className="row-mark" aria-hidden="true">{row.mark}</span>
                    <span className="row-copy">
                      <span className="row-label">{row.label}</span>
                      <span className="row-value">{row.value}</span>
                      {row.secondary && (
                        <span className="row-secondary">{row.secondary}</span>
                      )}
                    </span>
                    {row.href && <Arrow />}
                  </>
                );

                if (row.href) {
                  return (
                    <div className="info-row-group" key={row.label}>
                      <a
                        className="info-row"
                        href={row.href}
                        target={row.external ? "_blank" : undefined}
                        rel={row.external ? "noreferrer" : undefined}
                      >
                        {content}
                      </a>
                      {row.secondaryHref && (
                        <a className="secondary-link" href={row.secondaryHref}>
                          Call second direct line
                        </a>
                      )}
                    </div>
                  );
                }

                return <div className="info-row" key={row.label}>{content}</div>;
              })}
            </div>
          </section>

          <section className="section" aria-labelledby="offices-heading">
            <div className="section-heading">
              <p>GLOBAL PRESENCE</p>
              <h2 id="offices-heading">Our offices</h2>
            </div>
            <div className="office-list">
              {offices.map((office, index) => (
                <details className="office" key={office.city} open={index === 0}>
                  <summary>
                    <span className="city-index">0{index + 1}</span>
                    <span className="city-name">{office.city}</span>
                    <span className="summary-plus" aria-hidden="true">+</span>
                  </summary>
                  <div className="office-details">
                    <strong>{office.name}</strong>
                    <p>{office.address}</p>
                    {index === 0 && (
                      <a href={mapUrl} target="_blank" rel="noreferrer">
                        Open in maps <span aria-hidden="true">↗</span>
                      </a>
                    )}
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
