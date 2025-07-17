'use client'

import React from 'react'
import styles from '@/styles/BaseModal.module.css'
import { BaseModalProps } from '@/interfaces/BaseModal'

export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  title,
  onClose,
  onSave,
  saveLabel = 'Salvar',
  saveLoading = false,
  disableSave = false,
  maxWidthClass = 'max-w-3xl',
  children,
}) => {
  if (!visible) return null

  const key = maxWidthClass.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  const maxStyle = (styles as any)[key] || ''

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${maxStyle}`}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <span className="sr-only">Fechar</span>
            &times;
          </button>
        </div>

        <div className={styles.content}>{children}</div>

        <div className={styles.footer}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={disableSave || saveLoading}
            className={
              `${styles.saveButton} ` +
              (saveLoading ? styles.loading : styles.defaultSave) +
              (disableSave ? ` ${styles.disabled}` : '')
            }
          >
            {saveLoading ? 'Salvando...' : saveLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
