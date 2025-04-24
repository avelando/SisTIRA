import styles from '@/styles/ui/Button.module.css';
import { ButtonProps } from '@/interfaces/ButtonProps';

export default function Button({ content, variant = 'default', onClick }: ButtonProps) {
  const buttonClass = variant === 'reverse' ? styles.reverse : styles.default;

  return (
    <div className={styles.wrapper}>
      <button className={buttonClass} onClick={onClick}>
        {content}
      </button>
    </div>
  );
}
