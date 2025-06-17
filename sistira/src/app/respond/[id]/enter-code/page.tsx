'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { grantExamAccess } from '@/api/exams';
import styles from '@/styles/EnterCode.module.css';

export default function EnterCodePage() {
  const router = useRouter();
  // Como este componente está em respond/[id]/enter-code,
  // podemos afirmar que `id` sempre será string:
  const { id: examId } = useParams() as { id: string };

  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Se por algum motivo `examId` não existir, volta pro dashboard:
  useEffect(() => {
    if (!examId) {
      router.replace('/dashboard');
    }
  }, [examId, router]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    try {
      // Aqui `examId` é definitivamente string, portanto:
      const resp = await grantExamAccess(examId, code.trim());
      router.push(`/respond/${resp.examId}`);
    } catch {
      setError('Código inválido');
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1>Prova Privada</h1>
        <p>Digite o código de acesso:</p>
        <input
          className={styles.input}
          placeholder="Código de acesso"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Continuar
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}
