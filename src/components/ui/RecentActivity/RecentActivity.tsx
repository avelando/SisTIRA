'use client'

import React from 'react'
import { Clock, FileText, HelpCircle } from 'lucide-react'
import { ActivityItem } from '@/interfaces/Activities'

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
    <div className="bg-white rounded-xl border border-slate-200 p-6 h-71 overflow-auto">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={20} className="text-slate-600" />
        <h2 className="text-lg font-semibold text-slate-900">
          Atividade Recente
        </h2>
      </div>
      <div className="space-y-4">
        {activities.map(activity => (
          <div
            key={activity.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {activity.title}
              </p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium">
        Ver todas as atividades
      </button>
    </div>
  )
}
