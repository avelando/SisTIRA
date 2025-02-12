import React from 'react';
import styles from '@/styles/FormField.module.css';

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange }: FormFieldProps) => {
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
