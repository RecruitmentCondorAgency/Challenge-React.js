import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { FormikHelpers, useFormik } from 'formik';
import Card from "../../components/Card";
import { setUser } from "../../store/user";
import { useMemo, useState } from "react";
import Input from "../../components/InputText";
import FormButton from "../../components/Button";
import { store } from "../../store";
import './Register.scss';
import { fetchPost } from "../../store/user/thunks";
import AvatarSelector from "../../components/AvatarSelector";
import { toast } from "react-toastify";
import notifyConfig from "../../utils/notifyConfig";

interface RegisterFields {
  email: '',
  lastname: string
  name: string
  password: string
  repeatpassword: string
}

const requiredMessage = (field: string) => `${field} is required`

const Register = () => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('')
  const formik = useFormik({
    initialValues: {
      email: '',
      lastname: '',
      name: '',
      password: '',
      repeatpassword: ''
    },
    onSubmit: async (values: RegisterFields, { setSubmitting }: FormikHelpers<RegisterFields>) => {
      try {
        const {repeatpassword, ...data} = values
        await store.dispatch(fetchPost({...data, avatar}))
        setSubmitting(false);
        navigate('/login')
      } catch (err) {
        console.error(err)
        toast('An error ocuured while registering, please try again', {...notifyConfig, type: 'error'})
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().required(requiredMessage('Email')).matches(/^.+@.+\..+$/, `Email format isn't valid`),
      name: Yup.string().required(requiredMessage('Name')).min(3, 'Minimum 3 characters').max(20, 'Maximum 20 characters'),
      lastname: Yup.string().required(requiredMessage('Last name')).min(3, 'Minimum 3 characters').max(20, 'Maximum 20 characters'),
      password: Yup.string().required(requiredMessage('Password')).min(8, 'Minimum 8 characters'),
      repeatpassword: Yup.string().required('Please retype your password').oneOf([Yup.ref('password')], `Passwords doesn't match`)
    })
  });

  const emailError = useMemo(() =>
    !!(formik.touched.email && formik.errors.email),
    [formik.touched.email, formik.errors.email]
  )

  const nameError = useMemo(() =>
    !!(formik.touched.name && formik.errors.name),
    [formik.touched.name, formik.errors.name]
  )

  const lastnameError = useMemo(() =>
    !!(formik.touched.lastname && formik.errors.lastname),
    [formik.touched.lastname, formik.errors.lastname]
  )

  const passwordError = useMemo(() =>
    !!(formik.touched.password && formik.errors.password),
    [formik.touched.password, formik.errors.password]
  )

  const repeatpasswordError = useMemo(() =>
    !!(formik.touched.repeatpassword && formik.errors.repeatpassword),
    [formik.touched.repeatpassword, formik.errors.repeatpassword]
  )

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <Card>
          <>
          <h1 className="text-slate-500 register-title">Register</h1>
          <div className="flex justify-center mb-4">
              <AvatarSelector value={avatar} onChange={(value) => setAvatar(value)}/>
            </div>
          <form className="flex direction-column" onSubmit={formik.handleSubmit}>
            <Input
              placeholder="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              name="email"
              error={emailError}
              errorMessage={formik.errors.email}
            ></Input>
            <Input
              placeholder="Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              name="name"
              error={nameError}
              errorMessage={formik.errors.name}
            ></Input>
            <Input
              placeholder="Last name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
              name="lastname"
              error={lastnameError}
              errorMessage={formik.errors.lastname}
            ></Input>
            <Input
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              type="password"
              error={passwordError}
              errorMessage={formik.errors.password}
            ></Input>
            <Input
              placeholder="Repeat password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.repeatpassword}
              name="repeatpassword"
              type="password"
              error={repeatpasswordError}
              errorMessage={formik.errors.repeatpassword}
            ></Input>
            <div className="mt-4 flex justify-end">
              <FormButton text="Enviar" loading={formik.isSubmitting} className="inline-flex justify-center"/>
            </div>
          </form>
          <div className="register-redirect">
            <p className="text-center"><span className="text-slate-500 mr-2">You already have an account?</span>
              <Link to={'/login'}>Login</Link>
            </p>
          </div>
          </>
        </Card>
      </div>
    </div>
    // <Link to="/home">Invoices</Link>
  )
}

export default Register