'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { checkAuth } from '@/api/auth'
import { UserProps } from '@/interfaces/UserProps'
import {
  User,
  Settings,
  ChevronDown,
  LogOut as LogOutIcon,
} from 'lucide-react'

export default function RespondLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<UserProps | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const u = await checkAuth()
        if (!u) {
          router.push('/auth/login')
        } else {
          setUser(u)
        }
      } catch {
        router.push('/auth/login')
      }
    })()
  }, [router])

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      })
      router.push('/auth/login')
    } catch (err) {
      console.error('Logout falhou', err)
    }
  }

  const getPageTitle = (path: string) => {
    const seg = path.split('/').filter(Boolean)
    if (seg[0] === 'respond' && seg[1] && seg[1] !== 'enter-code')
      return 'Responder Prova'
    if (seg[0] === 'respond' && seg[1] === 'enter-code')
      return 'Digite o Código'
    return 'SisTIRA'
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="flex-shrink-0 sticky top-0 z-30 flex items-center justify-between h-18 bg-white border-b border-slate-200 px-6">
        <h1 className="text-xl font-semibold text-slate-900">
          {getPageTitle(pathname)}
        </h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(v => !v)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
          >
            <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-slate-900">{user?.firstName}</p>
              <p className="text-xs text-slate-500">@{user?.username}</p>
            </div>
            <ChevronDown
              size={16}
              className={`text-slate-400 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`
              absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2
              transform origin-top-right transition-all duration-200 ease-out
              ${isDropdownOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 pointer-events-none'}
            `}
          >
            <button
              onClick={() => router.push('/profile')}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <User size={16} /> Perfil
            </button>
            <button
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => router.push('/settings')}
            >
              <Settings size={16} /> Configurações
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-700 hover:bg-slate-50"
            >
              <LogOutIcon size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto bg-gray-100 p-4">
        {children}
      </main>
    </div>
  )
}
