import styles from "./HowItWorks.module.css";

const steps = [
  {
    letter: "B",
    title: "Companies input",
    body: "Brands add a company profile, list each product, and upload their manufacturing and supply chain data.",
  },
  {
    letter: "C",
    title: "We calculate",
    body: "The model uses this data to calculate an accurate, comparable carbon footprint for every product.",
  },
  {
    letter: "D",
    title: "Consumers ready",
    body: "Anyone can browse and compare the climate impact of brands and products they love.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>How it Works</p>
        <h2 className={styles.title}>How Open Cycle works</h2>
        <div className={styles.cards}>
          {steps.map((step) => (
            <div key={step.title} className={styles.card}>
              <div className={styles.icon}>{step.letter}</div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardBody}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
