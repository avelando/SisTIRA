'use client'

import React from 'react'
import { Plus, Upload, Download, BarChart3 } from 'lucide-react'
import styles from '@/styles/QuickActions.module.css'
import CompactActionButton from './CompactActionButton'

export default function QuickActions() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ações Rápidas</h2>
      <div className={styles.grid}>
        <CompactActionButton
          icon={<Plus size={20} className={styles.icon} />}
          title="Nova Prova"
          description="Criar uma nova prova com questões"
          onClick={() => {}}
        />
        <CompactActionButton
          icon={<Upload size={20} className={styles.icon} />}
          title="Importar Questões"
          description="Importar questões de um arquivo"
          onClick={() => {}}
        />
        <CompactActionButton
          icon={<Download size={20} className={styles.icon} />}
          title="Exportar Dados"
          description="Baixar relatórios e estatísticas"
          onClick={() => {}}
        />
        <CompactActionButton
          icon={<BarChart3 size={20} className={styles.icon} />}
          title="Ver Relatórios"
          description="Análise detalhada de desempenho"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
