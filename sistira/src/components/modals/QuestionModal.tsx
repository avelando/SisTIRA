import React, { useEffect, useState, KeyboardEvent } from 'react';
import styles from '@/styles/modals/UnifiedModalStyles.module.css';
import BaseModal from './BaseModal';
import { QuestionModalProps } from '@/interfaces/QuestionProps';
import { ModelAnswerType } from '@/interfaces/ExamsProps';

type ModelAnswerState = {
  id?: string;
  content: string;
};

export default function QuestionModal({
  visible,
  onClose,
  onSubmit,
  mode,
  question
}: QuestionModalProps) {
  const [type, setType] = useState<'objective' | 'subjective'>('objective');
  const [text, setText] = useState('');
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [discInput, setDiscInput] = useState('');
  const [alternatives, setAlternatives] = useState<{ content: string; correct: boolean }[]>([
    { content: '', correct: false },
  ]);
  const [useModelAnswers, setUseModelAnswers] = useState(false);
  const [modelAnswers, setModelAnswers] = useState<Record<ModelAnswerType, ModelAnswerState>>({
    WRONG:  { content: '', id: undefined },
    MEDIAN: { content: '', id: undefined },
    CORRECT:{ content: '', id: undefined },
  });

  useEffect(() => {
    if (!visible) return;

    if (mode === 'edit' && question) {
      setType(question.questionType === 'OBJ' ? 'objective' : 'subjective');
      setText(question.text);
      setDisciplines(question.questionDisciplines.map(d => d.discipline.name));
      setAlternatives(
        question.alternatives?.length
          ? question.alternatives.map(a => ({ content: a.content, correct: a.correct }))
          : [{ content: '', correct: false }]
      );
      setUseModelAnswers(!!question.useModelAnswers);

      const ma: Record<ModelAnswerType, ModelAnswerState> = {
        WRONG:  { content: '', id: undefined },
        MEDIAN: { content: '', id: undefined },
        CORRECT:{ content: '', id: undefined },
      };
      question.modelAnswers?.forEach(m => {
        ma[m.type] = { content: m.content, id: m.id };
      });
      setModelAnswers(ma);
    } else {
      setType('objective');
      setText('');
      setDisciplines([]);
      setDiscInput('');
      setAlternatives([{ content: '', correct: false }]);
      setUseModelAnswers(false);
      setModelAnswers({
        WRONG:  { content: '', id: undefined },
        MEDIAN: { content: '', id: undefined },
        CORRECT:{ content: '', id: undefined },
      });
    }
  }, [visible, mode, question]);

  if (!visible) return null;

  const handleDiscKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === ';' || e.key === 'Enter') && discInput.trim()) {
      const value = discInput.trim().replace(/;$/, '');
      if (!disciplines.includes(value)) setDisciplines(prev => [...prev, value]);
      setDiscInput('');
      e.preventDefault();
    }
  };

  const removeDisc = (idx: number) =>
    setDisciplines(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'objective' && alternatives.length === 0) {
      alert('Uma questão objetiva precisa ter ao menos uma alternativa.');
      return;
    }
    if (type === 'subjective' && useModelAnswers) {
      if (
        !modelAnswers.WRONG.content ||
        !modelAnswers.MEDIAN.content ||
        !modelAnswers.CORRECT.content
      ) {
        alert('Preencha as três respostas-modelo para questões subjetivas.');
        return;
      }
    }

    const payload: any = {
      ...(question?.id && { id: question.id }),
      text,
      questionType: type === 'objective' ? 'OBJ' : 'SUB',
      disciplines,
      useModelAnswers,
      alternatives:
        type === 'objective'
          ? alternatives.map(a => ({ content: a.content, correct: a.correct }))
          : undefined,
      modelAnswers:
        type === 'subjective' && useModelAnswers
          ? (Object.entries(modelAnswers) as [ModelAnswerType, ModelAnswerState][])
              .map(([type, { id, content }]) => ({
                ...(id && { id }), 
                type,
                content,
              }))
          : undefined,
    };

    onSubmit(payload);
  };

  return (
    <BaseModal
      visible={visible}
      title={mode === 'create' ? 'Adicionar questão' : 'Editar questão'}
      onClose={onClose}
      actions={
        <button
          type="submit"
          form="question-form"
          disabled={type === 'objective' && alternatives.length === 0}
          className={styles.button}
        >
          Salvar
        </button>
      }
    >
      <form id="question-form" onSubmit={handleSubmit} className={styles.form}>
        <label>
          <select value={type} onChange={e => setType(e.target.value as any)}>
            <option value="objective">Objetiva</option>
            <option value="subjective">Subjetiva</option>
          </select>
        </label>

        <textarea
          placeholder="Enunciado"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />

        <label>Disciplinas (digite e pressione “;” ou Enter)</label>
        <div className={styles.chipsContainer}>
          {disciplines.map((disc, i) => (
            <span key={i} className={styles.chip}>
              {disc}
              <button type="button" onClick={() => removeDisc(i)}>×</button>
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Ex: Matemática; História"
          value={discInput}
          onChange={e => setDiscInput(e.target.value)}
          onKeyDown={handleDiscKey}
        />

        {type === 'objective' && (
          <>
            {alternatives.map((alt, idx) => (
              <div key={idx} className={styles.altRow}>
                <input
                  type="radio"
                  name="correctAlt"
                  checked={alt.correct}
                  onChange={() =>
                    setAlternatives(alternatives.map((a, i) => ({
                      ...a,
                      correct: i === idx
                    })))
                  }
                />
                <input
                  type="text"
                  placeholder={`Alternativa ${idx + 1}`}
                  value={alt.content}
                  onChange={e => {
                    const copy = [...alternatives];
                    copy[idx].content = e.target.value;
                    setAlternatives(copy);
                  }}
                  required
                />
                {alternatives.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setAlternatives(alternatives.filter((_, i) => i !== idx))}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className={styles.addAltBtn}
              onClick={() => setAlternatives([...alternatives, { content: '', correct: false }])}
            >
              + Adicionar alternativa
            </button>
          </>
        )}

        {type === 'subjective' && (
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={useModelAnswers}
              onChange={() => setUseModelAnswers(prev => !prev)}
            />
            Usar respostas‐modelo na correção por IA
          </label>
        )}

        {type === 'subjective' && useModelAnswers && (
          <div className={styles.modelAnswersSection}>
            <label>Resposta totalmente ERRADA</label>
            <input
              type="text"
              value={modelAnswers.WRONG.content}
              onChange={e =>
                setModelAnswers(ma => ({ ...ma, WRONG: { ...ma.WRONG, content: e.target.value } }))
              }
              required
            />

            <label>Resposta MEIA-CERTA</label>
            <input
              type="text"
              value={modelAnswers.MEDIAN.content}
              onChange={e =>
                setModelAnswers(ma => ({ ...ma, MEDIAN: { ...ma.MEDIAN, content: e.target.value } }))
              }
              required
            />

            <label>Resposta totalmente CERTA</label>
            <input
              type="text"
              value={modelAnswers.CORRECT.content}
              onChange={e =>
                setModelAnswers(ma => ({ ...ma, CORRECT: { ...ma.CORRECT, content: e.target.value } }))
              }
              required
            />
          </div>
        )}
      </form>
    </BaseModal>
  );
}
