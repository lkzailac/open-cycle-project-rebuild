"use client";
import { useState } from "react";
import styles from "./BrandScoreboard.module.css";

const brands = [
  { name: "Patagonia", tagline: "Outdoor apparel", score: 91, color: "#4a7c59" },
  { name: "Allbirds", tagline: "Sustainable footwear", score: 84, color: "#6b9e6b" },
  { name: "Everlane", tagline: "Ethical basics", score: 73, color: "#7aad5e" },
  { name: "Levi's", tagline: "Denim & apparel", score: 58, color: "#c8873a" },
  { name: "H&M", tagline: "Fast fashion", score: 41, color: "#c85c3a" },
  { name: "Zara", tagline: "Fast fashion", score: 36, color: "#b03a2e" },
];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function avatarColor(score: number) {
  if (score >= 75) return "#4a7c59";
  if (score >= 55) return "#c8873a";
  return "#b03a2e";
}

export default function BrandScoreboard() {
  const [query, setQuery] = useState("");
  const filtered = brands.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Transparency Full</p>
            <h2 className={styles.title}>Brand Scoreboard</h2>
          </div>
          <input
            className={styles.search}
            type="text"
            placeholder="Search brands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ul className={styles.list}>
          {filtered.map((brand, i) => (
            <li key={brand.name} className={styles.row}>
              <span className={styles.rank}>{i + 1}</span>
              <div
                className={styles.avatar}
                style={{ background: avatarColor(brand.score) }}
              >
                {initials(brand.name)}
              </div>
              <div className={styles.info}>
                <span className={styles.brandName}>{brand.name}</span>
                <span className={styles.brandTag}>{brand.tagline}</span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${brand.score}%`,
                    background: brand.color,
                  }}
                />
              </div>
              <span className={styles.score}>{brand.score}</span>
              <button className={styles.expand} aria-label="View">+</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
