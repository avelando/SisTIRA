export interface QuestionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (questionData: any) => void;
  mode: 'create' | 'edit';
  question?: {
    id: number;
    text: string;
    questionType: 'OBJ' | 'SUB';
    questionDisciplines: { discipline: { id: number; name: string } }[];
    alternatives?: { content: string; correct: boolean }[];
  };
}

export interface ManualQuestionFormProps {
  onCancel: () => void;
  onSubmit: (data: {
    text: string;
    type: 'objetiva' | 'subjetiva';
    disciplines: string[];
    alternatives?: { content: string; correct: boolean }[];
  }) => void;
}
