import React, { useEffect, useState, KeyboardEvent } from 'react';
import styles from '@/styles/modals/UnifiedModalStyles.module.css';
import BaseModal from './BaseModal';

import { QuestionModalProps } from '@/interfaces/QuestionProps';

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

  useEffect(() => {
    if (!visible) return;

    if (mode === 'edit' && question) {
      setType(question.questionType === 'OBJ' ? 'objective' : 'subjective');
      setText(question.text);
      setDisciplines(question.questionDisciplines.map(d => d.discipline.name));
      setAlternatives(question.alternatives ?? [{ content: '', correct: false }]);
    } else {
      setType('objective');
      setText('');
      setDisciplines([]);
      setDiscInput('');
      setAlternatives([{ content: '', correct: false }]);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'objective' && alternatives.length === 0) {
      alert('Uma questão objetiva precisa ter ao menos uma alternativa.');
      return;
    }

    const data = {
      ...(question?.id && { id: question.id }),
      text,
      questionType: type === 'objective' ? 'OBJ' : 'SUB',
      disciplines,
      alternatives: type === 'objective' ? alternatives : [],
    };

    onSubmit(data);
  };

  return (
    <BaseModal
      visible={visible}
      title={mode === 'create' ? 'Adicionar questão' : 'Editar questão'}
      onClose={onClose}
      actions={
        <>
          <button type="submit" form="question-form" disabled={type === 'objective' && alternatives.length === 0} className={styles.button}>
            Salvar
          </button>
        </>
      }
    >
      <form id="question-form" onSubmit={handleSubmit} className={styles.form}>
        <select value={type} onChange={e => setType(e.target.value as any)}>
          <option value="objective">Objetiva</option>
          <option value="subjective">Subjetiva</option>
        </select>

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
                  checked={alt.correct}
                  onChange={() =>
                    setAlternatives(alternatives.map((a, i) => ({ ...a, correct: i === idx })))
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
                  <button type="button" onClick={() => setAlternatives(alternatives.filter((_, i) => i !== idx))}>
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
      </form>
    </BaseModal>
  );
}
