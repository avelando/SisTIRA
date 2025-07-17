'use client'

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from '@/styles/FormField.module.css';
import { FormFieldProps } from '@/interfaces/FormFieldProps';

export const FormField: React.FC<FormFieldProps> = ({
  label,
  icon,
  prefix,
  error,
  isPassword = false,
  ...inputProps
}) => {
  const [show, setShow] = useState(false);
  const type = isPassword ? (show ? 'text' : 'password') : inputProps.type;

  const handleToggle = () => setShow(prev => !prev);

  return (
    <div className={styles.field}>
      <div className={styles.labelWrapper}>
        <label className={styles.label}>{label}</label>
        {error && <span className={styles.errorText}> • {error}</span>}
      </div>

      <div className={styles.inputWrapper}>
        {icon && <span className={styles.inputIcon}>{icon}</span>}
        {prefix && <span className={styles.usernamePrefix}>{prefix}</span>}
        <input
          className={`${styles.input} ${error ? styles.error : ''}`}
          type={type}
          {...inputProps}
          style={{ paddingLeft: icon || prefix ? '2.5rem' : undefined }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={handleToggle}
            className={styles.toggleBtn}
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default FormField;
