'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { checkAuth } from '@/api/auth'
import { UserProps } from '@/interfaces/UserProps'
import styles from '@/styles/Layout.module.css'
import { pageTitles } from '@/utils/pageTitles'
import {
  FaBook,
  FaClipboardList,
  FaQuestionCircle,
  FaDatabase,
  FaDoorOpen,
} from 'react-icons/fa'
import Image from 'next/image'
import { LogoIcon } from '@/lib/images'

const sidebarItems = [
  { label: 'Dashboard', route: '/dashboard', icon: <FaBook /> },
  { label: 'Provas', route: '/exams', icon: <FaClipboardList /> },
  { label: 'Questões', route: '/questions', icon: <FaQuestionCircle /> },
  { label: 'Banco de Questões', route: '/questionsBank', icon: <FaDatabase /> },
]

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
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

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    } finally {
      router.push('/')
    }
  }

  function isRouteActive(currentPath: string, route: string) {
    return currentPath === route || currentPath.startsWith(`${route}/`);
  }

  function getPageTitle(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === 'exams' && segments.length === 2 && segments[1] !== 'new') {
      return pageTitles['/exams/[id]'];
    }
    const key = '/' + segments.join('/');
    return pageTitles[key] || 'SisTIRA';
  }

  return (
    <div className={styles.layoutContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <LogoIcon />
          </div>
          <h1 className={styles.pageTitle}>
            {getPageTitle(pathname)}
          </h1>
        </div>

        <div className={styles.headerRight}>
          {/* <FaBell className={styles.notificationIcon} /> */}
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
        <aside className={styles.sidebar}>
          <ul className={styles.navList}>
            <div className={styles.sideOne}>
              {sidebarItems.map((item) => (
                <li
                  key={item.route}
                  className={isRouteActive(pathname, item.route) ? styles.active : ''}
                  onClick={() =>
                    item.route === '/logout'
                      ? handleLogout()
                      : router.push(item.route)
                  }
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </div>

            <div className={styles.sideTwo}>
              <li
                key="logout"
                className={styles.logoutItem}
                onClick={handleLogout}
              >
                <span className={styles.icon}><FaDoorOpen /></span>
                <span>Log-out</span>
              </li>
            </div>
          </ul>
        </aside>

        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  )
}
