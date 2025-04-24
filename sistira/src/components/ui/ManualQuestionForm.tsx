'use client';

import { useState, KeyboardEvent } from 'react';
import { ManualQuestionFormProps } from '@/interfaces/QuestionProps';
import styles from '@/styles/ui/ManualQuestionForm.module.css';

export default function ManualQuestionForm({ onCancel, onSubmit }: ManualQuestionFormProps) {
  const [text, setText] = useState('');
  const [type, setType] = useState<'objetiva' | 'subjetiva'>('subjetiva');
  const [alternatives, setAlternatives] = useState([{ content: '', correct: false }]);
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [discInput, setDiscInput] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return alert('Digite o enunciado da questão.');

    const payload = {
      text,
      type,
      disciplines,
      alternatives: type === 'objetiva' ? alternatives : undefined,
    };    

    onSubmit(payload);
  };

  const handleAlternativeChange = (index: number, content: string) => {
    const newAlternatives = [...alternatives];
    newAlternatives[index].content = content;
    setAlternatives(newAlternatives);
  };

  const handleSetCorrect = (index: number) => {
    const newAlternatives = alternatives.map((alt, i) => ({
      ...alt,
      correct: i === index,
    }));
    setAlternatives(newAlternatives);
  };

  const handleAddAlternative = () => {
    setAlternatives([...alternatives, { content: '', correct: false }]);
  };

  const handleRemoveAlternative = (index: number) => {
    const newAlternatives = [...alternatives];
    newAlternatives.splice(index, 1);
    setAlternatives(newAlternatives);
  };

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

  return (
    <div className={styles.card}>
      <textarea
        className={styles.textarea}
        placeholder="Enunciado da questão"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <select
        className={styles.select}
        value={type}
        onChange={(e) => setType(e.target.value as 'objetiva' | 'subjetiva')}
      >
        <option value="subjetiva">Subjetiva</option>
        <option value="objetiva">Objetiva</option>
      </select>

      {type === 'objetiva' && (
        <div className={styles.alternativesContainer}>
          <label className={styles.label}>Alternativas</label>
          {alternatives.map((alt, index) => (
            <div key={index} className={styles.alternativeRow}>
              <input
                type="text"
                value={alt.content}
                placeholder={`Alternativa ${String.fromCharCode(65 + index)}`}
                onChange={(e) => handleAlternativeChange(index, e.target.value)}
                className={styles.input}
              />
              <input
                type="radio"
                name="correct"
                checked={alt.correct}
                onChange={() => handleSetCorrect(index)}
              />
              <button type="button" onClick={() => handleRemoveAlternative(index)} className={styles.removeBtn}>
                ✕
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddAlternative} className={styles.addBtn}>
            + Adicionar alternativa
          </button>
        </div>
      )}

      <div className={styles.disciplines}>
        <label className={styles.label}>
          Disciplinas (digite e pressione “;” ou Enter)
        </label>
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
          className={styles.input}
          placeholder="Ex: Matemática; História"
          value={discInput}
          onChange={e => setDiscInput(e.target.value)}
          onKeyDown={handleDiscKey}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.saveBtn} onClick={handleSubmit}>Salvar</button>
        <button className={styles.cancelBtn} onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
}
