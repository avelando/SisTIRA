'use client'

import React from 'react'
import { Clock, FileText, HelpCircle } from 'lucide-react'
import { ActivityItem } from '@/interfaces/Activities'
import styles from '@/styles/RecentActivity.module.css'

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'prova',
    title: 'Prova de Matemática criada',
    time: '2 horas atrás',
    icon: <FileText size={16} />
  },
  {
    id: '2',
    type: 'questao',
    title: 'Nova questão adicionada',
    time: '5 horas atrás',
    icon: <HelpCircle size={16} />
  }
]

export function RecentActivity() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Clock size={20} className={styles.headerIcon} />
        <h2 className={styles.headerTitle}>Atividade Recente</h2>
      </div>
      <div className={styles.list}>
        {activities.map(activity => (
          <div key={activity.id} className={styles.item}>
            <div className={styles.itemIconWrapper}>
              {activity.icon}
            </div>
            <div className={styles.itemContent}>
              <p className={styles.itemTitle}>{activity.title}</p>
              <p className={styles.itemTime}>{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className={styles.footerButton}>
        Ver todas as atividades
      </button>
    </div>
  )
}
