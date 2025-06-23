export interface ButtonProps {
  content?: string;
  variant?: 'default' | 'reverse';
  onClick?: () => void;

  text?: string;
}