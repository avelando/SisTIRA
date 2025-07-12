'use client';

import React from 'react';
import { FormFieldProps } from '@/interfaces/FormFieldProps';
import styles from '@/styles/FormField.module.css';

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className={styles.wrapper}>
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
