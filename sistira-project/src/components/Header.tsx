import Button from "../components/Button"

import styles from "../styles/Header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.06639e-07 6.49519L11.2594 0V12.9904L5.06639e-07 6.49519Z" fill="#F8FFFF"/>
          <path d="M11.2594 15.4952L0 21.9904V9L11.2594 15.4952Z" fill="#F8FFFF"/>
          <path d="M24.2702 6.49519L13.0108 12.9904V0L24.2702 6.49519Z" fill="#F8FFFF"/>
          <path d="M13.0108 15.4952L24.2702 9V21.9904L13.0108 15.4952Z" fill="#F8FFFF"/>
        </svg>
        <h3>SisTIRA</h3>
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li>Serviços</li>
          <li>Sobre</li>
          <li>Contato</li>
        </ul>
      </nav>
      <div className={styles.info}>
        <Button content="Cadastra-se"/>
      </div>
    </header>
  )
}