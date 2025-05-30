'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getExamForResponse } from '@/api/exams'
import styles from '@/styles/EnterCode.module.css'

export default function EnterCodePage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const resp = await getExamForResponse(code.trim())
      router.push(`/exams/respond/${code.trim()}`)
    } catch {
      setError('Código inválido')
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1>Digite o código da prova</h1>
        <input
          className={styles.input}
          placeholder="Código de acesso"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
        />
        <button className={styles.button}>Continuar</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}
