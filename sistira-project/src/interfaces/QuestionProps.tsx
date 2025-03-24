interface QuestionProps {
  visible: boolean;
  onClose: () => void;
  onCreated: (newQuestion: any) => void;
}

interface QuestionEntry {
  questionId: string;
  question: {
    text: string;
    questionDisciplines: { discipline: { name: string } }[];
  };
}
