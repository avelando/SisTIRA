interface EditQuestionModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdated: (updated: any) => void;
  question: {
    id: number;
    text: string;
    questionType: 'OBJ' | 'SUB';
    questionDisciplines: { discipline: { id: number; name: string } }[];
    alternatives?: { content: string; correct: boolean }[];
  };
}