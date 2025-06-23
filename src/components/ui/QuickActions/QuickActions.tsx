'use client'

import React from 'react'
import ActionButton from './ActionButton'
import { Plus, Upload, Download, BarChart3 } from 'lucide-react'

export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-71 overflow-auto">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ActionButton
          icon={<Plus size={20} className="text-slate-600" />}
          title="Nova Prova"
          description="Criar uma nova prova com questões"
        />
        <ActionButton
          icon={<Upload size={20} className="text-slate-600" />}
          title="Importar Questões"
          description="Importar questões de um arquivo"
        />
        <ActionButton
          icon={<Download size={20} className="text-slate-600" />}
          title="Exportar Dados"
          description="Baixar relatórios e estatísticas"
        />
        <ActionButton
          icon={<BarChart3 size={20} className="text-slate-600" />}
          title="Ver Relatórios"
          description="Análise detalhada de desempenho"
        />
      </div>
    </div>
  )
}
