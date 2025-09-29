'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { checkExamAccess, grantExamAccess } from '@/api/exam-responses';
import styles from '@/styles/EnterCodePage.module.css';

function EnterCodeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo') || '';

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(!!returnTo);

  useEffect(() => {
    if (!returnTo) {
      setLoading(false);
      return;
    }
    checkExamAccess(returnTo)
      .then(({ hasAccess }) => {
        if (hasAccess) {
          router.replace(`/respond/${returnTo}`);
        } else {
          setLoading(false);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  }, [returnTo, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const examId = returnTo || code.trim();
    const accessCode = code.trim();

    try {
      await grantExamAccess(examId, accessCode);
      router.push(
        `/respond/${examId}?accessCode=${encodeURIComponent(accessCode)}`
      );
    } catch {
      setError('Código inválido ou prova não encontrada.');
    }
  };

  if (loading) {
    return <p className="text-center p-6">Carregando…</p>;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Digite o código da prova</h2>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Código da prova"
          className={styles.input}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default function EnterCodePage() {
  return (
    <Suspense fallback={<p className="text-center p-6">Carregando…</p>}>
      <EnterCodeContent />
    </Suspense>
  );
}
