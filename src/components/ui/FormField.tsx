import React from 'react';
import { FormFieldProps } from '@/interfaces/FormFieldProps';

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange }) => {
  return (
    <div className="w-full my-2">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="
          w-full
          bg-transparent
          p-2.5
          border-2 border-[#123653]
          rounded
          text-base text-[#123653]
          placeholder:text-[#123653] placeholder:font-medium
          focus:outline-none
        "
      />
    </div>
  );
};

export default FormField;
