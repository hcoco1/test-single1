import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  biography: '',
  hobbies: '',
  photo_url: '',
  birth_date: '',
  privacy_settings: '',
  password: '',
  confirm_password: '',
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string(),
  biography: Yup.string(),
  hobbies: Yup.string(),
  photo_url: Yup.string(),
  birth_date: Yup.date(),
  privacy_settings: Yup.string(),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

function SignupForm({ onSubmit }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
          <h2>Register</h2>
            <label htmlFor="first_name">First Name</label>
            <Field
              type="text"
              name="first_name"
              placeholder="First Name"
            />
            <ErrorMessage name="first_name" component="div" />
          </div>

          <div>
            <label htmlFor="last_name">Last Name</label>
            <Field
              type="text"
              name="last_name"
              placeholder="Last Name"
            />
            <ErrorMessage name="last_name" component="div" />
          </div>

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
            <label htmlFor="address">Address</label>
            <Field
              type="text"
              name="address"
              placeholder="Address"
            />
          </div>

          <div>
            <label htmlFor="biography">Biography</label>
            <Field
              as="textarea"
              name="biography"
              placeholder="Biography"
              rows="4"
            />
          </div>

          <div>
            <label htmlFor="hobbies">Hobbies</label>
            <Field
              as="textarea"
              name="hobbies"
              placeholder="Hobbies"
              rows="4"
            />
          </div>

          <div>
            <label htmlFor="photo_url">Photo URL</label>
            <Field
              type="text"
              name="photo_url"
              placeholder="Photo URL"
            />
          </div>

          <div>
            <label htmlFor="birth_date">Birth Date</label>
            <Field
              type="date"
              name="birth_date"
              placeholder="Birth Date"
            />
          </div>

          <div>
            <label htmlFor="privacy_settings">Privacy Settings</label>
            <Field
              type="text"
              name="privacy_settings"
              placeholder="Privacy Settings"
            />
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
            <label htmlFor="confirm_password">Confirm Password</label>
            <Field
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
            />
            <ErrorMessage name="confirm_password" component="div" />
          </div>

          <div>
            <button type="submit">Sign Up</button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
