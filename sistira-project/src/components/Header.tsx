import React from "react";
import styles from "@/styles/Header.module.css";
import Image from "next/image";
import { FaBell } from "react-icons/fa";

const Header: React.FC<HeaderProps> = ({ user, title }) => {
  return (
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
  );
};

export default Header;
