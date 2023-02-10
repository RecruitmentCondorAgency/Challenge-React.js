import { useFormik } from 'formik'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomToast from '../components/CustomToast'
import { API_URL } from '../constants'
import { ToastContext } from '../context/ToastContext'

const validate = (values) => {
	const errors = {}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
		errors.email = 'Invalid email address'
	}

	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 8) {
		errors.password = 'Must be 8 characters or more'
	}

	if (values.confirmPassword !== values.password) {
		errors.confirmPassword = 'Passwords do not match'
	}

	return errors
}

const validateExistingUser = async (email) => {
	let response = []

	await fetch(`${API_URL}/users?email=${email}`)
		.then((res) => res.json())
		.then((data) => {
			if (data.length > 0) {
				response = [...data]
			}
		})
		.catch((err) => {
			console.log(err)
		})

	return response
}

export default function Login() {
	const { toast } = React.useContext(ToastContext)
	let navigate = useNavigate()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		validate,
		onSubmit: async (values) => {
			const { email, password } = values
			const existingUser = await validateExistingUser(email)

			if (existingUser.length > 0) {
				toast?.current?.show({
					severity: 'error',
					summary: 'Error',
					detail: 'Email already exists',
					life: 3000,
				})
				return
			}
			fetch(`${API_URL}/users`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, universities: [] }),
			})
				.then((res) => {
					if (res.status === 201) {
						toast?.current?.show({
							severity: 'success',
							summary: 'Success',
							detail: 'User created!',
							life: 3000,
						})

						setTimeout(() => {
							navigate('/login')
						}, 2500)
					}
				})
				.catch((err) => {
					toast?.current?.show({
						severity: 'error',
						summary: 'Error',
						detail: 'Server error',
						life: 3000,
					})
				})
		},
	})

	return (
		<div className="flex align-items-center justify-content-center">
			<CustomToast toast={toast} />
			<div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
				<div className="text-center mb-5">
					<img
						src="https://cdn4.iconfinder.com/data/icons/ui-marketplace-1-0-flat/19/4_login-256.png"
						alt="hyper"
						height={50}
						className="mb-3"
					/>
					<div className="text-900 text-3xl font-medium mb-3">Welcome</div>
					<span className="text-600 font-medium line-height-3">
						Already have an account?
					</span>
					<Link
						to='/login'
						className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
					>
						Login Here!
					</Link>
				</div>

				<form onSubmit={formik.handleSubmit}>
					<label htmlFor="email" className="block text-900 font-medium mb-2">
						Email
					</label>
					<InputText
						id="email"
						type="text"
						placeholder="Email address"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
						className="w-full"
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className="text-red-500 text-xs">{formik.errors.email}</div>
					) : null}

					<label
						htmlFor="password"
						className="block text-900 font-medium mb-2 mt-3"
					>
						Password
					</label>
					<InputText
						id="password"
						type="password"
						placeholder="Password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password}
						className="w-full"
					/>
					{formik.touched.password && formik.errors.password ? (
						<div className="text-red-500 text-xs">{formik.errors.password}</div>
					) : null}

					<label
						htmlFor="confirmPassword"
						className="block text-900 font-medium mb-2 mt-3"
					>
						Confirm Password
					</label>
					<InputText
						id="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.confirmPassword}
						className="w-full"
					/>
					{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
						<div className="text-red-500 text-xs">
							{formik.errors.confirmPassword}
						</div>
					) : null}

					<Button
						label="Register"
						icon="pi pi-arrow-right"
						iconPos='right'
						className="w-full mt-6"
						type='submit'
						disabled={!(formik.isValid && formik.dirty)}
					/>
				</form>
			</div>
		</div>
	)
}
