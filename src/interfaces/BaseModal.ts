export interface BaseModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}