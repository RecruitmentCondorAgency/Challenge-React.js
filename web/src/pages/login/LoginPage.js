import React from 'react';
import { Formik, Form, Field } from 'formik';
import { loginSchema } from '../../utils/loginSchema';
import Input from '../../components/Input';
import * as styles from './styles.module.css';
import MainButton from '../../components/MainButton';

const initialValues = {
  email: '',
  password: ''
};

const LoginPage = () => {
  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}>
        {({ errors, touched }) => (
          <Form>
            <Field
              label="Email"
              placeholder="Enter your email"
              name="email"
              type="email"
              component={Input}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              component={Input}
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <div className={styles.btnContainer}>
              <MainButton>Login</MainButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
