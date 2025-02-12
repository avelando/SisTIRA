import { useRouter } from 'next/router';
import styles from '@/styles/SideBar.module.css';
import { FaBook, FaQuestionCircle, FaDatabase, FaUsers, FaCalendarAlt, FaClipboardList, FaDoorOpen, FaClone } from 'react-icons/fa';
import { Url } from 'next/dist/shared/lib/router/router';

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

export default function SideBar() {
  const router = useRouter();

  const handleNavigation = (route: Url) => {
    router.push(route);
  };

  return (
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
  );
}
