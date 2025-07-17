'use client';

import React from 'react';
import { CardProps } from '@/interfaces/CardProps';
import styles from '@/styles/Card.module.css';

const colorClasses = {
  yellow: {
    bg: styles.bgYellow,
    border: styles.borderYellow,
    hover: styles.hoverYellow,
    iconBg: styles.iconBgYellow,
    iconColor: styles.iconColorYellow,
  },
  pink: {
    bg: styles.bgPink,
    border: styles.borderPink,
    hover: styles.hoverPink,
    iconBg: styles.iconBgPink,
    iconColor: styles.iconColorPink,
  },
  green: {
    bg: styles.bgGreen,
    border: styles.borderGreen,
    hover: styles.hoverGreen,
    iconBg: styles.iconBgGreen,
    iconColor: styles.iconColorGreen,
  },
};

export default function Card({ title, quant, icon, bgColor }: CardProps) {
  const colors = colorClasses[bgColor as keyof typeof colorClasses];

  return (
    <div
      className={`${styles.card} ${colors.bg} ${colors.border} ${colors.hover}`}
    >
      <div className={styles.content}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.quant}>{quant}</span>
        </div>
        <div className={`${styles.iconWrapper} ${colors.iconBg} ${colors.iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
