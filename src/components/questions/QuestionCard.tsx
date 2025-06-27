'use client'

import React, { useState } from 'react'
import {
  Edit,
  Trash2,
  CheckCircle,
  Circle,
  BookOpen,
  Target,
  GraduationCap,
} from 'lucide-react'

import { Question } from '@/interfaces/QuestionProps';

interface QuestionCardProps {
  question: Question & {
    questionDisciplines?: { discipline: { id: string; name: string } }[]
    educationLevel?: string
    difficulty?: string
    examReference?: string
    useModelAnswers?: boolean
    createdAt?: string
  }
  onEdit: (question: Question) => void
  onDelete: (id: string) => void
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onEdit,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false)

  const truncate = (text: string, len = 150) =>
    text.length > len ? text.slice(0, len) + '...' : text

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(question)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm('Tem certeza que deseja deletar esta questão?')) {
      onDelete(question.id)
    }
  }

  return (
    <div
      className="relative group bg-white rounded-xl border border-slate-200 p-6 cursor-pointer
                 hover:shadow-lg hover:border-slate-300 transition-all duration-200"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            question.questionType === 'OBJ'
              ? 'bg-blue-100 text-blue-800 border border-blue-200'
              : 'bg-purple-100 text-purple-800 border border-purple-200'
          }`}
        >
          {question.questionType === 'OBJ' ? 'Objetiva' : 'Subjetiva'}
        </span>
        <div
          className={`flex items-center gap-2 transition-opacity duration-200 ${
            showActions ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleEdit}
            title="Editar"
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            title="Deletar"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-slate-900 font-medium leading-relaxed">
          {truncate(question.text)}
        </p>
      </div>

      {question.questionDisciplines?.length ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {question.questionDisciplines.map(qd => (
            <span
              key={qd.discipline.name}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700"
            >
              {qd.discipline.name}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
        {question.educationLevel && (
          <div className="flex items-center gap-1">
            <GraduationCap size={14} />
            <span>{question.educationLevel}</span>
          </div>
        )}
        {question.difficulty && (
          <div className="flex items-center gap-1">
            <Target size={14} />
            <span>{question.difficulty}</span>
          </div>
        )}
        {question.examReference && (
          <div className="flex items-center gap-1">
            <BookOpen size={14} />
            <span>{question.examReference}</span>
          </div>
        )}
      </div>

      {question.questionType === 'OBJ' && question.alternatives?.length ? (
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium text-slate-700">Alternativas:</h4>
          {question.alternatives.slice(0, 3).map((alt, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {alt.correct ? (
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              ) : (
                <Circle size={16} className="text-slate-400 flex-shrink-0" />
              )}
              <span
                className={`truncate ${
                  alt.correct ? 'text-green-700 font-medium' : 'text-slate-600'
                }`}
              >
                {alt.content}
              </span>
            </div>
          ))}
          {question.alternatives.length > 3 && (
            <p className="text-xs text-slate-500 mt-2">
              +{question.alternatives.length - 3} alternativas
            </p>
          )}
        </div>
      ) : null}

      {question.questionType === 'SUB' &&
      question.useModelAnswers &&
      question.modelAnswers?.length ? (
        <div className="space-y-2 mb-4">
          <h4 className="text-sm font-medium text-slate-700">Respostas Modelo:</h4>
          {question.modelAnswers.slice(0, 2).map(ans => (
            <div key={ans.id} className="text-sm">
              <span className="font-medium text-slate-700">{ans.type}:</span>
              <p className="text-slate-600 mt-1 truncate">
                {truncate(ans.content, 100)}
              </p>
            </div>
          ))}
          {question.modelAnswers.length > 2 && (
            <p className="text-xs text-slate-500 mt-2">
              +{question.modelAnswers.length - 2} respostas
            </p>
          )}
        </div>
      ) : null}

      {question.createdAt && (
        <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
          Criada em {new Date(question.createdAt).toLocaleDateString('pt-BR')}
        </div>
      )}
    </div>
  )
}
