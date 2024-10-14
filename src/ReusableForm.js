import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ReusableForm = ({ formFields }) => {
  const validationSchema = Yup.object().shape(
    formFields.reduce((acc, field) => {
      if (field.validations) {
        acc[field.name] = field.validations;
      }
      return acc;
    }, {})
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log('Form Submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field, index) => (
        <div key={index}>
          <label>{field.label}</label>
          <Controller
            name={field.name}
            control={control}
            render={({ field: formField }) => (
              <>
                {field.type === "text" && <input {...formField} type="text" />}
                {field.type === "number" && <input {...formField} type="number" />}
                {field.type === "select" && (
                  <select {...formField}>
                    {field.options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </>
            )}
          />
          {errors[field.name] && <span>{errors[field.name]?.message}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReusableForm;
