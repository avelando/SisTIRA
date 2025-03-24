import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createExam } from '@/pages/api/exams';

export default function NewExamPage() {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    createExam({ title: 'Nova prova', description: '' })
      .then(e => router.replace(`/exams/${e.id}`));
  }, [router.isReady]);  

  return null;
}
