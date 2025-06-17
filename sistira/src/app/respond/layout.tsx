'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { checkAuth } from '@/api/auth'
import { UserProps } from '@/interfaces/UserProps'
import styles from '@/styles/Layout.module.css'
import Image from 'next/image'
import { LogoIcon } from '@/lib/images'

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<UserProps | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await checkAuth()
        if (!userData) router.push('/auth/login')
        else setUser(userData)
      } catch {
        router.push('/auth/login')
      }
    }
    fetchUser()
  }, [router])

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <LogoIcon />
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.profile}>
            {user ? (
              <div
                className={styles.userInfo}
                onClick={() => router.push('/profile')}
              >
                <Image
                  src={user.profileImage ?? '/assets/no_perfil.png'}
                  alt="Foto de Perfil"
                  width={32}
                  height={32}
                  className={styles.profileImage}
                />
                <div className={styles.data}>
                  <span className={styles.name}>{user.firstName}</span>
                  <span className={styles.username}>@{user.username}</span>
                </div>
              </div>
            ) : (
              <span>Conecte-se</span>
            )}
          </div>
        </div>
      </header>

      <div className={styles.bodyContainer}>
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  )
}
