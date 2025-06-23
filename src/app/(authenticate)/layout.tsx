'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { checkAuth } from '@/api/auth'
import { UserProps } from '@/interfaces/UserProps'
import { LogoIcon } from '@/lib/images'
import { pageTitles } from '@/utils/pageTitles'
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  Database,
  LogOut as LogOutIcon,
  Menu,
  X,
  User,
  Settings,
  ChevronDown,
} from 'lucide-react'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick: () => void
  isCollapsed: boolean
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
  isCollapsed,
}) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
      transition-transform duration-200 ease-out focus:outline-none
      focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50
      ${isActive
        ? 'bg-slate-900 text-white shadow-md'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:scale-105'}
      ${isCollapsed ? 'justify-center px-2' : ''}
      cursor-pointer
    `}
    title={isCollapsed ? label : undefined}
  >
    <span className="flex-shrink-0 w-5 h-5">{icon}</span>
    {!isCollapsed && <span className="font-medium text-sm">{label}</span>}
  </button>
)

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<UserProps | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    ;(async () => {
      try {
        const u = await checkAuth()
        if (!u) router.push('/auth/login')
        else setUser(u)
      } catch {
        router.push('/auth/login')
      }
    })()
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' })
    router.push('/')
  }
  const handleToggle = () => setIsCollapsed(v => !v)
  const isRouteActive = (cur: string, route: string) =>
    cur === route || cur.startsWith(`${route}/`)
  const getPageTitle = (path: string) => {
    const seg = path.split('/').filter(Boolean)
    if (seg[0] === 'exams' && seg.length === 2 && seg[1] !== 'new')
      return pageTitles['/exams/[id]']
    const key = '/' + seg.join('/')
    return pageTitles[key] || 'SisTIRA'
  }

  const sidebarItems = [
    { label: 'Dashboard',          route: '/dashboard',     icon: <LayoutDashboard size={20} /> },
    { label: 'Provas',             route: '/exams',         icon: <FileText size={20} /> },
    { label: 'Questões',           route: '/questions',     icon: <HelpCircle size={20} /> },
    { label: 'Banco de Questões',  route: '/questionsBank', icon: <Database size={20} /> },
  ]

  return (
    <>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleToggle}
        />
      )}

      <div className="flex h-screen">
        <aside
          className={`
            flex flex-col bg-white border-r border-slate-200 z-50 h-full
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-16' : 'w-64'}
            ${isMobile
              ? `${isCollapsed ? '-translate-x-full' : 'translate-x-0'} fixed top-0 left-0`
              : 'relative translate-x-0'}
          `}
        >
          <div className="flex items-center justify-between h-18 px-4 border-b border-slate-200">
            {!isCollapsed && (
              <div className="flex items-center gap-3 ml-3">
                <LogoIcon />
                <span className="font-bold text-xl text-slate-900">SisTIRA</span>
              </div>
            )}
            <button
              onClick={handleToggle}
              className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-opacity-50"
            >
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>

          <nav className="flex-1 overflow-auto p-4 space-y-2">
            {sidebarItems.map(item => (
              <NavItem
                key={item.route}
                icon={item.icon}
                label={item.label}
                isActive={isRouteActive(pathname, item.route)}
                onClick={() => router.push(item.route)}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav>

          <div className="mt-auto p-4 border-t border-slate-200">
            <NavItem
              icon={<LogOutIcon size={20} />}
              label="Logout"
              onClick={handleLogout}
              isCollapsed={isCollapsed}
            />
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="sticky top-0 z-30 flex items-center justify-between h-18 bg-white border-b border-slate-200 px-6">
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
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <Settings size={16} /> Configurações
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-4 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}
