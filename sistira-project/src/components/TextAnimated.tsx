import React from "react";
import useTypewriter from "@/hooks/useTypewriter";
import styles from "@/styles/TextAnimated.module.css";

const phrases = [
  "Automatize avaliações",
  "Maximize resultados",
  "Corrija com precisão",
];

export default function TextAnimated() {
  const text = useTypewriter(phrases, 200, 500);

  return (
    <div className={styles.animatedText}>
      <span>{text}</span>
      <span className={styles.cursor}>|</span>
    </div>
  );
}
