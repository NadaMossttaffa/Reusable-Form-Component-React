// src/components/Field.js
import React from 'react';
import { Controller } from 'react-hook-form';

const Field = ({ field, control }) => {
  const renderField = () => {
    switch (field.type) {
      case 'text':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field }) => <input {...field} placeholder={field.name} />}
          />
        );
      case 'number':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field }) => <input type="number" {...field} />}
          />
        );
      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field }) => (
              <select {...field}>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          />
        );
      default:
        return null;
    }
  };

  return <div style={{ gridArea: field['grid-layout'] }}>{renderField()}</div>;
};

export default Field;
