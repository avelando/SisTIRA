import React from 'react';
import styles from '@/styles/ui/FormField.module.css';
import { FormFieldProps } from '@/interfaces/FormFieldProps';

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
