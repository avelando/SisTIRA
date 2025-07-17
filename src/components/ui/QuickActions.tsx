'use client'

import React from 'react'
import { ActionButton } from './ActionButton'
import { Plus, Upload, Download, BarChart3 } from 'lucide-react'
import styles from '@/styles/QuickActions.module.css'

export default function QuickActions() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ações Rápidas</h2>
      <div className={styles.grid}>
        <ActionButton
          icon={<Plus size={20} className={styles.icon} />}
          title="Nova Prova"
          description="Criar uma nova prova com questões"
        />
        <ActionButton
          icon={<Upload size={20} className={styles.icon} />}
          title="Importar Questões"
          description="Importar questões de um arquivo"
        />
        <ActionButton
          icon={<Download size={20} className={styles.icon} />}
          title="Exportar Dados"
          description="Baixar relatórios e estatísticas"
        />
        <ActionButton
          icon={<BarChart3 size={20} className={styles.icon} />}
          title="Ver Relatórios"
          description="Análise detalhada de desempenho"
        />
      </div>
    </div>
  )
}
