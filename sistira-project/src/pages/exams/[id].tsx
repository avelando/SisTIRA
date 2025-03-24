import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import {
  getExam,
  updateExam,
  addQuestionsToExam,
  removeQuestionsFromExam,
  addBanksToExam,
  removeBanksFromExam,
} from '@/pages/api/exams';
import { getQuestionBanks } from '@/pages/api/questionsBank';
import { getQuestions } from '@/pages/api/questions';
import ExamItemsModal from '@/components/ExamItemsModal';
import styles from '@/styles/ExamModal.module.css';

export default function ExamEditPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };

  const [exam, setExam] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [basicSaved, setBasicSaved] = useState(false);

  const [banks, setBanks] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [showItemsModal, setShowItemsModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const data = await getExam(id);
      setExam(data);
      setTitle(data.title);
      setDescription(data.description);
      setBasicSaved(!!data.title);
      setBanks(await getQuestionBanks());
      setQuestions(await getQuestions());
    })();
  }, [id]);

  const handleSaveBasic = async () => {
    await updateExam(id, { title, description });
    const updated = await getExam(id);
    setExam(updated);
    setBasicSaved(true);
  };

  const openItemsModal = () => setShowItemsModal(true);
  const closeItemsModal = async () => {
    setShowItemsModal(false);
    setExam(await getExam(id));
  };

  return (
    <div className={styles.container}>

      {!basicSaved ? (
        <div className={styles.basicInfo}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição"
          />
          <button onClick={handleSaveBasic}>Salvar Informações</button>
        </div>
      ) : (
        <div className={styles.basicInfoDisplay}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      )}

      {/* Botão para abrir modal de adição de itens */}
      {basicSaved && (
        <button className={styles.addItemsBtn} onClick={openItemsModal}>
          + Adicionar Itens
        </button>
      )}

      {/* Aqui você pode adicionar outros controles de edição, se desejar */}

      {showItemsModal && (
        <ExamItemsModal
          examId={id}
          exam={exam}
          onClose={closeItemsModal}
        />
      )}
    </div>
  );
}

ExamEditPage.getLayout = (page: React.ReactElement) => (
  <Layout title="Editar Prova">{page}</Layout>
);
