import styles from "./StatsBar.module.css";

const stats = [
  { value: "4,800+", label: "Annual Brands" },
  { value: "18,641", label: "Products Tracked" },
  { value: "94", label: "Net-0 Companies" },
  { value: "Free", label: "Always Free" },
];

export default function StatsBar() {
  return (
    <div className={styles.bar}>
      {stats.map((s) => (
        <div key={s.label} className={styles.stat}>
          <span className={styles.value}>{s.value}</span>
          <span className={styles.label}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
