import React from 'react';
import { BookOpen, Github, Linkedin, Mail, Heart } from 'lucide-react';
import styles from '@/styles/Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.mainContent}>
          <div className={styles.grid}>

            <div className={styles.brandSection}>
              <div className={styles.brandHeader}>
                <div className={styles.brandIconContainer}>
                  <BookOpen size={24} className={styles.brandIcon} />
                </div>
                <span className={styles.brandTitle}>SisTIRA</span>
              </div>

              <p className={styles.brandDescription}>
                Sistema de Tutoria Inteligente de Respostas Automáticas. Revolucionando a forma como educadores criam e gerenciam avaliações com o poder da inteligência artificial.
              </p>

              <div className={styles.socialLinks}>
                <a
                  href="https://github.com/avelarrodrigues89"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/avelarrodrigues89"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:avelar@sistira.com"
                  className={styles.socialIcon}
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Links Rápidos</h3>
              <ul className={styles.sectionList}>
                <li className={styles.sectionListItem}>
                  <a href="#servicos" className={styles.link}>Funcionalidades</a>
                </li>
                <li className={styles.sectionListItem}>
                  <a href="#sobre" className={styles.link}>Sobre</a>
                </li>
                <li className={styles.sectionListItem}>
                  <a href="#contato" className={styles.link}>Contato</a>
                </li>
                <li className={styles.sectionListItem}>
                  <a href="/dashboard" className={styles.link}>Dashboard</a>
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Suporte</h3>
              <ul className={styles.sectionList}>
                <li className={styles.sectionListItem}>
                  <a href="/docs" className={styles.link}>Documentação</a>
                </li>
                <li className={styles.sectionListItem}>
                  <a href="/help" className={styles.link}>Central de Ajuda</a>
                </li>
                <li className={styles.sectionListItem}>
                  <a href="/privacy" className={styles.link}>Privacidade</a>
                </li>
                <li className={styles.sectionListItem}>
                  <a href="/terms" className={styles.link}>Termos de Uso</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.bottomContainer}>
            <div className={styles.copyRight}>
              © 2024 SisTIRA. Todos os direitos reservados.
            </div>
            <div className={styles.madeWith}>
              <span>Feito com</span>
              <Heart size={16} className={styles.heartIcon} />
              <span>por Avelar Rodrigues</span>
            </div>
            <div className={styles.version}>
              Versão 1.0.0
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
