'use client'

import React, { useEffect, useMemo, useState } from 'react'
import styles from '@/styles/ExamSettingsPanel.module.css'

interface ExamSettingsPanelProps {
  examId: string
  visibility?: 'PRIVATE' | 'PUBLIC' | string
  accessCode?: string
  onToggleVisibility?: () => Promise<void> | void
  onGenerateCode?: () => Promise<void> | void
  onClearCode?: () => Promise<void> | void
}

export default function ExamSettingsPanel({
  examId,
  visibility,
  accessCode,
  onToggleVisibility,
  onGenerateCode,
  onClearCode,
}: ExamSettingsPanelProps) {
  const [origin, setOrigin] = useState<string>('')

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const shareUrl = useMemo(() => {
    if (!origin) return ''
    if (visibility === 'PUBLIC') {
      return `${origin}/respond/${encodeURIComponent(examId)}`
    }
    if (accessCode) {
      return `${origin}/respond/${encodeURIComponent(examId)}?accessCode=${encodeURIComponent(
        accessCode
      )}`
    }
    return ''
  }, [origin, examId, visibility, accessCode])

  const canShare = Boolean(shareUrl)

  const copy = async (text?: string) => {
    if (!text) return
    try {
      await navigator.clipboard.writeText(text)
      alert('Copiado para a área de transferência!')
    } catch {
      window.prompt('Copiar manualmente o conteúdo:', text)
    }
  }

  const shareNative = async () => {
    if (!shareUrl) return
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Responder prova',
          text: 'Acesse a prova:',
          url: shareUrl,
        })
      } catch {
      }
    } else {
      copy(shareUrl)
    }
  }

  return (
    <section className={styles.card} aria-labelledby="settings-title">
      <h2 id="settings-title" className={styles.title}>Configurações</h2>

      <div className={styles.section}>
        <div className={styles.row}>
          <div className={styles.labelCol}>
            <span className={styles.label}>Privacidade</span>
            <span className={styles.help}>Defina quem pode acessar a prova.</span>
          </div>
          <div className={styles.valueCol}>
            <span className={styles.value}>{visibility ?? '—'}</span>
            <button
              type="button"
              className={styles.btn}
              onClick={onToggleVisibility}
              disabled={!onToggleVisibility}
            >
              Alternar
            </button>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelCol}>
            <span className={styles.label}>Código de Acesso</span>
            <span className={styles.help}>Compartilhe o código com sua turma.</span>
          </div>
          <div className={styles.valueCol}>
            <span className={styles.mono}>{accessCode ?? '—'}</span>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.btn}
                onClick={onGenerateCode}
                disabled={!onGenerateCode}
              >
                Gerar
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={onClearCode}
                disabled={!onClearCode}
              >
                Limpar
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => copy(accessCode)}
                disabled={!accessCode}
                title="Copiar código"
              >
                Copiar código
              </button>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.labelCol}>
            <span className={styles.label}>Link para Responder</span>
            <span className={styles.help}>
              Envie este link para os alunos. Para provas privadas, gere um código antes.
            </span>
          </div>
          <div className={styles.valueCol}>
            <span className={styles.mono}>{shareUrl || '—'}</span>
            <div className={styles.actions}>
              <button
                type="button"
                className={styles.btn}
                onClick={() => copy(shareUrl)}
                disabled={!canShare}
              >
                Copiar
              </button>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={shareNative}
                disabled={!canShare}
              >
                Compartilhar…
              </button>
              {!canShare && (
                <button
                  type="button"
                  className={styles.btnGhost}
                  onClick={onGenerateCode}
                  disabled={!onGenerateCode}
                >
                  Gerar código
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
