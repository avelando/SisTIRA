import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { getExam, updateExam } from '@/pages/api/exams';
import ExamItemsModal from '@/components/ExamItemsModal';
import styles from '@/styles/ExamModal.module.css';
import Layout from '@/components/Layout';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { ExamData } from '@/interfaces/ExamsProps';

export default function ExamEditPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [exam, setExam] = useState<ExamData | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [basicSaved, setBasicSaved] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);
  const { data: session } = useSession();
  const [answers, setAnswers] = useState<{ [questionId: string]: { alternativeId?: string; textResponse?: string } }>({});

  const isOwner = useMemo(() => {
    return session?.user?.id === exam?.creatorId;
  }, [session?.user?.id, exam?.creatorId]);
  

  console.log('Sessão:', session);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getExam(id);
      setExam(data);
      setTitle(data.title);
      setDescription(data.description ?? '');
      setBasicSaved(true);
    })();
  }, [id]);

  const handleSaveBasic = async () => {
    if (!exam) return;
    await updateExam(id, { title, description });
    setExam(await getExam(id));
    setBasicSaved(true);
  };

  const handleAnswer = (questionId: string, alternativeId: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { alternativeId }
    }));
  };

  const handleTextAnswer = (questionId: string, text: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { textResponse: text }
    }));
  };

  const handleSubmitAnswers = async () => {
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, ans]) => ({
        questionId,
        ...ans
      }));

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/exams/${id}/respond`, {
        answers: formattedAnswers
      });

      alert('Respostas enviadas com sucesso!');
      router.push('/exams');
    } catch (err: any) {
      alert('Erro ao enviar respostas: ' + (err.response?.data?.message || err.message));
    }
  };

  const openItemsModal = () => setShowItemsModal(true);
  const closeItemsModal = async () => {
    setShowItemsModal(false);
    if (id) setExam(await getExam(id));
  };

  if (!exam) return <p className="text-center py-8">Carregando...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {isOwner && !basicSaved ? (
          <div className={styles.basicInfo}>
            <input
              className={styles.basicInput}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Título"
            />
            <textarea
              className={styles.basicInput}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrição"
              rows={4}
            />
            <button onClick={handleSaveBasic} className={styles.addItemsBtn}>
              Salvar
            </button>
          </div>
        ) : (
          <>
            <h2>{exam.title}</h2>
            <p>{exam.description}</p>
          </>
        )}
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
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={alt.id}
                      disabled={isOwner}
                      onChange={() => handleAnswer(q.id, alt.id)}
                    />{' '}
                    {alt.content}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <textarea
              placeholder="Resposta..."
              className={styles.subAnswer}
              rows={3}
              disabled={isOwner}
              onChange={(e) => handleTextAnswer(q.id, e.target.value)}
            />
          )}
        </div>
      ))}

      {isOwner && (
        <div className={styles.floatingButtons}>
          <button className={styles.floatingBtn} onClick={openItemsModal}>
            + Questões
          </button>
          <button className={styles.floatingBtn} onClick={openItemsModal}>
            + Bancos
          </button>
        </div>
      )}

      {!isOwner && (
        <div style={{ marginTop: '2rem' }}>
          <button onClick={handleSubmitAnswers} className={styles.addItemsBtn}>
            Enviar Respostas
          </button>
        </div>
      )}

      {showItemsModal && (
        <ExamItemsModal examId={id} exam={exam} onClose={closeItemsModal} />
      )}
    </div>
  );
}

ExamEditPage.getLayout = (page: React.ReactElement) => (
  <Layout title="Editar prova">{page}</Layout>
);
