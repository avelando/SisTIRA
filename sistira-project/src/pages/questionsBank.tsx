import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { getQuestionBanks, getQuestionBank, deleteQuestionBank } from '@/pages/api/questionsBank';
import ViewQuestionBankModal from '@/components/ViewQuestionBankModal';
import EditQuestionBankModal from '@/components/EditQuestionBankModal';
import { FaEdit, FaFilter, FaTrash } from 'react-icons/fa';
import styles from '@/styles/QuestionsBank.module.css';
import { BankProps, QuestionBankDiscipline } from '@/interfaces/QuestionBankProps';
import AddQuestionBankModal from '@/components/AddQuestionBankModal';

export default function QuestionBank() {
  const [banks, setBanks] = useState<BankProps[]>([]);
  const [selected, setSelected] = useState<BankProps | null>(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const load = async () => {
    const data = await getQuestionBanks();
    setBanks(data);
  };

  useEffect(() => { load(); }, []);

  const openBank = async (id: string) => {
    const bank = await getQuestionBank(id);
    setSelected(bank);
    setShowView(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza?')) return;
    await deleteQuestionBank(id);
    setBanks(prev => prev.filter(b => b.id !== id));
  };
  
  const handleCreated = () => {
    setShowAdd(false);
    load();
  };

  const openEdit = (bank: BankProps) => {
    setSelected(bank);
    setShowEdit(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.filterIconContainer}><FaFilter /></div>
        <div className={styles.addIconContainer} onClick={() => setShowAdd(true)}>
          + Adicionar banco de questões
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {['ID','TÍTULO','DISCIPLINA','DATA','QUESTÕES','AÇÕES'].map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {banks.map((bank, i) => (
            <tr key={bank.id} onClick={() => openBank(bank.id)}>
              <td>{i + 1}</td>
              <td>{bank.name}</td>
              <td>
                <div className={styles.chipsContainer}>
                  {bank.questionBankDisciplines
                    ?.filter((d: QuestionBankDiscipline) => d.isPredominant)
                    .map((d: QuestionBankDiscipline) => (
                      <span key={d.discipline.name} className={styles.chip}>
                        {d.discipline.name}
                      </span>
                    ))}
                </div>
              </td>
              <td>{new Date(bank.createdAt).toLocaleDateString('pt-BR', {
                day: '2-digit', month: 'short', year: 'numeric'
              })}</td>
              <td>{bank.questions?.length ?? 0}</td>
              <td className={styles.actions}>
                <button onClick={e => { e.stopPropagation(); openEdit(bank); }}><FaEdit/></button>
                <button onClick={e => { e.stopPropagation(); handleDelete(bank.id); }}><FaTrash/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showView && selected && (
        <ViewQuestionBankModal visible={showView} bank={selected} onClose={() => setShowView(false)} />
      )}
      {showEdit && selected && (
        <EditQuestionBankModal
          visible={showEdit}
          bank={selected}
          onClose={() => setShowEdit(false)}
          onUpdated={() => { setShowEdit(false); load(); }}
        />
      )}

      {showAdd && (
        <AddQuestionBankModal
          visible={showAdd}
          onClose={() => setShowAdd(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}

QuestionBank.getLayout = (page: React.ReactElement) => (
  <Layout title="Banco de Questões">{page}</Layout>
);
