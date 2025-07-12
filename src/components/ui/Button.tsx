import { ButtonProps } from '@/interfaces/ButtonProps'
import styles from '@/styles/Button.module.css'

export default function Button({ content, variant = 'default', onClick }: ButtonProps) {
  const variantClass = variant === 'reverse'
    ? styles.reverse
    : styles.default

  return (
    <div className={styles.wrapper}>
      <button className={`${styles.base} ${variantClass}`} onClick={onClick}>
        {content}
      </button>
    </div>
  )
}
