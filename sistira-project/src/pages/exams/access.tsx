import React, { useState } from 'react';
import axios from 'axios';
import styles from '@/styles/ExamModal.module.css';
import { useRouter } from 'next/router';

interface Alternative {
  id: string;
  content: string;
}

interface Question {
  id: string;
  text: string;
  questionType: 'OBJ' | 'SUB';
  alternatives?: Alternative[];
}

interface ExamData {
  id: string;
  title: string;
  description?: string;
  allQuestions: Question[];
}

export default function AccessExamPage() {
  const [accessCode, setAccessCode] = useState('');
  const [exam, setExam] = useState<ExamData | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleAccess = async () => {
    setError('');
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/exams/access/${accessCode}`);
      setExam(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Código inválido ou prova não encontrada.');
    }
  };

  if (!exam) {
    return (
      <div style={{
        height: '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <h2>Digite o código da prova:</h2>
        <input
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          placeholder="Ex: a1B2c3"
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />
        <button onClick={handleAccess} style={{
          background: '#0070f3',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          cursor: 'pointer'
        }}>
          Acessar Prova
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', padding: '2rem', minHeight: '100vh' }}>
      <div className={styles.card}>
        <h2>{exam.title}</h2>
        <p>{exam.description}</p>
      </div>

      {exam.allQuestions.map((q, index) => (
        <div key={q.id} className={styles.card}>
          <p className={styles.questionText}>
            <strong>{index + 1}.</strong> {q.text}
          </p>
          {q.questionType === 'OBJ' && q.alternatives?.length ? (
            <ul className={styles.alternativesList}>
              {q.alternatives.map((alt) => (
                <li key={alt.id}>
                  <label>
                    <input type="radio" name={`q-${q.id}`} disabled /> {alt.content}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <textarea
              placeholder="Resposta..."
              className={styles.subAnswer}
              disabled
              rows={3}
            />
          )}
        </div>
      ))}
    </div>
  );
}
