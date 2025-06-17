'use client';

import React, { useEffect, useState } from 'react';
import BaseModal from './BaseModal';
import type {
  ExistingQuestionsModalProps,
  Question as QuestionUI
} from '@/interfaces/QuestionProps';
import type { QuestionBankProps } from '@/interfaces/QuestionBankProps';
import {
  addBanksToExam,
  removeBanksFromExam,
  addQuestionsToExam,
  removeQuestionsFromExam,
  getExam,
} from '@/api/exams';
import { getQuestions } from '@/api/questions';
import api from '@/lib/axios';
import styles from '@/styles/modals/ExistingQuestionsModal.module.css';

type BankQuestion = NonNullable<QuestionBankProps['questions']>[number];

export default function ExistingQuestionsModal({
  visible,
  examId,
  currentBankIds = [],
  currentQuestionIds = [],
  onClose,
  onAdded,
}: ExistingQuestionsModalProps) {
  const [banks, setBanks] = useState<QuestionBankProps[]>([]);
  const [looseQuestions, setLooseQuestions] = useState<QuestionUI[]>([]);
  const [selectedBankIds, setSelectedBankIds] = useState<Set<string>>(new Set());
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<Set<string>>(new Set());
  const [expandedBanks, setExpandedBanks] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    (async () => {
      const banksData = await api
        .get<QuestionBankProps[]>('/question-banks', { withCredentials: true })
        .then(res => res.data);
      setBanks(banksData);

      setSelectedBankIds(new Set(currentBankIds));

      const allQs = (await getQuestions()) as QuestionUI[];
      const bankQIds = new Set(
        banksData.flatMap(bank =>
          (bank.questions ?? []).map((q: BankQuestion) => q.questionId)
        )
      );
      setLooseQuestions(allQs.filter(q => !bankQIds.has(q.id)));

      const questionSet = new Set(currentQuestionIds);
      banksData.forEach(bank => {
        if (currentBankIds.includes(bank.id)) {
          (bank.questions ?? []).forEach((q: BankQuestion) =>
            questionSet.add(q.questionId)
          );
        }
      });
      setSelectedQuestionIds(questionSet);
      setExpandedBanks(new Set());
    })().catch(console.error);
  }, [visible, currentBankIds, currentQuestionIds]);

  const toggleBank = (bankId: string) => {
    setSelectedBankIds(prev => {
      const next = new Set(prev);
      const bank = banks.find(b => b.id === bankId);
      if (!bank) return next;

      if (next.has(bankId)) {
        next.delete(bankId);
        setSelectedQuestionIds(qs => {
          const newQs = new Set(qs);
          (bank.questions ?? []).forEach((q: BankQuestion) => newQs.delete(q.questionId));
          return newQs;
        });
      } else {
        next.add(bankId);
        setSelectedQuestionIds(qs => {
          const newQs = new Set(qs);
          (bank.questions ?? []).forEach((q: BankQuestion) => newQs.add(q.questionId));
          return newQs;
        });
      }

      return next;
    });
  };

  const toggleQuestion = (questionId: string, bankId?: string) => {
    setSelectedQuestionIds(prevQs => {
      const nextQs = new Set(prevQs);
      if (nextQs.has(questionId)) nextQs.delete(questionId);
      else nextQs.add(questionId);

      if (bankId) {
        setSelectedBankIds(prevBanks => {
          const nextBanks = new Set(prevBanks);
          const bank = banks.find(b => b.id === bankId);
          if (!bank) return nextBanks;

          const total = (bank.questions ?? []).length;
          const selectedCount = (bank.questions ?? []).filter(q =>
            nextQs.has(q.questionId)
          ).length;

          // se todas as questões do banco estiverem selecionadas, marque o banco,
          // se nenhuma estiver, desmarque; caso contrário, mantenha desmarcado
          if (selectedCount === total) {
            nextBanks.add(bankId);
          } else {
            nextBanks.delete(bankId);
          }

          return nextBanks;
        });
      }

      return nextQs;
    });
  };

  const toggleExpandBank = (bankId: string) => {
    setExpandedBanks(prev => {
      const next = new Set(prev);
      next.has(bankId) ? next.delete(bankId) : next.add(bankId);
      return next;
    });
  };

  const hasChanges = () =>
    currentBankIds.length !== selectedBankIds.size ||
    currentBankIds.some(id => !selectedBankIds.has(id)) ||
    currentQuestionIds.length !== selectedQuestionIds.size ||
    currentQuestionIds.some(id => !selectedQuestionIds.has(id));

  const handleSave = async () => {
    if (!hasChanges()) return;
    setLoading(true);
    try {
      const initBanks = new Set(currentBankIds);
      const toAddBanks = Array.from(selectedBankIds).filter(id => !initBanks.has(id));
      const toRemBanks = currentBankIds.filter(id => !selectedBankIds.has(id));
      if (toAddBanks.length) await addBanksToExam(examId, toAddBanks);
      if (toRemBanks.length) await removeBanksFromExam(examId, toRemBanks);

      const initQs = new Set(currentQuestionIds);
      const toAddQs = Array.from(selectedQuestionIds).filter(id => !initQs.has(id));
      const toRemQs = currentQuestionIds.filter(id => !selectedQuestionIds.has(id));
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
    <BaseModal visible title="Associar Bancos & Questões" onClose={onClose}>
      <div className={styles.content}>
        <div className={styles.bankList}>
          {banks.map(bank => (
            <div key={bank.id} className={styles.bankItem}>
              <div className={styles.bankHeader}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={selectedBankIds.has(bank.id)}
                    onChange={() => toggleBank(bank.id)}
                  />
                  <span className={styles.bankName}>{bank.name}</span>
                </label>
                <button
                  type="button"
                  className={styles.expandBtn}
                  onClick={() => toggleExpandBank(bank.id)}
                  aria-label={expandedBanks.has(bank.id) ? 'Recolher' : 'Expandir'}
                >
                  {expandedBanks.has(bank.id) ? '▾' : '▸'}
                </button>
              </div>
              {expandedBanks.has(bank.id) && (
                <ul className={styles.questionList}>
                  {(bank.questions ?? []).map(q => (
                    <li key={q.questionId} className={styles.questionItem}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={selectedQuestionIds.has(q.questionId)}
                          onChange={() => toggleQuestion(q.questionId, bank.id)}
                        />
                        <span className={styles.questionText}>{q.question.text}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {looseQuestions.length > 0 && (
          <div className={styles.looseGroup}>
            <h3 className={styles.looseTitle}>Questões Avulsas</h3>
            <ul className={styles.questionList}>
              {looseQuestions.map(q => (
                <li key={q.id} className={styles.questionItem}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedQuestionIds.has(q.id)}
                      onChange={() => toggleQuestion(q.id)}
                    />
                    <span className={styles.questionText}>{q.text}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.saveButton}
            onClick={handleSave}
            disabled={loading || !hasChanges()}
          >
            {loading ? 'Salvando…' : 'Salvar'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
