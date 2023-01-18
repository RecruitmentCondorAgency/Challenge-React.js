import { Formik, Form, Field } from 'formik';
import { loginSchema } from '../../utils/loginSchema';
import FormikInput from '../../components/FormikInput';
import * as styles from './styles.module.css';
import MainButton from '../../components/mainbutton/MainButton';
import useLogin from './hooks/useLogin';
import useVerifyAuth from '../../hooks/useVerifyAuth';

const initialValues = {
  email: '',
  password: ''
};

const LoginPage = () => {
  const login = useLogin();
  useVerifyAuth();

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(user) => {
          login(user);
        }}>
        {({ errors, touched, handleSubmit }) => (
          <Form>
            <Field
              label="Email"
              placeholder="Enter your email"
              name="email"
              type="email"
              component={FormikInput}
            />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <Field
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              component={FormikInput}
            />
            {errors.password && touched.password ? <div>{errors.password}</div> : null}
            <div className={styles.btnContainer}>
              <MainButton clickHandler={handleSubmit}>Login</MainButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
