'use client'

import { useState } from 'react'
import { Link, Copy } from 'lucide-react'

interface ShareExamFABProps {
  examId: string
  accessCode?: string
}

export default function ShareExamFAB({ examId, accessCode }: ShareExamFABProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const examURL = `${window.location.origin}/respond/${examId}`

  const copyToClipboard = async () => {
    const text = accessCode
      ? `Link da prova: ${examURL}\nCódigo de acesso: ${accessCode}`
      : `Link da prova: ${examURL}`

    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed bottom-6 right-24 z-50 flex flex-col items-end">
      <div
        className={`
          transition-all duration-200 ease-out
          ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
        `}
      >
        <div className="mb-3 p-4 bg-white shadow-xl rounded-lg max-w-xs">
          <p className="text-sm font-semibold mb-2">Compartilhar prova</p>

          <div className="flex items-center mb-2">
            <Link className="mr-2 text-slate-700" size={18} />
            <input
              className="border rounded px-2 py-1 w-full text-sm bg-slate-50"
              readOnly
              value={examURL}
            />
          </div>

          {accessCode && (
            <div className="flex items-center mb-2">
              <span className="mr-2 font-medium text-slate-700">Código:</span>
              <input
                className="border rounded px-2 py-1 w-full text-sm bg-slate-50"
                readOnly
                value={accessCode}
              />
            </div>
          )}

          <button
            onClick={copyToClipboard}
            className="mt-2 w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-1 rounded transition"
          >
            <Copy size={16} />
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>

      <button
        onClick={() => setOpen(o => !o)}
        className="
          w-14 h-14 bg-slate-900 hover:bg-slate-700 text-white rounded-full shadow-xl
          flex items-center justify-center transition-transform duration-200 ease-out
        "
      >
        <Link size={24} />
      </button>
    </div>
  )
}
