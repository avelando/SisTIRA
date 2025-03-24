import React, { useEffect, useState } from 'react';
import styles from '@/styles/EditQuestionBankModal.module.css';
import { updateQuestionBank, addQuestionsToBank, removeQuestionsFromBank } from '@/pages/api/questionsBank';
import { EditQuestionBankModalProps } from '@/interfaces/QuestionBankProps';
import { getQuestions } from '@/pages/api/questions';

export default function EditQuestionBankModal({ visible, bank, onClose, onUpdated }: EditQuestionBankModalProps) {
  const [name, setName] = useState(bank.name);
  const [description, setDescription] = useState(bank.description);
  const [allQuestions, setAllQuestions] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(bank.questions?.map(q => q.questionId) ?? []);
  const uniqueQuestions = Array.from(new Map(allQuestions.map(q => [q.id, q])).values());

  useEffect(() => {
    if (visible) {
      setName(bank.name);
      setDescription(bank.description);
      setSelectedIds(bank.questions?.map(q => q.questionId) ?? []);
      getQuestions().then(setAllQuestions);
    }
  }, [visible, bank]);

  const toggleQuestion = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateQuestionBank(bank.id, { name, description });
    onUpdated();
  };

  const handleAddQuestions = async () => {
    const initialIds = bank.questions?.map(q => q.questionId) ?? [];
    const addedIds = selectedIds.filter(id => !initialIds.includes(id));
    const removedIds = initialIds.filter(id => !selectedIds.includes(id));
  
    if (addedIds.length) {
      await addQuestionsToBank(bank.id, addedIds);
    }
    if (removedIds.length) {
      await removeQuestionsFromBank(bank.id, removedIds);
    }
  
    onUpdated();
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <h2>Editar Banco</h2>
          <button onClick={onClose}>×</button>
        </header>

        <form className={styles.body} onSubmit={handleSaveInfo}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Título" required />
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Descrição" />

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Salvar</button>
          </div>

          <div className={styles.questionSection}>
            <h3>Questões do Banco</h3>
            <ul className={styles.questionList}>
              {uniqueQuestions.map(q => (
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
            <button type="button" className={styles.addQuestionsBtn} onClick={handleAddQuestions}>
              Salvar banco
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
