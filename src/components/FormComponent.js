import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Field from './Field';  

const FormComponent = ({ fields, onSubmit }) => {
  const validationSchema = Yup.object().shape(
    fields.reduce((acc, field) => {
      if (field.validations) {
        acc[field.name] = Yup.string().required('This field is required');
      }
      return acc;
    }, {})
  );

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <Field key={index} field={field} control={control} />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
