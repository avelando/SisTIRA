'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkAuth, logout } from '@/api/auth';
import { setTokens } from '@/lib/authStorage';
import { UserProps } from '@/interfaces/UserProps';
import { LogoIcon } from '@/lib/images';
import { pageTitles } from '@/utils/pageTitles';
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
} from 'lucide-react';
import styles from '@/styles/AuthenticatedLayout.module.css';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive = false, onClick, isCollapsed }) => {
  const classes = [styles.navItem, isActive ? styles.active : styles.inactive];
  if (isCollapsed) classes.push(styles.collapsedItem);
  return (
    <button onClick={onClick} className={classes.join(' ')} title={isCollapsed ? label : undefined}>
      <span className={styles.iconWrapper}>{icon}</span>
      {!isCollapsed && <span className={styles.label}>{label}</span>}
    </button>
  );
};

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserProps | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hydratedTokens, setHydratedTokens] = useState(false); // <- novo
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const src = window.location.hash?.startsWith('#')
        ? window.location.hash.slice(1)
        : window.location.search?.replace(/^\?/, '');

      if (src) {
        const params = new URLSearchParams(src);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
          setTokens(accessToken, refreshToken);
          window.history.replaceState(null, '', pathname);
        }
      }
    } finally {
      setHydratedTokens(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!hydratedTokens) return;

    (async () => {
      try {
        const u = await checkAuth();
        if (!u) router.push('/auth/login');
        else setUser(u);
      } catch {
        router.push('/auth/login');
      }
    })();
  }, [hydratedTokens, router]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error('Logout falhou', e);
    } finally {
      router.replace('/auth/login');
    }
  };

  const handleToggle = () => setIsCollapsed(v => !v);
  const isRouteActive = (cur: string, route: string) =>
    cur === route || cur.startsWith(`${route}/`);
  const getPageTitle = (path: string) => {
    const seg = path.split('/').filter(Boolean);
    if (seg[0] === 'exams' && seg.length === 2 && seg[1] !== 'new')
      return pageTitles['/exams/[id]'];
    const key = '/' + seg.join('/');
    return pageTitles[key] || 'SisTIRA';
  };

  const sidebarItems = [
    { label: 'Dashboard', route: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: 'Provas', route: '/exams', icon: <FileText size={20} /> },
    { label: 'Questões', route: '/questions', icon: <HelpCircle size={20} /> },
    { label: 'Banco de Questões', route: '/questionsBank', icon: <Database size={20} /> },
  ];

  if (!hydratedTokens || !user) return null;

  return (
    <>
      {isMobile && !isCollapsed && <div className={styles.overlay} onClick={handleToggle} />}
      <div className={styles.container}>
        <aside
          className={
            `${styles.sidebar} ${isCollapsed ? styles.collapsedSidebar : ''} ` +
            `${isMobile ? (isCollapsed ? styles.mobileHidden : styles.mobileVisible) : styles.desktopSidebar}`
          }
        >
          <div className={styles.sidebarHeader}>
            {!isCollapsed && (
              <div className={styles.logoContainer}>
                <LogoIcon />
                <span className={styles.brand}>SisTIRA</span>
              </div>
            )}
            <button onClick={handleToggle} className={styles.toggleButton}>
              {isCollapsed ? <Menu size={20} /> : <X size={20} />}
            </button>
          </div>
          <nav className={styles.nav}>
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
          <div className={styles.sidebarFooter}>
            <NavItem
              icon={<LogOutIcon size={20} />}
              label="Logout"
              onClick={handleLogout}
              isCollapsed={isCollapsed}
            />
          </div>
        </aside>
        <div className={styles.mainArea}>
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>{getPageTitle(pathname)}</h1>
            <div className={styles.userWrapper} ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(v => !v)}
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
                  className={`${styles.chevron} ${isDropdownOpen ? styles.rotate : ''}`}
                />
              </button>
              <div
                className={`${styles.dropdown} ${isDropdownOpen ? styles.dropdownOpen : ''}`}
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
              </div>
            </div>
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </>
  );
}
