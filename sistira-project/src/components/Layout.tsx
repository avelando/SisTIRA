import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/Layout.module.css';
import { FaBook, FaQuestionCircle, FaDatabase, FaUsers, FaCalendarAlt, FaClipboardList, FaDoorOpen, FaClone, FaBell } from 'react-icons/fa';
import { Url } from 'next/dist/shared/lib/router/router';
import { LayoutProps } from '@/interfaces/LayoutProps';

const sidebarItems = [
  { label: 'Dashboard', route: '/dashboard', icon: <FaBook /> },
  { label: 'Provas', route: '/exams', icon: <FaClipboardList /> },
  { label: 'Questões', route: '/questions', icon: <FaQuestionCircle /> },
  { label: 'Banco de Questões', route: '/questionsBank', icon: <FaDatabase /> },
  { label: 'Salas', route: '/rooms', icon: <FaClone /> },
  { label: 'Amigos', route: '/friends', icon: <FaUsers /> },
  { label: 'Calendário', route: '/calendar', icon: <FaCalendarAlt /> },
  { label: 'To-do', route: '/todo', icon: <FaClipboardList /> },
  { label: 'Log-out', route: '/logout', icon: <FaDoorOpen /> },
];

export default function Layout({ children, user, title }: LayoutProps) {
  const router = useRouter();

  const handleNavigation = (route: Url) => {
    router.push(route);
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <ul>
          {sidebarItems.map((item) => (
            <li
              key={item.route}
              className={router.pathname === item.route ? styles.active : ''}
              onClick={() => handleNavigation(item.route)}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.info}>
            <h1>{title}</h1>
          </div>
          <FaBell className={styles.notificationIcon} />
          <div className={styles.profile}>
            <Image
              src="/foto.jpg"
              alt="Foto de perfil"
              width={40}
              height={40}
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <span className={styles.name}>{user?.firstName} {user?.lastName}</span>
              <span className={styles.username}>@{user?.username}</span>
            </div>
          </div>
        </header>

        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
