'use client';
import React, { useEffect, useState } from 'react';
import BaseModal from './BaseModal';
import type { ExistingQuestionsModalProps } from '@/interfaces/QuestionProps';
import type { QuestionBankProps }       from '@/interfaces/QuestionBankProps';
import {
  addBanksToExam,
  removeBanksFromExam,
  addQuestionsToExam,
  removeQuestionsFromExam,
  getExam,
} from '@/api/exams';
import api from '@/lib/axios';
import styles from '@/styles/modals/ExistingQuestionsModal.module.css';

export default function ExistingQuestionsModal({
  visible,
  examId,
  currentBankIds = [],
  currentQuestionIds = [],
  onClose,
  onAdded,
}: ExistingQuestionsModalProps) {
  const [banks, setBanks]                       = useState<QuestionBankProps[]>([]);
  const [selectedBankIds, setSelectedBankIds]   = useState<Set<string>>(new Set());
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [expandedBanks, setExpandedBanks]       = useState<Set<string>>(new Set());
  const [loading, setLoading]                   = useState(false);

  useEffect(() => {
    if (!visible) return;
    (async () => {
      const { data } = await api.get<QuestionBankProps[]>('/question-banks', { withCredentials: true });
      setBanks(data);

      const bankSet = new Set(currentBankIds);
      setSelectedBankIds(bankSet);

      const questionSet = new Set(currentQuestionIds);
      data.forEach(bank => {
        if (bankSet.has(bank.id)) {
          bank.questions?.forEach(q => questionSet.add(q.questionId));
        }
      });
      setSelectedQuestionIds(questionSet);

      setExpandedBanks(new Set());
    })().catch(console.error);
  }, [visible, currentBankIds, currentQuestionIds]);

  const toggleBank = (bankId: string) => {
    const bank = banks.find(b => b.id === bankId);
    if (!bank) return;

    const nextBanks = new Set(selectedBankIds);
    const nextQs    = new Set(selectedQuestionIds);

    if (nextBanks.has(bankId)) {
      nextBanks.delete(bankId);
      bank.questions?.forEach(q => nextQs.delete(q.questionId));
    } else {
      nextBanks.add(bankId);
      bank.questions?.forEach(q => nextQs.add(q.questionId));
    }

    setSelectedBankIds(nextBanks);
    setSelectedQuestionIds(nextQs);
  };

  const toggleQuestion = (questionId: string, bankId: string) => {
    setSelectedQuestionIds(prevQs => {
      const nextQs = new Set(prevQs);

      if (nextQs.has(questionId)) {
        nextQs.delete(questionId);
        setSelectedBankIds(prevBanks => {
          const nextBanks = new Set(prevBanks);
          nextBanks.delete(bankId);
          return nextBanks;
        });
      } else {
        nextQs.add(questionId);

        const bank = banks.find(b => b.id === bankId);
        if (bank) {
          const allSelected = bank.questions?.every(q =>
            nextQs.has(q.questionId)
          );
          if (allSelected) {
            setSelectedBankIds(prevBanks => {
              const nextBanks = new Set(prevBanks);
              nextBanks.add(bankId);
              return nextBanks;
            });
          }
        }
      }

      return nextQs;
    });
  };

  const toggleExpandBank = (bankId: string) => {
    const next = new Set(expandedBanks);
    next.has(bankId) ? next.delete(bankId) : next.add(bankId);
    setExpandedBanks(next);
  };

  const hasChanges = () => {
    const initBanks = new Set(currentBankIds);
    if (initBanks.size !== selectedBankIds.size ||
        Array.from(initBanks).some(b => !selectedBankIds.has(b))) {
      return true;
    }
    let initQs = [...currentQuestionIds];
    banks.forEach(bank => {
      if (initBanks.has(bank.id)) {
        bank.questions?.forEach(q => initQs.push(q.questionId));
      }
    });
    const uniqInitQs = Array.from(new Set(initQs));
    if (uniqInitQs.length !== selectedQuestionIds.size ||
        uniqInitQs.some(q => !selectedQuestionIds.has(q))) {
      return true;
    }
    return false;
  };

  const handleSave = async () => {
    if (!hasChanges()) return;
    setLoading(true);
    try {
      const initBanks = new Set(currentBankIds);
      const toAddBanks = Array.from(selectedBankIds).filter(id => !initBanks.has(id));
      const toRemBanks = currentBankIds.filter(id => !selectedBankIds.has(id));
      if (toAddBanks.length) await addBanksToExam(examId, toAddBanks);
      if (toRemBanks.length) await removeBanksFromExam(examId, toRemBanks);

      let initQs = [...currentQuestionIds];
      banks.forEach(bank => {
        if (initBanks.has(bank.id)) {
          bank.questions?.forEach(q => initQs.push(q.questionId));
        }
      });
      const uniqInitQs = Array.from(new Set(initQs));
      const toAddQs = Array.from(selectedQuestionIds).filter(q => !uniqInitQs.includes(q));
      const toRemQs = uniqInitQs.filter(q => !selectedQuestionIds.has(q));
      if (toAddQs.length) await addQuestionsToExam(examId, toAddQs);
      if (toRemQs.length) await removeQuestionsFromExam(examId, toRemQs);

      const updated = await getExam(examId);
      onAdded(updated);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;
  return (
    <BaseModal
      visible
      title="Associar Bancos & Questões"
      onClose={onClose}
      actions={
        <button onClick={handleSave} disabled={loading || !hasChanges()}>
          {loading ? 'Salvando…' : 'Salvar'}
        </button>
      }
    >
      <div className={styles.list}>
        {banks.map(bank => (
          <div key={bank.id} className={styles.bank}>
            <div className={styles.bankHeader}>
              <input
                type="checkbox"
                checked={selectedBankIds.has(bank.id)}
                onChange={() => toggleBank(bank.id)}
              />
              <strong>{bank.name}</strong>
              <button
                className={styles.expandBtn}
                onClick={() => toggleExpandBank(bank.id)}
              >
                {expandedBanks.has(bank.id) ? '▾' : '▸'}
              </button>
            </div>
            {expandedBanks.has(bank.id) && (
              <ul className={styles.questions}>
                {bank.questions?.map(q => (
                  <li key={q.questionId} className={styles.questionItem}>
                    <input
                      type="checkbox"
                      checked={selectedQuestionIds.has(q.questionId)}
                      onChange={() => toggleQuestion(q.questionId, bank.id)}
                    />
                    {q.question.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </BaseModal>
  );
}
