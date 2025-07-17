import React from 'react';
import { LucideIcon } from 'lucide-react';
import styles from '@/styles/CompactActionButton.module.css';

interface CompactActionButtonProps {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
  onClick: () => void;
}

const CompactActionButton: React.FC<CompactActionButtonProps> = ({ icon, title, description, onClick }) => (
  <button className={styles.button} onClick={onClick} type="button">
    <div className={styles.iconContainer}>
      {icon}
    </div>
    <div className={styles.textContainer}>
      <span className={styles.title}>{title}</span>
      <span className={styles.description}>{description}</span>
    </div>
  </button>
);

export default CompactActionButton;
