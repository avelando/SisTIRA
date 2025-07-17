'use client'

import React from 'react'
import { QuestionFilterPanelProps } from '@/interfaces/Activities'
import { ClearButton } from '@/components/ui/ClearButton'
import { ApplyButton } from '@/components/ui/ApplyButton'
import styles from '@/styles/QuestionFilterPanel.module.css'

export const QuestionFilterPanel: React.FC<QuestionFilterPanelProps> = ({
  filters,
  onChange,
  onClear,
  onApply,
  disciplines,
}) => (
  <div className={styles.container}>
    <div className={styles.field}>
      <label htmlFor="questionType" className={styles.label}>
        Tipo de Questão
      </label>
      <select
        id="questionType"
        value={filters.questionType}
        onChange={e => onChange('questionType', e.target.value)}
        className={styles.select}
      >
        <option value="">Todos os tipos</option>
        <option value="OBJ">Objetiva</option>
        <option value="SUB">Subjetiva</option>
      </select>
    </div>

    <div className={styles.field}>
      <label htmlFor="educationLevel" className={styles.label}>
        Nível de Ensino
      </label>
      <select
        id="educationLevel"
        value={filters.educationLevel}
        onChange={e => onChange('educationLevel', e.target.value)}
        className={styles.select}
      >
        <option value="">Todos os níveis</option>
        <option value="fundamental">Fundamental</option>
        <option value="medio">Médio</option>
        <option value="superior">Superior</option>
      </select>
    </div>

    <div className={styles.field}>
      <label htmlFor="difficulty" className={styles.label}>
        Dificuldade
      </label>
      <select
        id="difficulty"
        value={filters.difficulty}
        onChange={e => onChange('difficulty', e.target.value)}
        className={styles.select}
      >
        <option value="">Todas as dificuldades</option>
        <option value="easy">Fácil</option>
        <option value="medium">Médio</option>
        <option value="hard">Difícil</option>
      </select>
    </div>

    <div className={styles.field}>
      <label htmlFor="disciplineId" className={styles.label}>
        Disciplina
      </label>
      <select
        id="disciplineId"
        value={filters.disciplineId}
        onChange={e => onChange('disciplineId', e.target.value)}
        className={styles.select}
      >
        <option value="">Todas as disciplinas</option>
        {disciplines.map(d => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
    </div>

    <div className={styles.actions}>
      <ClearButton onClick={onClear} />
      <ApplyButton onClick={onApply} />
    </div>
  </div>
)
