'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getResponseResult } from '@/api/exams';
import type { ExamResponseResult } from '@/interfaces/ExamsProps';
import styles from '@/styles/FeedbackPage.module.css';

export default function FeedbackPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params.responseId;
  const responseId = Array.isArray(rawId) ? rawId[0] : rawId;

  const [result, setResult] = useState<ExamResponseResult | null>(null);

  useEffect(() => {
    if (!responseId) {
      router.replace('/');
      return;
    }
    getResponseResult(responseId)
      .then(setResult)
      .catch((err) => {
        console.error(err);
        router.replace('/');
      });
  }, [responseId, router]);

  if (!result) {
    return <p className={styles.emptyState}>Carregando feedback…</p>;
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Seu Feedback</h1>
      {result.answers.map((ans, i) => (
        <div key={ans.id} className={styles.answerCard}>
          <p className={styles.questionLabel}>Questão {i + 1}</p>
          <p className={styles.questionText}>{ans.question.text}</p>
          <p className={styles.responseText}>
            <strong>Sua resposta:</strong>{' '}
            {ans.question.questionType === 'OBJ'
              ? ans.alternative?.content
              : ans.subjectiveText}
          </p>
          <p className={styles.scoreText}>
            <strong>Nota:</strong> {ans.score?.toFixed(1) ?? '–'}
          </p>
          <p className={styles.feedbackText}>
            <strong>Feedback:</strong> {ans.feedback ?? '–'}
          </p>
        </div>
      ))}
    </section>
  );
}
