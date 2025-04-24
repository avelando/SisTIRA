'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createExam } from '@/api/exams';

export default function NewExamPage() {
  const router = useRouter();
  const hasCreated = useRef(false);

  useEffect(() => {
    if (hasCreated.current) return;

    const initExam = async () => {
      try {
        hasCreated.current = true;
        const exam = await createExam({
          title: 'Prova sem título',
          description: '',
        });
        router.replace(`/exams/${exam.id}`);
      } catch (err) {
        console.error('Erro ao criar prova:', err);
      }
    };

    initExam();
  }, [router]);

  return <p>Criando prova...</p>;
}
