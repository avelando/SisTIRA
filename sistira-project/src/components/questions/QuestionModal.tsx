'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check } from 'lucide-react';
import { QuestionModalProps } from '@/interfaces/QuestionProps';
import { useDisciplines } from '@/hooks/useDisciplines';

export const QuestionModal: React.FC<QuestionModalProps> = ({
  visible,
  onClose,
  onSubmit,
  question,
  loading = false,
  mode,
}) => {
  const { disciplines } = useDisciplines();

  const [formData, setFormData] = useState({
    id: question?.id,
    text: '',
    questionType: question?.questionType ?? 'OBJ',
    educationLevel: '',
    difficulty: '',
    examReference: '',
    useModelAnswers: false,
    disciplines: [] as string[],
    alternatives: Array(4).fill({ content: '', correct: false }),
    modelAnswers: [] as { id?: string; type: string; content: string }[],
  });

  useEffect(() => {
    if (question) {
      setFormData({
        id: question.id,
        text: question.text,
        questionType: question.questionType,
        educationLevel: '',
        difficulty: '',
        examReference: '',
        useModelAnswers: question.useModelAnswers ?? false,
        disciplines: question.questionDisciplines?.map(qd => qd.discipline.id) || [],
        alternatives: question.alternatives ?? formData.alternatives,
        modelAnswers: question.modelAnswers ?? [],
      });
    } else {
      setFormData(f => ({
        ...f,
        id: undefined,
        text: '',
        questionType: 'OBJ',
        disciplines: [],
      }));
    }
  }, [question, visible]);

  const updateField = <K extends keyof typeof formData>(field: K, value: typeof formData[K]) =>
    setFormData(fd => ({ ...fd, [field]: value }));

  const toggleDiscipline = (id: string) => {
    const next = formData.disciplines.includes(id)
      ? formData.disciplines.filter(d => d !== id)
      : [...formData.disciplines, id];
    updateField('disciplines', next);
  };

  const updateAlt = (i: number, key: 'content' | 'correct', val: any) => {
    const alts = formData.alternatives.map((alt, idx) => {
      if (idx !== i) {
        return key === 'correct' && val ? { ...alt, correct: false } : alt;
      }
      return { ...alt, [key]: val };
    });
    updateField('alternatives', alts);
  };

  const addAlt = () =>
    updateField('alternatives', [...formData.alternatives, { content: '', correct: false }]);
  const removeAlt = (i: number) => {
    if (formData.alternatives.length > 2) {
      updateField(
        'alternatives',
        formData.alternatives.filter((_, idx) => idx !== i)
      );
    }
  };

  const updateModel = (i: number, key: 'type' | 'content', val: string) => {
    const mas = formData.modelAnswers.map((ma, idx) =>
      idx === i ? { ...ma, [key]: val } : ma
    );
    updateField('modelAnswers', mas);
  };
  const addModel = () =>
    updateField('modelAnswers', [...formData.modelAnswers, { type: '', content: '' }]);
  const removeModel = (i: number) =>
    updateField('modelAnswers', formData.modelAnswers.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      alert('Insira o texto da questão.');
      return;
    }
    if (
      formData.questionType === 'OBJ' &&
      !formData.alternatives.some(a => a.correct && a.content.trim())
    ) {
      alert('Marque uma alternativa correta.');
      return;
    }
    await onSubmit(formData);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {mode === 'edit' ? 'Editar Questão' : 'Nova Questão'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
              onChange={e => updateField('questionType', e.target.value as 'OBJ' | 'SUB')}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="OBJ">Objetiva</option>
              <option value="SUB">Subjetiva</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Disciplinas
            </label>
            <div className="flex flex-wrap gap-2">
              {disciplines.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleDiscipline(d.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
                    formData.disciplines.includes(d.id)
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>

          {formData.questionType === 'OBJ' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Alternativas *</span>
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
                      className={`w-6 h-6 flex items-center justify-center rounded-full border-2 transition-colors ${
                        alt.correct
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
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
                  onChange={e => updateField('useModelAnswers', e.target.checked)}
                  className="rounded border-slate-300 focus:ring-slate-900"
                />
                <label className="text-sm font-medium text-slate-700">Usar Respostas Modelo</label>
              </div>
              {formData.useModelAnswers && (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Respostas Modelo</span>
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
                      <div key={i} className="border border-slate-200 rounded-lg p-4">
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
                          onChange={e => updateModel(i, 'content', e.target.value)}
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

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
