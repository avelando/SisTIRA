'use client'

import React, { useState } from 'react'
import { Link as LinkIcon, Copy } from 'lucide-react'
import styles from '@/styles/ShareExamFAB.module.css'

interface ShareExamFABProps {
  examId: string
  accessCode?: string
}

export default function ShareExamFAB({ examId, accessCode }: ShareExamFABProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const examURL = typeof window !== 'undefined'
    ? `${window.location.origin}/respond/${examId}`
    : ''

  const copyToClipboard = async () => {
    const text = accessCode
      ? `Link da prova: ${examURL}\nCódigo de acesso: ${accessCode}`
      : `Link da prova: ${examURL}`

    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.popup} ${open ? styles.popupOpen : ''}`}>        
        <div className={styles.popupContent}>
          <p className={styles.popupTitle}>Compartilhar prova</p>

          <div className={styles.popupRow}>
            <LinkIcon size={18} className={styles.icon} />
            <input
              type="text"
              readOnly
              value={examURL}
              className={styles.input}
            />
          </div>

          {accessCode && (
            <div className={styles.popupRow}>
              <span className={styles.codeLabel}>Código:</span>
              <input
                type="text"
                readOnly
                value={accessCode}
                className={styles.input}
              />
            </div>
          )}

          <button onClick={copyToClipboard} className={styles.copyButton}>
            <Copy size={16} />
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <button onClick={() => setOpen(o => !o)} className={styles.mainButton}>
        <LinkIcon size={24} className={`${styles.mainIcon} ${open ? styles.rotated : ''}`} />
      </button>
    </div>
  )
}
