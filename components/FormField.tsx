"use client"

import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  options?: { label: string; value: string; }[];
}

const FormField: React.FC<FormFieldProps> = ({
  id, label, type = "text", value, onChange, placeholder, as = "input", options = []
}) => {

  const renderInput = () => {
    switch (as) {
      case 'textarea':
        return (
          <textarea
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        );
      case 'select':
        return (
          <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
          >
            {options.map(({ label, value }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className='form-field'>
      <label htmlFor={id}>{label}</label>
      {renderInput()}
    </div>
  );
};

export default FormField;