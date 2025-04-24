import React from 'react';
import styles from '@/styles/modals/BaseModal.module.css';

import { BaseModalProps } from '@/interfaces/BaseModal';

export default function BaseModal({ visible, title, onClose, children, actions }: BaseModalProps) {
  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </header>
        <div className={styles.body}>
          {children}
        </div>
        {actions && <footer className={styles.footer}>{actions}</footer>}
      </div>
    </div>
  );
}
