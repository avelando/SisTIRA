'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, BookOpen } from 'lucide-react'
import styles from '@/styles/Header.module.css'

interface HeaderProps {
  onLoginClick?: () => void
  onSignupClick?: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  onSignupClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(open => !open)

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : styles.notScrolled
        }`}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logoSection}>
            <div className={styles.logoBox}>
              <BookOpen size={24} className={styles.logoIcon} />
            </div>
            <span className={styles.brand}>SisTIRA</span>
          </div>

          <nav className={styles.nav}>
            {['servicos', 'sobre', 'contato'].map(id => (
              <a
                key={id}
                href={`#${id}`}
                className={styles.navLink}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>

          <div className={styles.authButtons}>
            <button
              onClick={onLoginClick ?? (() => window.location.href = 'auth/login')}
              className={`${styles.buttonBase} ${styles.loginButton}`}
            >
              Entrar
            </button>
            <button
              onClick={onSignupClick ?? (() => window.location.href = 'auth/register')}
              className={`${styles.buttonBase} ${styles.signupButton}`}
            >
              Cadastrar-se
            </button>
          </div>

          <button
            onClick={toggleMenu}
            className={styles.mobileMenuButton}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuLinks}>
              {['servicos', 'sobre', 'contato'].map(id => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={styles.mobileMenuLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </div>
            <div className={styles.mobileMenuAuth}>
              <button
                onClick={() => {
                  ; (onLoginClick ?? (() => window.location.href = '/login'))()
                  setIsMenuOpen(false)
                }}
                className={styles.mobileLoginButton}
              >
                Entrar
              </button>
              <button
                onClick={() => {
                  ; (onSignupClick ?? (() => window.location.href = '/signup'))()
                  setIsMenuOpen(false)
                }}
                className={styles.mobileSignupButton}
              >
                Cadastrar-se
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
