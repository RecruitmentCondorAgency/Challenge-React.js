import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  password: yup.string().min(2, 'Too Short!').max(8, 'Too Long!').required('Password is required'),
  email: yup.string().email('Email is invalid').required('Email is required')
});
