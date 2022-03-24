import React from "react";
import styles from "./styles.module.css";

export default function HelpScreen(props) {
  const { setHelp } = props;
  return (
    <div
      id={styles.helpWindow}
      onClick={() => {
        setHelp(false);
      }}
    >
      <div className={styles.instructions}>
        <div className={styles.align}>It's charades. With extra steps...</div>
        <h3 className={styles["instructions-title"]}>Instructions</h3>
        <div className={styles.align}>There are 2 teams and 3 rounds.</div>
        <div className={styles.align}>
          1. In the 1st round you can describe or show the phrase to your team
          however you like.
        </div>
        <div className={styles.align}>
          2. In the 2nd round you can use only ONE word and can't show anything.
        </div>
        <div className={styles.align}>
          3. In the last round you have to show your word or phrase without
          using words or sounds.
        </div>
      </div>
    </div>
  );
}
