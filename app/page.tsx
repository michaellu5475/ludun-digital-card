const concepts = [
  {
    number: "01",
    eyebrow: "CLASSIC CARD",
    title: "名片 + 保存按钮",
    description: "先看到一张干净的商务名片，再点一次保存到通讯录。",
    href: "/v1",
    action: "查看第一版",
    preview: "card",
  },
  {
    number: "02",
    eyebrow: "DIGITAL PROFILE",
    title: "完整电子名片",
    description: "电话、邮件、网站、微信和办公室地址都能执行对应操作。",
    href: "/v2",
    action: "查看第二版",
    preview: "profile",
  },
  {
    number: "03",
    eyebrow: "DIRECT VCARD",
    title: "直接进入保存确认",
    description: "请用手机系统浏览器测试：iPhone 通常会打开联系人确认页；电脑会下载联系人文件。",
    href: "/mike-lu.vcf",
    action: "用手机打开联系人",
    preview: "contact",
  },
] as const;

export default function Home() {
  return (
    <main className="concept-shell">
      <header className="concept-hero">
        <div className="concept-brand">
          <span className="mini-brand-mark" aria-hidden="true">LD</span>
          <span>LUDUN GROUP</span>
        </div>
        <p className="concept-kicker">DIGITAL BUSINESS CARD · 3 CONCEPTS</p>
        <h1>同一份联系方式，<br />三种打开方式。</h1>
        <p className="concept-intro">
          请选择一种体验。第三版会直接交给手机的联系人系统处理，
          不会显示中间网页。
        </p>
      </header>

      <section className="concept-grid" aria-label="电子名片的三种方案">
        {concepts.map((concept) => (
          <a
            className="concept-card concept-card-anchor"
            href={concept.href}
            key={concept.number}
          >
            <div className={`concept-preview preview-${concept.preview}`} aria-hidden="true">
              {concept.preview === "profile" && (
                <div className="preview-phone-card">
                  <span className="preview-avatar">LD</span>
                  <b>Mike Lu</b>
                  <small>Call · Email · Map</small>
                  <i /><i /><i />
                </div>
              )}
              {concept.preview === "contact" && (
                <div className="preview-system-contact">
                  <span className="preview-avatar">ML</span>
                  <b>Mike Lu</b>
                  <small>New Contact</small>
                  <em>Confirm</em>
                </div>
              )}
            </div>

            <div className="concept-copy">
              <div className="concept-number">{concept.number}</div>
              <p>{concept.eyebrow}</p>
              <h2>{concept.title}</h2>
              <span>{concept.description}</span>
            </div>

            <span className="concept-link">
              {concept.action}<span aria-hidden="true">→</span>
            </span>
          </a>
        ))}
      </section>

      <p className="concept-footnote">
        三版使用同一份 Mike Lu 联系人资料，后续可分别生成三个二维码进行真机对比。
      </p>
    </main>
  );
}
