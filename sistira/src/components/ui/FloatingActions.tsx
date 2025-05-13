'use client';

import styles from '@/styles/ui/FloatingActions.module.css';
import { FloatingActionsProps } from '@/interfaces/FloatingActionsProps';

export default function FloatingActions({ onOpen }: FloatingActionsProps) {
  return (
    <div className={styles.floating}>
      <button onClick={() => onOpen('existente')}>+ Questões Existentes</button>
      <button onClick={() => onOpen('banco')}>+ Banco de Questões</button>
    </div>
  );
}
