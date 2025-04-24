'use client';

import { getExam, updateExam } from '@/api/exams';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';

import ManualQuestionForm from '@/components/ui/ManualQuestionForm';
import FloatingActions from '@/components/ui/FloatingActions';

import { createQuestion } from '@/api/questions';
import { addQuestionsToExam } from '@/api/exams';

import { ExamUpdatePayload } from '@/interfaces/ExamsProps';
import styles from '@/styles/ExamDetails.module.css';

export default function ExamDetailsPage() {
  const { id } = useParams();
  const [exam, setExam] = useState<any>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const isFirstLoad = useRef(true);
  const [showManualForm, setShowManualForm] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getExam(id as string);
      setExam(data);
      setTitle(data.title || '');
      setDescription(data.description || '');
      isFirstLoad.current = false;
    }
    load();
  }, [id]);

  const debouncedUpdateExam = debounce(
    async (examId: string, data: ExamUpdatePayload) => {
      await updateExam(examId, data);
    },
    500
  );

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isFirstLoad.current && newTitle !== exam?.title) {
      debouncedUpdateExam(id as string, { title: newTitle, description });
    }
  };

  const handleDescriptionChange = (newDesc: string) => {
    setDescription(newDesc);
    if (!isFirstLoad.current && newDesc !== exam?.description) {
      debouncedUpdateExam(id as string, { title, description: newDesc });
    }
  };

  const handleOpen = (type: string) => {
    if (type === 'manual') setShowManualForm(true);
  };

  const handleAddManualQuestion = async (data: {
    text: string;
    type: string;
    disciplines?: string[];
    alternatives?: { content: string; correct: boolean }[];
  }) => {
    try {
      const newQuestion = await createQuestion({
        text: data.text,
        questionType: data.type === 'objetiva' ? 'OBJ' : 'SUB',
        disciplines: data.disciplines ?? [],
        alternatives: data.type === 'objetiva' ? data.alternatives : undefined,
      });
  
      await addQuestionsToExam(id as string, [newQuestion.id]);
  
      const updated = await getExam(id as string);
      setExam(updated);
      setShowManualForm(false);
    } catch (err: any) {
      console.error('Erro ao adicionar questão manual:', err.message);
      alert('Erro ao adicionar questão: ' + err.message);
    }
  };  

  if (!exam) return <p>Carregando prova...</p>;

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder="Título da Prova"
      />

      <textarea
        className={styles.textarea}
        value={description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
        placeholder="Descrição da Prova"
      />

      {showManualForm && (
        <ManualQuestionForm
          onCancel={() => setShowManualForm(false)}
          onSubmit={handleAddManualQuestion}
        />
      )}

      <div className={styles.questionList}>
        {exam.allQuestions?.map((q: any) => (
          <div key={q.id} className={styles.question}>
            <strong>• {q.text}</strong>
            {q.questionType === 'OBJ' && q.alternatives?.length > 0 && (
              <ul className={styles.alternativesList}>
                {q.alternatives.map((alt: any, i: number) => (
                  <li key={i} className={styles.alternativeItem}>
                    {alt.correct ? <strong>✓</strong> : '○'} {alt.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <FloatingActions onOpen={handleOpen} />
    </div>
  );
}
