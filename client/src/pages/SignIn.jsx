import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function LoginForm({ onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <h2>Login</h2>

          <div>
            <label htmlFor="email">Email</label>
            <Field
              type="text"
              name="email"
              placeholder="Email"
            />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage name="password" component="div" />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
