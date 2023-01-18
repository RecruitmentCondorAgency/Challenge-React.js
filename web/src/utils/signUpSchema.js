import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().min(2, 'Too Short!').max(8, 'Too Long!').required('Password is required'),
  passwordtwo: yup
    .string()
    .required('You must to confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});
