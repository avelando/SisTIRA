'use client'

import React from 'react'
import { QuestionFilterPanelProps } from '@/interfaces/Activities'
import { ClearButton } from '@/components/ui/ClearButton'
import { ApplyButton } from '@/components/ui/ApplyButton'

export const QuestionFilterPanel: React.FC<QuestionFilterPanelProps> = ({
  filters,
  onChange,
  onClear,
  onApply,
  disciplines,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Tipo de Questão
      </label>
      <select
        value={filters.questionType}
        onChange={e => onChange('questionType', e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
      >
        <option value="">Todos os tipos</option>
        <option value="OBJ">Objetiva</option>
        <option value="SUB">Subjetiva</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Nível de Ensino
      </label>
      <select
        value={filters.educationLevel}
        onChange={e => onChange('educationLevel', e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
      >
        <option value="">Todos os níveis</option>
        <option value="fundamental">Fundamental</option>
        <option value="medio">Médio</option>
        <option value="superior">Superior</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Dificuldade
      </label>
      <select
        value={filters.difficulty}
        onChange={e => onChange('difficulty', e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
      >
        <option value="">Todas as dificuldades</option>
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Difícil</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        Disciplina
      </label>
      <select
        value={filters.disciplineId}
        onChange={e => onChange('disciplineId', e.target.value)}
        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-slate-900 outline-none"
      >
        <option value="">Todas as disciplinas</option>
        {disciplines.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>

    <div className="flex gap-2 pt-2">
      <ClearButton onClick={onClear} />
      <ApplyButton onClick={onApply} />
    </div>
  </div>
)
