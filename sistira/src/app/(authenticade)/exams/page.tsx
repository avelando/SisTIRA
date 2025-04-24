'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getExams, deleteExam } from '@/api/exams';
import { FaEdit, FaFilter, FaTrash } from 'react-icons/fa';
import styles from '@/styles/QuestionsBank.module.css';

export default function Exams() {
  const router = useRouter();
  const [exams, setExams] = useState<any[]>([]);

  async function load() {
    setExams(await getExams());
  }

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar esta prova?')) return;
    await deleteExam(id);
    setExams(prev => prev.filter(x => x.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.filterIconContainer}><FaFilter/></div>
        <div className={styles.addIconContainer} onClick={() => router.push('/exams/new')}>
          + Adicionar prova
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>{['TÍTULO','DATA','BANCO DE QUESTÕES','AÇÕES'].map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {exams.map((exam, i) => (
            <tr key={exam.id} onClick={() => router.push(`/exams/${exam.id}`)}>
              <td>{exam.title}</td>
              <td>{new Date(exam.createdAt).toLocaleDateString()}</td>
              <td>{exam.questionBank?.name ?? '—'}</td>
              <td className={styles.actions}>
                <button onClick={e => { e.stopPropagation(); router.push(`/exams/${exam.id}`); }}><FaEdit/></button>
                <button onClick={e => { e.stopPropagation(); handleDelete(exam.id); }}><FaTrash/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
