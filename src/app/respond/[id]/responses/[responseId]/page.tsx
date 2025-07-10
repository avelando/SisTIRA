'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getResponseResult } from '@/api/exams';
import type { ExamResponseResult } from '@/interfaces/ExamsProps';

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

  if (!result) return <p>Carregando feedback…</p>;

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Seu Feedback</h1>
      {result.answers.map((ans, i) => (
        <div key={ans.id} className="p-4 bg-white rounded shadow">
          <p className="font-medium mb-1">Questão {i + 1}</p>
          <p className="italic mb-2">{ans.question.text}</p>
          <p className="mb-1">
            <strong>Sua resposta:</strong>{' '}
            {ans.question.questionType === 'OBJ'
              ? ans.alternative?.content
              : ans.subjectiveText}
          </p>
          <p className="mb-1">
            <strong>Nota:</strong> {ans.score?.toFixed(1) ?? '–'}
          </p>
          <p>
            <strong>Feedback:</strong> {ans.feedback ?? '–'}
          </p>
        </div>
      ))}
    </section>
  );
}
