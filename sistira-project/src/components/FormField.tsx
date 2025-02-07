import React from 'react';
import styles from '@/styles/FormField.module.css';

interface FormFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className={styles.field}>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={label} 
        className={styles.input}
      />
    </div>
  );
};

export default FormField;
