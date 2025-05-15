'use client';

import { useState, useEffect, useRef, useTransition } from 'react';
import { useParams } from 'next/navigation';
import debounce from 'lodash/debounce';

import { getExam, updateExam } from '@/api/exams';
import { ExamUpdatePayload, FullExam } from '@/interfaces/ExamsProps';

import FloatingActions from '@/components/ui/FloatingActions';
import ExistingQuestionsModal from '@/components/modals/ExistingQuestionsModal';
import LoadingBar from '@/components/ui/LoadingBar';

import styles from '@/styles/ExamDetails.module.css';

type ModalType = 'existente';

export default function ExamDetailsPage() {
  const { id } = useParams();
  const examId = Array.isArray(id) ? id[0] : id ?? '';

  const [exam, setExam] = useState<FullExam | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPending, startTransition] = useTransition();
  const isFirstLoad = useRef(true);

  const [showExisting, setShowExisting] = useState(false);

  useEffect(() => {
    if (!examId) return;
    (async () => {
      const data = await getExam(examId);
      setExam(data);
      setTitle(data.title);
      setDescription(data.description ?? '');
      isFirstLoad.current = false;
    })();
  }, [examId]);

  const debouncedUpdate = useRef(
    debounce((payload: ExamUpdatePayload) => {
      if (!examId) return;
      startTransition(async () => {
        try {
          await updateExam(examId, payload);
          const fresh = await getExam(examId);
          setExam(fresh);
        } catch (e) {
          console.error(e);
        }
      });
    }, 500)
  ).current;

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!isFirstLoad.current && v !== exam?.title) {
      debouncedUpdate({ title: v, description });
    }
  };

  const handleDescriptionChange = (v: string) => {
    setDescription(v);
    if (!isFirstLoad.current && v !== exam?.description) {
      debouncedUpdate({ title, description: v });
    }
  };

  const handleOpen: (type: ModalType) => void = (type) => {
    if (type === 'existente') setShowExisting(true);
  };

  const handleAddedQuestions = (updated: FullExam) => {
    setExam(updated);
    setShowExisting(false);
  };

  if (!exam) return <p>Carregando prova...</p>;

  return (
    <>
      <LoadingBar loading={isPending} />

      <div className={styles.container}>
        <input
          className={styles.input}
          placeholder="Título da Prova"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />

        <textarea
          className={styles.textarea}
          placeholder="Descrição da Prova"
          value={description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
        />

        <div className={styles.questionList}>
          {exam.allQuestions.map((q) => (
            <div key={q.id} className={styles.question}>
              <strong>• {q.text}</strong>
              {q.questionType === 'OBJ' && q.alternatives && q.alternatives.length > 0 && (
                <ul className={styles.alternativesList}>
                  {q.alternatives.map((alt, i) => (
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
        
        <ExistingQuestionsModal
          visible={showExisting}
          examId={examId}
          currentBankIds={exam.examQuestionBanks.map(b => b.questionBank.id)}
          currentQuestionIds={exam.allQuestions.map(q => q.id)}
          onClose={() => setShowExisting(false)}
          onAdded={handleAddedQuestions}
        />
      </div>
    </>
  );
}
