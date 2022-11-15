import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function HomeLogo() {
  return (
    <div className={styles.link}>
      <Link to="/">
        <div className={styles.logo}>
          Cha<span className={styles['logo-accent']}>rades</span>
        </div>
      </Link>
    </div>
  );
}
