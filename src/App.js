import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  age: yup.number().positive().integer().required('Age is required'),
  gender: yup.string().required('Gender is required'),
  hobbies: yup.array().min(1, 'At least one hobby is required'),
  file: yup.mixed().required('File is required'),
});

function App() {
  const { control, handleSubmit, formState: { errors }, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <h1>Reusable Form Component</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Text Input */}
        <div className="form-field">
          <label>Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <input {...field} />}
          />
          {errors.name && <span className="error-message">{errors.name.message}</span>}
        </div>

        <div className="form-field">
          <label>Age</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => <input type="number" {...field} />}
          />
          {errors.age && <span className="error-message">{errors.age.message}</span>}
        </div>

        <div className="form-field">
          <label>Gender</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            )}
          />
          {errors.gender && <span className="error-message">{errors.gender.message}</span>}
        </div>

        <div className="form-field">
          <label>Hobbies</label>
          <select multiple {...register("hobbies")}>
            <option value="traveling">Traveling</option>
            <option value="reading">Reading</option>
            <option value="cooking">Cooking</option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
          </select>
          {errors.hobbies && <span className="error-message">{errors.hobbies.message}</span>}
        </div>

        <div className="form-field">
          <label>Preferred Contact Method</label>
          <Controller
            name="contactMethod"
            control={control}
            render={({ field }) => (
              <>
                <label>
                  <input
                    type="radio"
                    value="email"
                    checked={field.value === 'email'}
                    onChange={field.onChange}
                  />
                  Email
                </label>
                <label>
                  <input
                    type="radio"
                    value="phone"
                    checked={field.value === 'phone'}
                    onChange={field.onChange}
                  />
                  Phone
                </label>
              </>
            )}
          />
          {errors.contactMethod && <span className="error-message">{errors.contactMethod.message}</span>}
        </div>

        <div className="form-field">
          <label>Subscribe to Newsletter</label>
          <Controller
            name="subscribe"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>

        <div className="form-field">
          <label>Upload File</label>
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files[0]);
                }}
              />
            )}
          />
          {errors.file && <span className="error-message">{errors.file.message}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
