'use client'

import React, { useState, KeyboardEvent } from 'react'
import { Plus, Minus, Check } from 'lucide-react'
import { QuestionModalProps } from '@/interfaces/QuestionProps'
import { BaseModal } from '@/components/ui/BaseModal'
import { useQuestionModal } from '@/hooks/modals/useQuestionModal'
import styles from '@/styles/QuestionModal.module.css'

const EDUCATION_LEVELS = [
  '1º ano EF','2º ano EF','3º ano EF','4º ano EF','5º ano EF',
  '6º ano EF','7º ano EF','8º ano EF','9º ano EF',
  '1º ano EM','2º ano EM','3º ano EM',
  'Graduação','Especialização','Mestrado','Doutorado'
] as const

const DIFFICULTIES = [
  'Muito fácil','Fácil','Médio','Difícil','Muito difícil'
] as const

export const QuestionModal: React.FC<QuestionModalProps> = ({ visible, onClose, onSubmit, question, mode }) => {
  const { formData, loading, updateField, updateAlt, addAlt, removeAlt, handleSubmit } =
    useQuestionModal({ question, mode, visible, onClose, onSuccess: onSubmit })

  const [disciplineInput, setDisciplineInput] = useState('')

  const handleSave = () => handleSubmit({ preventDefault() {} } as React.FormEvent)

  const handleDisciplineKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ';') {
      e.preventDefault()
      const val = disciplineInput.trim().replace(/;$/, '')
      if (val && !formData.disciplines.includes(val)) updateField('disciplines', [...formData.disciplines, val])
      setDisciplineInput('')
    }
  }

  const removeDiscipline = (name:string) => updateField(
    'disciplines', formData.disciplines.filter(d=>d!==name)
  )

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      onSave={handleSave}
      saveLabel="Salvar"
      saveLoading={loading}
      disableSave={loading}
      title={mode==='edit'? 'Editar Questão':'Nova Questão'}
      maxWidthClass="max-w-3xl"
    >
      <form className={styles.form} onSubmit={e=>e.preventDefault()}>
        <div className={styles.field}>
          <label className={styles.label}>Texto da Questão *</label>
          <textarea
            value={formData.text}
            onChange={e=>updateField('text', e.target.value)}
            rows={4}
            className={styles.textarea}
            placeholder="Digite a pergunta..."
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Tipo de Questão *</label>
          <select
            value={formData.questionType}
            onChange={e=>updateField('questionType', e.target.value as 'OBJ'|'SUB')}
            className={styles.select}
            required
          >
            <option value="OBJ">Objetiva</option>
            <option value="SUB">Subjetiva</option>
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Grau de Ensino *</label>
          <select
            value={formData.educationLevel}
            onChange={e=>updateField('educationLevel', e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Selecione...</option>
            {EDUCATION_LEVELS.map(level=>(
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Dificuldade *</label>
          <select
            value={formData.difficulty}
            onChange={e=>updateField('difficulty', e.target.value)}
            className={styles.select}
            required
          >
            <option value="">Selecione...</option>
            {DIFFICULTIES.map(diff=>(
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Referência da Prova</label>
          <input
            type="text"
            value={formData.examReference}
            onChange={e=>updateField('examReference', e.target.value)}
            className={styles.input}
            placeholder="Ex: Prova Final 2025"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Disciplinas</label>
          <div className={styles.tags}>
            {formData.disciplines.map(name=>(
              <span key={name} className={styles.tag}>
                {name}
                <button
                  type="button"
                  onClick={()=>removeDiscipline(name)}
                  className={styles.tagRemove}
                  title="Remover"
                >
                  <Minus size={12}/>
                </button>
              </span>
            ))}
            <input
              value={disciplineInput}
              onChange={e=>setDisciplineInput(e.target.value)}
              onKeyDown={handleDisciplineKeyDown}
              placeholder="Enter ou ';' para adicionar"
              className={styles.input}
            />
          </div>
        </div>

        {formData.questionType==='OBJ' && (
          <div className={styles.field}>
            <div className={styles.inlineHeader}>
              <span className={styles.label}>Alternativas *</span>
              <button type="button" onClick={addAlt} className={styles.addBtn}>
                <Plus size={14}/> Adicionar
              </button>
            </div>
            <div className={styles.altList}>
              {formData.alternatives.map((alt,i)=>(
                <div key={i} className={styles.altItem}>
                  <button
                    type="button"
                    onClick={()=>updateAlt(i,'correct', !alt.correct)}
                    className={`${styles.altRadio} ${alt.correct?styles.correct:styles.incorrect}`}
                  >
                    {alt.correct && <Check size={14}/>}
                  </button>
                  <input
                    type="text"
                    value={alt.content}
                    onChange={e=>updateAlt(i,'content', e.target.value)}
                    className={styles.input}
                    placeholder={`Alternativa ${String.fromCharCode(65+i)}`}
                  />
                  {formData.alternatives.length>2 && (
                    <button type="button" onClick={()=>removeAlt(i)} className={styles.removeAlt}>
                      <Minus size={16}/>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.questionType==='SUB' && (
          <div className={styles.field}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.useModelAnswers}
                onChange={e=>updateField('useModelAnswers', e.target.checked)}
                className={styles.checkbox}
              /> Use Respostas Modelo
            </label>
            {formData.useModelAnswers && [
              { type:'WRONG', label:'ERRADA', placeholder:'exemplo totalmente errado' },
              { type:'MEDIAN', label:'MEDIANA', placeholder:'exemplo nem certo nem totalmente errado' },
              { type:'CORRECT', label:'CERTA', placeholder:'exemplo totalmente correto' }
            ].map(({type,label,placeholder})=>{
              const ans = formData.modelAnswers.find(m=>m.type===type)
              return (
                <div key={type} className={styles.field}>
                  <label className={styles.label}>Resposta Modelo {label} *</label>
                  <textarea
                    rows={2}
                    value={ans?.content||''}
                    onChange={e=>{
                      const idx=formData.modelAnswers.findIndex(m=>m.type===type)
                      if(idx>=0){ const copy=[...formData.modelAnswers]; copy[idx]={...copy[idx],content:e.target.value}; updateField('modelAnswers',copy) }
                    }}
                    className={styles.textarea}
                    placeholder={`Digite um ${placeholder}`}
                    required
                  />
                </div>
              )
            })}
          </div>
        )}
      </form>
    </BaseModal>
  )
}
