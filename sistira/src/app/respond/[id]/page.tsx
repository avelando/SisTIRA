'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  checkExamAccess,
  getExamForResponseAuth,
  submitExamResponse,
} from '@/api/exams';
import { QuestionUI } from '@/interfaces/QuestionProps';
import styles from '@/styles/ExamRespond.module.css';

export default function RespondPage() {
  const { id: examId } = useParams() as { id?: string };
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [questions, setQuestions] = useState<QuestionUI[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!examId) {
      // sem ID, volta pro dashboard
      router.replace('/dashboard');
      return;
    }
    (async () => {
      try {
        const { hasAccess } = await checkExamAccess(examId);
        if (!hasAccess) {
          // sem acesso, manda pra tela de código
          router.replace(`/respond/${examId}/enter-code`);
          return;
        }
        const data = await getExamForResponseAuth(examId);
        setTitle(data.title);
        setDescription(data.description ?? '');
        setAccessCode(data.accessCode ?? '');
        setQuestions(
          data.questions.map((q) => ({
            ...q,
            selectedOption: undefined,
            answerText: '',
            wrong:
              q.modelAnswers?.find((m) => m.type === 'WRONG')?.content ?? '',
            median:
              q.modelAnswers?.find((m) => m.type === 'MEDIAN')?.content ?? '',
            correct:
              q.modelAnswers?.find((m) => m.type === 'CORRECT')?.content ?? '',
          }))
        );
        setLoading(false);
      } catch {
        // erro geral (token expirou?), leva pra login
        router.push('auth/login');
      }
    })();
  }, [examId, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const answers = questions.map((q) =>
      q.questionType === 'OBJ'
        ? { questionId: q.id, alternativeId: q.selectedOption! }
        : { questionId: q.id, textResponse: q.answerText }
    );
    try {
      await submitExamResponse({ examId: examId!, accessCode, answers });
      router.push(`/exams/${examId}/results`);
    } catch (err: any) {
      if (err.response?.status === 403) {
        router.replace(`/respond/${examId}/enter-code`);
      } else {
        setError('Falha ao enviar respostas.');
      }
    }
  }

  if (loading) return <p>Carregando prova…</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
      {questions.length === 0 && <p>Não há perguntas nesta prova.</p>}

      {questions.map((q) => (
        <div key={q.id} className={styles.questionBlock}>
          <h3>{q.text}</h3>
          {q.questionType === 'OBJ' ? (
            q.alternatives?.map((alt) => (
              <label key={alt.id} className={styles.optionLabel}>
                <input
                  type="radio"
                  name={q.id}
                  checked={q.selectedOption === alt.id}
                  onChange={() =>
                    setQuestions((prev) =>
                      prev.map((x) =>
                        x.id === q.id ? { ...x, selectedOption: alt.id } : x
                      )
                    )
                  }
                  required
                />
                {alt.content}
              </label>
            ))
          ) : (
            <textarea
              className={styles.textarea}
              placeholder="Digite sua resposta"
              value={q.answerText}
              onChange={(e) =>
                setQuestions((prev) =>
                  prev.map((x) =>
                    x.id === q.id ? { ...x, answerText: e.target.value } : x
                  )
                )
              }
              required
            />
          )}
        </div>
      ))}

      <button type="submit" className={styles.submitBtn}>
        Enviar respostas
      </button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
