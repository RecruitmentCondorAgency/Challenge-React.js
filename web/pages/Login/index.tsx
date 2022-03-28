import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import Card from "../../components/Card";
import { store } from "../../store";
import { setUser } from "../../store/user";
import { fetchLogin } from "../../store/user/thunks";
import { useMemo, useRef, useState } from "react";
import FormButton from "../../components/Button";
import Input from "../../components/InputText";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.scss';

interface LoginFields {email: string, password: string}

const Login = () => {
  const navigate = useNavigate();
  const [noExist, setExistance] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (values: LoginFields, { setSubmitting }: FormikHelpers<LoginFields>) => {
      const user = (await store.dispatch(fetchLogin(values))).payload
      setSubmitting(false);
      if (user) {
        setExistance(false)
        navigate('/')
      } else {
        setExistance(true)
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required('You must enter an email'),
      password: Yup.string().required('You must enter a password').min(8, 'Minimum 8 characters'),
    })
  });

  const emailError = useMemo(() =>
    !!(formik.touched.email && formik.errors.email),
    [formik.touched.email, formik.errors.email]
  )

  const passwordError = useMemo(() =>
    !!(formik.touched.password && formik.errors.password),
    [formik.touched.password, formik.errors.password]
  )

  const notifyLoad = () => toast('Cargando data', {
    type: 'info',
    position: "top-right",
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    closeButton: false,
    isLoading: true
  });

  return (
    <>
      <div className="login-container">
        <div className="login-wrapper">
          <Card>
            <>
            <h1 className="text-slate-500 login-title">Login</h1>
            {noExist && <span className="login-error text-red-500">User doesn't exist</span>}
            <form className="flex direction-column" onSubmit={formik.handleSubmit}>
              <Input
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={emailError}
                errorMessage={formik.errors.email}
              ></Input>
              <Input
                placeholder="Password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={passwordError}
                errorMessage={formik.errors.password}
              ></Input>

              <div className="login-redirect">
                <p className="text-center text-slate-500">
                  <span className="mr-2">You don't have an account?</span>
                  <Link to={'/register'}>Register</Link>
                </p>
                <div className="mt-4 flex justify-end">
                  <FormButton loading={formik.isSubmitting} text="Enter"/>
                </div>
              </div>
            </form>
            </>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login