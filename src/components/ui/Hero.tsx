'use client';

import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { TextAnimated } from './TextAnimated';
import { TeacherElement } from './TeacherElement';
import styles from '@/styles/Hero.module.css';

export const Hero: React.FC = () => {
  const animatedTexts = [
    "Inteligente",
    "Automático",
    "Eficiente",
    "Inovador"
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.mainTitle}>
                {' '}
                <TextAnimated
                  texts={animatedTexts}
                  className={styles.animatedText}
                />
              </h1>
              <h2 className={styles.subTitle}>
                Sistema de Tutoria Inteligente de
                <br />
                <span className={styles.highlight}>Respostas Automáticas</span>
              </h2>
            </div>

            <p className={styles.description}>
              Revolucione a forma como você cria e gerencia provas e questões. 
              O SisTIRA utiliza inteligência artificial para automatizar o processo 
              de avaliação e fornecer feedback instantâneo.
            </p>

            <div className={styles.ctaContainer}>
              <button
                className={styles.primaryButton}
                onClick={() => window.location.href = '/signup'}
              >
                Comece Agora
                <ArrowRight size={20} className={styles.arrowIcon} />
              </button>
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>1000+</div>
                <div className={styles.statLabel}>Questões Criadas</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>500+</div>
                <div className={styles.statLabel}>Provas Aplicadas</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>98%</div>
                <div className={styles.statLabel}>Satisfação</div>
              </div>
            </div>
          </div>

          <div className={styles.rightColumn}>
            <TeacherElement />
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.scrollOuter}>
          <div className={styles.scrollInner}></div>
        </div>
      </div>
    </section>
  );
};
