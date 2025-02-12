import styles from "@/styles/Card.module.css";

export default function Card({ title, quant, icon, bgColor }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.text}>
        <h3>{title}</h3>
        <span className={styles.quant}>{quant}</span>
      </div>
      <div className={styles.iconContainer} style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
    </div>
  );
}
