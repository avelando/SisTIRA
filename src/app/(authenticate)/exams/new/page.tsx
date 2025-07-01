'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createExam } from '@/api/exams'

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
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <p>Criando prova…</p>
    </div>
  )
}
