import React from 'react';
import styles from '@/styles/FeatureList.module.css';

interface Feature {
  icon: React.ReactNode;
  title: string;
  text: string;
}

interface FeatureListProps {
  features: Feature[];
}

export const FeatureList: React.FC<FeatureListProps> = ({ features }) => (
  <div className={styles.features}>
    {features.map((f, i) => (
      <div key={i} className={styles.featureItem}>
        <div className={styles.featureIcon}>{f.icon}</div>
        <div>
          <h3 className={styles.featureTitle}>{f.title}</h3>
          <p className={styles.featureText}>{f.text}</p>
        </div>
      </div>
    ))}
  </div>
);

export default FeatureList;
