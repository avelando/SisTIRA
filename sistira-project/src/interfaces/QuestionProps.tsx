interface QuestionProps {
  visible: boolean;
  onClose: () => void;
  onCreated: (newQuestion: any) => void;
}