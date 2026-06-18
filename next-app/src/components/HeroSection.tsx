import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <img
          className={styles.logo}
          src="/images/ocp-logo.svg"
          alt="Open Cycle Project"
        />
        <p className={styles.tagBadge}>A better brand carbon initiative</p>
        <h1 className={styles.headline}>
          Every brand&apos;s carbon footprint,<br />
          <em className={styles.highlight}>made visible</em>
        </h1>
        <p className={styles.sub}>
          Companies disclose. We calculate. Consumers know.<br />
          The transparent carbon accounting platform for brands and people.
        </p>
        <div className={styles.ctas}>
          <button className={styles.btnPrimary}>For Companies</button>
          <button className={styles.btnSecondary}>Learn More</button>
        </div>
        <div className={styles.searchRow}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search a brand or company..."
          />
          <button className={styles.searchBtn}>Explore Search →</button>
        </div>
      </div>
    </section>
  );
}
