'use client';

import React from 'react';
import styles from '@/styles/QuestionSkeleton.module.css';

export const QuestionsSkeleton: React.FC = () => {
  return (
    <div className={styles.grid}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <div className={styles.avatar} />
            <div className={styles.icons}>
              <div className={styles.iconBox} />
              <div className={styles.iconBox} />
            </div>
          </div>

          <div className={styles.textLines}>
            <div className={styles.textLine} />
            <div className={styles.textLine} />
            <div className={styles.textLine} />
          </div>

          <div className={styles.tags}>
            <div className={styles.tag} />
            <div className={styles.tag} />
          </div>

          <div className={styles.meta}>
            <div className={styles.metaLine} />
            <div className={`${styles.metaLine} ${styles.small}`} />
          </div>

          <div className={styles.options}>
            <div className={styles.optionHeader} />
            {Array.from({ length: 3 }).map((_, altIndex) => (
              <div key={altIndex} className={styles.option}>
                <div className={styles.optionIcon} />
                <div className={styles.optionText} />
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.footerLine} />
          </div>
        </div>
      ))}
    </div>
  );
};
