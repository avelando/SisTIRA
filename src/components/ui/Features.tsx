import React from 'react';
import { MessageSquare, Calendar, BarChart3, Bell, Brain, CheckCircle } from 'lucide-react';
import styles from '@/styles/Features.module.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, colorClass }) => (
  <div className={styles.card}>
    <div className={`${styles.iconContainer} ${styles[colorClass]}`}>{icon}</div>
    <h3 className={styles.cardTitle}>{title}</h3>
    <p className={styles.cardDescription}>{description}</p>
    <div className={styles.cardFooter}>
      <span className={styles.moreText}>Saiba mais</span>
      <CheckCircle size={16} className={styles.moreIcon} />
    </div>
  </div>
);

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Brain size={32} className={styles.icon} />,
      title: 'IA Avançada',
      description:
        'Sistema inteligente que analisa e corrige automaticamente questões subjetivas, fornecendo feedback detalhado e personalizado.',
      colorClass: 'purpleGradient',
    },
    {
      icon: <MessageSquare size={32} className={styles.icon} />,
      title: 'Chat Inteligente',
      description:
        'Converse com a IA para esclarecer dúvidas, obter sugestões de questões e receber orientações pedagógicas em tempo real.',
      colorClass: 'blueGradient',
    },
    {
      icon: <Calendar size={32} className={styles.icon} />,
      title: 'Agendamento',
      description:
        'Programe provas e avaliações com antecedência, configure lembretes automáticos e gerencie cronogramas acadêmicos.',
      colorClass: 'greenGradient',
    },
    {
      icon: <BarChart3 size={32} className={styles.icon} />,
      title: 'Relatórios Detalhados',
      description:
        'Análises completas de desempenho, estatísticas de acertos e erros, e insights para melhorar o processo de ensino.',
      colorClass: 'orangeGradient',
    },
    {
      icon: <Bell size={32} className={styles.icon} />,
      title: 'Notificações',
      description:
        'Receba alertas sobre prazos, novos resultados, atualizações do sistema e lembretes importantes automaticamente.',
      colorClass: 'redGradient',
    },
  ];

  return (
    <section id="servicos" className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Funcionalidades do <span className={styles.highlight}>SisTIRA</span>
          </h2>
          <p className={styles.subtitle}>
            Descubra como nossa plataforma pode transformar a forma como você cria, aplica e avalia provas e questões educacionais.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              colorClass={feature.colorClass}
            />
          ))}
        </div>

        <div className={styles.bottomCTA}>
          <div className={styles.ctaBox}>
            <h3 className={styles.ctaTitle}>Pronto para começar?</h3>
            <p className={styles.ctaText}>
              Experimente todas essas funcionalidades gratuitamente por 30 dias.
            </p>
            <button className={styles.ctaButton}>
              Começar Teste Gratuito
              <CheckCircle size={20} className={styles.ctaButtonIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
