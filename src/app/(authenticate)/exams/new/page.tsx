'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createExam } from '@/api/exams'
import styles from '@/styles/NewExamPage.module.css'

export default function NewExamPage() {
  const router = useRouter()
  const didCreate = useRef(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (didCreate.current) return
    didCreate.current = true

    ;(async () => {
      try {
        const created = await createExam({
          title: 'Prova sem título',
          description: '',
          isPublic: false,
          generateAccessCode: true,
        })
        router.replace(`/exams/${created.id}`)
      } catch (err) {
        console.error('Erro ao criar prova:', err)
        setError('Não foi possível criar a prova.')
      }
    })()
  }, [router])

  if (error) {
    return (
      <div className={styles.fullscreen}>
        <p className={styles.errorText}>{error}</p>
      </div>
    )
  }

  return (
    <div className={styles.fullscreen}>
      <p className={styles.message}>Criando prova…</p>
    </div>
  )
}
