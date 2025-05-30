'use client';

import React, { useEffect, useState } from 'react';
import {
  getQuestionBanks,
  getQuestionBank,
  deleteQuestionBank,
} from '@/api/questionsBank';
import QuestionBankModal from '@/components/modals/QuestionBankModal';
import { FaEdit, FaFilter, FaStar, FaTrash } from 'react-icons/fa';
import styles from '@/styles/QuestionsBank.module.css';
import { QuestionBankProps } from '@/interfaces/QuestionBankProps';

export default function QuestionBank() {
  const [banks, setBanks] = useState<QuestionBankProps[]>([]);
  const [selected, setSelected] = useState<QuestionBankProps | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const load = async () => {
    const data = await getQuestionBanks();
    setBanks(data);
  };

  useEffect(() => {
    load();
  }, []);

  const openModal = async (mode: 'create' | 'edit' | 'view', bankId?: string) => {
    if (mode === 'create') {
      setSelected(null);
      setModalMode('create');
      setModalVisible(true);
      return;
    }

    if (!bankId) return;
    const fullBank = await getQuestionBank(bankId);
    setSelected(fullBank);
    setModalMode(mode);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este banco?')) return;
    await deleteQuestionBank(id);
    setBanks(prev => prev.filter(b => b.id !== id));
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setSelected(null);
  };

  const handleModalUpdated = () => {
    handleModalClose();
    load();
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.filterIconContainer}><FaStar/></div>
        {/* <div className={styles.filterIconContainer}><FaFilter /></div> */}
        <div className={styles.addIconContainer} onClick={() => openModal('create')}>
          + Adicionar banco de questões
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {['ID', 'TÍTULO', 'DISCIPLINA', 'DATA', 'QUESTÕES', 'AÇÕES'].map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {banks.map((bank, i) => (
            <tr key={bank.id} onClick={() => openModal('view', bank.id)} className={styles.clickableRow}>
              <td>{i + 1}</td>
              <td>{bank.name}</td>
              <td>
                <div className={styles.chipsContainer}>
                  {bank.questionBankDisciplines
                    ?.filter(d => d.isPredominant)
                    .map(d => (
                      <span key={d.discipline.name} className={styles.chip}>
                        {d.discipline.name}
                      </span>
                    ))}
                </div>
              </td>
              <td>
                {new Date(bank.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td>{bank.questions?.length ?? 0}</td>
              <td className={styles.actions}>
                <button
                  onClick={(e) => { e.stopPropagation(); openModal('edit', bank.id); }}
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(bank.id);
                  }}
                  title="Deletar"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalVisible && (
        <QuestionBankModal
          visible={modalVisible}
          onClose={handleModalClose}
          onUpdated={handleModalUpdated}
          mode={modalMode}
          bank={selected || undefined}
        />
      )}
    </div>
  );
}
