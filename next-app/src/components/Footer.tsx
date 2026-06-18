import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <img
            className={styles.logo}
            src="/images/ocp-logo.svg"
            alt="Open Cycle Project"
          />
          <p className={styles.tagline}>Open the Carbon Disclosure Initiative</p>
        </div>
        <nav className={styles.links}>
          <a href="#">Trust</a>
          <a href="#">Methodology</a>
          <a href="#">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
