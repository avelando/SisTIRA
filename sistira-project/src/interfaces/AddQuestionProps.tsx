interface AddQuestionProps {
  visible: boolean;
  onClose: () => void;
  onCreated: (newQuestion: any) => void;
}