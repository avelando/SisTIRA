import React, { useEffect, useState } from 'react';
import styles from '@/styles/EditQuestionBankModal.module.css';
import { createQuestionBank } from '@/pages/api/questionsBank';
import { getQuestions } from '@/pages/api/questions';

interface AddQuestionBankModalProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddQuestionBankModal({ visible, onClose, onCreated }: AddQuestionBankModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (visible) {
      setName('');
      setDescription('');
      setSelectedIds([]);
      getQuestions().then(setAllQuestions);
    }
  }, [visible]);

  const toggleQuestion = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuestionBank({ name, description, questions: selectedIds });
    onCreated();
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Criar Banco de Questões</h2>
          <button onClick={onClose}>×</button>
        </header>
        <form className={styles.body} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <div className={styles.questionSection}>
            <h3>Selecionar Questões</h3>
            <ul className={styles.questionList}>
              {allQuestions.map(q => (
                <li key={q.id} className={styles.questionItem}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(q.id)}
                    onChange={() => toggleQuestion(q.id)}
                  />
                  <span className={styles.questionText}>{q.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Criar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
