'use client'

import React, { useState } from 'react'
import { Plus, Minus, Check } from 'lucide-react'
import { QuestionModalProps } from '@/interfaces/QuestionProps'
import { BaseModal } from '@/components/ui/Modals/BaseModal'
import { useQuestionModal } from '@/hooks/modals/useQuestionModal'

const EDUCATION_LEVELS = [
  '1º ano EF', '2º ano EF', '3º ano EF', '4º ano EF', '5º ano EF',
  '6º ano EF', '7º ano EF', '8º ano EF', '9º ano EF',
  '1º ano EM', '2º ano EM', '3º ano EM',
  'Graduação', 'Especialização', 'Mestrado', 'Doutorado'
] as const

const DIFFICULTIES = [
  'Muito fácil', 'Fácil', 'Médio', 'Difícil', 'Muito difícil'
] as const

export const QuestionModal: React.FC<QuestionModalProps> = ({
  visible,
  onClose,
  onSubmit,
  question,
  mode,
}) => {
  const {
    formData,
    loading,
    updateField,
    updateAlt,
    addAlt,
    removeAlt,
    updateModel,
    addModel,
    removeModel,
    handleSubmit,
  } = useQuestionModal({
    question,
    mode,
    visible,
    onClose,
    onSuccess: onSubmit,
  })

  const [disciplineInput, setDisciplineInput] = useState('')

  const handleSave = () => {
    handleSubmit({ preventDefault: () => { } } as React.FormEvent)
  }

  const handleDisciplineKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ';') {
      e.preventDefault()
      const val = disciplineInput.trim().replace(/;$/, '')
      if (val && !formData.disciplines.includes(val)) {
        updateField('disciplines', [...formData.disciplines, val])
      }
      setDisciplineInput('')
    }
  }

  const removeDiscipline = (name: string) => {
    updateField(
      'disciplines',
      formData.disciplines.filter(d => d !== name)
    )
  }

  const truncate = (text: string, len = 150) =>
    text.length > len ? text.slice(0, len) + '...' : text

  return (
    <BaseModal
      visible={visible}
      onClose={onClose}
      onSave={handleSave}
      saveLabel="Salvar"
      saveLoading={loading}
      disableSave={loading}
      title={mode === 'edit' ? 'Editar Questão' : 'Nova Questão'}
      maxWidthClass="max-w-3xl"
    >
      <form className="space-y-6" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Texto da Questão *
          </label>
          <textarea
            value={formData.text}
            onChange={e => updateField('text', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            placeholder="Digite a pergunta..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Tipo de Questão *
          </label>
          <select
            value={formData.questionType}
            onChange={e =>
              updateField('questionType', e.target.value as 'OBJ' | 'SUB')
            }
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            required
          >
            <option value="OBJ">Objetiva</option>
            <option value="SUB">Subjetiva</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Grau de Ensino *
          </label>
          <select
            value={formData.educationLevel}
            onChange={e => updateField('educationLevel', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            required
          >
            <option value="">Selecione...</option>
            {EDUCATION_LEVELS.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Dificuldade *
          </label>
          <select
            value={formData.difficulty}
            onChange={e => updateField('difficulty', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            required
          >
            <option value="">Selecione...</option>
            {DIFFICULTIES.map(diff => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Referência da Prova
          </label>
          <input
            type="text"
            value={formData.examReference}
            onChange={e => updateField('examReference', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            placeholder="Ex: Prova Final 2025"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Disciplinas
          </label>
          <div className="flex flex-wrap gap-2">
            {formData.disciplines.map(name => (
              <span
                key={name}
                className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-800 rounded-full text-sm"
              >
                {name}
                <button
                  type="button"
                  onClick={() => removeDiscipline(name)}
                  className="p-1 hover:text-red-600 rounded-full"
                  title="Remover"
                >
                  <Minus size={12} />
                </button>
              </span>
            ))}
            <input
              value={disciplineInput}
              onChange={e => setDisciplineInput(e.target.value)}
              onKeyDown={handleDisciplineKeyDown}
              placeholder="Digite e pressione Enter ou ';'"
              className="flex-1 min-w-[120px] px-2 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </div>

        {formData.questionType === 'OBJ' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Alternativas *
              </span>
              <button
                type="button"
                onClick={addAlt}
                className="flex items-center gap-1 px-3 py-1 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                <Plus size={14} /> Adicionar
              </button>
            </div>
            <div className="space-y-3">
              {formData.alternatives.map((alt, i) => (
                <div key={i} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => updateAlt(i, 'correct', !alt.correct)}
                    className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-colors ${alt.correct
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'border-slate-300 hover:border-slate-400'
                      }`}
                  >
                    {alt.correct && <Check size={14} />}
                  </button>
                  <input
                    type="text"
                    value={alt.content}
                    onChange={e => updateAlt(i, 'content', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                    placeholder={`Alternativa ${String.fromCharCode(65 + i)}`}
                  />
                  {formData.alternatives.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeAlt(i)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Minus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {formData.questionType === 'SUB' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={formData.useModelAnswers}
                onChange={e =>
                  updateField('useModelAnswers', e.target.checked)
                }
                className="rounded border-slate-300 focus:ring-slate-900"
              />
              <label className="text-sm font-medium text-slate-700">
                Usar Respostas Modelo
              </label>
            </div>
            {formData.useModelAnswers && (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Respostas Modelo
                  </span>
                  <button
                    type="button"
                    onClick={addModel}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    <Plus size={14} /> Adicionar
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.modelAnswers.map((ma, i) => (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <input
                          type="text"
                          value={ma.type}
                          onChange={e => updateModel(i, 'type', e.target.value)}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                          placeholder="Tipo de resposta"
                        />
                        <button
                          type="button"
                          onClick={() => removeModel(i)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                      <textarea
                        value={ma.content}
                        onChange={e =>
                          updateModel(i, 'content', e.target.value)
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
                        placeholder="Conteúdo da resposta..."
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </form>
    </BaseModal>
  )
}
