import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function HomeLogo() {
  return (
    <Link to="/">
      <div className={styles.logo}>
        Cha<span className={styles.logo2}>rades</span>
      </div>
    </Link>
  );
}
