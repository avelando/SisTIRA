import React from 'react';
import { Github, Linkedin, Mail, MapPin, GraduationCap } from 'lucide-react';
import styles from '@/styles/About.module.css';
import Image from 'next/image'

export const About: React.FC = () => {
  return (
    <section id="sobre" className={styles.aboutSection}>
      <div className={styles.container}>

        <div className={styles.header}>
          <h2 className={styles.title}>
            Conheça os{' '}
            <span className={styles.highlight}>Desenvolvedores</span>
          </h2>
        </div>

        <div className={styles.contentGrid}>

          <div className={styles.imageWrapper}>
            <div className={styles.avatarContainer}>
              <Image
                src="/assets/avelar.jpg"
                alt="Avatar do usuário"
                width={500}
                height={500}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.floatIconTop}>
              <GraduationCap size={24} className={styles.gradIcon} />
            </div>
            <div className={styles.floatIconBottom}>
              <span className={styles.ifpiLabel}>IFPI</span>
            </div>
          </div>

          <div className={styles.infoWrapper}>
            <div className={styles.nameSection}>
              <h3 className={styles.name}>Avelar Rodrigues</h3>
              <p className={styles.role}>Desenvolvedor Full Stack & Analista de Sistemas</p>
            </div>

            <div className={styles.educationCard}>
              <GraduationCap size={24} className={styles.educationIcon} />
              <div>
                <h4 className={styles.educationTitle}>Formação Acadêmica</h4>
                <p className={styles.educationCourse}>Tecnólogo em Análise e Desenvolvimento de Sistemas</p>
                <p className={styles.educationInstitution}>Instituto Federal do Piauí (IFPI)</p>
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <h4 className={styles.blockTitle}>Missão</h4>
              <p className={styles.blockText}>
                Desenvolver soluções tecnológicas inovadoras que tornem o aprendizado mais acessível, eficiente e personalizado. Acredito que a tecnologia pode revolucionar a educação, criando experiências de ensino mais envolventes e resultados de aprendizagem superiores.
              </p>
            </div>

            <div className={styles.sectionBlock}>
              <h4 className={styles.blockTitle}>Visão</h4>
              <p className={styles.blockText}>
                Democratizar o acesso a ferramentas educacionais de qualidade, permitindo que educadores de todo o mundo possam criar avaliações mais inteligentes e fornecer feedback mais efetivo aos seus alunos.
              </p>
            </div>

            <div className={styles.sectionBlock}>
              <h4 className={styles.blockTitle}>Conecte-se</h4>
              <div className={styles.socialLinks}>
                <a href="https://github.com/avelando" target="_blank" rel="noopener noreferrer" className={styles.socialButton}>
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com/in/avelandoo" target="_blank" rel="noopener noreferrer" className={styles.socialButtonLinkedin}>
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <a href="mailto:avelar@sistira.com" className={styles.socialButtonMail}>
                  <Mail size={20} />
                  <span>Email</span>
                </a>
              </div>
            </div>

            <div className={styles.location}>
              <MapPin size={20} className={styles.locationIcon} />
              <span>Picos, Piauí - Brasil</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
