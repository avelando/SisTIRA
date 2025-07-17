import React from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from '@/styles/BackButton.module.css';

interface BackButtonProps {
  text?: string;
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({
  text = 'Voltar ao início',
  onClick,
}) => (
  <div className={styles.backBtnWrapper}>
    <button
      type="button"
      onClick={onClick}
      className={styles.backBtn}
    >
      <ArrowLeft size={20} />
      {text}
    </button>
  </div>
);

export default BackButton;
