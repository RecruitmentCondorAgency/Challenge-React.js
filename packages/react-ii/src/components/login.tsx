import React from 'react';
import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { Stack, TextField, Button, FormLabel, Backdrop, CircularProgress } from '@mui/material';
import {useFormik, Form, FormikProvider} from 'formik';
import toast from 'react-hot-toast';
import { publicauthService } from '../services/publicauth.service';
import Lodingbc from './loadingbc';

const Login: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const LoginSchema = Yup.object().shape({
		email: Yup.string().email('Email must be a valid email address').required('Email is required'),
		password: Yup.string().required('Password is required')
	});

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: LoginSchema,
		onSubmit: async (formData) => {
			setLoading(true);
			const {data, status} = await publicauthService.loginApi(formData);
			if (data && data?.[0] && status == 200) {
				toast.success("success massage");
				console.log("aaaa -->", data?.[0]);
				sessionStorage.setItem("uid", JSON. stringify(data?.[0]));

				navigate('/profile', { replace: true });
			} else {
				setError("Email or Password invalid.");
				toast.error("error msg");
			}
			setLoading(false);
		}
	});

	const { errors, 
		touched, 
		isSubmitting, 
		handleSubmit,
			getFieldProps 
	} = formik;

	return (
		<div className='bg-white p-10 drop-shadow-sm'>
			{loading ? (
				<Lodingbc open={loading}/>
			) : (
				''
			)}
			<FormikProvider value={formik}>
				<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Stack className="bg-transparent border-none" >
						<FormLabel>
							Email <span style={{ color: 'red' }}>*</span>
						</FormLabel>
						<TextField className="!mb-4"
							fullWidth
							autoComplete="email"
							type="email"
							{...getFieldProps('email')}
							error={Boolean(touched.email && errors.email)}
							helperText={touched.email && errors.email}
							InputLabelProps={{ shrink: true }}
							placeholder="Email"
						/>
						<FormLabel>
							Password <span style={{ color: 'red' }}>*</span>
						</FormLabel>
						<TextField className="!mb-4"
							fullWidth
							autoComplete="password"
							name="password"
							type='password'
							{...getFieldProps('password')}
							InputLabelProps={{ shrink: true }}
							error={Boolean(touched.password && errors.password)}
							helperText={touched.password && errors.password}
							placeholder="Password"
						/>
						<Button fullWidth size="large" type="submit" variant="contained">
							Login
						</Button>
					</Stack>

				</Form>
			</FormikProvider>
			{
				error && <p className='text-[#d32f2f] text-[12px] ms-[15px]'>
					{error}
				</p>
			}
			<div className='mt-3 text-center'>
				Create an account? &nbsp;
				<Link to={`/register`}>
						Sign Up
					</Link>
				</div>
		</div>
	);
}

export default Login;