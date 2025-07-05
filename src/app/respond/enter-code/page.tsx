'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { checkExamAccess, grantExamAccess } from '@/api/exams'

export default function EnterCodePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnTo = searchParams.get('returnTo') || ''

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(!!returnTo)

  useEffect(() => {
    if (!returnTo) {
      setLoading(false)
      return
    }
    checkExamAccess(returnTo)
      .then(({ hasAccess }) => {
        if (hasAccess) router.replace(`/respond/${returnTo}`)
        else setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [returnTo, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const examId = returnTo || code.trim()
    const accessCode = code.trim()

    try {
      await grantExamAccess(examId, accessCode)
      router.push(
        `/respond/${examId}?accessCode=${encodeURIComponent(accessCode)}`
      )
    } catch {
      setError('Código inválido ou prova não encontrada.')
    }
  }

  if (loading) return <p className="text-center p-6">Carregando…</p>

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow"
      >
        <h2 className="text-lg font-medium mb-4">Digite o código da prova</h2>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Código da prova"
          className="w-full border px-3 py-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-slate-900"
          required
        />
        {error && (
          <p className="text-red-600 text-sm mb-2">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800 transition"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}
