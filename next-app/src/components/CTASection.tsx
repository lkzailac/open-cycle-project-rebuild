import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section id="companies" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>Open Cycle Project</p>
        <h2 className={styles.title}>
          Is your company ready to be transparent?
        </h2>
        <p className={styles.body}>
          Join the carbon companies that have already committed to full
          transparency. It&apos;s free and takes less than a day to get started.
        </p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary}>Start Accounting — It&apos;s free</button>
          <button className={styles.btnSecondary}>View Methodology</button>
        </div>
      </div>
    </section>
  );
}
