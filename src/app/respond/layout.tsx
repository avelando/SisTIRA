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
import styles from '@/styles/Layout.module.css'

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
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
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
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.pageTitle}>{getPageTitle(pathname)}</h1>

        <div className={styles.userWrapper} ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((v) => !v)}
            className={styles.userButton}
          >
            <div className={styles.avatar}>
              <User size={16} className={styles.avatarIcon} />
            </div>
            <div className={styles.userInfo}>
              <p className={styles.userName}>{user?.firstName}</p>
              <p className={styles.userHandle}>@{user?.username}</p>
            </div>
            <ChevronDown
              size={16}
              className={`${styles.chevron} ${
                isDropdownOpen ? styles.rotate : ''
              }`}
            />
          </button>

          <div
            className={`${styles.dropdown} ${
              isDropdownOpen ? styles.dropdownOpen : ''
            }`}
          >
            <button
              onClick={() => router.push('/profile')}
              className={styles.dropdownItem}
            >
              <User size={16} /> Perfil
            </button>
            <button
              onClick={() => router.push('/settings')}
              className={styles.dropdownItem}
            >
              <Settings size={16} /> Configurações
            </button>
            <button
              onClick={handleLogout}
              className={styles.dropdownItem}
            >
              <LogOutIcon size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>{children}</main>
    </div>
  )
}
