import { BankProps } from "./QuestionBankProps";

export interface Props {
  visible: boolean;
  bank: BankProps;
  onClose: () => void;
  onUpdated: () => void;
}