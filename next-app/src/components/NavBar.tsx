"use client";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src="/images/logo.svg" alt="Open Cycle Project" />
      </div>
      <ul className={styles.links}>
        <li><a href="#">Browse Brands</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#companies">For Companies</a></li>
      </ul>
      <div className={styles.actions}>
        <button className={styles.loginBtn}>Login</button>
      </div>
    </nav>
  );
}
