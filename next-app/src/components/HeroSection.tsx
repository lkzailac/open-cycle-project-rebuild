import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>

        <img
          className={styles.logo}
          src="/images/logo.png"
          alt="Open Cycle Project"
        />

        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Open carbon data for everyone
        </div>

        <h1 className={styles.headline}>
          Every brand&apos;s carbon footprint,
          <em className={styles.highlight}>made visible</em>
        </h1>

        <p className={styles.sub}>
          Companies report. We calculate. Consumers decide.<br />
          The transparency cycle starts here.
        </p>

        <div className={styles.ctas}>
          <button className={styles.btnConsumer}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
            I&apos;m a Consumer
          </button>
          <button className={styles.btnCompany}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="7" width="18" height="14" rx="1"/><path d="M8 7V5a4 4 0 018 0v2"/>
            </svg>
            I Represent a Company
          </button>
        </div>

        <div className={styles.searchRow}>
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search a brand or industry..."
            />
          </div>
          <button className={styles.searchBtn}>Explore Brands →</button>
        </div>

      </div>
    </section>
  );
}
