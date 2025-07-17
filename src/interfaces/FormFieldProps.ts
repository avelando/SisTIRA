import { InputHTMLAttributes, ReactNode } from "react";

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  prefix?: string;
  error?: string;
  isPassword?: boolean;
}
